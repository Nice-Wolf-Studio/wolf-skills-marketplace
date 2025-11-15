# Context File Cleanup Automation

## Overview

Automated cleanup tool for `.claude/context/` checkpoint files following retention policies to prevent bloat while preserving recent context.

## Usage

```bash
# Dry run (see what would be deleted)
ts-node cleanup-context-files.ts --dry-run

# Delete old checkpoints
ts-node cleanup-context-files.ts

# Archive instead of delete
ts-node cleanup-context-files.ts --archive

# Show help
ts-node cleanup-context-files.ts --help
```

## Retention Policy (Default)

| Checkpoint Type | Retention Period |
|----------------|------------------|
| Exploration    | 30 days          |
| Implementation | 60 days          |
| Verification   | 90 days          |
| Reference      | 45 days          |

## What Gets Cleaned

Checkpoint files matching pattern: `{phase}-{YYYY-MM-DD}-{feature-slug}.md`

Examples:
- `exploration-2024-12-01-jwt-refresh.md` (45 days old) → **Deleted** (exploration retention: 30 days)
- `implementation-2024-11-15-user-auth.md` (61 days old) → **Deleted** (implementation retention: 60 days)
- `verification-2025-01-10-api-test.md` (5 days old) → **Kept**
- `reference-2025-01-12-react-patterns.md` (3 days old) → **Kept**

## Pattern Application (from coding-patterns skill)

This tool demonstrates **Pure Functions + Side Effect Isolation** pattern:

### Pure Functions (80% of code)
- `parseCheckpointFilename()` - Parse filename metadata
- `calculateAgeInDays()` - Calculate checkpoint age
- `shouldDelete()` - Deletion decision logic
- `getRetentionDays()` - Retention policy lookup
- `groupCheckpointsByAction()` - Group by action
- `formatCleanupSummary()` - Format output

**Benefits**:
- ✅ 100% testable without mocks
- ✅ Fast, deterministic tests
- ✅ Each function tests independently
- ✅ Business logic completely separated from I/O

### Impure Functions (20% of code - I/O at edges)
- `findCheckpointFiles()` - File system read
- `deleteCheckpointFile()` - File system write
- `archiveCheckpointFile()` - File system write
- `executeCleanup()` - Orchestrates I/O operations
- `main()` - Entry point

**Benefits**:
- ✅ I/O isolated to specific functions
- ✅ Pure business logic reusable
- ✅ Easy to add new I/O operations (e.g., cloud storage)

### Function Decomposition Applied
- All functions < 20 lines (longest: ~18 lines)
- Cyclomatic complexity < 5 for all functions
- Single responsibility principle followed
- Clear, descriptive function names

## Testing

```bash
# Run tests
npm test cleanup-context-files.test.ts

# Coverage
npm run test:coverage cleanup-context-files.test.ts
```

**Test Coverage**:
- 8 test suites covering all pure functions
- 35+ test cases
- 100% coverage of business logic (pure functions)
- Zero mock setup required

## Architecture Decision

**Why Pure Functions + Function Decomposition?**
- Cleanup logic is complex enough to benefit from decomposition (date calculations, retention rules)
- Testing without mocks is critical for confidence (date/time logic is error-prone)
- File I/O naturally sits at edges (read files, delete files)
- 80/20 split achieved: ~300 lines pure, ~70 lines impure

**Why NOT Orchestration Pattern?**
- Single script, no multi-service coordination
- File operations are simple, no compensating transactions needed
- Would add ~50 lines of Saga infrastructure for zero benefit

**Why NOT Vertical Slice Architecture?**
- Single feature (cleanup), no need for directory structure
- Would create unnecessary complexity for one script

## Future Enhancements

- [ ] Custom retention policies via config file
- [ ] Cloud backup before deletion (S3, GCS)
- [ ] Notification on cleanup (Slack, email)
- [ ] Metrics/reporting (cleanup history, storage saved)
