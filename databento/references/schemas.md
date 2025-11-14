# Databento Schema Reference

Comprehensive documentation of Databento schemas with field-level details, data types, and usage guidance.

## Schema Overview

Databento provides 12+ schema types representing different granularity levels of market data. All schemas share common timestamp fields for consistency.

## Common Fields (All Schemas)

Every schema includes these timestamp fields:

| Field | Type | Description | Unit |
|-------|------|-------------|------|
| `ts_event` | uint64 | Event timestamp from venue | Nanoseconds (Unix epoch) |
| `ts_recv` | uint64 | Databento gateway receipt time | Nanoseconds (Unix epoch) |

**Important:** Databento provides up to 4 timestamps per event for sub-microsecond accuracy.

## OHLCV Schemas

Candlestick/bar data at various time intervals.

### ohlcv-1s (1 Second Bars)
### ohlcv-1m (1 Minute Bars)
### ohlcv-1h (1 Hour Bars)
### ohlcv-1d (Daily Bars)
### ohlcv-eod (End of Day)

**Common OHLCV Fields:**

| Field | Type | Description | Unit |
|-------|------|-------------|------|
| `open` | int64 | Opening price | Fixed-point (divide by 1e9 for decimal) |
| `high` | int64 | Highest price | Fixed-point (divide by 1e9 for decimal) |
| `low` | int64 | Lowest price | Fixed-point (divide by 1e9 for decimal) |
| `close` | int64 | Closing price | Fixed-point (divide by 1e9 for decimal) |
| `volume` | uint64 | Total volume | Contracts/shares |

**When to Use:**
- **1h/1d**: Historical backtesting, multi-day analysis
- **1m**: Intraday strategy development
- **1s**: High-frequency analysis (use batch for large ranges)
- **eod**: Long-term investment analysis

**Pricing Format:**
Prices are in fixed-point notation. To convert to decimal:
```
decimal_price = int64_price / 1_000_000_000
```

For ES futures at 4500.00, the value would be stored as `4500000000000`.

## Trades Schema

Individual trade executions with price, size, and side information.

| Field | Type | Description | Values |
|-------|------|-------------|--------|
| `price` | int64 | Trade execution price | Fixed-point (÷ 1e9) |
| `size` | uint32 | Trade size | Contracts/shares |
| `action` | char | Trade action | 'T' = trade, 'C' = cancel |
| `side` | char | Aggressor side | 'B' = buy, 'S' = sell, 'N' = none |
| `flags` | uint8 | Trade flags | Bitmask |
| `depth` | uint8 | Depth level | Usually 0 |
| `ts_in_delta` | int32 | Time delta | Nanoseconds |
| `sequence` | uint32 | Sequence number | Venue-specific |

**When to Use:**
- Intraday order flow analysis
- Tick-by-tick backtesting
- Market microstructure research
- Volume profile analysis

**Aggressor Side:**
- `B` = Buy-side aggressor (market buy hit the ask)
- `S` = Sell-side aggressor (market sell hit the bid)
- `N` = Cannot be determined or not applicable

**Important:** For multi-day tick data, use batch downloads. Trades can generate millions of records per day.

## MBP-1 Schema (Market By Price - Top of Book)

Level 1 order book data showing best bid and ask.

| Field | Type | Description | Values |
|-------|------|-------------|--------|
| `price` | int64 | Reference price (usually last trade) | Fixed-point (÷ 1e9) |
| `size` | uint32 | Reference size | Contracts/shares |
| `action` | char | Book action | 'A' = add, 'C' = cancel, 'M' = modify, 'T' = trade |
| `side` | char | Order side | 'B' = bid, 'A' = ask, 'N' = none |
| `flags` | uint8 | Flags | Bitmask |
| `depth` | uint8 | Depth level | Always 0 for MBP-1 |
| `ts_in_delta` | int32 | Time delta | Nanoseconds |
| `sequence` | uint32 | Sequence number | Venue-specific |
| `bid_px_00` | int64 | Best bid price | Fixed-point (÷ 1e9) |
| `ask_px_00` | int64 | Best ask price | Fixed-point (÷ 1e9) |
| `bid_sz_00` | uint32 | Best bid size | Contracts/shares |
| `ask_sz_00` | uint32 | Best ask size | Contracts/shares |
| `bid_ct_00` | uint32 | Bid order count | Number of orders |
| `ask_ct_00` | uint32 | Ask order count | Number of orders |

**When to Use:**
- Bid/ask spread analysis
- Liquidity analysis
- Market microstructure studies
- Quote-based strategies

**Key Metrics:**
```
spread = ask_px_00 - bid_px_00
mid_price = (bid_px_00 + ask_px_00) / 2
bid_ask_imbalance = (bid_sz_00 - ask_sz_00) / (bid_sz_00 + ask_sz_00)
```

## MBP-10 Schema (Market By Price - 10 Levels)

Level 2 order book data showing 10 levels of depth.

