# Bugfix Workflow: {BUG_TITLE}

**Workflow Type**: Bug investigation, root cause analysis, and fix implementation
**Estimated Duration**: {DURATION_ESTIMATE}
**Archetype**: bug-hunter (determined via wolf-archetypes)
**Bug Severity**: {CRITICAL | HIGH | MEDIUM | LOW}

---

## Workflow Overview

This workflow orchestrates systematic bug investigation and resolution, from root cause analysis through fix validation and regression prevention.

**Agent Chain**:
```
pm-agent (triage) → [research-agent] (root cause) → coder-agent (fix) → qa-agent (regression) → code-reviewer-agent
```

**Bug Resolution Gates**:
- ✅ Bug reproduced consistently → proceed to root cause analysis
- ✅ Root cause identified → proceed to fix implementation
- ✅ Fix validated → proceed to regression test
- ✅ Regression tests added → proceed to merge
- ✅ No new bugs introduced → merge approved

**Duration Estimate**:
- Bug triage: {TRIAGE_DURATION}
- Root cause analysis: {ROOT_CAUSE_DURATION}
- Fix implementation: {FIX_DURATION}
- Regression testing: {REGRESSION_DURATION}
- Code review: {REVIEW_DURATION}

---

## Bug Severity Levels

### CRITICAL (P0)
- System down, data loss, security breach
- **Response Time**: Immediate (< 1 hour)
- **Fix Timeline**: Same day
- **Workflow**: All phases, expedited

### HIGH (P1)
- Major feature broken, significant user impact
- **Response Time**: < 4 hours
- **Fix Timeline**: 1-3 days
- **Workflow**: All phases

### MEDIUM (P2)
- Minor feature broken, workaround exists
- **Response Time**: < 24 hours
- **Fix Timeline**: 1-2 weeks
- **Workflow**: All phases

### LOW (P3)
- Cosmetic issue, minimal impact
- **Response Time**: < 1 week
- **Fix Timeline**: Next sprint
- **Workflow**: May skip research phase if trivial

**This workflow adapts based on severity. Adjust timelines accordingly.**

---

## Phase 1: Bug Triage & Reproduction (pm-agent)

**Owner**: pm-agent
**Template**: `/wolf-roles/templates/pm-agent-template.md`

### Input
- Bug report from user, monitoring, or testing
- Error logs or stack traces
- Steps to reproduce (if available)

### pm-agent Responsibilities
- [ ] Load wolf-principles (REQUIRED)
- [ ] Determine archetype: bug-hunter (REQUIRED)
- [ ] Load wolf-governance bug triage requirements
- [ ] Classify bug severity (CRITICAL/HIGH/MEDIUM/LOW)
- [ ] Verify bug reproducibility
- [ ] Document exact steps to reproduce
- [ ] Identify affected systems/components
- [ ] Determine user impact
- [ ] Prioritize fix urgency

### Bug Triage Template
```markdown
## Bug Triage: {BUG_TITLE}

**Severity**: {CRITICAL | HIGH | MEDIUM | LOW}
**Priority**: {P0 | P1 | P2 | P3}
**Affected Systems**: {SYSTEMS}
**User Impact**: {IMPACT_DESCRIPTION}

### Bug Description:
{WHAT_IS_BROKEN_AND_WHAT_SHOULD_HAPPEN}

### Steps to Reproduce:
1. {STEP_1}
2. {STEP_2}
3. {STEP_3}

### Expected Behavior:
{WHAT_SHOULD_HAPPEN}

### Actual Behavior:
{WHAT_ACTUALLY_HAPPENS}

### Environment:
- OS: {OS}
- Browser/Client: {CLIENT}
- Version: {VERSION}
- Configuration: {CONFIG}

### Error Logs:
```
{ERROR_LOGS_OR_STACK_TRACE}
```

### Frequency:
- {ALWAYS | INTERMITTENT | ONCE}
- Reproduction rate: {PERCENTAGE}%

### Workaround (if exists):
{WORKAROUND_DESCRIPTION}

### Related Issues:
- {RELATED_ISSUE_1}
- {RELATED_ISSUE_2}
```

