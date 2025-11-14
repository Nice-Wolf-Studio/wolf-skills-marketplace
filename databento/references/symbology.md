# Databento Symbology Reference

Comprehensive guide to Databento's symbology system including continuous contracts, symbol types, and resolution strategies.

## Symbol Types (stypes)

Databento supports multiple symbology naming conventions. Use `mcp__databento__symbology_resolve` to convert between types.

### raw_symbol
Native exchange symbols as provided by the venue.

**Examples:**
- `ESH5` - ES March 2025 contract
- `NQM5` - NQ June 2025 contract
- `AAPL` - Apple Inc. stock
- `SPY` - SPDR S&P 500 ETF

**When to use:**
- Working with specific contract months
- Exact symbol from exchange documentation
- Historical analysis of specific expirations

**Limitations:**
- Requires knowing exact contract codes
- Different venues use different conventions
- Doesn't handle roll automatically

### instrument_id
Databento's internal numeric identifier for each instrument.

**Examples:**
- `123456789` - Unique ID for ESH5
- `987654321` - Unique ID for NQM5

**When to use:**
- After symbol resolution
- Internally within Databento system
- When guaranteed uniqueness is required

**Benefits:**
- Globally unique across all venues
- Never changes for a given instrument
- Most efficient for API requests

**Limitations:**
- Not human-readable
- Requires resolution step to obtain

### continuous
Continuous contract notation with automatic rolling for futures.

**Format:** `{ROOT}.{STRATEGY}.{OFFSET}`

**Examples:**
- `ES.c.0` - ES front month, calendar roll
- `NQ.n.0` - NQ front month, open interest roll
- `ES.v.1` - ES second month, volume roll
- `GC.c.0` - Gold front month, calendar roll

**When to use:**
- Backtesting across multiple expirations
- Avoiding roll gaps in analysis
- Long-term continuous price series

**Benefits:**
- Automatic roll handling
- Consistent symbology across time
- Ideal for backtesting

### parent
Parent contract symbols for options or complex instruments.

**Examples:**
- `ES` - Parent for all ES contracts
- `NQ` - Parent for all NQ contracts

**When to use:**
- Options underlying symbols
- Querying all contracts in a family
- Getting contract family metadata

## Continuous Contract Deep Dive

Continuous contracts are the most powerful feature for futures analysis. They automatically handle contract rolls using different strategies.

### Roll Strategies

#### Calendar Roll (.c.X)
Rolls on fixed calendar dates regardless of market activity.

**Notation:** `ES.c.0`, `NQ.c.1`

**Roll Timing:**
- ES: Rolls 8 days before contract expiration
- NQ: Rolls 8 days before contract expiration

**When to use:**
- Standard backtesting
- Most predictable roll schedule
- When roll timing is less critical

**Pros:**
- Predictable roll dates
- Consistent across instruments
- Simple to understand

**Cons:**
- May roll during low liquidity
- Doesn't consider market dynamics

#### Open Interest Roll (.n.X)
Rolls when open interest moves to the next contract.

**Notation:** `ES.n.0`, `NQ.n.1`

**Roll Timing:**
- Switches when next contract's OI > current contract's OI

**When to use:**
- Avoiding early rolls
- Following market participants
- When market dynamics matter

**Pros:**
- Follows market behavior
- Natural transition point
- Avoids artificial timing

**Cons:**
- Less predictable timing
- Can be delayed during low volume
- Different instruments roll at different times

#### Volume Roll (.v.X)
Rolls when trading volume moves to the next contract.

**Notation:** `ES.v.0`, `NQ.v.1`

**Roll Timing:**
- Switches when next contract's volume > current contract's volume

**When to use:**
- Following most liquid contract
- High-frequency analysis
- When execution quality matters

**Pros:**
- Always in most liquid contract
- Best for execution
- Real-time liquidity tracking

**Cons:**
- Most variable timing
- Can switch back and forth
- Requires careful validation

### Offset Parameter (.X)

The offset determines which contract month in the series.

| Offset | Description | Example Usage |
|--------|-------------|---------------|
| `.0` | Front month | Primary trading contract |
| `.1` | Second month | Spread analysis vs front |
| `.2` | Third month | Deferred spread analysis |
| `.3+` | Further months | Calendar spread strategies |

