# Databento API Parameters Reference

Complete parameter reference for all Databento MCP tools with accepted values, formats, and requirements.

## Date and Time Formats

### Date Format
**Accepted formats:**
- `YYYY-MM-DD` (e.g., "2024-01-15")
- ISO 8601 with time (e.g., "2024-01-15T14:30:00Z")

**Important:**
- Dates are in UTC timezone
- Inclusive for `start`, exclusive for `end`
- Time portion is optional

### Timestamp Format
**Accepted formats:**
- ISO 8601 string: "2024-01-15T14:30:00Z"
- Unix timestamp (seconds): 1705329000
- Unix timestamp (nanoseconds): 1705329000000000000

## Schema Parameter

Valid schema values for historical data requests.

### OHLCV Schemas
```
"ohlcv-1s"   # 1-second bars
"ohlcv-1m"   # 1-minute bars
"ohlcv-1h"   # 1-hour bars
"ohlcv-1d"   # Daily bars
"ohlcv-eod"  # End-of-day bars
```

### Trade and Quote Schemas
```
"trades"     # Individual trades
"mbp-1"      # Market by price - level 1 (top of book)
"mbp-10"     # Market by price - 10 levels of depth
"mbo"        # Market by order - level 3 (order-level)
"tbbo"       # Top of book best bid/offer
```

### Metadata Schemas
```
"definition"   # Instrument definitions and metadata
"statistics"   # Market statistics
"status"       # Trading status changes
"imbalance"    # Order imbalance data
```

**Usage:**
```python
# timeseries_get_range
schema="ohlcv-1h"

# batch_submit_job
schema="trades"
```

## Symbology Type (stype) Parameter

Used for symbol input and output format specification.

### stype_in (Input Symbol Type)

```
"raw_symbol"     # Native exchange symbols (ESH5, AAPL)
"instrument_id"  # Databento numeric IDs
"continuous"     # Continuous contracts (ES.c.0)
"parent"         # Parent symbols (ES, NQ)
"nasdaq"         # Nasdaq symbology
"cms"            # CMS symbology
"bats"           # BATS symbology
"smart"          # Smart routing symbols
```

### stype_out (Output Symbol Type)

Same values as `stype_in`.

**Common Patterns:**
```python
# Continuous to instrument_id (most common)
stype_in="continuous"
stype_out="instrument_id"

# Raw symbol to instrument_id
stype_in="raw_symbol"
stype_out="instrument_id"

# Continuous to raw symbol (see current contract)
stype_in="continuous"
stype_out="raw_symbol"
```

**Important:** Always match stype_in to your actual symbol format:
- `"ES.c.0"` → stype_in="continuous"
- `"ESH5"` → stype_in="raw_symbol"
- `123456` → stype_in="instrument_id"

## Dataset Parameter

Dataset codes identify the data source and venue.

### Common Datasets

**Futures (CME):**
```
"GLBX.MDP3"    # CME Globex - ES, NQ, and other CME futures
```

**Equities:**
```
"XNAS.ITCH"    # Nasdaq - all Nasdaq-listed stocks
"XNYS.PILLAR"  # NYSE - NYSE-listed stocks
"XCHI.PILLAR"  # Chicago Stock Exchange
"BATS.PITCH"   # BATS exchange
"IEXG.TOPS"    # IEX exchange
```

**Options:**
```
"OPRA.PILLAR"  # US equity options
```

**Crypto:**
```
"DBEQ.BASIC"   # Databento equities (subset)
```

**Usage:**
```python
# ES/NQ futures
dataset="GLBX.MDP3"

# Nasdaq equities
dataset="XNAS.ITCH"
```

## Symbols Parameter

### Format Variations

**String (comma-separated):**
```python
symbols="ES.c.0,NQ.c.0,GC.c.0"
```

**Array:**
```python
symbols=["ES.c.0", "NQ.c.0", "GC.c.0"]
```

**Single symbol:**
```python
symbols="ES.c.0"
# or
symbols=["ES.c.0"]
```

