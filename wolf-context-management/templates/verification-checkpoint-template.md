# Verification Summary - {FEATURE_NAME}

**Date**: {YYYY-MM-DD}
**Phase**: Verification → Handoff
**Archetype**: {archetype-name}

---

## Evidence Collected

### Test Evidence

**Test Command**: `{command used}`

**Test Results** (summary):
```
{Paste final test output - summary only}

Example:
Test Suites: 3 passed, 3 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        3.456s
```

**Status**:
- ✅ **Unit Tests**: {X} passed / {Y} total
- ✅ **Integration Tests**: {X} passed / {Y} total
- ✅ **E2E Tests**: {X} passed / {Y} total (if applicable)
- ✅ **Coverage**: {percentage}
- ✅ **Linting**: {result}
- ✅ **Type Checking**: {result}

**Evidence File**: {Path to detailed test output, if saved}

---

### Coverage Evidence

**Coverage Report**:
```
{Paste coverage summary}

Example:
File      | Statements | Branches | Functions | Lines
----------|------------|----------|-----------|------
All files |      95.2% |    92.3% |     96.1% |  95.2%
```

**Coverage Target**: {target}%
**Coverage Achieved**: {actual}%
**Status**: ✅ Meets target / ❌ Below target

**Uncovered Areas**:
- `{file}:{lines}` - {Reason not covered / Accepted gap}

**Evidence File**: {Path to coverage/index.html or report}

---

### Linting Evidence

**Command**: `{linter command}`

**Results**:
```
{Paste linting output}

Example:
✔ No ESLint errors found
⚠ 3 warnings:
  src/auth/jwt.ts:45 - Consider using const instead of let
```

**Status**:
- ✅ **Errors**: {count}
- ⚠️ **Warnings**: {count}
- ℹ️ **Info**: {count}

**Warnings Accepted**: {List of warnings with justification if not fixed}

---

### CI/CD Evidence

**CI Pipeline**: {Pipeline name/URL}

**Build Status**: ✅ Passing / ❌ Failing

**CI Jobs**:
- ✅ **Build**: Passed (time: {X}s)
- ✅ **Fast-Lane Tests**: Passed (time: {X}s)
- ✅ **Full-Suite Tests**: Passed / Pending
- ✅ **Lint**: Passed
- ✅ **Security Scan**: Passed

**CI Evidence**: {Link to CI run or screenshot}

---

## Quality Metrics

### Performance Metrics (if applicable)

**Baseline** (before changes):
- {Metric 1}: {value}
- {Metric 2}: {value}

**Post-Change**:
- {Metric 1}: {value}
- {Metric 2}: {value}

**Impact**: {+/-X%}

**Performance Budget**:
- **Target**: {value}
- **Achieved**: {value}
- **Status**: ✅ Within budget / ⚠️ At limit / ❌ Exceeds budget

**Evidence File**: {Path to benchmark results}

---

### Security Metrics (if applicable)

**Security Scan Tool**: {Tool name and version}

**Vulnerability Count**:
- 🔴 **Critical**: {count} (MUST be 0)
- 🟠 **High**: {count} (≤ 5 allowed in Fast-Lane)
- 🟡 **Medium**: {count}
- 🟢 **Low**: {count}

**Vulnerability Details** (if any):
1. **{CVE or ID}**: {Description}
   - **Severity**: {Level}
   - **Status**: ✅ Fixed / ⚠️ Accepted risk / 🔄 In progress
   - **Justification**: {If accepted, why}

**Threat Model**: {Completed / Not required for this archetype}

**Evidence File**: {Path to security scan report}

---

### Code Quality Metrics

**Maintainability Index**: {score} / 100
**Cyclomatic Complexity**: {average} (max: {max in single function})
**Code Duplication**: {percentage}%

**Status**:
- ✅ Maintainability ≥ 70
- ✅ Complexity ≤ 10 (per function)
- ✅ Duplication ≤ 5%