**Common Patterns:**
- `ES.c.0` - Standard ES continuous (front month)
- `ES.c.0,ES.c.1` - ES calendar spread (front vs back)
- `ES.c.0,NQ.c.0` - ES/NQ pair analysis

## ES/NQ Specific Symbology

### ES (E-mini S&P 500)

**Contract Months:** H (Mar), M (Jun), U (Sep), Z (Dec)

**Raw Symbol Format:** `ES{MONTH}{YEAR}`
- `ESH5` = March 2025
- `ESM5` = June 2025
- `ESU5` = September 2025
- `ESZ5` = December 2025

**Continuous Contracts:**
- `ES.c.0` - Front month (most common)
- `ES.n.0` - OI-based front month
- `ES.v.0` - Volume-based front month

**Tick Size:** 0.25 points ($12.50 per tick)
**Contract Multiplier:** $50 per point
**Trading Hours:** Nearly 24 hours (Sunday 6pm - Friday 5pm ET)

### NQ (E-mini Nasdaq-100)

**Contract Months:** H (Mar), M (Jun), U (Sep), Z (Dec)

**Raw Symbol Format:** `NQ{MONTH}{YEAR}`
- `NQH5` = March 2025
- `NQM5` = June 2025
- `NQU5` = September 2025
- `NQZ5` = December 2025

**Continuous Contracts:**
- `NQ.c.0` - Front month (most common)
- `NQ.n.0` - OI-based front month
- `NQ.v.0` - Volume-based front month

**Tick Size:** 0.25 points ($5.00 per tick)
**Contract Multiplier:** $20 per point
**Trading Hours:** Nearly 24 hours (Sunday 6pm - Friday 5pm ET)

### Month Codes Reference

| Code | Month | Typical Expiration |
|------|-------|-------------------|
| F | January | 3rd Friday |
| G | February | 3rd Friday |
| H | March | 3rd Friday |
| J | April | 3rd Friday |
| K | May | 3rd Friday |
| M | June | 3rd Friday |
| N | July | 3rd Friday |
| Q | August | 3rd Friday |
| U | September | 3rd Friday |
| V | October | 3rd Friday |
| X | November | 3rd Friday |
| Z | December | 3rd Friday |

**Note:** ES/NQ only trade quarterly contracts (H, M, U, Z).

## Symbol Resolution

Use `mcp__databento__symbology_resolve` to convert between symbol types.

### Common Resolution Patterns

**Continuous to Instrument ID:**
```
Input: ES.c.0
stype_in: continuous
stype_out: instrument_id
Result: Maps to current front month's instrument_id
```

**Raw Symbol to Instrument ID:**
```
Input: ESH5
stype_in: raw_symbol
stype_out: instrument_id
Result: Specific instrument_id for ESH5
```

**Continuous to Raw Symbol:**
```
Input: ES.c.0
stype_in: continuous
stype_out: raw_symbol
Result: Current front month symbol (e.g., ESH5)
```

### Time-Based Resolution

Symbol resolution is **date-dependent**. The same continuous contract resolves to different instruments across time.

**Example:**
- `ES.c.0` on 2024-01-15 → ESH4 (March 2024)
- `ES.c.0` on 2024-04-15 → ESM4 (June 2024)
- `ES.c.0` on 2024-07-15 → ESU4 (September 2024)

**Important:** Always specify `start_date` and `end_date` when resolving symbols for historical analysis.

### Resolution Parameters

```
mcp__databento__symbology_resolve
- dataset: "GLBX.MDP3"
- symbols: ["ES.c.0", "NQ.c.0"]
- stype_in: "continuous"
- stype_out: "instrument_id"
- start_date: "2024-01-01"
- end_date: "2024-12-31"
```

Returns mapping of continuous symbols to instrument IDs for each day in the range.

## Expiration Handling

### Roll Dates

ES/NQ contracts expire on the **3rd Friday of the contract month** at 9:30 AM ET.

**Calendar Roll (.c.0) Schedule:**
- Rolls **8 days before expiration**
- Always rolls on the same relative day
- Predictable for backtesting

**Example for ESH5 (March 2025):**
- Expiration: Friday, March 21, 2025
- Calendar roll: March 13, 2025 (8 days before)

### Roll Detection

To detect when a continuous contract rolled, compare instrument_id or raw_symbol across consecutive timestamps.

