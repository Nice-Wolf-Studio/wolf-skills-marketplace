# Implementation Summary - {FEATURE_NAME}

**Date**: {YYYY-MM-DD}
**Phase**: Implementation → Verification
**Archetype**: {archetype-name}

---

## Changes Implemented

### Modified Files

1. **`{file-path}`** (+{lines added}, -{lines removed})
   - **Summary**: {What changed}
   - **Key Changes**:
     - Added: {Function/Class/Feature added}
     - Modified: {What was changed and why}
     - Removed: {What was removed and why}
   - **Dependencies Added**: {Any new imports or dependencies}

2. **`{file-path}`** (+{N}, -{M})
   - **Summary**: {Description}
   - **Key Changes**:
     - {Change 1}
     - {Change 2}

### New Files Created

1. **`{file-path}`** (+{lines})
   - **Purpose**: {Why this file was created}
   - **Exports**: {Key functions, classes, types}
   - **Dependencies**: {What it imports}

### Files Deleted

1. **`{file-path}`** (-{lines})
   - **Reason**: {Why deleted}
   - **Replaced By**: {What replaces it, if anything}

---

## Test Results

### Final Test Run

**Command**: `{test command used}`

**Output** (summary):
```
{Paste relevant test output - summary only, not full logs}

Example:
Test Suites: 3 passed, 3 total
Tests:       16 passed, 16 total
Coverage:    95.2%
Time:        3.456s
```

**Results**:
- ✅ **Tests Passing**: {count} / {total}
- ✅ **Tests Failing**: {count} (if any, list below)
- ✅ **Coverage**: {percentage} (up/down from {previous})
- ✅ **Linting**: {0 errors, X warnings}
- ✅ **Type Checking**: {passing/failing}

### Test Failures (if any)

**Failing Test**: `{test name}`
- **File**: `{test-file-path}:{line}`
- **Reason**: {Why failing}
- **Status**: {Investigating / Known issue / Will fix in next iteration}

### Coverage Changes

**Before Implementation**: {previous coverage}
**After Implementation**: {current coverage}
**Change**: {+/-X%}

**Uncovered Lines**:
- `{file}:{lines}` - {Why not covered / Will be covered in follow-up}

### New Tests Added

1. **Test**: `{test name}`
   - **File**: `{test-file-path}:{line}`
   - **Covers**: {What this test validates}
   - **Type**: Unit / Integration / E2E

2. **Test**: `{test name}`
   - **Covers**: {Description}

**Total New Tests**: {count}

---

## Key Decisions

### Decision 1: {Decision Topic}

**What**: {What you decided}

**Why**: {Rationale for this decision}

**Alternatives Considered**:
- **{Alternative 1}**: Rejected because {reason}
- **{Alternative 2}**: Rejected because {reason}

**Implications**:
- {Positive implication 1}
- {Negative implication or tradeoff}

**Reversibility**: Easy / Hard / One-way
- {Explanation of how easy to change later}

---

### Decision 2: {Decision Topic}

**What**: {What you decided}

**Why**: {Rationale}

**Alternatives Considered**:
- {Alternative options}

**Implications**:
- {Impact of this decision}

---

## TDD Workflow (if followed)

### RED Phase
- ✅ **Test Written**: `{test name}` in `{file}`
- ✅ **Test Failed**: Yes (as expected)
- ✅ **Failure Reason**: {Why it failed - proves test is valid}

### GREEN Phase
- ✅ **Minimal Implementation**: {What you implemented}
- ✅ **Test Passed**: Yes
- ✅ **No Premature Optimization**: Confirmed

### REFACTOR Phase
- ✅ **Refactoring Done**: {What you improved}
- ✅ **Tests Still Pass**: Confirmed
- ✅ **Code Quality Improved**: {How - naming, structure, etc.}

---

## Lenses Applied (if any)

### {Lens Name} (e.g., Security, Performance, Accessibility)

**How Applied**:
- {Action 1 taken to satisfy lens}
- {Action 2}

**Evidence**:
- {Metric or test result showing lens requirement met}

**Validation**:
- [ ] {Lens-specific check 1}
- [ ] {Lens-specific check 2}

---

## Debugging Sessions (if any)

### Bug: {Bug description}

**When Encountered**: {During which test/phase}

**Systematic Debugging Applied**:
- **Phase 1 - Root Cause Investigation**:
  - Reproduced in: {Test case or environment}
  - Instrumentation added: {Where logging/debugging added}
  - Root cause: {What you found}

- **Phase 2 - Pattern Analysis**:
  - Pattern identified: {Off-by-one, null, race condition, etc.}

