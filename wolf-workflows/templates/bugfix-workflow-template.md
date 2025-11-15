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

## Documentation & API Research (WORKFLOW-LEVEL GUIDANCE)

**MANDATORY for ALL agents in this workflow**

Each agent in the workflow MUST follow their role template's documentation lookup guidance:

### Before Starting Each Phase:

**pm-agent (Phase 1 - Bug Triage)**:
- WebSearch for known issues, bug reports, similar bugs in issue trackers
- Check library/framework changelogs for recently fixed bugs
- Search for workarounds or official statements from maintainers
- Verify if bug is already reported upstream (GitHub issues, Stack Overflow)

**research-agent (Phase 2 - Root Cause Analysis)** [if applicable]:
- WebSearch for root cause analysis patterns, debugging techniques (if complex bug)
- Search for similar bugs in other projects ("X bug pattern Y framework")
- Check for architectural anti-patterns related to the bug type
- Verify framework/library versions and known issues in current version

**architect-lens-agent** [if architectural review needed]:
- WebSearch for architectural anti-patterns related to the bug
- Check for design pattern violations that may have caused the bug
- Verify architectural best practices for bug prevention

**coder-agent (Phase 3 - Fix Implementation)**:
- **CRITICAL**: WebSearch for library bug fixes, patches, workarounds in current versions
- Query format: "{library} {version} bug fix 2025" or "{library} issue #{number}"
- Check if upstream fix exists (can adopt instead of custom fix)
- Verify breaking changes in newer versions that might fix the bug
- **Model cutoff is January 2025** - bug may already be fixed upstream

**qa-agent (Phase 4 - Regression Testing)**:
- WebSearch for regression testing patterns, bug reproduction techniques
- Check testing framework documentation for edge case testing methods
- Verify test coverage tools and regression prevention techniques

**code-reviewer-agent (Phase 5)**:
- Reference latest coding standards that prevent this bug class
- Verify against current framework recommendations for bug prevention
- Check for similar bugs in codebase (use Grep/WebSearch patterns)

**devops-agent** [if production debugging needed]:
- WebSearch for production debugging tools, log analysis techniques
- Check monitoring/observability best practices for bug detection
- Verify deployment rollback procedures

**Why This Matters**: Model knowledge cutoff is January 2025. Bugs may already be fixed upstream, workarounds may exist, or new debugging techniques may be available. 2-5 minutes of documentation lookup per phase prevents hours of reinventing solutions.

---

## Git/GitHub Workflow Strategy (WORKFLOW-LEVEL)

**Branch Strategy for Bugfix Workflows**:

### 1. Create Bugfix Branch at Start (Phase 2 or 3)
```bash
# For regular bugs:
git checkout -b fix/{issue-id}-{bug-name}

# For critical production bugs:
git checkout -b hotfix/{issue-id}-{bug-name}
```

**When**: After bug reproduced (before root cause analysis or fix implementation)
**Who**: research-agent or coder-agent (whichever handles root cause analysis)
**Why**: Single branch for entire workflow prevents merge conflicts between agents

### 2. Draft PR at Fix Implementation Start (Phase 3)
```bash
gh pr create --draft \
  --title "[FIX] {Bug Title}" \
  --body "Bugfix in progress. Root cause: {summary}. See workflow: docs/workflows/{filename}.md"

# For critical hotfixes:
gh pr create --draft \
  --title "[HOTFIX] {Bug Title}" \
  --body "Critical production bugfix. See workflow: docs/workflows/{filename}.md"
```

**When**: coder-agent starts fix implementation (Phase 3)
**Who**: coder-agent
**Why**: Early visibility, tracks progress, enables continuous review

### 3. Update PR Throughout Workflow
- **After root cause analysis (Phase 2)**: Add root cause explanation to PR description
- **During fix implementation (Phase 3)**: Push commits incrementally with regression test
- **After regression testing (Phase 4)**: Add test results to PR description
- **After code review (Phase 5)**: Mark PR ready, request final approval

### 4. Mark PR Ready for Review (Phase 5)
```bash
gh pr ready  # Converts draft to ready for review
```

**When**: After qa-agent regression testing passes (before code-reviewer-agent)
**Who**: qa-agent or coder-agent
**Why**: Signals workflow completion, triggers final review

### 5. Merge After Approval (Phase 5 Complete)
```bash
gh pr merge --squash  # or --merge or --rebase based on project conventions
```

**When**: After code-reviewer-agent approval
**Who**: code-reviewer-agent (has merge authority)
**Why**: Clean history, verified quality

### Hotfix Fast-Track Exception
**For CRITICAL (P0) production bugs**:
- May create PR directly (skip draft phase)
- May bypass research phase if root cause is obvious
- May expedite review (same-day turnaround)
- **MUST** still include regression test (no exceptions)
- **MUST** document root cause (even if expedited)

