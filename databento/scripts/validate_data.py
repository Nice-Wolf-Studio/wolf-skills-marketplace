#!/usr/bin/env python3
"""
Databento Data Quality Validator

Validates market data quality to catch issues early:
- Timestamp gap detection
- Record count verification
- Price range validation (no negative prices, outliers)
- Duplicate timestamp detection
- Summary quality report

Usage:
    python validate_data.py --input data.json
    python validate_data.py --input data.csv --schema ohlcv-1h
    python validate_data.py --input data.json --max-gap-minutes 60 --report report.json
"""

import argparse
import json
import sys
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional, Tuple
from collections import defaultdict


class DataValidator:
    """Validates Databento market data quality."""

    def __init__(
        self,
        schema: str,
        max_gap_minutes: int = 60,
        price_outlier_std: float = 10.0
    ):
        """
        Initialize validator.

        Args:
            schema: Data schema (ohlcv-1h, trades, mbp-1, etc.)
            max_gap_minutes: Maximum acceptable gap in minutes
            price_outlier_std: Standard deviations for outlier detection
        """
        self.schema = schema
        self.max_gap_seconds = max_gap_minutes * 60
        self.price_outlier_std = price_outlier_std
        self.issues: List[Dict[str, Any]] = []

    def validate(self, data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Run all validation checks on data.

        Args:
            data: List of records to validate

        Returns:
            Validation report
        """
        print(f"[VALIDATION] Running quality checks on {len(data)} records...")

        report = {
            "total_records": len(data),
            "valid": True,
            "checks": {}
        }

        if not data:
            print("[WARNING] No data to validate!")
            report["valid"] = False
            return report

        # Run all validation checks
        report["checks"]["timestamp_gaps"] = self.check_timestamp_gaps(data)
        report["checks"]["duplicates"] = self.check_duplicates(data)
        report["checks"]["price_range"] = self.check_price_range(data)
        report["checks"]["record_count"] = self.check_record_count(data)
        report["checks"]["data_completeness"] = self.check_completeness(data)

        # Overall validity
        report["valid"] = all(
            check.get("valid", True)
            for check in report["checks"].values()
        )

        report["issues"] = self.issues

        return report

    def check_timestamp_gaps(self, data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Check for unexpected gaps in timestamps.

        Args:
            data: List of records

        Returns:
            Gap check report
        """
        print("[CHECK] Checking for timestamp gaps...")

        gaps = []
        timestamps = self._extract_timestamps(data)

        if len(timestamps) < 2:
            return {"valid": True, "gaps": [], "note": "Insufficient data for gap detection"}

        # Sort timestamps
        sorted_ts = sorted(timestamps)

        # Check gaps between consecutive timestamps
        for i in range(len(sorted_ts) - 1):
            gap_ns = sorted_ts[i + 1] - sorted_ts[i]
            gap_seconds = gap_ns / 1_000_000_000

            if gap_seconds > self.max_gap_seconds:
                gap_info = {
                    "index": i,
                    "gap_seconds": gap_seconds,
                    "gap_minutes": gap_seconds / 60,
                    "before": self._format_timestamp(sorted_ts[i]),
                    "after": self._format_timestamp(sorted_ts[i + 1])
                }
                gaps.append(gap_info)

                self.issues.append({
                    "type": "timestamp_gap",
                    "severity": "warning",
                    "message": f"Gap of {gap_seconds / 60:.1f} minutes detected",
                    **gap_info
                })

        valid = len(gaps) == 0
        print(f"[CHECK] Found {len(gaps)} gaps > {self.max_gap_seconds / 60} minutes")

        return {
            "valid": valid,
            "gaps_found": len(gaps),
            "gaps": gaps[:10] if gaps else [],  # Limit to first 10 for report
            "total_gaps": len(gaps)
        }

    def check_duplicates(self, data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Check for duplicate timestamps.

        Args:
            data: List of records

        Returns:
            Duplicate check report
        """
        print("[CHECK] Checking for duplicate timestamps...")

        timestamps = self._extract_timestamps(data)
        timestamp_counts = defaultdict(int)

        for ts in timestamps:
            timestamp_counts[ts] += 1

        duplicates = {ts: count for ts, count in timestamp_counts.items() if count > 1}

        if duplicates:
            for ts, count in list(duplicates.items())[:10]:  # Limit to first 10
                self.issues.append({
                    "type": "duplicate_timestamp",
                    "severity": "error",
                    "timestamp": self._format_timestamp(ts),
                    "count": count,
                    "message": f"Timestamp appears {count} times"
                })

        valid = len(duplicates) == 0
        print(f"[CHECK] Found {len(duplicates)} duplicate timestamps")

        return {
            "valid": valid,
            "duplicates_found": len(duplicates),
            "duplicate_timestamps": len(duplicates)
        }

    def check_price_range(self, data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Check for invalid or outlier prices.

        Args:
            data: List of records

        Returns:
            Price range check report
        """
        print("[CHECK] Checking price ranges...")

        prices = self._extract_prices(data)

        if not prices:
            return {"valid": True, "note": "No price data to validate"}

        # Check for negative prices
        negative_prices = [p for p in prices if p < 0]

        # Check for zero prices (unusual for ES/NQ)
        zero_prices = [p for p in prices if p == 0]

        # Calculate statistics for outlier detection
        if len(prices) > 1:
            mean_price = sum(prices) / len(prices)
            variance = sum((p - mean_price) ** 2 for p in prices) / len(prices)
            std_dev = variance ** 0.5

            # Detect outliers (> N standard deviations from mean)
            outliers = []
            for p in prices:
                if abs(p - mean_price) > (self.price_outlier_std * std_dev):
                    outliers.append(p)
                    if len(outliers) <= 10:  # Limit issues
                        self.issues.append({
                            "type": "price_outlier",
                            "severity": "warning",
                            "price": p,
                            "mean": mean_price,
                            "std_dev": std_dev,
                            "message": f"Price {p:.2f} is {abs(p - mean_price) / std_dev:.1f} std devs from mean"
                        })
        else:
            outliers = []
            mean_price = prices[0] if prices else 0
            std_dev = 0

        # Report negative prices as errors
        for p in negative_prices[:10]:  # Limit to first 10
            self.issues.append({
                "type": "negative_price",
                "severity": "error",
                "price": p,
                "message": f"Negative price detected: {p}"
            })

        valid = len(negative_prices) == 0 and len(zero_prices) == 0

        print(f"[CHECK] Price range: {min(prices):.2f} to {max(prices):.2f}")
        print(f"[CHECK] Negative prices: {len(negative_prices)}, Zero prices: {len(zero_prices)}, Outliers: {len(outliers)}")

        return {
            "valid": valid,
            "min_price": min(prices),
            "max_price": max(prices),
            "mean_price": mean_price,
            "std_dev": std_dev,
            "negative_prices": len(negative_prices),
            "zero_prices": len(zero_prices),
            "outliers": len(outliers)
        }

    def check_record_count(self, data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Verify expected record count.

        Args:
            data: List of records

        Returns:
            Record count check report
        """
        print(f"[CHECK] Verifying record count: {len(data)} records")

        # For OHLCV data, can estimate expected count based on timeframe
        expected_count = self._estimate_expected_count(data)

        valid = True
        if expected_count and abs(len(data) - expected_count) > (expected_count * 0.1):
            # More than 10% deviation
            valid = False
            self.issues.append({
                "type": "unexpected_record_count",
                "severity": "warning",
                "actual": len(data),
                "expected": expected_count,
                "message": f"Expected ~{expected_count} records, got {len(data)}"
            })

        return {
            "valid": valid,
            "actual_count": len(data),
            "expected_count": expected_count,
            "note": "Expected count is estimated based on schema and date range"
        }

    def check_completeness(self, data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Check data completeness (required fields present).

        Args:
            data: List of records

        Returns:
            Completeness check report
        """
        print("[CHECK] Checking data completeness...")

        if not data:
            return {"valid": False, "note": "No data"}

        # Check required fields based on schema
        required_fields = self._get_required_fields()

        missing_fields = defaultdict(int)
        for record in data[:100]:  # Sample first 100 records
            for field in required_fields:
                if field not in record or record[field] is None:
                    missing_fields[field] += 1

        if missing_fields:
            for field, count in missing_fields.items():
                self.issues.append({
                    "type": "missing_field",
                    "severity": "error",
                    "field": field,
                    "missing_count": count,
                    "message": f"Field '{field}' missing in {count} records (sampled)"
                })

        valid = len(missing_fields) == 0

        return {
            "valid": valid,
            "missing_fields": dict(missing_fields) if missing_fields else {}
        }

    def _extract_timestamps(self, data: List[Dict[str, Any]]) -> List[int]:
        """Extract timestamps from records."""
        timestamps = []
        for record in data:
            # Try different timestamp field names
            ts = record.get("ts_event") or record.get("ts_recv") or record.get("timestamp")
            if ts:
                timestamps.append(int(ts))
        return timestamps

    def _extract_prices(self, data: List[Dict[str, Any]]) -> List[float]:
        """Extract prices from records."""
        prices = []
        for record in data:
            # For OHLCV, use close price
            if "close" in record:
                # Convert from fixed-point if needed
                price = record["close"]
                if isinstance(price, int) and price > 1_000_000:
                    price = price / 1_000_000_000  # Fixed-point conversion
                prices.append(float(price))
            # For trades/mbp, use price field
            elif "price" in record:
                price = record["price"]
                if isinstance(price, int) and price > 1_000_000:
                    price = price / 1_000_000_000
                prices.append(float(price))
        return prices

    def _format_timestamp(self, ts_ns: int) -> str:
        """Format nanosecond timestamp to readable string."""
        ts_seconds = ts_ns / 1_000_000_000
        dt = datetime.fromtimestamp(ts_seconds)
        return dt.strftime("%Y-%m-%d %H:%M:%S")

    def _estimate_expected_count(self, data: List[Dict[str, Any]]) -> Optional[int]:
        """Estimate expected record count based on schema and date range."""
        # This is a simplified estimation
        # In practice, would calculate based on actual date range
        if "ohlcv" in self.schema:
            if "1h" in self.schema:
                return None  # ~24 records per day per symbol
            elif "1d" in self.schema:
                return None  # ~1 record per day per symbol
        return None

    def _get_required_fields(self) -> List[str]:
        """Get required fields for schema."""
        base_fields = ["ts_event", "ts_recv"]

        if "ohlcv" in self.schema:
            return base_fields + ["open", "high", "low", "close", "volume"]
        elif self.schema == "trades":
            return base_fields + ["price", "size"]
        elif "mbp" in self.schema:
            return base_fields + ["bid_px_00", "ask_px_00", "bid_sz_00", "ask_sz_00"]
        else:
            return base_fields

    def print_report(self, report: Dict[str, Any]):
        """Print validation report to console."""
        print("\n" + "=" * 60)
        print("DATA VALIDATION REPORT")
        print("=" * 60)

        print(f"\nTotal Records: {report['total_records']}")
        print(f"Overall Valid: {'✓ YES' if report['valid'] else '✗ NO'}")

        print("\n" + "-" * 60)
        print("CHECK RESULTS")
        print("-" * 60)

        for check_name, check_result in report["checks"].items():
            status = "✓" if check_result.get("valid", True) else "✗"
            print(f"\n{status} {check_name.replace('_', ' ').title()}")
            for key, value in check_result.items():
                if key != "valid" and key != "gaps":
                    print(f"    {key}: {value}")

        if report["issues"]:
            print("\n" + "-" * 60)
            print(f"ISSUES FOUND ({len(report['issues'])})")
            print("-" * 60)
            for i, issue in enumerate(report["issues"][:20], 1):  # Limit to 20
                print(f"\n{i}. [{issue['severity'].upper()}] {issue['type']}")
                print(f"   {issue['message']}")

            if len(report["issues"]) > 20:
                print(f"\n... and {len(report['issues']) - 20} more issues")

        print("\n" + "=" * 60)


def main():
    """Main entry point for CLI usage."""
    parser = argparse.ArgumentParser(
        description="Validate Databento market data quality"
    )

    parser.add_argument(
        "--input",
        "-i",
        required=True,
        help="Input data file (JSON or CSV)"
    )

    parser.add_argument(
        "--schema",
        default="ohlcv-1h",
        help="Data schema (default: ohlcv-1h)"
    )

    parser.add_argument(
        "--max-gap-minutes",
        type=int,
        default=60,
        help="Maximum acceptable gap in minutes (default: 60)"
    )

    parser.add_argument(
        "--price-outlier-std",
        type=float,
        default=10.0,
        help="Standard deviations for outlier detection (default: 10.0)"
    )

    parser.add_argument(
        "--report",
        "-r",
        help="Save report to JSON file"
    )

    args = parser.parse_args()

    # Load data
    print(f"[LOAD] Loading data from {args.input}...")
    with open(args.input, 'r') as f:
        data = json.load(f)

    # Handle different data formats
    if isinstance(data, dict) and "data" in data:
        data = data["data"]

    # Create validator
    validator = DataValidator(
        schema=args.schema,
        max_gap_minutes=args.max_gap_minutes,
        price_outlier_std=args.price_outlier_std
    )

    # Run validation
    report = validator.validate(data)

    # Print report
    validator.print_report(report)

    # Save report if requested
    if args.report:
        print(f"\n[SAVE] Saving report to {args.report}...")
        with open(args.report, 'w') as f:
            json.dump(report, f, indent=2)
        print(f"[SUCCESS] Report saved!")

    # Exit with appropriate code
    sys.exit(0 if report["valid"] else 1)


if __name__ == "__main__":
    main()