- **Phase 3 - Hypothesis Testing**:
  - Hypothesis: {What you thought was causing it}
  - Test: {How you validated}
  - Result: {Confirmed / Refuted}

- **Phase 4 - Implementation**:
  - Fix applied: {What you changed}
  - Regression test added: `{test name}`

**Documented In Journal**: Yes / No

---

## Documentation Updated

### README.md
- [ ] Updated: Yes / No / Not Applicable
- **Changes**: {What sections updated}

### API Documentation
- [ ] Updated: Yes / No / Not Applicable
- **Changes**: {What was documented}

### Code Comments
- [ ] Added/Updated: Yes / No
- **Locations**: `{file}:{lines}` - {What was commented}

### CHANGELOG.md
- [ ] Updated: Yes / No
- **Entry**: {What was added to changelog}

---

## Journal Entry

### Journal File Created
- **Path**: `{path-to-journal-file.md}`
- **Format**: `YYYY-MM-DD-{task-slug}.md`

### Journal Contents (Summary)

**Problems Encountered**:
1. {Problem 1}
2. {Problem 2}

**Decisions Made**:
1. {Decision 1}
2. {Decision 2}

**Learnings Captured**:
1. {Learning 1}
2. {Learning 2}

**Future Improvements**:
1. {Technical debt or follow-up work}

---

## Integration Points

### APIs Changed
- **{API/Function name}**: {How signature or behavior changed}
- **Backward Compatible**: Yes / No
  - If No: {Migration path for callers}

### Breaking Changes
- **{Change}**: {What breaks and how to migrate}

### New APIs Added
- **{API/Function name}**: {Purpose and usage}

---

## Performance Impact (if applicable)

### Benchmarks

**Before Implementation**:
- {Metric 1}: {value}
- {Metric 2}: {value}

**After Implementation**:
- {Metric 1}: {value}
- {Metric 2}: {value}

**Change**: {+/-X%}

### Performance Budget
- **Budget**: {Target metric}
- **Actual**: {Achieved metric}
- **Status**: ✅ Within budget / ❌ Exceeds budget

---

## Security Considerations (if applicable)

### Threat Model
- **Threat**: {Threat description}
- **Mitigation**: {How you mitigated it}

### Security Scan Results
- **Tool**: {Scanner used}
- **Critical**: {count}
- **High**: {count}
- **Medium**: {count}
- **Low**: {count}

### Security Best Practices Applied
- [ ] Input validation
- [ ] Output encoding
- [ ] Authentication/Authorization checks
- [ ] Secrets not hardcoded
- [ ] {Other practices}

---

## Ready for Verification

### Checklist

**Tests**:
- [x] All unit tests passing
- [x] Integration tests passing
- [x] E2E tests passing (if applicable)
- [x] Coverage ≥ {target}%

**Documentation**:
- [x] README updated
- [x] API docs updated
- [x] Code comments added

**Quality**:
- [x] Linting passes
- [x] Type checking passes
- [x] No TODOs or FIXMEs in code
- [x] Code follows project style

**Wolf Framework**:
- [x] Journal entry created
- [x] Acceptance criteria met (see below)
- [x] Archetype requirements satisfied

### Acceptance Criteria Status

From exploration checkpoint:

- [x] {Acceptance criterion 1} - ✅ Met
  - Evidence: {Where/how met}
- [x] {Acceptance criterion 2} - ✅ Met
  - Evidence: {Where/how met}
- [ ] {Acceptance criterion 3} - ⏳ Pending / ❌ Not met
  - Reason: {Why pending or not met}

### Known Limitations

- **{Limitation 1}**: {Description}
  - **Impact**: {What this affects}
  - **Follow-up**: {Will be addressed in which phase/PR}

---

## Next Steps

**Immediate Next Actions**:
1. {Action 1 - e.g., "Load superpowers:verification-before-completion"}
2. {Action 2 - e.g., "Run full test suite (Fast-Lane minimum)"}
3. {Action 3 - e.g., "Collect evidence for verification checkpoint"}

**Blockers** (if any):
- {Blocker}: {What's blocking verification}

**Follow-up Work** (Future PRs):
- {Technical debt item 1}
- {Enhancement idea 1}

---

## Implementation Complete

**Status**: ✅ Ready for verification phase

**Confidence Level**: {High/Medium/Low}
- If Low: {What's uncertain and why}

**Estimated Verification Time**: {X} minutes

**Recommended Next Skill**: superpowers:verification-before-completion

---

*Checkpoint Created*: {YYYY-MM-DD HH:MM}
*Agent*: coder-agent
*Can Resume Work From This Checkpoint*: Yes / No (if No, explain what's missing)