**NEVER**:
- ❌ Commit directly to main/master/develop (even for hotfixes)
- ❌ Create PR when "done" (create DRAFT PR early)
- ❌ Skip draft PR phase unless critical hotfix (early visibility is critical)
- ❌ Use `git` when `gh` CLI available (prefer `gh pr create`, `gh pr ready`)
- ❌ Skip regression test for "simple" bugs (always add regression test)

---

## Incremental Bugfix Delivery (WORKFLOW-LEVEL)

**Breaking Bugfixes Into Reviewable Increments**:

### Why Incremental Delivery Matters for Bugfix Workflows

**Problem**: Complex bugs can produce large fixes spanning multiple components, causing:
- Long investigation cycles (unclear progress)
- Large PRs that are hard to review
- Risk of introducing new bugs while fixing old ones
- Delayed feedback on fix approach

**Solution**: Break bugfix into 1-2 day increments (shards), each independently valuable and testable.

---

### Incremental Patterns for Bugfix Workflows

**Pattern 1: Isolate-Fix-Verify-Prevent** (Recommended for Most Bugs)
```
Shard 1 (1 day): Isolate root cause + add reproduction test
  - Phases: PM (triage) → Research (root cause) → Coder (failing test)
  - Deliverable: Understood problem + failing test that demonstrates bug
  - Can deploy: No (test fails, but problem is understood)

Shard 2 (1 day): Fix the bug
  - Phases: Coder (minimal fix) → QA (verify fix)
  - Deliverable: Reproduction test now passes, bug fixed
  - Can deploy: Yes (minimal fix, regression test passing)

Shard 3 (1 day): Prevent recurrence
  - Phases: Coder (defensive checks) → QA (edge cases) → Review
  - Deliverable: Robust fix with edge case coverage
  - Can deploy: Yes (production-ready)
```

**Benefits**:
- ✅ Shard 1 can be reviewed for correctness of root cause analysis
- ✅ Shard 2 delivers minimal working fix quickly
- ✅ Shard 3 adds robustness without rushing

**Pattern 2: Critical vs Non-Critical Fixes** (Hotfix + Comprehensive Fix)
```
Shard 1 (4 hours): Hotfix for critical production bug
  - Phases: PM (triage) → Coder (minimal patch) → QA (smoke test)
  - Deliverable: Production working again (tactical fix)
  - Can deploy: Yes (fast-track, minimal change)
  - **Fast-track**: Skip research phase, minimal fix only

Shard 2 (1-2 days): Comprehensive fix + refactoring
  - Phases: Research (root cause) → Coder (proper fix) → QA (full tests) → Review
  - Deliverable: Address root cause properly, full test coverage
  - Can deploy: Yes (replaces tactical fix with strategic fix)
```

**Benefits**:
- ✅ Production restored immediately (Shard 1)
- ✅ Root cause addressed properly (Shard 2)
- ✅ Technical debt avoided (tactical fix replaced by strategic fix)

**Pattern 3: Multi-Component Bug** (Component-by-Component Fixes)
```
Shard 1 (1 day): Fix in Component A + regression test
  - Phases: Research (isolate to A) → Coder (fix A) → QA (test A)
  - Deliverable: Component A fixed, tested
  - Can deploy: Partial (A works, B still buggy)

Shard 2 (1 day): Fix in Component B + regression test
  - Phases: Coder (fix B) → QA (test B)
  - Deliverable: Component B fixed, tested
  - Can deploy: Partial (both A and B work independently)

Shard 3 (1 day): Integration fix + end-to-end test
  - Phases: Coder (integration) → QA (E2E tests) → Review
  - Deliverable: Full system working, comprehensive tests
  - Can deploy: Yes (complete fix)
```

**Benefits**:
- ✅ Each component fixed independently (reduces complexity)
- ✅ Easier to review (focused changes per shard)
- ✅ Integration issues caught in dedicated shard

**Pattern 4: Temporary Mitigation + Permanent Fix** (Risk Reduction)
```
Shard 1 (0.5 days): Add defensive checks / feature flag
  - Phases: Coder (add safeguards) → QA (verify mitigation)
  - Deliverable: Bug mitigated (doesn't crash, logs error)
  - Can deploy: Yes (reduces blast radius while investigating)

Shard 2 (2 days): Root cause analysis + comprehensive fix
  - Phases: Research (root cause) → Coder (fix) → QA (tests) → Review
  - Deliverable: Bug fully resolved, safeguards remain
  - Can deploy: Yes (complete fix)
```

**Benefits**:
- ✅ Immediate risk reduction (Shard 1)
- ✅ Time to investigate properly (Shard 2)
- ✅ Defense-in-depth (safeguards + fix)

---

### When to Split the Bugfix Workflow

**Split BEFORE Phase 3 (Fix Implementation)** if:
- Estimated fix time > 2 days
- Bug spans multiple components (>3 files)
- Root cause analysis reveals architectural issues
- Hotfix needed immediately but comprehensive fix requires research