### Output (Handoff to research-agent or coder-agent)
```markdown
## Bug Triage Complete: {BUG_TITLE}

**Severity**: {SEVERITY}
**Priority**: {PRIORITY}
**Archetype**: bug-hunter
**Reproduced**: ✅ YES / ❌ NO

### Reproduction Steps:
1. {STEP_1}
2. {STEP_2}
3. {STEP_3}

### Expected vs Actual:
- **Expected**: {EXPECTED}
- **Actual**: {ACTUAL}

### Error Context:
- Location: {FILE_PATH:LINE_NUMBER}
- Stack trace: {STACK_TRACE_SUMMARY}

### Investigation Focus:
{WHERE_TO_START_INVESTIGATION}

**Proceed to root cause analysis.**
```

### Bug Gate 1: Bug Reproduced?
- ✅ **Yes** → Proceed to Phase 2 (Root Cause Analysis)
- ❌ **No** → Gather more information or close as unreproducible

---

## Phase 2: Root Cause Analysis (research-agent or coder-agent)

**Owner**: research-agent (complex bugs) or coder-agent (simple bugs)
**Template**: `/wolf-roles/templates/research-agent-template.md` or `/wolf-roles/templates/coder-agent-template.md`
**When to Use research-agent**: Intermittent bugs, race conditions, complex system interactions, performance degradation

### Input (from pm-agent)
- Reproduced bug with steps
- Error logs and stack traces
- Affected systems

### Root Cause Analysis Responsibilities
- [ ] Load wolf-principles (Evidence-Based Decision Making)
- [ ] Load wolf-archetypes (bug-hunter)
- [ ] Use systematic debugging (superpowers:systematic-debugging skill)
- [ ] Trace execution path to bug origin
- [ ] Identify trigger conditions
- [ ] Analyze related code and dependencies
- [ ] Review recent changes (git log, git blame)
- [ ] Test hypothesis with instrumentation
- [ ] Document root cause with evidence

### Systematic Debugging Process

**Phase 1: Investigation** (40% of time)
- [ ] Reproduce bug in controlled environment
- [ ] Add logging/debugging statements at suspected locations
- [ ] Trace execution flow from entry point to error
- [ ] Identify state when bug occurs vs when it doesn't
- [ ] Review recent commits for related changes

**Phase 2: Pattern Analysis** (30% of time)
- [ ] Check for similar bugs in issue history
- [ ] Identify common patterns (off-by-one, null pointer, race condition, etc.)
- [ ] Review error frequency and conditions
- [ ] Analyze timing (intermittent bugs suggest race conditions)

**Phase 3: Hypothesis Testing** (30% of time)
- [ ] Form hypothesis about root cause
- [ ] Design test to validate hypothesis
- [ ] Run test and observe results
- [ ] Refine hypothesis if wrong
- [ ] Repeat until root cause confirmed

### Common Bug Patterns

**Off-by-One Errors**:
```python
# Bug: range(10) goes 0-9, not 1-10
for i in range(10):
    array[i+1] = value  # CRASH when i=9
```

**Null/None Pointer Errors**:
```python
# Bug: user could be None
user = get_user(user_id)
print(user.name)  # CRASH if user is None
```

**Race Conditions**:
```python
# Bug: two threads read/write same variable
if not flag:  # Thread 1 checks
    flag = True  # Thread 2 sets flag here
    do_work()  # Thread 1 does work (both threads do work!)
```

**Resource Leaks**:
```python
# Bug: file never closed
file = open("data.txt")
data = file.read()
# Missing: file.close() - leaks file handle
```

### Output (Handoff to coder-agent)

**If Root Cause Found**:
```markdown
## Root Cause Analysis Complete: {BUG_TITLE}

**Root Cause**: {ROOT_CAUSE_DESCRIPTION}

### Bug Origin:
- **Location**: {FILE_PATH:LINE_NUMBER}
- **Introduced**: {COMMIT_HASH} ({COMMIT_DATE})
- **Why It Failed**: {FAILURE_EXPLANATION}

### Trigger Conditions:
{CONDITIONS_THAT_TRIGGER_BUG}

### Affected Code:
```{LANGUAGE}
{BUGGY_CODE_SNIPPET}
```

### Fix Strategy:
{HIGH_LEVEL_FIX_APPROACH}

### Related Issues:
- {RELATED_ISSUE_1}: Same root cause
- {RELATED_ISSUE_2}: Similar pattern

### Evidence:
- Test case demonstrating bug: {TEST_CASE}
- Instrumentation logs: {LOGS}
- Hypothesis validated: {HYPOTHESIS}

**Proceed to fix implementation.**
```

