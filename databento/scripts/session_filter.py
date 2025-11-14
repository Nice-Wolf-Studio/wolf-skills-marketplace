#!/usr/bin/env python3
"""
Databento Trading Session Filter

Filter market data by trading session (Asian/London/NY):
- Session detection using get_session_info
- Historical data filtering by session
- Session transition handling
- Session-specific statistics

Usage:
    python session_filter.py --input data.json --session NY --output ny_session.json
    python session_filter.py --input data.json --session London --stats
    python session_filter.py --input data.json --sessions Asian,London --output combined.json
"""

import argparse
import json
import sys
from datetime import datetime, timezone, timedelta
from typing import Dict, List, Any, Optional, Tuple
from enum import Enum


class TradingSession(Enum):
    """Trading session definitions (in ET)."""
    ASIAN = ("Asian", 18, 2)      # 6pm - 2am ET
    LONDON = ("London", 2, 8)     # 2am - 8am ET
    NY = ("NY", 8, 16)            # 8am - 4pm ET


class SessionFilter:
    """Filters Databento market data by trading session."""

    def __init__(self):
        """Initialize session filter."""
        self.sessions = {
            "Asian": TradingSession.ASIAN,
            "London": TradingSession.LONDON,
            "NY": TradingSession.NY
        }

    def get_current_session(self, timestamp: Optional[str] = None) -> str:
        """
        Get trading session for a timestamp.

        Args:
            timestamp: ISO timestamp (optional, defaults to now)

        Returns:
            Session name (Asian, London, or NY)
        """
        # NOTE: In actual usage, this would call:
        # session_info = mcp__databento__get_session_info(timestamp=timestamp)
        # return session_info["session"]

        # For this template, simulate session detection
        if timestamp:
            dt = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
        else:
            dt = datetime.now(timezone.utc)

        # Convert to ET
        et_hour = (dt.hour - 5) % 24  # Simplified ET conversion

        # Determine session
        if 18 <= et_hour or et_hour < 2:
            return "Asian"
        elif 2 <= et_hour < 8:
            return "London"
        else:
            return "NY"

    def is_in_session(
        self,
        timestamp_ns: int,
        session: TradingSession
    ) -> bool:
        """
        Check if timestamp falls within trading session.

        Args:
            timestamp_ns: Timestamp in nanoseconds
            session: Trading session to check

        Returns:
            True if timestamp is in session
        """
        # Convert nanoseconds to datetime
        ts_seconds = timestamp_ns / 1_000_000_000
        dt = datetime.fromtimestamp(ts_seconds, tz=timezone.utc)

        # Convert to ET (simplified, doesn't handle DST)
        et_offset = timedelta(hours=-5)
        dt_et = dt + et_offset

        hour = dt_et.hour

        # Check if hour falls within session
        _, start_hour, end_hour = session.value

        if start_hour < end_hour:
            # Session doesn't cross midnight
            return start_hour <= hour < end_hour
        else:
            # Session crosses midnight (Asian session)
            return hour >= start_hour or hour < end_hour

    def filter_by_session(
        self,
        data: List[Dict[str, Any]],
        sessions: List[str]
    ) -> List[Dict[str, Any]]:
        """
        Filter data to include only specified sessions.

        Args:
            data: List of records
            sessions: List of session names to include

        Returns:
            Filtered data
        """
        print(f"[FILTER] Filtering {len(data)} records for sessions: {', '.join(sessions)}")

        session_enums = [self.sessions[s] for s in sessions]
        filtered = []

        for record in data:
            # Extract timestamp
            ts_ns = record.get("ts_event") or record.get("ts_recv") or record.get("timestamp")

            if not ts_ns:
                continue

            # Check if in any of the specified sessions
            for session in session_enums:
                if self.is_in_session(int(ts_ns), session):
                    filtered.append(record)
                    break

        print(f"[FILTER] Kept {len(filtered)} records ({len(filtered)/len(data)*100:.1f}%)")
        return filtered

    def calculate_session_stats(
        self,
        data: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Calculate statistics by trading session.

        Args:
            data: List of records

        Returns:
            Session statistics
        """
        print(f"[STATS] Calculating session statistics for {len(data)} records...")

        stats = {
            "Asian": {"count": 0, "volume": 0, "trades": 0},
            "London": {"count": 0, "volume": 0, "trades": 0},
            "NY": {"count": 0, "volume": 0, "trades": 0}
        }

        for record in data:
            ts_ns = record.get("ts_event") or record.get("ts_recv") or record.get("timestamp")

            if not ts_ns:
                continue

            # Determine session
            for session_name, session_enum in self.sessions.items():
                if self.is_in_session(int(ts_ns), session_enum):
                    stats[session_name]["count"] += 1

                    # Add volume if available
                    if "volume" in record:
                        stats[session_name]["volume"] += record["volume"]

                    # Count trades
                    if "size" in record:  # Trade record
                        stats[session_name]["trades"] += 1

                    break

        # Calculate percentages
        total_count = sum(s["count"] for s in stats.values())
        for session_stats in stats.values():
            if total_count > 0:
                session_stats["percentage"] = (session_stats["count"] / total_count) * 100
            else:
                session_stats["percentage"] = 0

        return stats

    def filter_session_transitions(
        self,
        data: List[Dict[str, Any]],
        minutes_before: int = 30,
        minutes_after: int = 30
    ) -> List[Dict[str, Any]]:
        """
        Filter data to include only session transitions (handoffs).

        Args:
            data: List of records
            minutes_before: Minutes before transition to include
            minutes_after: Minutes after transition to include

        Returns:
            Filtered data around session transitions
        """
        print(f"[FILTER] Extracting session transitions ({minutes_before}m before, {minutes_after}m after)...")

        # Session transition times (in ET)
        transitions = [
            2,   # Asian → London (2am ET)
            8,   # London → NY (8am ET)
            16,  # NY → Post-market
            18,  # Post-market → Asian (6pm ET)
        ]

        filtered = []
        transition_window = timedelta(minutes=minutes_before + minutes_after)

        for record in data:
            ts_ns = record.get("ts_event") or record.get("ts_recv") or record.get("timestamp")

            if not ts_ns:
                continue

            # Convert to ET hour
            ts_seconds = int(ts_ns) / 1_000_000_000
            dt = datetime.fromtimestamp(ts_seconds, tz=timezone.utc)
            et_offset = timedelta(hours=-5)
            dt_et = dt + et_offset

            # Check if near any transition
            for transition_hour in transitions:
                transition_dt = dt_et.replace(hour=transition_hour, minute=0, second=0, microsecond=0)

                # Calculate time difference
                time_diff = abs((dt_et - transition_dt).total_seconds())

                # Include if within window
                if time_diff <= transition_window.total_seconds():
                    filtered.append(record)
                    break

        print(f"[FILTER] Found {len(filtered)} records near session transitions")
        return filtered

    def print_session_stats(self, stats: Dict[str, Any]):
        """Print session statistics to console."""
        print("\n" + "=" * 60)
        print("SESSION STATISTICS")
        print("=" * 60)

        for session_name in ["Asian", "London", "NY"]:
            session_stats = stats[session_name]
            print(f"\n{session_name} Session:")
            print(f"  Records: {session_stats['count']:,} ({session_stats['percentage']:.1f}%)")
            if session_stats['volume'] > 0:
                print(f"  Volume: {session_stats['volume']:,}")
            if session_stats['trades'] > 0:
                print(f"  Trades: {session_stats['trades']:,}")

        print("\n" + "=" * 60)


def main():
    """Main entry point for CLI usage."""
    parser = argparse.ArgumentParser(
        description="Filter Databento data by trading session"
    )

    parser.add_argument(
        "--input",
        "-i",
        required=True,
        help="Input data file (JSON)"
    )

    parser.add_argument(
        "--session",
        "--sessions",
        help="Session(s) to filter (Asian, London, NY). Comma-separated for multiple."
    )

    parser.add_argument(
        "--transitions",
        action="store_true",
        help="Filter for session transition periods only"
    )

    parser.add_argument(
        "--minutes-before",
        type=int,
        default=30,
        help="Minutes before transition (default: 30)"
    )

    parser.add_argument(
        "--minutes-after",
        type=int,
        default=30,
        help="Minutes after transition (default: 30)"
    )

    parser.add_argument(
        "--stats",
        action="store_true",
        help="Calculate and display session statistics"
    )

    parser.add_argument(
        "--output",
        "-o",
        help="Output file for filtered data (JSON)"
    )

    args = parser.parse_args()

    # Load data
    print(f"[LOAD] Loading data from {args.input}...")
    with open(args.input, 'r') as f:
        data = json.load(f)

    # Handle different data formats
    if isinstance(data, dict) and "data" in data:
        data = data["data"]

    # Create filter
    session_filter = SessionFilter()

    # Calculate stats if requested
    if args.stats:
        stats = session_filter.calculate_session_stats(data)
        session_filter.print_session_stats(stats)

    # Filter data
    filtered_data = data

    if args.transitions:
        # Filter for session transitions
        filtered_data = session_filter.filter_session_transitions(
            filtered_data,
            minutes_before=args.minutes_before,
            minutes_after=args.minutes_after
        )
    elif args.session:
        # Filter by specific session(s)
        sessions = [s.strip() for s in args.session.split(',')]

        # Validate sessions
        for session in sessions:
            if session not in ["Asian", "London", "NY"]:
                print(f"[ERROR] Invalid session: {session}")
                print("[ERROR] Valid sessions: Asian, London, NY")
                sys.exit(1)

        filtered_data = session_filter.filter_by_session(filtered_data, sessions)

    # Save filtered data if output specified
    if args.output:
        print(f"\n[SAVE] Saving {len(filtered_data)} filtered records to {args.output}...")

        output_data = {
            "data": filtered_data,
            "metadata": {
                "original_count": len(data),
                "filtered_count": len(filtered_data),
                "filter_type": "transitions" if args.transitions else "sessions",
                "sessions": args.session.split(',') if args.session else None
            }
        }

        with open(args.output, 'w') as f:
            json.dump(output_data, f, indent=2)

        print(f"[SUCCESS] Filtered data saved!")

    print("\n[DONE] Session filtering complete!")


if __name__ == "__main__":
    main()
