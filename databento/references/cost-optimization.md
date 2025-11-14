# Databento Cost Optimization Guide

Strategies and best practices for minimizing costs when working with Databento market data.

## Databento Pricing Model

### Cost Components

1. **Databento Usage Fees** - Pay-per-use or subscription
2. **Exchange License Fees** - Venue-dependent (varies by exchange)
3. **Data Volume** - Amount of data retrieved

### Pricing Tiers

**Free Credits:**
- $125 free credits for new users
- Good for initial development and testing

**Usage-Based:**
- Pay only for data you use
- Varies by venue and data type
- No minimum commitment

**Subscriptions:**
- Basic Plan: $199/month
- Corporate Actions/Security Master: $299/month
- Flat-rate access to specific datasets

## Cost Estimation (ALWAYS Do This First)

### Use metadata_get_cost Before Every Request

**Always** estimate cost before fetching data:

```python
mcp__databento__metadata_get_cost(
    dataset="GLBX.MDP3",
    start="2024-01-01",
    end="2024-01-31",
    symbols="ES.c.0",
    schema="ohlcv-1h"
)
```

**Returns:**
- Estimated cost in USD
- Data size estimate
- Helps decide if request is reasonable

### When Cost Checks Matter Most

1. **Multi-day tick data** - Can be expensive
2. **Multiple symbols** - Costs multiply
3. **High-granularity schemas** - trades, mbp-1, mbo
4. **Long date ranges** - Weeks or months of data

**Example Cost Check:**
```python
# Cheap: 1 month of daily bars
cost_check(schema="ohlcv-1d", start="2024-01-01", end="2024-01-31")
# Estimated: $0.10

# Expensive: 1 month of tick trades
cost_check(schema="trades", start="2024-01-01", end="2024-01-31")
# Estimated: $50-$200 (depends on volume)
```

## Historical Data (T+1) - No Licensing Required

**Key Insight:** Historical data that is **24+ hours old (T+1)** does not require exchange licensing fees.

### Cost Breakdown

**Live/Recent Data (< 24 hours):**
- Databento fees + Exchange licensing fees

**Historical Data (24+ hours old):**
- Databento fees only (no exchange licensing)
- Significantly cheaper

### Optimization Strategy

**For Development:**
- Use T+1 data for strategy development
- Switch to live data only for production

**For Backtesting:**
- Always use historical (T+1) data
- Much more cost-effective
- Same data quality

**Example:**
```python
# Expensive: Yesterday's data (< 24 hours)
start="2024-11-05"  # Requires licensing

# Cheap: 3 days ago (> 24 hours)
start="2024-11-03"  # No licensing required
```

## Schema Selection for Cost

Different schemas have vastly different costs due to data volume.

### Schema Cost Hierarchy (Cheapest to Most Expensive)

1. **ohlcv-1d** (Cheapest)
   - ~100 bytes per record
   - ~250 records per symbol per year
   - **Best for:** Long-term backtesting

2. **ohlcv-1h**
   - ~100 bytes per record
   - ~6,000 records per symbol per year
   - **Best for:** Multi-day backtesting

3. **ohlcv-1m**
   - ~100 bytes per record
   - ~360,000 records per symbol per year
   - **Best for:** Intraday strategies

4. **trades**
   - ~50 bytes per record
   - ~100K-500K records per symbol per day (ES/NQ)
   - **Best for:** Tick analysis (use selectively)

5. **mbp-1**
   - ~150 bytes per record
   - ~1M-5M records per symbol per day
   - **Best for:** Order flow analysis (use selectively)

6. **mbp-10**
   - ~500 bytes per record
   - ~1M-5M records per symbol per day
   - **Best for:** Deep order book analysis (expensive!)

7. **mbo** (Most Expensive)
   - ~80 bytes per record
   - ~5M-20M records per symbol per day
   - **Best for:** Order-level research (very expensive!)

### Cost Optimization Strategy

**Start with lower granularity:**
1. Develop strategy with ohlcv-1h or ohlcv-1d
2. Validate with ohlcv-1m if needed
3. Only use trades/mbp-1 if absolutely necessary
4. Avoid mbp-10/mbo unless essential

