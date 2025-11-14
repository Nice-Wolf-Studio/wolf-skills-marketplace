---
name: daily-summary
description: Automated generation of comprehensive daily PR summaries for team standups, status reports, and progress tracking with metrics, categorization, contributor activity, and velocity analysis
---

# Daily Summary Skill

This skill automates the generation of comprehensive daily Pull Request (PR) summaries for team standups, status reports, and progress tracking. It produces structured markdown reports with metrics, categorization, contributor activity analysis, and velocity tracking.

## When to Use This Skill

Use this skill when you need:

- Daily standup preparation with current PR status
- End-of-day progress reporting for stakeholders
- Project status updates with metrics
- PR activity analysis and trends
- Weekly or monthly sprint retrospectives
- Contributor focus and productivity analysis

## What This Skill Provides

Automated generation of structured markdown reports including:

- **Key Metrics** - PRs created/merged/open, active contributors
- **Categorized PR Lists** - Performance, Bug Fixes, Features, UI/UX, Documentation
- **Contributor Activity** - Breakdown by developer with focus areas
- **Highlights and Themes** - Grouped work patterns
- **Impact Summary** - Code quality, UX improvements, developer experience
- **Velocity Metrics** - Average time to merge, review turnaround
- **Action Items** - PRs ready for review, blockers, backlog items

## Dependencies

### Required Tools

- **GitHub CLI (`gh`)** - Required for fetching PR data
  ```bash
  # Install: https://cli.github.com/
  # Verify: gh --version
  ```

### Optional Tools

- **jq** - JSON processing for advanced filtering (recommended but not required)

### Bundled Resources

This skill includes:

- `assets/daily-pr-summary-template.md` - Output format specification
- `references/agent-instructions.md` - Agent framework methodology context
- `references/agent-definitions.md` - Terminology and behavioral principles

## Implementation Guide

### Step 1: Data Collection

Fetch PR data using GitHub CLI:

```bash
# Basic PR list command
gh pr list \
  --repo [owner]/[repo] \
  --state all \
  --limit 100 \
  --json number,title,state,createdAt,mergedAt,closedAt,author,url,additions,deletions,labels
```

The JSON output provides all necessary data for analysis and categorization.

### Step 2: Date Filtering

Filter PRs for the target date or date range:

```bash
# For single-day summary
TARGET_DATE="2025-11-13"

# Filter PRs created on target date
jq --arg date "$TARGET_DATE" \
  '[.[] | select(.createdAt | startswith($date))]'

# Filter PRs merged on target date
jq --arg date "$TARGET_DATE" \
  '[.[] | select(.mergedAt | startswith($date))]'

# For date range (sprint retrospective)
jq '[.[] | select(
  (.createdAt >= "2025-10-28") and (.createdAt <= "2025-11-13")
)]'
```

### Step 3: Categorization

Apply keyword-based categorization to PR titles and labels:

**Categories:**

- **Performance & Optimization** - Keywords: `perf`, `optimize`, `memory`, `performance`, `speed`, `cache`
- **Bug Fixes** - Keywords: `fix`, `bug`, `resolve`, `issue`, `patch`
- **Features** - Keywords: `feat`, `feature`, `add`, `implement`, `new`
- **UI/UX** - Keywords: `ui`, `ux`, `design`, `animation`, `responsive`, `layout`
- **Documentation** - Keywords: `docs`, `documentation`, `readme`, `comments`, `adr`
- **Refactoring** - Keywords: `refactor`, `cleanup`, `restructure`, `simplify`
- **Testing** - Keywords: `test`, `spec`, `coverage`, `qa`

**Example Categorization Logic:**

```bash
if [[ "$title" =~ (perf|optimize|memory|performance) ]]; then
  category="Performance & Optimization"
elif [[ "$title" =~ (fix|bug|resolve|issue) ]]; then
  category="Bug Fixes"
elif [[ "$title" =~ (feat|feature|add|implement) ]]; then
  category="Features"
# ... continue for other categories
fi
```

### Step 4: Priority Assignment

Assign priority based on keywords in title or labels:

- 🔴 **HIGH PRIORITY** - Keywords: `breaking`, `critical`, `blocker`, `security`, `urgent`
- 🟡 **MEDIUM PRIORITY** - Keywords: `feature`, `enhancement`, `bug` (non-critical)
- 🟢 **LOW PRIORITY** - Keywords: `docs`, `chore`, `style`, `minor`

### Step 5: Contributor Analysis

Group PRs by author and track focus areas:

```bash
# Count PRs by author
jq 'group_by(.author.login) |
    map({author: .[0].author.login, count: length, prs: map(.number)})'

# Identify focus areas by analyzing categories of each author's PRs
```

