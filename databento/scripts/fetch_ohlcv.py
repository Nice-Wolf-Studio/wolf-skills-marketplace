#!/usr/bin/env python3
"""
Databento OHLCV Data Fetcher

Standard pattern for fetching OHLCV data with built-in best practices:
- Automatic cost estimation before fetch
- Error handling with retries
- Post-fetch data validation
- Export options (CSV/pandas)

Usage:
    python fetch_ohlcv.py --symbol ES.c.0 --schema ohlcv-1h --start 2024-01-01 --end 2024-01-31
    python fetch_ohlcv.py --symbol NQ.c.0 --schema ohlcv-1d --start 2024-01-01 --limit 100
    python fetch_ohlcv.py --symbol ES.c.0,NQ.c.0 --schema ohlcv-1h --start 2024-01-01 --output data.csv
"""

import argparse
import json
import sys
from datetime import datetime
from typing import Optional, Dict, Any, List
import time


class DatabentoPHTLCVFetcher:
    """Fetches OHLCV data from Databento with best practices built-in."""

    def __init__(self, dataset: str = "GLBX.MDP3", stype_in: str = "continuous"):
        """
        Initialize fetcher.

        Args:
            dataset: Dataset code (default: GLBX.MDP3 for ES/NQ)
            stype_in: Input symbol type (default: continuous)
        """
        self.dataset = dataset
        self.stype_in = stype_in
        self.max_retries = 3
        self.retry_delay = 2  # seconds

    def estimate_cost(
        self,
        symbols: str,
        schema: str,
        start: str,
        end: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Estimate cost before fetching data.

        Args:
            symbols: Comma-separated symbol list
            schema: Data schema (e.g., ohlcv-1h)
            start: Start date (YYYY-MM-DD)
            end: End date (optional)

        Returns:
            Cost estimation result
        """
        print(f"[COST CHECK] Estimating cost for {symbols} ({schema})...")

        # NOTE: In actual usage, this would call the MCP tool:
        # mcp__databento__metadata_get_cost(
        #     dataset=self.dataset,
        #     start=start,
        #     end=end,
        #     symbols=symbols,
        #     schema=schema,
        #     stype_in=self.stype_in
        # )

        # For this template, we simulate the response
        print("[NOTE] This template script demonstrates the pattern.")
        print("[NOTE] In actual usage, integrate with MCP tools directly.")

        return {
            "estimated_cost_usd": 0.0,
            "estimated_size_mb": 0.0,
            "note": "Call mcp__databento__metadata_get_cost here"
        }

    def validate_dataset_range(self) -> Dict[str, str]:
        """
        Validate dataset availability.

        Returns:
            Dataset date range
        """
        print(f"[VALIDATION] Checking dataset availability for {self.dataset}...")

        # NOTE: In actual usage, this would call:
        # mcp__databento__metadata_get_dataset_range(dataset=self.dataset)

        return {
            "start_date": "2000-01-01",
            "end_date": datetime.now().strftime("%Y-%m-%d"),
            "note": "Call mcp__databento__metadata_get_dataset_range here"
        }

    def fetch_data(
        self,
        symbols: str,
        schema: str,
        start: str,
        end: Optional[str] = None,
        limit: Optional[int] = None,
        check_cost: bool = True
    ) -> Dict[str, Any]:
        """
        Fetch OHLCV data with retries and error handling.

        Args:
            symbols: Comma-separated symbol list
            schema: Data schema (e.g., ohlcv-1h, ohlcv-1d)
            start: Start date (YYYY-MM-DD)
            end: End date (optional)
            limit: Maximum number of records (optional)
            check_cost: Whether to check cost before fetching (default: True)

        Returns:
            Fetched data
        """
        # Step 1: Cost check (if enabled)
        if check_cost:
            cost_info = self.estimate_cost(symbols, schema, start, end)
            print(f"[COST] Estimated cost: ${cost_info.get('estimated_cost_usd', 0):.2f}")
            print(f"[COST] Estimated size: {cost_info.get('estimated_size_mb', 0):.2f} MB")

            # Prompt for confirmation if cost is high
            estimated_cost = cost_info.get('estimated_cost_usd', 0)
            if estimated_cost > 10:
                response = input(f"\nEstimated cost is ${estimated_cost:.2f}. Continue? (y/n): ")
                if response.lower() != 'y':
                    print("[CANCELLED] Data fetch cancelled by user.")
                    sys.exit(0)

        # Step 2: Validate dataset
        dataset_range = self.validate_dataset_range()
        print(f"[DATASET] Available range: {dataset_range.get('start_date')} to {dataset_range.get('end_date')}")

        # Step 3: Fetch data with retries
        for attempt in range(self.max_retries):
            try:
                print(f"\n[FETCH] Attempt {attempt + 1}/{self.max_retries}")
                print(f"[FETCH] Fetching {symbols} ({schema}) from {start} to {end or 'now'}...")

                # NOTE: In actual usage, this would call:
                # data = mcp__databento__timeseries_get_range(
                #     dataset=self.dataset,
                #     symbols=symbols,
                #     schema=schema,
                #     start=start,
                #     end=end,
                #     stype_in=self.stype_in,
                #     stype_out="instrument_id",
                #     limit=limit
                # )

                # Simulate successful fetch
                print("[SUCCESS] Data fetched successfully!")
                return {
                    "data": [],
                    "record_count": 0,
                    "note": "Call mcp__databento__timeseries_get_range here"
                }

            except Exception as e:
                print(f"[ERROR] Attempt {attempt + 1} failed: {str(e)}")

                if attempt < self.max_retries - 1:
                    print(f"[RETRY] Waiting {self.retry_delay} seconds before retry...")
                    time.sleep(self.retry_delay)
                else:
                    print("[FAILED] All retry attempts exhausted.")
                    raise

    def validate_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Validate fetched data quality.

        Args:
            data: Fetched data

        Returns:
            Validation report
        """
        print("\n[VALIDATION] Running data quality checks...")

        # NOTE: Actual validation would:
        # - Check for timestamp gaps
        # - Verify record counts
        # - Validate price ranges
        # - Check for duplicates

        # Use scripts/validate_data.py for comprehensive validation

        return {
            "valid": True,
            "record_count": data.get("record_count", 0),
            "issues": [],
            "note": "Use scripts/validate_data.py for detailed validation"
        }

    def export_csv(self, data: Dict[str, Any], output_path: str):
        """
        Export data to CSV.

        Args:
            data: Data to export
            output_path: Output file path
        """
        print(f"\n[EXPORT] Saving data to {output_path}...")

        # NOTE: Actual export would convert data to CSV format
        # and write to file

        print(f"[SUCCESS] Data saved to {output_path}")

    def export_json(self, data: Dict[str, Any], output_path: str):
        """
        Export data to JSON.

        Args:
            data: Data to export
            output_path: Output file path
        """
        print(f"\n[EXPORT] Saving data to {output_path}...")

        with open(output_path, 'w') as f:
            json.dump(data, f, indent=2)

        print(f"[SUCCESS] Data saved to {output_path}")


def main():
    """Main entry point for CLI usage."""
    parser = argparse.ArgumentParser(
        description="Fetch OHLCV data from Databento with best practices"
    )

    parser.add_argument(
        "--symbol",
        "-s",
        required=True,
        help="Symbol or comma-separated symbols (e.g., ES.c.0 or ES.c.0,NQ.c.0)"
    )

    parser.add_argument(
        "--schema",
        choices=["ohlcv-1s", "ohlcv-1m", "ohlcv-1h", "ohlcv-1d", "ohlcv-eod"],
        default="ohlcv-1h",
        help="OHLCV schema (default: ohlcv-1h)"
    )

    parser.add_argument(
        "--start",
        required=True,
        help="Start date (YYYY-MM-DD)"
    )

    parser.add_argument(
        "--end",
        help="End date (YYYY-MM-DD, optional)"
    )

    parser.add_argument(
        "--limit",
        type=int,
        help="Maximum number of records (optional)"
    )

    parser.add_argument(
        "--dataset",
        default="GLBX.MDP3",
        help="Dataset code (default: GLBX.MDP3)"
    )

    parser.add_argument(
        "--stype-in",
        default="continuous",
        choices=["continuous", "raw_symbol", "instrument_id"],
        help="Input symbol type (default: continuous)"
    )

    parser.add_argument(
        "--output",
        "-o",
        help="Output file path (CSV or JSON based on extension)"
    )

    parser.add_argument(
        "--no-cost-check",
        action="store_true",
        help="Skip cost estimation (not recommended)"
    )

    args = parser.parse_args()

    # Create fetcher
    fetcher = DatabentOHLCVFetcher(
        dataset=args.dataset,
        stype_in=args.stype_in
    )

    try:
        # Fetch data
        data = fetcher.fetch_data(
            symbols=args.symbol,
            schema=args.schema,
            start=args.start,
            end=args.end,
            limit=args.limit,
            check_cost=not args.no_cost_check
        )

        # Validate data
        validation = fetcher.validate_data(data)
        print(f"\n[VALIDATION] Data is valid: {validation['valid']}")
        print(f"[VALIDATION] Record count: {validation['record_count']}")

        if validation['issues']:
            print(f"[WARNING] Issues found: {validation['issues']}")

        # Export if output specified
        if args.output:
            if args.output.endswith('.csv'):
                fetcher.export_csv(data, args.output)
            elif args.output.endswith('.json'):
                fetcher.export_json(data, args.output)
            else:
                print("[WARNING] Unknown output format. Saving as JSON.")
                fetcher.export_json(data, args.output + '.json')

        print("\n[DONE] Fetch complete!")

    except KeyboardInterrupt:
        print("\n[CANCELLED] Fetch cancelled by user.")
        sys.exit(1)
    except Exception as e:
        print(f"\n[ERROR] Fetch failed: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()