**Example:**
```python
# Cheap: Daily bars for 1 year
schema="ohlcv-1d"
start="2023-01-01"
end="2023-12-31"
# Cost: < $1

# Expensive: Trades for 1 year
schema="trades"
start="2023-01-01"
end="2023-12-31"
# Cost: $500-$2000 (depending on venue)
```

## Symbol Selection

Fewer symbols = lower cost. Be selective.

### Strategies

**1. Start with Single Symbol**
```python
# Development
symbols="ES.c.0"  # Just ES

# After validation, expand
symbols="ES.c.0,NQ.c.0"  # Add NQ
```

**2. Use Continuous Contracts**
```python
# Good: Single continuous contract
symbols="ES.c.0"  # Covers all front months

# Wasteful: Multiple specific contracts
symbols="ESH5,ESM5,ESU5,ESZ5"  # Same data, 4x cost
```

**3. Avoid Symbol Wildcards**
```python
# Expensive: All instruments
symbols="*"  # Don't do this!

# Targeted: Just what you need
symbols="ES.c.0,NQ.c.0"  # Explicit
```

## Date Range Optimization

Request only the data you need.

### Strategies

**1. Iterative Refinement**
```python
# First: Test with small range
start="2024-01-01"
end="2024-01-07"  # Just 1 week

# Then: Expand after validation
start="2024-01-01"
end="2024-12-31"  # Full year
```

**2. Segment Long Ranges**
```python
# Instead of: 5 years at once
start="2019-01-01"
end="2024-12-31"

# Do: Segment by year
start="2024-01-01"
end="2024-12-31"
# Process, then request next year if needed
```

**3. Use Limit for Testing**
```python
# Test with small limit first
limit=100  # Just 100 records

# After validation, increase or remove
limit=10000  # Larger sample
```

## Batch vs Timeseries Selection

Choose the right tool for the job.

### Timeseries (< 5GB)
**When to use:**
- Small to medium datasets
- Quick exploration
- <= 1 day of tick data
- Any OHLCV data

**Benefits:**
- Immediate results
- No job management
- Direct response

**Costs:**
- Same per-record cost as batch

### Batch Downloads (> 5GB)
**When to use:**
- Large datasets (> 5GB)
- Multi-day tick data
- Multiple symbols over long periods
- Production data pipelines

**Benefits:**
- More efficient for large data
- Can split output files
- Asynchronous processing

**Costs:**
- Same per-record cost as timeseries
- No additional fees for batch processing

### Decision Matrix

| Data Type | Date Range | Method |
|-----------|-----------|--------|
| ohlcv-1h | 1 year | Timeseries |
| ohlcv-1d | Any | Timeseries |
| trades | 1 day | Timeseries |
| trades | 1 week+ | Batch |
| mbp-1 | 1 day | Batch (safer) |
| mbp-1 | 1 week+ | Batch |

## DBEQ Bundle - Zero Exchange Fees

Databento offers a special bundle for US equities with **$0 exchange fees**.

### DBEQ.BASIC Dataset

**Coverage:**
- US equity securities
- Zero licensing fees
- Databento usage fees only

**When to use:**
- Equity market breadth for ES/NQ analysis
- Testing equity strategies
- Learning market data APIs

**Example:**
```python
# Regular equity dataset (has exchange fees)
dataset="XNAS.ITCH"
# Cost: Databento + Nasdaq fees

# DBEQ bundle (no exchange fees)
dataset="DBEQ.BASIC"
# Cost: Databento fees only
```

## Caching and Reuse

Don't fetch the same data multiple times.

### Strategies

**1. Cache Locally**
```python
# First request: Fetch and save
data = fetch_data(...)
save_to_disk(data, "ES_2024_ohlcv1h.csv")

# Subsequent runs: Load from disk
data = load_from_disk("ES_2024_ohlcv1h.csv")
```

**2. Incremental Updates**
```python
# Initial: Fetch full history
start="2023-01-01"
end="2024-01-01"

# Later: Fetch only new data
start="2024-01-01"  # Resume from last fetch
end="2024-12-31"
```

**3. Share Data Across Analyses**
```python
# Fetch once
historical_data = fetch_data(schema="ohlcv-1h", ...)

# Use multiple times
backtest_strategy_a(historical_data)
backtest_strategy_b(historical_data)
backtest_strategy_c(historical_data)
```