**Fields:** Same as MBP-1, plus 9 additional levels:
- `bid_px_01` through `bid_px_09` (10 bid levels)
- `ask_px_01` through `ask_px_09` (10 ask levels)
- `bid_sz_01` through `bid_sz_09`
- `ask_sz_01` through `ask_sz_09`
- `bid_ct_01` through `bid_ct_09`
- `ask_ct_01` through `ask_ct_09`

**When to Use:**
- Order book depth analysis
- Liquidity beyond top of book
- Order flow imbalance at multiple levels
- Market impact modeling

**Important:** MBP-10 generates significantly more data than MBP-1. Use batch downloads for multi-day requests.

## MBO Schema (Market By Order)

Level 3 order-level data with individual order IDs - most granular.

| Field | Type | Description | Values |
|-------|------|-------------|--------|
| `order_id` | uint64 | Unique order ID | Venue-specific |
| `price` | int64 | Order price | Fixed-point (÷ 1e9) |
| `size` | uint32 | Order size | Contracts/shares |
| `flags` | uint8 | Flags | Bitmask |
| `channel_id` | uint8 | Channel ID | Venue-specific |
| `action` | char | Order action | 'A' = add, 'C' = cancel, 'M' = modify, 'F' = fill, 'T' = trade |
| `side` | char | Order side | 'B' = bid, 'A' = ask, 'N' = none |
| `ts_in_delta` | int32 | Time delta | Nanoseconds |
| `sequence` | uint32 | Sequence number | Venue-specific |

**When to Use:**
- Highest granularity order flow analysis
- Order-level reconstructions
- Advanced market microstructure research
- Queue position analysis

**Important:** MBO data is extremely granular and generates massive datasets. Always use batch downloads and carefully check costs.

## Definition Schema

Instrument metadata and definitions.

| Field | Type | Description |
|-------|------|-------------|
| `ts_recv` | uint64 | Receipt timestamp |
| `min_price_increment` | int64 | Minimum tick size |
| `display_factor` | int64 | Display factor for prices |
| `expiration` | uint64 | Contract expiration timestamp |
| `activation` | uint64 | Contract activation timestamp |
| `high_limit_price` | int64 | Upper price limit |
| `low_limit_price` | int64 | Lower price limit |
| `max_price_variation` | int64 | Maximum price move |
| `trading_reference_price` | int64 | Reference price |
| `unit_of_measure_qty` | int64 | Contract size |
| `min_price_increment_amount` | int64 | Tick value |
| `price_ratio` | int64 | Price ratio |
| `inst_attrib_value` | int32 | Instrument attributes |
| `underlying_id` | uint32 | Underlying instrument ID |
| `raw_instrument_id` | uint32 | Raw instrument ID |
| `market_depth_implied` | int32 | Implied depth |
| `market_depth` | int32 | Market depth |
| `market_segment_id` | uint32 | Market segment |
| `max_trade_vol` | uint32 | Maximum trade volume |
| `min_lot_size` | int32 | Minimum lot size |
| `min_lot_size_block` | int32 | Block trade minimum |
| `min_lot_size_round_lot` | int32 | Round lot minimum |
| `min_trade_vol` | uint32 | Minimum trade volume |
| `contract_multiplier` | int32 | Contract multiplier |
| `decay_quantity` | int32 | Decay quantity |
| `original_contract_size` | int32 | Original size |
| `trading_reference_date` | uint16 | Reference date |
| `appl_id` | int16 | Application ID |
| `maturity_year` | uint16 | Year |
| `decay_start_date` | uint16 | Decay start |
| `channel_id` | uint16 | Channel |
| `currency` | string | Currency code |
| `settl_currency` | string | Settlement currency |
| `secsubtype` | string | Security subtype |
| `raw_symbol` | string | Raw symbol |
| `group` | string | Instrument group |
| `exchange` | string | Exchange code |
| `asset` | string | Asset class |
| `cfi` | string | CFI code |
| `security_type` | string | Security type |
| `unit_of_measure` | string | Unit of measure |
| `underlying` | string | Underlying symbol |
| `strike_price_currency` | string | Strike currency |
| `instrument_class` | char | Class |
| `strike_price` | int64 | Strike price (options) |
| `match_algorithm` | char | Matching algorithm |
| `md_security_trading_status` | uint8 | Trading status |
| `main_fraction` | uint8 | Main fraction |
| `price_display_format` | uint8 | Display format |
| `settl_price_type` | uint8 | Settlement type |
| `sub_fraction` | uint8 | Sub fraction |
| `underlying_product` | uint8 | Underlying product |
| `security_update_action` | char | Update action |
| `maturity_month` | uint8 | Month |
| `maturity_day` | uint8 | Day |
| `maturity_week` | uint8 | Week |
| `user_defined_instrument` | char | User-defined |
| `contract_multiplier_unit` | int8 | Multiplier unit |
| `flow_schedule_type` | int8 | Flow schedule |
| `tick_rule` | uint8 | Tick rule |

**When to Use:**
- Understanding instrument specifications
- Calculating tick values
- Contract expiration management
- Symbol resolution and mapping