**Example:**
```
2024-03-12: ES.c.0 → ESH4
2024-03-13: ES.c.0 → ESM4 (rolled!)
```

### Handling Roll Gaps

Price discontinuities often occur at roll:

**Gap Detection:**
```
if abs(close_before_roll - open_after_roll) > threshold:
    # Roll gap detected
```

**Adjustment Strategies:**
1. **Ratio Adjustment:** Multiply historical prices by ratio
2. **Difference Adjustment:** Add/subtract difference
3. **No Adjustment:** Keep raw prices (most common for futures)

For ES/NQ futures, **no adjustment** is standard since contracts are similar.

## Symbol Validation

### Valid Symbol Patterns

**Continuous:**
- Must match: `{ROOT}.{c|n|v}.{0-9+}`
- Examples: `ES.c.0`, `NQ.n.1`, `GC.v.0`

**Raw Symbols (Futures):**
- Must match: `{ROOT}{MONTH_CODE}{YEAR}`
- Examples: `ESH5`, `NQZ4`, `GCM6`

**Equity Symbols:**
- 1-5 uppercase letters
- Examples: `AAPL`, `MSFT`, `SPY`, `GOOGL`

### Symbol Existence Validation

Before using a symbol, validate it exists in the dataset:

1. Use `mcp__databento__symbology_resolve` to resolve
2. Use `mcp__databento__reference_search_securities` for metadata
3. Check definition schema for instrument details

## Common Symbol Pitfalls

### 1. Wrong stype_in for Continuous Contracts
**Wrong:**
```
symbols: "ES.c.0"
stype_in: "raw_symbol"  # WRONG!
```

**Correct:**
```
symbols: "ES.c.0"
stype_in: "continuous"  # CORRECT
```

### 2. Forgetting Date Range for Resolution
**Wrong:**
```
symbology_resolve(symbols=["ES.c.0"], start_date="2024-01-01")
# Missing end_date - only resolves for one day
```

**Correct:**
```
symbology_resolve(symbols=["ES.c.0"], start_date="2024-01-01", end_date="2024-12-31")
# Resolves for entire year
```

### 3. Using Expired Contracts
**Wrong:**
```
# ESH4 expired in March 2024
symbols: "ESH4"
start_date: "2024-06-01"  # After expiration!
```

**Correct:**
```
# Use continuous contract
symbols: "ES.c.0"
start_date: "2024-06-01"  # Automatically maps to ESM4
```

### 4. Mixing Symbol Types
**Wrong:**
```
symbols: "ES.c.0,ESH5,123456"  # Mixed types!
```

**Correct:**
```
# Resolve separately or use same type
symbols: "ES.c.0,NQ.c.0"  # All continuous
```

## Symbol Best Practices

1. **Use continuous contracts for backtesting** - Avoids manual roll management
2. **Prefer calendar rolls (.c.X) unless specific reason** - Most predictable
3. **Always validate symbols exist** - Use symbology_resolve before fetching data
4. **Specify date ranges for resolution** - Symbol meanings change over time
5. **Use instrument_id after resolution** - Most efficient for API calls
6. **Document roll strategy** - Know which roll type (.c/.n/.v) you're using
7. **Test around roll dates** - Verify behavior during contract transitions
8. **Cache symbol mappings** - Don't re-resolve repeatedly

## Quick Reference: Common Symbols

### ES/NQ Continuous (Most Common)
```
ES.c.0  # ES front month, calendar roll
NQ.c.0  # NQ front month, calendar roll
ES.c.1  # ES second month
NQ.c.1  # NQ second month
```

### ES/NQ Specific Contracts (2025)
```
ESH5  # ES March 2025
ESM5  # ES June 2025
ESU5  # ES September 2025
ESZ5  # ES December 2025

NQH5  # NQ March 2025
NQM5  # NQ June 2025
NQU5  # NQ September 2025
NQZ5  # NQ December 2025
```

### Equity Market Breadth (Supporting ES/NQ Analysis)
```
SPY   # SPDR S&P 500 ETF
QQQ   # Invesco QQQ (Nasdaq-100 ETF)
VIX   # CBOE Volatility Index
TICK  # NYSE TICK
VOLD  # NYSE Volume Delta
```

For equity symbols, use dataset `XNAS.ITCH` (Nasdaq) or other appropriate equity dataset.