**Evidence Tool**: {SonarQube, CodeClimate, etc. if used}

---

## Acceptance Criteria Status

From requirements/PM:

### Criterion 1: {Acceptance criterion}
- **Status**: ✅ Met / ⏳ Pending / ❌ Not met
- **Evidence**: {How/where this is validated}
- **Tests**: `{test name}` in `{test-file}`

### Criterion 2: {Acceptance criterion}
- **Status**: ✅ Met
- **Evidence**: {Validation details}
- **Tests**: {Tests covering this}

### Criterion 3: {Acceptance criterion}
- **Status**: ✅ Met
- **Evidence**: {Validation details}

**Overall AC Status**: ✅ All met / ⏳ {X} pending / ❌ {Y} not met

---

## Definition of Done Status

### MUST Have (Blocking) ⛔

From wolf-governance:

- [x] **All tests passing** (unit + integration)
  - Evidence: Test output above ✅

- [x] **Code review approved** (by different agent)
  - Status: ⏳ Pending (will request code-reviewer-agent)

- [x] **Documentation updated** (README, API docs, CHANGELOG)
  - README: ✅ Updated (sections: {list})
  - API docs: ✅ Updated / ℹ️ Not applicable
  - CHANGELOG: ✅ Updated

- [x] **Journal entry created** (`YYYY-MM-DD-{task-slug}.md`)
  - Path: `{journal-file-path}`

- [x] **CI/CD checks green**
  - Status: ✅ All passing / ⏳ Pending full suite

---

### SHOULD Have (Recommended) ⚠️

- [x] **Performance acceptable** (no regressions)
  - Evidence: Benchmarks above ✅ / ℹ️ Not applicable

- [x] **Security scan clean** (0 critical, ≤5 high)
  - Evidence: Security metrics above ✅ / ℹ️ Not applicable

- [x] **Accessibility validated** (if UI changes)
  - Evidence: {axe-core scan, manual testing} / ℹ️ Not applicable

---

### Archetype-Specific Requirements

**Archetype**: {archetype-name}

**Requirements** (from wolf-archetypes):

- [x] {Archetype requirement 1}
  - Evidence: {How met}

- [x] {Archetype requirement 2}
  - Evidence: {How met}

---

## Lens Validation (if applicable)

### {Lens Name} (e.g., Security Lens)

**Requirements**:
- [ ] {Lens requirement 1}
- [ ] {Lens requirement 2}

**Evidence**:
- {Evidence showing lens requirements met}

**Status**: ✅ Validated / ⏳ Pending / ℹ️ Not applicable

---

## Documentation Artifacts

### README.md
- **Status**: ✅ Updated / ℹ️ No changes needed
- **Sections Updated**:
  - {Section 1}: {What changed}
  - {Section 2}: {What changed}

### API Documentation
- **Status**: ✅ Updated / ℹ️ Not applicable
- **Location**: {docs/ folder, inline comments, etc.}
- **Changes**: {What was documented}

### CHANGELOG.md
- **Status**: ✅ Updated
- **Version**: {version number}
- **Entry**:
  ```
  ## [{version}] - {YYYY-MM-DD}
  ### Added
  - {feature description}

  ### Changed
  - {change description}
  ```

### Journal Entry
- **Path**: `{journal-file-path}`
- **Contents Summary**:
  - Problems encountered: {count}
  - Decisions made: {count}
  - Learnings captured: {count}

---

## Handoff Checklist

### For code-reviewer-agent

- [x] **All evidence collected** (tests, coverage, CI, security)
- [x] **Acceptance criteria met** (all ✅ or documented exceptions)
- [x] **Documentation complete** (README, API, CHANGELOG, journal)
- [x] **Code quality verified** (linting, type checking, no TODOs)
- [x] **Ready for review** (no blockers)

### PR Preparation