**How to Split**:
1. PM-agent defines acceptance criteria PER SHARD
2. Research-agent or coder-agent identifies shard boundaries (components, layers)
3. Each shard follows abbreviated workflow: (PM) → Coder → QA → (Review)
4. Shard N+1 builds on merged Shard N

**Benefits**:
- ✅ Each shard < 300 lines (reviewable in 30-60 minutes)
- ✅ Merge cycles: Hours to days (not weeks)
- ✅ Early validation of fix approach
- ✅ Reduced risk of introducing regressions
- ✅ Clear progress tracking (shard-by-shard)

**Special Case: Hotfix Fast-Track**
- **When**: CRITICAL (P0) production bugs
- **Pattern**: Single shard, minimal fix, expedited review
- **Follow-up**: Comprehensive fix in separate PR after production restored

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

### Bugfix Process Red Flags

If you catch yourself thinking:

- ❌ **"Skip reproduction, just fix what looks wrong"** - STOP. Reproduction is mandatory. Can't fix what you can't reproduce.
- ❌ **"Root cause doesn't matter, just patch the symptom"** - DANGEROUS. Symptom fixes don't prevent recurrence. Find root cause.
- ❌ **"No need for regression test, the bug is obvious"** - FORBIDDEN. Regression tests prevent reintroduction. Always add one.
- ❌ **"Fix looks good, skip testing"** - NO. Bugs are evidence that testing was insufficient. Test thoroughly.
- ❌ **"This fix is small, no need for review"** - Wrong. Small fixes can have large consequences. Always review.
- ❌ **"Similar bugs can be fixed later"** - NO. If you found a pattern, fix all instances now. Technical debt compounds.
- ❌ **"Intermittent bugs are too hard to debug"** - STOP. Use systematic debugging. Intermittent bugs are findable.
- ❌ **"One agent can handle triage + fix + test"** - NO. Role separation prevents overlooking issues. PM triages, coder fixes, QA validates.

---

### Documentation & API Lookup Red Flags

- ❌ **"I know what caused this bug without checking"** - DANGEROUS. WebSearch for known issues first. Bug may be fixed upstream.
- ❌ **"This library hasn't changed, no need to check docs"** - ASSUMPTION. Bugs are often already fixed in newer versions. Verify with 2-5 min WebSearch.
- ❌ **"Documentation lookup is only for research-agent"** - NO. Every agent checks current docs: pm-agent (known issues), coder-agent (patches), qa-agent (test patterns).
- ❌ **"I'll debug by trial and error"** - WASTE. 2 min WebSearch for "{library} {bug pattern} fix" beats hours of guessing.
- ❌ **"Our version is old, new docs don't apply"** - WRONG. New docs show bug evolution, workarounds, migration paths. Essential context.

---

### Git/GitHub Workflow Red Flags

- ❌ **"Hotfix directly to main/master"** - FORBIDDEN. Even critical bugs need branches: `hotfix/{issue-id}-{name}`, then PR.
- ❌ **"Create PR when fix is done"** - BACKWARDS. Create DRAFT PR at Phase 3 start (fix implementation begins).
- ❌ **"Skip draft PR for simple bugs"** - NO. Draft PR tracks progress, enables early review feedback, prevents duplicate work.
- ❌ **"Use `git commit` and `git push` for bugfix workflow"** - SUBOPTIMAL. Prefer `gh pr create --draft --title "[FIX] ..."`, `gh pr ready`.
- ❌ **"Hotfixes can skip PR process entirely"** - DANGEROUS. Hotfixes MUST have PR (even if expedited). Bypass review = introduce new bugs under pressure.

---

### Incremental Delivery Red Flags

- ❌ **"This bug is too urgent to break into shards"** - FALSE. Pattern 2 (Hotfix + Comprehensive Fix) = fast tactical fix (Shard 1) + proper fix (Shard 2).
- ❌ **"Fix everything related in one big PR"** - NO. Multi-component bugs split into component shards (Pattern 3). Each shard < 300 lines.
- ❌ **"We'll ship the full fix or nothing"** - RISKY. Pattern 4 (Mitigation + Fix) = deploy safeguards first (Shard 1), investigate properly (Shard 2).
- ❌ **"Breaking up bugfix delays production fix"** - BACKWARDS. Incremental delivery ACCELERATES production fix (Shard 1 ships in hours, comprehensive fix follows).
- ❌ **"Hotfixes don't need incremental patterns"** - WRONG. Hotfixes benefit MOST: tactical fix immediately (Shard 1), prevent recurrence later (Shard 2).

---

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

---

*Template Version: 2.1.0 - Enhanced with Documentation Lookup + Git/GitHub Workflow + Incremental Bugfix Delivery*
*Workflow Type: Multi-Agent Bug Remediation*
*Part of Wolf Skills Marketplace v2.6.0*