**Track:**

- PRs created count
- PRs merged count
- Focus areas (primary categories)
- Human vs. bot contributors

### Step 6: Velocity Calculation

Calculate time-based metrics:

```bash
# Average time to merge (in hours)
jq '[.[] | select(.mergedAt != null) |
    (((.mergedAt | fromdate) - (.createdAt | fromdate)) / 3600)] |
    add / length'

# Active development windows (peak activity hours)
jq '[.[] | .createdAt | fromdate | strftime("%H")] |
    group_by(.) | map({hour: .[0], count: length}) | sort_by(.count) | reverse'
```

### Step 7: Report Generation

Fill in the template (`assets/daily-pr-summary-template.md`):

1. Load template content
2. Replace `[count]` placeholders with calculated values
3. Fill in PR lists with categorized entries
4. Add contributor breakdown
5. Insert velocity metrics
6. List action items (open PRs needing review)

## Validation Criteria

Success is achieved when:

- ✅ Report generated without errors
- ✅ All PRs from target date included (verify count matches API response)
- ✅ Categorization accuracy ≥ 90% (manual spot-check recommended)
- ✅ Metrics calculations correct (sanity checks on outliers)
- ✅ Output follows template format exactly
- ✅ Executable commands included for verification
- ✅ Data collection timestamp included in report

## Usage Examples

### Example 1: Daily Standup Summary

**Context:** Monday morning standup, need summary of Friday's work

**Command:**

```bash
gh pr list --repo owner/repo \
  --state all --limit 100 \
  --json number,title,state,createdAt,mergedAt,author,url | \
  jq '[.[] | select(
    (.createdAt | startswith("2025-11-08")) or
    (.mergedAt | startswith("2025-11-08"))
  )]'
```

**Output:** `daily-summary-2025-11-08.md` with Friday's PRs categorized and analyzed

### Example 2: Sprint Retrospective

**Context:** End of 2-week sprint, need cumulative summary

**Command:**

```bash
gh pr list --repo owner/repo \
  --state all --limit 200 \
  --json number,title,state,createdAt,mergedAt,author,url | \
  jq '[.[] | select(
    (.createdAt >= "2025-10-28") and (.createdAt <= "2025-11-08")
  )]'
```

**Output:** `sprint-46-retrospective.md` with aggregated metrics across 2 weeks

### Example 3: Contributor Focus Report

**Context:** Manager needs to understand individual contributions

**Command:**

```bash
gh pr list --repo owner/repo \
  --author username \
  --state all --limit 50 \
  --json number,title,state,createdAt,mergedAt,url | \
  jq '[.[] | select(
    (.createdAt >= (now - 604800 | strftime("%Y-%m-%d")))
  )]'
```

**Output:** Contributor-focused report with activity patterns and specialization

## Integration with Agent Framework

This skill was developed within the olympics-fotb agent framework, which uses:

- **Eight-Phase Methodology** - Structured approach from introspection to reality check
- **Confidence Scale (0-10)** - Quantifies certainty before and after execution
- **Role-Based Execution** - Used primarily by `reporting-agent` and `pm-agent` roles
- **Complexity Ratings** - Tracks low/medium/high complexity, not time estimates

For context on the framework, see the bundled `references/` files.

## Skill Maturity

**Current Confidence Level:** 8/10

- ✅ Template format proven
- ✅ Data collection commands tested
- ✅ Categorization rules documented and validated manually
- ⏳ Automation not yet in production (reduces confidence by 1)
- ⏳ Cross-project validation pending (prevents 10/10)

**Path to 9/10:** Successful automation in production for 2+ weeks with ≥90% accuracy

**Path to 10/10:** Canonicalized after 3+ months of reliable use across multiple projects

## Related Resources

### Templates
- `assets/daily-pr-summary-template.md` - Output format specification

### Framework Documentation
- `references/agent-instructions.md` - Eight-Phase methodology and confidence scale
- `references/agent-definitions.md` - Canonical vocabulary and behavioral principles

### External Resources
- GitHub CLI Documentation: https://cli.github.com/manual/gh_pr_list
- jq Manual: https://stedolan.github.io/jq/manual/

## Changelog

**v1.0** (2025-11-13)
- Converted to standard Claude Code SKILL.md format
- Added bundled references for agent framework context
- Included template in assets/ directory
- Adapted for use outside olympics-fotb repository
- Maintained all original implementation details and examples

**v1.0 (olympics-fotb)** (2025-11-11)
- Initial skill definition in olympics-fotb repository
- Data collection commands documented
- Categorization rules established
- Examples provided for common use cases