**If Root Cause Not Found** (escalation):
```markdown
## Root Cause Analysis: Escalation Required

**Bug**: {BUG_TITLE}
**Status**: Unable to determine root cause

### Investigation Summary:
- Time spent: {HOURS} hours
- Hypotheses tested: {HYPOTHESES_LIST}
- Observations: {OBSERVATIONS}

### Blockers:
{WHAT_IS_BLOCKING_ROOT_CAUSE_IDENTIFICATION}

### Recommendation:
{ADDITIONAL_INVESTIGATION_NEEDED_OR_ESCALATION}

**Escalate or continue investigation with additional resources.**
```

### Bug Gate 2: Root Cause Identified?
- ✅ **Yes** → Proceed to Phase 3 (Fix Implementation)
- ❌ **No** → Continue investigation or escalate

---

## Phase 3: Fix Implementation (coder-agent)

**Owner**: coder-agent
**Template**: `/wolf-roles/templates/coder-agent-template.md`

### Input (from research-agent or root cause analysis)
- Root cause analysis with evidence
- Buggy code location
- Fix strategy

### coder-agent Responsibilities
- [ ] Load wolf-principles (Test-First Development)
- [ ] Load wolf-archetypes (bug-hunter)
- [ ] Load wolf-governance (regression test requirements)
- [ ] Create bugfix branch: `fix/{issue-id}-{description}`
- [ ] Write regression test that fails (demonstrates bug)
- [ ] Implement minimal fix to make test pass
- [ ] Verify fix doesn't break existing tests
- [ ] Run full test suite
- [ ] Create PR with root cause explanation

### Bugfix Implementation Pattern (RED-GREEN-REFACTOR)

**Step 1: RED - Write Failing Test**
```python
def test_bug_ISSUE_123_off_by_one():
    """
    Regression test for issue #123: Off-by-one error in array indexing

    Root cause: Loop iterates 0-9 but accesses index i+1, causing crash at i=9
    """
    array = [0] * 10
    # This should NOT crash
    result = fill_array(array)  # Currently FAILS
    assert len(result) == 10
    assert result[9] == 9  # FAILS: IndexError
```

**Step 2: GREEN - Minimal Fix**
```python
# Before (buggy):
def fill_array(array):
    for i in range(len(array)):
        array[i+1] = i  # BUG: i+1 goes out of bounds
    return array

# After (fixed):
def fill_array(array):
    for i in range(len(array)):
        array[i] = i  # FIXED: Use i instead of i+1
    return array
```

**Step 3: REFACTOR - Improve (if needed)**
```python
# Refactored for clarity:
def fill_array(array):
    for index, _ in enumerate(array):
        array[index] = index
    return array
```

