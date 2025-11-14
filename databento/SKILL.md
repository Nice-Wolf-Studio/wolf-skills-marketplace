---
name: databento
description: Professional market data analysis using Databento API for ES/NQ futures. Use when fetching market data, analyzing futures, performing backtests, or working with order flow. Provides essential schema/symbology knowledge, MCP tool guidance, and reusable data fetching patterns to eliminate repeated documentation lookups.
---

# Databento - ES/NQ Futures Market Data Analysis

## Overview

Use the databento skill for ES/NQ futures analysis with the Databento market data platform. The skill provides immediate access to critical reference information (schemas, symbology, datasets) and reusable code patterns to eliminate repeated documentation lookups and API usage errors.

**Primary focus:** ES (E-mini S&P 500) and NQ (E-mini Nasdaq-100) futures analysis
**Secondary focus:** Equity market breadth indicators when supporting futures analysis
**Priority 1:** Knowledge and workflows to prevent wasted cycles
**Priority 2:** Reusable scripts for common data operations

## When to Use This Skill

Trigger this skill when:
- User mentions ES, NQ, or futures analysis
- User asks to fetch market data or historical prices
- User wants to backtest a trading strategy
- User asks about databento schemas, datasets, or symbology
- User needs order flow or market microstructure analysis
- About to use any `mcp__databento__*` MCP tool

## Mandatory Workflow: The Four Steps

Follow these four steps for EVERY data request to avoid wasted cycles and errors:

### Step 1: Check Cost BEFORE Fetching
**Always** estimate cost before any data request using `mcp__databento__metadata_get_cost`.

Parameters needed:
- dataset (e.g., "GLBX.MDP3")
- start date (YYYY-MM-DD)
- end date (optional)
- symbols (e.g., "ES.c.0")
- schema (e.g., "ohlcv-1h")

This prevents unexpected charges and helps optimize data requests.

### Step 2: Validate Dataset Availability
Check that data exists for your requested date range using `mcp__databento__metadata_get_dataset_range`.

Parameters needed:
- dataset (e.g., "GLBX.MDP3")

This returns the available date range so you don't request data that doesn't exist.

### Step 3: Fetch Data Appropriately
Choose the right tool based on data size:

**For small/quick requests (< 5GB, typically < 1 day tick data):**
- Use `mcp__databento__timeseries_get_range`
- Default limit: 100 records (use limit parameter to adjust)
- Returns data directly in response

**For large requests (> 5GB, multi-day tick data):**
- Use `mcp__databento__batch_submit_job`
- Poll status with `mcp__databento__batch_list_jobs`
- Download with `mcp__databento__batch_download`

### Step 4: Validate Data Post-Fetch
After receiving data, always validate:
- Check for timestamp gaps
- Verify expected record counts
- Validate price ranges (no negative prices, no extreme outliers)
- Check for duplicate timestamps

Use `scripts/validate_data.py` for automated validation.

## Quick Reference: Essential Information

### Primary Dataset
**GLBX.MDP3** - CME Globex MDP 3.0 (for ES/NQ futures)

### Common Schemas

| Schema | Description | When to Use | Typical Limit |
|--------|-------------|-------------|---------------|
| `ohlcv-1h` | 1-hour OHLCV bars | Multi-day backtesting | 100 bars |
| `ohlcv-1d` | Daily OHLCV bars | Long-term analysis | 100 bars |
| `trades` | Individual trades | Intraday analysis, order flow | Use batch for > 1 day |
| `mbp-1` | Top of book (L1) | Bid/ask spread, microstructure | Use batch for > 1 day |
| `mbp-10` | 10 levels of depth (L2) | Order book analysis | Use batch for > 1 day |

### ES/NQ Symbol Patterns

| Symbol | Description | Example Use Case |
|--------|-------------|------------------|
| `ES.c.0` | ES front month continuous (calendar roll) | Standard backtesting |
| `NQ.c.0` | NQ front month continuous (calendar roll) | Standard backtesting |
| `ES.n.0` | ES front month (open interest roll) | Avoiding roll timing issues |
| `ESH5` | Specific contract (Mar 2025) | Analyzing specific expiration |
| `ES.c.1` | ES second month continuous | Spread analysis |

**Roll Strategies:**
- `.c.X` = Calendar-based roll (switches on fixed dates)
- `.n.X` = Open interest-based roll (switches when OI moves)
- `.v.X` = Volume-based roll (switches when volume moves)

### Common Symbology Types (stypes)

| Stype | Description | When to Use |
|-------|-------------|-------------|
| `raw_symbol` | Native exchange symbol | When you have exact contract codes |
| `instrument_id` | Databento's numeric ID | After symbol resolution |
| `continuous` | Continuous contract notation | For backtesting across rolls |
| `parent` | Parent contract symbol | For options or complex instruments |

## MCP Tool Selection Guide

### For Current/Live Data

**Get current ES/NQ quote:**
```
mcp__databento__get_futures_quote
- symbol: "ES" or "NQ"
```

**Get current trading session:**
```
mcp__databento__get_session_info
- timestamp: (optional, defaults to now)
```

**Get recent historical bars:**
```
mcp__databento__get_historical_bars
- symbol: "ES" or "NQ"
- timeframe: "1h", "H4", or "1d"
- count: number of bars (max 100)
```

### For Historical Data Analysis

**Timeseries (< 5GB, direct response):**
```
mcp__databento__timeseries_get_range
- dataset: "GLBX.MDP3"
- symbols: "ES.c.0,NQ.c.0" (comma-separated, max 2000)
- schema: "ohlcv-1h", "trades", "mbp-1", etc.
- start: "2024-01-01" (YYYY-MM-DD or ISO 8601)
- end: "2024-01-31" (optional)
- limit: number of records (optional)
```