## Session-Based Analysis

For ES/NQ, consider filtering by trading session to reduce data volume.

### Sessions

- **Asian Session:** 6pm-2am ET
- **London Session:** 2am-8am ET
- **New York Session:** 8am-4pm ET

### Cost Benefit

**Full 24-hour data:**
- Maximum data volume
- Higher cost

**Session-filtered data:**
- 1/3 to 1/2 the volume
- Lower cost
- May be sufficient for analysis

**Example:**
```python
# Expensive: Full 24-hour data
# Process all records

# Cheaper: NY session only
# Filter records to 8am-4pm ET
# ~1/3 the data volume
```

Use `scripts/session_filter.py` to filter post-fetch, or request only specific hours.

## Monitoring Usage

Track your usage to avoid surprises.

### Check Dashboard
- Databento provides usage dashboard
- Monitor monthly spend
- Set alerts for limits

### Set Monthly Limits
```python
# In account settings
monthly_limit=$500
```

### Review Costs Regularly
- Check cost estimates vs actual
- Identify expensive queries
- Adjust strategies

## Cost Optimization Checklist

Before every data request:

- [ ] **Estimate cost first** - Use metadata_get_cost
- [ ] **Use T+1 data** - Avoid < 24 hour data unless necessary
- [ ] **Choose lowest granularity schema** - Start with ohlcv, not trades
- [ ] **Minimize symbols** - Only request what you need
- [ ] **Limit date range** - Test with small range first
- [ ] **Use continuous contracts** - Avoid requesting multiple months
- [ ] **Cache locally** - Don't re-fetch same data
- [ ] **Consider DBEQ** - Use zero-fee dataset when applicable
- [ ] **Filter by session** - Reduce volume if session-specific
- [ ] **Use batch for large data** - More efficient for > 5GB

## Cost Examples

### Cheap Requests (< $1)

```python
# Daily bars for 1 year
dataset="GLBX.MDP3"
symbols="ES.c.0"
schema="ohlcv-1d"
start="2023-01-01"
end="2023-12-31"
# Estimated cost: $0.10
```

### Moderate Requests ($1-$10)

```python
# Hourly bars for 1 year
dataset="GLBX.MDP3"
symbols="ES.c.0,NQ.c.0"
schema="ohlcv-1h"
start="2023-01-01"
end="2023-12-31"
# Estimated cost: $2-5
```

### Expensive Requests ($10-$100)

```python
# Trades for 1 month
dataset="GLBX.MDP3"
symbols="ES.c.0"
schema="trades"
start="2024-01-01"
end="2024-01-31"
# Estimated cost: $20-50
```

### Very Expensive Requests ($100+)

```python
# MBP-10 for 1 month
dataset="GLBX.MDP3"
symbols="ES.c.0,NQ.c.0"
schema="mbp-10"
start="2024-01-01"
end="2024-01-31"
# Estimated cost: $200-500
```

## Free Credit Strategy

Make the most of your $125 free credits:

1. **Development Phase** - Use free credits for:
   - Testing API integration
   - Small-scale strategy development
   - Learning the platform

2. **Prioritize T+1 Data** - Stretch credits further:
   - Avoid real-time data during development
   - Use historical data (no licensing fees)

3. **Start with OHLCV** - Cheapest data:
   - Develop strategy with daily/hourly bars
   - Validate before moving to tick data

4. **Cache Everything** - Don't waste credits:
   - Save all fetched data locally
   - Reuse for multiple analyses

5. **Monitor Remaining Balance**:
   - Check credit usage regularly
   - Adjust requests to stay within budget

## Summary

**Most Important Cost-Saving Strategies:**

1. ✅ **Always check cost first** - Use metadata_get_cost
2. ✅ **Use T+1 data** - 24+ hours old, no licensing fees
3. ✅ **Start with OHLCV schemas** - Much cheaper than tick data
4. ✅ **Cache and reuse data** - Don't fetch twice
5. ✅ **Be selective with symbols** - Fewer symbols = lower cost
6. ✅ **Test with small ranges** - Validate before large requests
7. ✅ **Use continuous contracts** - One symbol instead of many
8. ✅ **Monitor usage** - Track spending, set limits