### Fix Validation Checklist
- [ ] Regression test added and passing
- [ ] All existing tests still passing
- [ ] Fix is minimal (doesn't change more than necessary)
- [ ] Root cause documented in PR description
- [ ] No new bugs introduced
- [ ] Performance impact assessed (if applicable)
- [ ] Edge cases handled

### Output (Handoff to qa-agent)
```markdown
## Bugfix Implementation Complete: {BUG_TITLE}

**PR**: #{PR_NUMBER}
**Branch**: fix/{issue-id}-{description}

### Root Cause:
{ROOT_CAUSE_SUMMARY}

### Fix Implemented:
{WHAT_WAS_CHANGED_AND_WHY}

### Files Changed:
- {FILE_1}: {CHANGE_DESCRIPTION}
- {FILE_2}: {CHANGE_DESCRIPTION}

### Regression Test Added:
- Test: `{TEST_FUNCTION_NAME}`
- Location: {TEST_FILE_PATH}
- Validates: {WHAT_TEST_VALIDATES}

### Test Results:
- Regression test: ✅ PASS (was FAIL before fix)
- Existing tests: ✅ {PASS_COUNT}/{TOTAL_COUNT} passing
- Coverage: {COVERAGE}%

### Side Effects:
{NONE_OR_DESCRIPTION_OF_SIDE_EFFECTS}

**Ready for regression testing.**
```

### Bug Gate 3: Fix Implemented and Tests Passing?
- ✅ **Yes** → Proceed to Phase 4 (Regression Testing)
- ❌ **No** → Continue implementation or re-analyze root cause

---

## Phase 4: Regression Testing (qa-agent)

**Owner**: qa-agent
**Template**: `/wolf-roles/templates/qa-agent-template.md`

### Input (from coder-agent)
- PR with bugfix
- Regression test
- Original bug reproduction steps

### qa-agent Responsibilities
- [ ] Load wolf-principles (Evidence-Based Decision Making)
- [ ] Load wolf-archetypes (bug-hunter)
- [ ] Load wolf-governance (regression test requirements)
- [ ] Verify bug is fixed (reproduction steps no longer trigger bug)
- [ ] Verify regression test fails on old code, passes on new code
- [ ] Run full test suite (no regressions introduced)
- [ ] Test edge cases around the fix
- [ ] Test related functionality (ensure no side effects)
- [ ] Validate fix in staging environment

### Regression Testing Checklist

**Bug Fixed Validation**:
- [ ] Original bug reproduction steps no longer trigger bug
- [ ] Regression test passes with fix
- [ ] Regression test fails without fix (validates test catches bug)

**No New Bugs Introduced**:
- [ ] All existing unit tests pass
- [ ] All existing integration tests pass
- [ ] All existing E2E tests pass
- [ ] No new test failures

**Edge Cases**:
- [ ] Boundary conditions tested (min, max, zero, negative)
- [ ] Null/None cases tested
- [ ] Empty input cases tested
- [ ] Concurrent access tested (if relevant)

**Related Functionality**:
- [ ] Functionality near the fix still works correctly
- [ ] Dependent components unaffected
- [ ] Performance not degraded

### Output (Handoff to code-reviewer-agent OR back to coder-agent if failed)

**If Regression Tests Pass**:
```markdown
## Regression Testing Complete: {BUG_TITLE}

**PR**: #{PR_NUMBER}
**Regression Result**: ✅ PASS

### Bug Status:
- Original bug: ✅ FIXED (reproduction steps no longer trigger bug)
- Regression test: ✅ PASS (validates fix)
- Regression test without fix: ❌ FAIL (validates test catches bug)

### Test Suite Results:
- Unit tests: ✅ {PASS_COUNT}/{TOTAL_COUNT} passing (no regressions)
- Integration tests: ✅ {PASS_COUNT}/{TOTAL_COUNT} passing
- E2E tests: ✅ {PASS_COUNT}/{TOTAL_COUNT} passing

### Edge Cases Tested:
- {EDGE_CASE_1}: ✅ PASS
- {EDGE_CASE_2}: ✅ PASS
- {EDGE_CASE_3}: ✅ PASS

### Related Functionality:
- {RELATED_FUNCTION_1}: ✅ Still working
- {RELATED_FUNCTION_2}: ✅ Still working

### Staging Validation:
- Deployed to staging: ✅ YES
- Staging tests: ✅ PASS

**Ready for code review and merge.**
```

**If Regression Tests Fail**:
```markdown
## Regression Testing Failed: {BUG_TITLE}

**PR**: #{PR_NUMBER}
**Regression Result**: ❌ FAIL

### Issues Found:
1. **{ISSUE_1}**: {DESCRIPTION}
   - Test: {TEST_NAME}
   - Expected: {EXPECTED}
   - Actual: {ACTUAL}

2. **{ISSUE_2}**: {DESCRIPTION}
   - Test: {TEST_NAME}
   - Expected: {EXPECTED}
   - Actual: {ACTUAL}

### Analysis:
{WHY_FIX_INTRODUCED_REGRESSIONS}

### Required Changes:
1. {CHANGE_1}
2. {CHANGE_2}

**PR blocked. Return to coder-agent for fix revision.**
```

### Bug Gate 4: Regression Tests Passing?
- ✅ **Yes** → Proceed to Phase 5 (Code Review)
- ❌ **No** → Return to coder-agent for fix revision, then re-test

---

## Phase 5: Code Review (code-reviewer-agent)

**Owner**: code-reviewer-agent

### Input (from qa-agent)
- PR with bugfix and passing regression tests
- Root cause analysis
- Test results

### code-reviewer-agent Responsibilities
- [ ] Load wolf-principles (Advisory-First Enforcement)
- [ ] Load wolf-governance (review standards)
- [ ] Review fix implementation (minimal, correct)
- [ ] Validate root cause analysis
- [ ] Verify regression test quality
- [ ] Check for similar bugs elsewhere in codebase
- [ ] Assess long-term maintainability
- [ ] Approve or request improvements

### Code Review Checklist for Bugfixes
- [ ] Fix addresses root cause (not just symptoms)
- [ ] Fix is minimal (doesn't change more than necessary)
- [ ] Regression test is comprehensive
- [ ] Regression test will catch bug if reintroduced
- [ ] No similar bugs exist elsewhere
- [ ] Code is more robust after fix
- [ ] Documentation updated (if bug was due to misunderstanding)

### Output

**If Approved**:
```markdown
## Code Review Complete: {BUG_TITLE}

**PR**: #{PR_NUMBER}
**Review Result**: ✅ APPROVED

### Review Summary:
- Root Cause: ✅ Correctly identified and addressed
- Fix Quality: ✅ Minimal and correct
- Regression Test: ✅ Comprehensive, will catch reintroduction
- Side Effects: ✅ None identified

### Codebase Health:
- Similar bugs checked: ✅ None found
- Code robustness: ✅ Improved

### Lessons Learned:
{LESSONS_TO_PREVENT_SIMILAR_BUGS_IN_FUTURE}

**Approved for merge. Bug resolved.**
```

**If Changes Requested**:
```markdown
## Code Review: Improvements Required

**PR**: #{PR_NUMBER}
**Review Result**: ⚠️ IMPROVEMENTS REQUIRED

### Concerns:
1. {CONCERN_1_WITH_RATIONALE}
2. {CONCERN_2_WITH_RATIONALE}

### Suggested Improvements:
1. {IMPROVEMENT_1}
2. {IMPROVEMENT_2}

### Similar Bugs Found:
- {LOCATION_1}: Similar pattern, should be fixed
- {LOCATION_2}: Similar pattern, should be fixed

**Return to coder-agent for improvements.**
```

### Bug Gate 5: Code Review Approved?
- ✅ **Yes** → Merge and monitor
- ❌ **No** → Return to coder-agent for improvements, then re-review

---

## Bugfix Workflow Completion Checklist

### Bug Resolution ✅
- [ ] Bug reproduced consistently
- [ ] Root cause identified with evidence
- [ ] Fix implemented (minimal, correct)
- [ ] Regression test added and passing
- [ ] No new bugs introduced
- [ ] Code review approved
- [ ] PR merged to main

### Testing ✅
- [ ] Regression test fails without fix (validates test)
- [ ] Regression test passes with fix
- [ ] All existing tests pass (no regressions)
- [ ] Edge cases tested
- [ ] Staging validation complete

### Documentation ✅
- [ ] Root cause documented in PR
- [ ] Fix explanation clear
- [ ] Lessons learned captured
- [ ] Related bugs identified
- [ ] Journal entry created

### Prevention ✅
- [ ] Similar bugs checked and addressed
- [ ] Process improvement identified (if applicable)
- [ ] Documentation updated (if bug due to misunderstanding)

---

## Red Flags - STOP

If you catch yourself thinking:

- ❌ **"Skip reproduction, just fix what looks wrong"** - STOP. Reproduction is mandatory. Can't fix what you can't reproduce.
- ❌ **"Root cause doesn't matter, just patch the symptom"** - DANGEROUS. Symptom fixes don't prevent recurrence. Find root cause.
- ❌ **"No need for regression test, the bug is obvious"** - FORBIDDEN. Regression tests prevent reintroduction. Always add one.
- ❌ **"Fix looks good, skip testing"** - NO. Bugs are evidence that testing was insufficient. Test thoroughly.
- ❌ **"This fix is small, no need for review"** - Wrong. Small fixes can have large consequences. Always review.
- ❌ **"Similar bugs can be fixed later"** - NO. If you found a pattern, fix all instances now. Technical debt compounds.
- ❌ **"Intermittent bugs are too hard to debug"** - STOP. Use systematic debugging. Intermittent bugs are findable.

**STOP. Use wolf-governance to verify bugfix quality requirements.**

---

## Success Criteria

### Bug Fixed ✅
- [ ] Original bug no longer reproducible
- [ ] Root cause identified and documented
- [ ] Fix is minimal and correct
- [ ] No side effects or regressions
- [ ] Code more robust after fix

### Testing Complete ✅
- [ ] Regression test added
- [ ] Regression test validates fix
- [ ] All existing tests pass
- [ ] Edge cases tested
- [ ] Staging validation successful

### Quality Validated ✅
- [ ] Root cause documented
- [ ] Fix reviewed and approved
- [ ] Similar bugs checked
- [ ] Lessons learned captured
- [ ] Prevention measures identified

---

**Bugfix Duration**: {TOTAL_DURATION}
**Root Cause Time**: {ROOT_CAUSE_DURATION}
**Fix Time**: {FIX_DURATION}

**Bug {BUG_TITLE} successfully resolved and prevented from recurring.**