**Batch Download (> 5GB, async processing):**
```
mcp__databento__batch_submit_job
- dataset: "GLBX.MDP3"
- symbols: ["ES.c.0", "NQ.c.0"] (array, max 2000)
- schema: "trades", "mbp-1", etc.
- start: "2024-01-01"
- end: "2024-12-31"
- encoding: "dbn" (native), "csv", or "json"
- compression: "zstd" (default), "gzip", or "none"
```

Then monitor with `mcp__databento__batch_list_jobs` and download with `mcp__databento__batch_download`.

### For Symbol Resolution

**Resolve symbols between types:**
```
mcp__databento__symbology_resolve
- dataset: "GLBX.MDP3"
- symbols: ["ES.c.0", "NQ.c.0"]
- stype_in: "continuous" (input type)
- stype_out: "instrument_id" (output type)
- start_date: "2024-01-01"
- end_date: "2024-12-31" (optional)
```

### For Metadata Discovery

**List available schemas:**
```
mcp__databento__metadata_list_schemas
- dataset: "GLBX.MDP3"
```

**Get dataset date range:**
```
mcp__databento__metadata_get_dataset_range
- dataset: "GLBX.MDP3"
```

**Estimate cost:**
```
mcp__databento__metadata_get_cost
- dataset: "GLBX.MDP3"
- start: "2024-01-01"
- end: "2024-01-31" (optional)
- symbols: "ES.c.0"
- schema: "ohlcv-1h"
```

## Common Mistakes to Avoid

1. **Skipping cost check** - Always check cost before fetching data
2. **Using timeseries for large data** - Use batch jobs for > 1 day of tick/trade data
3. **Wrong stype_in** - When using continuous contracts, specify `stype_in: "continuous"`
4. **Assuming data exists** - Always validate dataset range before requesting
5. **Not validating post-fetch** - Always check for gaps and data quality issues
6. **Incorrect date format** - Use "YYYY-MM-DD" or ISO 8601 format
7. **Exceeding limits** - Timeseries has default 100 record limit, adjust with limit parameter

## Analysis Workflow Patterns

### Historical Backtesting (OHLCV)
1. Check cost for date range
2. Fetch OHLCV data (1h, 4h, or 1d timeframe)
3. Validate data completeness
4. Perform analysis
5. Consider using `scripts/fetch_ohlcv.py` for standard pattern

**Typical request:**
- Schema: `ohlcv-1h` or `ohlcv-1d`
- Symbols: `ES.c.0` or `NQ.c.0`
- Limit: 100 bars per request (adjust as needed)

### Intraday Order Flow Analysis
1. Check cost (important for tick data!)
2. Use batch job for multi-day tick data
3. Fetch trades or mbp-1 schema
4. Filter by trading session if needed (use `scripts/session_filter.py`)
5. Validate tick data completeness

**Typical request:**
- Schema: `trades` or `mbp-1`
- Use batch download for > 1 day of data
- Consider session filtering for session-specific analysis

### Cross-Market Analysis (ES/NQ + Equities)
1. Fetch ES/NQ data from GLBX.MDP3
2. Fetch equity breadth from XNAS.ITCH (Nasdaq dataset)
3. Align timestamps for correlation
4. Perform cross-market analysis

**Datasets needed:**
- GLBX.MDP3 (ES/NQ futures)
- XNAS.ITCH (Nasdaq equities)

## Reference Files

Load these reference files as needed for detailed information:

### references/schemas.md
Comprehensive field-level documentation for all schemas (trades, mbp-1, ohlcv).

**Load when:** Need to understand specific fields, data types, or schema structure.

### references/symbology.md
Detailed symbology guide with continuous contracts, roll strategies, and expiration handling.

**Load when:** Working with continuous contracts, need to understand roll timing, or resolving symbol types.

### references/api-parameters.md
Complete parameter reference for all MCP tools with enum values and format requirements.

**Load when:** Uncertain about parameter formats, enum values, or tool-specific requirements.

### references/cost-optimization.md
Strategies for minimizing costs including T+1 data usage and batch optimization.

**Load when:** Working with large datasets or need to optimize data costs.

## Reusable Scripts

### scripts/fetch_ohlcv.py
Standard pattern for fetching OHLCV data with built-in cost checks, error handling, and validation.

**Use when:** Fetching OHLCV bars for backtesting or analysis.

**Features:**
- Automatic cost estimation before fetch
- Error handling with retries
- Post-fetch data validation
- Export to CSV/pandas options

### scripts/validate_data.py
Data quality validation to catch issues early.

**Use when:** After fetching any market data.

**Features:**
- Timestamp gap detection
- Record count verification
- Price range validation
- Summary quality report

### scripts/session_filter.py
Filter data by trading session (Asian/London/NY).

**Use when:** Performing session-specific analysis.

**Features:**
- Session detection using get_session_info
- Historical data filtering by session
- Session transition handling
- Session-specific statistics

## Best Practices

1. **Always check cost first** - Prevents surprises and helps optimize requests
2. **Use continuous contracts for backtesting** - Avoids roll gaps in analysis
3. **Validate data quality** - Catch issues before running analysis
4. **Use batch jobs for large data** - More efficient for > 5GB requests
5. **Cache reusable data** - Don't re-fetch the same data repeatedly
6. **Consider T+1 data** - Historical data (24+ hours old) has lower costs
7. **Use appropriate schema** - Match schema granularity to analysis needs
8. **Filter by session when relevant** - Session-based patterns are important for ES/NQ