### Limits
- Maximum: 2000 symbols per request
- Must match stype_in format

### Symbol Wildcards

Some endpoints support wildcards:
```
"ES*"    # All ES contracts
"*"      # All instruments (use with caution)
```

## Encoding Parameter (Batch Jobs)

Output format for batch download jobs.

```
"dbn"    # Databento Binary (native format, most efficient)
"csv"    # Comma-separated values
"json"   # JSON format
```

**Recommendations:**
- `"dbn"` - Best for large datasets, fastest processing
- `"csv"` - Good for spreadsheet analysis
- `"json"` - Good for custom parsing, human-readable

**Usage:**
```python
# batch_submit_job
encoding="dbn"
```

## Compression Parameter (Batch Jobs)

Compression algorithm for batch downloads.

```
"zstd"   # Zstandard (default, best compression)
"gzip"   # Gzip (widely supported)
"none"   # No compression
```

**Recommendations:**
- `"zstd"` - Best compression ratio, fastest
- `"gzip"` - Good compatibility
- `"none"` - Only for small datasets or testing

**Usage:**
```python
# batch_submit_job
compression="zstd"
```

## Limit Parameter

Maximum number of records to return.

**Default:** 100 (varies by tool)
**Maximum:** No hard limit, but consider:
- Timeseries: practical limit ~10M records
- Batch jobs: unlimited but affects processing time

**Usage:**
```python
# timeseries_get_range
limit=1000  # Return up to 1000 records
```

**Important:** For large datasets, use batch jobs instead of increasing limit.

## Timeframe Parameter (get_historical_bars)

Specific to the `get_historical_bars` convenience tool.

```
"1h"   # 1-hour bars
"H4"   # 4-hour bars (alternative notation)
"1d"   # Daily bars
```

**Usage:**
```python
# get_historical_bars (ES/NQ only)
timeframe="1h"
count=100
```

## Symbol Parameter (get_futures_quote)

Specific to the `get_futures_quote` tool.

```
"ES"   # E-mini S&P 500
"NQ"   # E-mini Nasdaq-100
```

**Usage:**
```python
# get_futures_quote
symbol="ES"
```

**Note:** Uses root symbol only, not full contract code.

## Split Parameters (Batch Jobs)

Control how batch job output files are split.

### split_duration
```
"day"      # One file per day
"week"     # One file per week
"month"    # One file per month
"none"     # Single file (default)
```

### split_size
```
split_size=1000000000  # Split at 1GB
split_size=5000000000  # Split at 5GB
```

### split_symbols
```
split_symbols=True   # One file per symbol
split_symbols=False  # All symbols in same file (default)
```

**Usage:**
```python
# batch_submit_job
split_duration="day"      # Daily files
split_symbols=True        # Separate file per symbol
```

## Filter Parameters

### State Filter (list_jobs)
```
states=["received", "queued", "processing", "done", "expired"]
```

### Time Filter (list_jobs)
```
since="2024-01-01T00:00:00Z"  # Jobs since this timestamp
```

**Usage:**
```python
# batch_list_jobs
states=["done", "processing"]
since="2024-01-01"
```

## Mode Parameter (get_cost)

Query mode for cost estimation.

```
"historical"             # Historical data (default)
"historical-streaming"   # Streaming historical
"live"                   # Live data
```

**Usage:**
```python
# metadata_get_cost
mode="historical"
```

## Complete Parameter Examples

### timeseries_get_range
```python
{
    "dataset": "GLBX.MDP3",
    "symbols": "ES.c.0,NQ.c.0",
    "schema": "ohlcv-1h",
    "start": "2024-01-01",
    "end": "2024-01-31",
    "stype_in": "continuous",
    "stype_out": "instrument_id",
    "limit": 1000
}
```

### batch_submit_job
```python
{
    "dataset": "GLBX.MDP3",
    "symbols": ["ES.c.0", "NQ.c.0"],
    "schema": "trades",
    "start": "2024-01-01",
    "end": "2024-12-31",
    "stype_in": "continuous",
    "stype_out": "instrument_id",
    "encoding": "dbn",
    "compression": "zstd",
    "split_duration": "day",
    "split_symbols": False
}
```