**Key Fields for ES/NQ:**
- `min_price_increment`: Tick size (0.25 for ES, 0.25 for NQ)
- `expiration`: Contract expiration timestamp
- `raw_symbol`: Exchange symbol
- `contract_multiplier`: Usually 50 for ES, 20 for NQ

## Statistics Schema

Market statistics and calculated metrics.

| Field | Type | Description |
|-------|------|-------------|
| `ts_recv` | uint64 | Receipt timestamp |
| `ts_ref` | uint64 | Reference timestamp |
| `price` | int64 | Reference price |
| `quantity` | int64 | Reference quantity |
| `sequence` | uint32 | Sequence number |
| `ts_in_delta` | int32 | Time delta |
| `stat_type` | uint16 | Statistic type |
| `channel_id` | uint16 | Channel ID |
| `update_action` | uint8 | Update action |
| `stat_flags` | uint8 | Statistic flags |

**Common Statistic Types:**
- Opening price
- Settlement price
- High/low prices
- Trading volume
- Open interest

**When to Use:**
- Official settlement prices
- Open interest analysis
- Exchange-calculated statistics

## Status Schema

Instrument trading status and state changes.

| Field | Type | Description |
|-------|------|-------------|
| `ts_recv` | uint64 | Receipt timestamp |
| `ts_event` | uint64 | Event timestamp |
| `action` | uint16 | Status action |
| `reason` | uint16 | Status reason |
| `trading_event` | uint16 | Trading event |
| `is_trading` | int8 | Trading flag (1 = trading, 0 = not trading) |
| `is_quoting` | int8 | Quoting flag |
| `is_short_sell_restricted` | int8 | Short sell flag |

**When to Use:**
- Detecting trading halts
- Understanding market status changes
- Filtering data by trading status

## Imbalance Schema

Order imbalance data for auctions and closes.

| Field | Type | Description |
|-------|------|-------------|
| `ts_recv` | uint64 | Receipt timestamp |
| `ts_event` | uint64 | Event timestamp |
| `ref_price` | int64 | Reference price |
| `auction_time` | uint64 | Auction timestamp |
| `cont_book_clr_price` | int64 | Continuous book clearing price |
| `auct_interest_clr_price` | int64 | Auction interest clearing price |
| `paired_qty` | uint64 | Paired quantity |
| `total_imbalance_qty` | uint64 | Total imbalance |
| `side` | char | Imbalance side ('B' or 'A') |
| `significant_imbalance` | char | Significance flag |

**When to Use:**
- Opening/closing auction analysis
- Imbalance trading strategies
- End-of-day positioning

## Schema Selection Decision Matrix

| Analysis Type | Recommended Schema | Alternative |
|---------------|-------------------|-------------|
| Daily backtesting | ohlcv-1d | ohlcv-1h |
| Intraday backtesting | ohlcv-1h, ohlcv-1m | trades |
| Spread analysis | mbp-1 | trades |
| Order flow | trades | mbp-1 |
| Market depth | mbp-10 | mbo |
| Tick-by-tick | trades | mbo |
| Liquidity analysis | mbp-1, mbp-10 | mbo |
| Contract specifications | definition | - |
| Settlement prices | statistics | definition |
| Trading halts | status | - |
| Auction analysis | imbalance | trades |

## Data Type Reference

### Fixed-Point Prices
All price fields are stored as int64 in fixed-point notation with 9 decimal places of precision.

**Conversion:**
```python
decimal_price = int64_price / 1_000_000_000
```

**Example:**
- ES at 4500.25 → stored as 4500250000000
- NQ at 15000.50 → stored as 15000500000000

### Timestamps
All timestamps are uint64 nanoseconds since Unix epoch (1970-01-01 00:00:00 UTC).

**Conversion to datetime:**
```python
import datetime
dt = datetime.datetime.fromtimestamp(ts_event / 1_000_000_000, tz=datetime.timezone.utc)
```

### Character Fields
Single-character fields (char) represent enums:
- Action: 'A' (add), 'C' (cancel), 'M' (modify), 'T' (trade), 'F' (fill)
- Side: 'B' (bid), 'A' (ask), 'N' (none/unknown)

## Performance Considerations

### Schema Size (Approximate bytes per record)

| Schema | Size | Records/GB |
|--------|------|------------|
| ohlcv-1d | ~100 | ~10M |
| ohlcv-1h | ~100 | ~10M |
| trades | ~50 | ~20M |
| mbp-1 | ~150 | ~6.7M |
| mbp-10 | ~500 | ~2M |
| mbo | ~80 | ~12.5M |

**Planning requests:**
- 1 day of ES trades ≈ 100K-500K records ≈ 5-25 MB
- 1 day of ES mbp-1 ≈ 1M-5M records ≈ 150-750 MB
- 1 year of ES ohlcv-1h ≈ 6K records ≈ 600 KB

Use these estimates to decide between timeseries (< 5GB) and batch downloads (> 5GB).