- [x] **Branch created**: `{branch-name}`
- [x] **Commits clean**: {commit strategy - squashed/atomic}
- [x] **Commit messages**: Follow convention
- [x] **No merge conflicts**: Confirmed

---

## PR Summary (Draft)

### PR Title
`{phase}/{shard}: {Feature title}`

**Example**: `48/48.6: Add JWT refresh token support`

### PR Description (Draft)

```markdown
## Summary
{1-3 sentence description of what this PR does}

## Changes
- {Change 1}
- {Change 2}
- {Change 3}

## Testing
- ✅ {X} unit tests added
- ✅ {Y} integration tests added
- ✅ All tests passing
- ✅ Coverage: {percentage}

## Evidence
- **Tests**: See test output in verification checkpoint
- **Coverage**: {link or see checkpoint}
- **CI**: {link to CI run}
- **Journal**: `{journal-file-path}`

## Acceptance Criteria
- [x] {AC 1}
- [x] {AC 2}
- [x] {AC 3}

## Review Checklist
- [ ] Code follows project standards
- [ ] Tests are comprehensive
- [ ] Documentation is clear
- [ ] No security vulnerabilities
- [ ] Performance is acceptable

## Related Issues
Closes #{issue-number}
```

---

## Known Issues / Technical Debt

### Issue 1: {Issue description}
- **Impact**: {Who/what is affected}
- **Severity**: Low / Medium / High
- **Plan**: {Will fix in follow-up PR / Accepted / Tracked in issue #{X}}

### Issue 2: {Issue description}
- **Impact**: {Description}
- **Plan**: {Resolution plan}

### Technical Debt
- **{Debt item 1}**: {What needs refactoring/improvement}
  - **Priority**: Low / Medium / High
  - **Effort**: {X} hours
  - **Issue**: #{issue-number if tracked}

---

## Follow-up Work

### Immediate Follow-ups (This Sprint)
1. {Task 1 that must be done soon}
2. {Task 2}

### Future Enhancements (Backlog)
1. {Enhancement idea 1}
2. {Enhancement idea 2}

### Questions for Review
1. {Question 1 for code-reviewer or architect}
2. {Question 2}

---

## Next Steps

### Immediate Actions

1. **Create PR**
   - Command: `gh pr create --title "{title}" --body "{use draft above}"`
   - Or: Use GitHub UI

2. **Request Review from code-reviewer-agent**
   ```markdown
   @code-reviewer-agent Please review this implementation of {FEATURE_NAME}

   **Archetype**: {archetype-name}

   **Key Changes**:
   - {Change 1}
   - {Change 2}
   - {Change 3}

   **Evidence**:
   - **Journal**: `{journal-path}`
   - **Tests**: {summary}
   - **Verification**: See verification checkpoint at `.claude/context/verification-{date}-{feature}.md`

   **Questions**:
   - {Question 1 if any}
   ```

3. **Wait for Review** (DO NOT MERGE OWN PR)

---

## Verification Complete

**Status**: ✅ Ready for code review handoff

**Confidence Level**: {High/Medium/Low}
- If Low: {What's uncertain and needs review focus}

**Estimated Review Time**: {X} minutes (for reviewer)

**Blockers** (if any): {What's blocking handoff}

---

## Metrics Summary

**Token Savings** (if context compacted):
- **Before Verification**: {X}k tokens
- **After Checkpoint**: {Y}k tokens
- **Savings**: {Z}% reduction

**Effort**:
- **Exploration**: {X} hours
- **Implementation**: {Y} hours
- **Verification**: {Z} hours
- **Total**: {Total} hours

**Quality**:
- **Test Coverage**: {percentage}
- **Code Quality**: {score/100}
- **AC Met**: {X}/{Y}

---

*Checkpoint Created*: {YYYY-MM-DD HH:MM}
*Agent*: coder-agent
*Ready for Handoff*: Yes / No (if No, explain what's missing)
*Can Resume Work From This Checkpoint*: Yes / No