### symbology_resolve
```python
{
    "dataset": "GLBX.MDP3",
    "symbols": ["ES.c.0", "NQ.c.0"],
    "stype_in": "continuous",
    "stype_out": "instrument_id",
    "start_date": "2024-01-01",
    "end_date": "2024-12-31"
}
```

### metadata_get_cost
```python
{
    "dataset": "GLBX.MDP3",
    "start": "2024-01-01",
    "end": "2024-01-31",
    "symbols": "ES.c.0",
    "schema": "ohlcv-1h",
    "stype_in": "continuous",
    "mode": "historical"
}
```

### get_futures_quote
```python
{
    "symbol": "ES"  # or "NQ"
}
```

### get_session_info
```python
{
    "timestamp": "2024-01-15T14:30:00Z"  # Optional
}
```

### get_historical_bars
```python
{
    "symbol": "ES",  # or "NQ"
    "timeframe": "1h",
    "count": 100
}
```

## Common Parameter Mistakes

### 1. Wrong stype_in for Symbol Format
**Wrong:**
```python
symbols="ES.c.0"
stype_in="raw_symbol"  # WRONG!
```

**Correct:**
```python
symbols="ES.c.0"
stype_in="continuous"
```

### 2. Date Format Errors
**Wrong:**
```python
start="01/15/2024"      # US date format - WRONG
start="15-01-2024"      # Non-ISO format - WRONG
```

**Correct:**
```python
start="2024-01-15"      # ISO format - CORRECT
```

### 3. Missing Required Parameters
**Wrong:**
```python
# metadata_get_cost
dataset="GLBX.MDP3"
start="2024-01-01"
# Missing symbols and schema!
```

**Correct:**
```python
dataset="GLBX.MDP3"
start="2024-01-01"
symbols="ES.c.0"
schema="ohlcv-1h"
```

### 4. Schema Typos
**Wrong:**
```python
schema="OHLCV-1H"       # Wrong case
schema="ohlcv-1hour"    # Wrong format
schema="ohlcv_1h"       # Wrong separator
```

**Correct:**
```python
schema="ohlcv-1h"       # Lowercase, hyphenated
```

### 5. Symbol Array vs String Confusion
**Wrong:**
```python
# batch_submit_job expects array
symbols="ES.c.0,NQ.c.0"  # WRONG for batch jobs
```

**Correct:**
```python
# batch_submit_job
symbols=["ES.c.0", "NQ.c.0"]  # CORRECT
```

### 6. Encoding/Compression Not Strings
**Wrong:**
```python
encoding=dbn        # Not a string
compression=zstd    # Not a string
```

**Correct:**
```python
encoding="dbn"
compression="zstd"
```

## Parameter Validation Checklist

Before making API calls, verify:

- [ ] Date format is YYYY-MM-DD or ISO 8601
- [ ] Dataset matches your data source (GLBX.MDP3 for ES/NQ)
- [ ] Schema is valid and lowercase
- [ ] stype_in matches symbol format
- [ ] Symbols parameter matches tool expectation (string vs array)
- [ ] All required parameters are present
- [ ] Enum values are exact strings (case-sensitive)
- [ ] start_date <= end_date
- [ ] limit is reasonable for dataset size

## Quick Reference: Required Parameters

### timeseries_get_range
**Required:** dataset, symbols, schema, start

**Optional:** end, stype_in, stype_out, limit

### batch_submit_job
**Required:** dataset, symbols, schema, start

**Optional:** end, stype_in, stype_out, encoding, compression, split_duration, split_size, split_symbols, limit

### symbology_resolve
**Required:** dataset, symbols, stype_in, stype_out, start_date

**Optional:** end_date

### metadata_get_cost
**Required:** dataset, start

**Optional:** end, symbols, schema, stype_in, mode

### get_futures_quote
**Required:** symbol

### get_session_info
**Optional:** timestamp

### get_historical_bars
**Required:** symbol, timeframe, count
