# Feature Development Workflow: {FEATURE_NAME}

**Workflow Type**: Complete feature development lifecycle
**Estimated Duration**: {DURATION_ESTIMATE}
**Archetype**: {ARCHETYPE} (determined via wolf-archetypes)
**Lenses Applied**: {LENSES} (e.g., performance, security, accessibility)

---

## Workflow Overview

This workflow orchestrates multiple agents through a complete feature development cycle, from requirements definition through deployment.

**Agent Chain**:
```
pm-agent → [research-agent] → architect-lens-agent → coder-agent → qa-agent → code-reviewer-agent → [devops-agent]
```

**Decision Gates**:
- ✅ Requirements approved → proceed to design
- ✅ Design approved → proceed to implementation
- ✅ Tests passing → proceed to review
- ✅ Review approved → proceed to merge
- ✅ Merge complete → [optional] proceed to deployment

**Duration Estimate**:
- Requirements: {PM_DURATION}
- Research (optional): {RESEARCH_DURATION}
- Design: {DESIGN_DURATION}
- Implementation: {IMPLEMENTATION_DURATION}
- Testing: {QA_DURATION}
- Review: {REVIEW_DURATION}
- Deployment (optional): {DEPLOYMENT_DURATION}

---

## Phase 1: Requirements Definition (pm-agent)

**Owner**: pm-agent
**Template**: `/wolf-roles/templates/pm-agent-template.md`

### Input
- Feature request from stakeholder
- Business context and goals
- User stories or use cases

### pm-agent Responsibilities
- [ ] Load wolf-principles (REQUIRED)
- [ ] Determine archetype via wolf-archetypes (REQUIRED)
- [ ] Load wolf-governance requirements (REQUIRED)
- [ ] Define acceptance criteria
- [ ] Identify applicable lenses (performance, security, accessibility, observability)
- [ ] Document user stories
- [ ] Prioritize requirements (MoSCoW: Must/Should/Could/Won't)
- [ ] Estimate scope and effort

### Output (Handoff to architect-lens-agent or research-agent)
```markdown
## Feature Requirements: {FEATURE_NAME}

**Archetype**: {ARCHETYPE}
**Lenses**: {LENSES}
**Priority**: {PRIORITY}

### User Stories:
- As a {USER_TYPE}, I want {GOAL} so that {BENEFIT}
- As a {USER_TYPE}, I want {GOAL} so that {BENEFIT}

### Acceptance Criteria:
- [ ] {CRITERION_1}
- [ ] {CRITERION_2}

### Non-Functional Requirements:
- Performance: {PERFORMANCE_REQUIREMENTS}
- Security: {SECURITY_REQUIREMENTS}
- Accessibility: {ACCESSIBILITY_REQUIREMENTS}

### Constraints:
{CONSTRAINTS}

### Out of Scope:
{OUT_OF_SCOPE}
```

### Decision Gate 1: Requirements Approved?
- ✅ **Yes** → Proceed to Phase 2 (Research) or Phase 3 (Design)
- ❌ **No** → Refine requirements with pm-agent

---

## Phase 2: Research & Feasibility (research-agent) [OPTIONAL]

**Owner**: research-agent
**Template**: `/wolf-roles/templates/research-agent-template.md`
**When to Use**: Complex features requiring technical investigation, performance analysis, or technology evaluation

### Input (from pm-agent)
- Feature requirements
- Research question or technical unknowns
- Time-box duration (typically 2-8 hours)

### research-agent Responsibilities
- [ ] Load wolf-principles (Research-Before-Code)
- [ ] Load wolf-archetypes (research-prototyper)
- [ ] Create research branch: `research/{feature-name}`
- [ ] Investigate technical approaches (minimum 3 alternatives)
- [ ] Build proof-of-concept
- [ ] Run benchmarks/performance tests
- [ ] Document findings in research report
- [ ] Recommend approach with rationale

### Output (Handoff to architect-lens-agent)
```markdown
## Research Complete: {FEATURE_NAME}

**Time Spent**: {HOURS} hours
**Branch**: research/{feature-name}

### Recommendation:
Use {APPROACH_NAME} because {RATIONALE}

### Alternatives Evaluated:
| Approach | Performance | Complexity | Maintainability | Recommendation |
|----------|-------------|------------|-----------------|----------------|
| Approach 1 | {SCORE} | {SCORE} | {SCORE} | ✅ Recommended |
| Approach 2 | {SCORE} | {SCORE} | {SCORE} | ❌ Rejected |
| Approach 3 | {SCORE} | {SCORE} | {SCORE} | ❌ Rejected |

### Evidence:
- Proof-of-concept: {POC_LINK}
- Benchmarks: {BENCHMARK_RESULTS}
- Full report: docs/research/{filename}.md

### Next Steps for Architecture:
1. Review research report
2. Create ADR based on findings
3. Provide implementation guidance to coder-agent
```

### Decision Gate 2: Research Findings Approved?
- ✅ **Yes** → Proceed to Phase 3 (Design)
- ❌ **No** → Additional research or re-evaluate feature feasibility

---

## Phase 3: Architecture Design (architect-lens-agent)

**Owner**: architect-lens-agent
**Template**: `/wolf-roles/templates/architect-agent-template.md`

### Input (from pm-agent or research-agent)
- Feature requirements
- Research findings (if research phase completed)
- Constraints and non-functional requirements

### architect-lens-agent Responsibilities
- [ ] Load wolf-principles (Artifact-First Development)
- [ ] Load wolf-archetypes and confirm archetype
- [ ] Load wolf-governance (ADR requirements)
- [ ] Load wolf-roles architect-lens-agent guidance
- [ ] Review current architecture
- [ ] Design component structure and interactions
- [ ] Create component diagram
- [ ] Evaluate alternatives (minimum 3)
- [ ] Document decision in ADR
- [ ] Create implementation guidance for coder-agent

### Output (Handoff to coder-agent)
```markdown
## Architecture Design Complete: {FEATURE_NAME}

**ADR**: ADR-XXX-{title}.md

### Architecture Overview:
{HIGH_LEVEL_OVERVIEW}

### Components to Implement:
1. **{COMPONENT_1}**
   - Location: {FILE_PATH}
   - Interfaces: {INTERFACES}
   - Dependencies: {DEPENDENCIES}
   - Implementation notes: {NOTES}

2. **{COMPONENT_2}**
   - Location: {FILE_PATH}
   - Interfaces: {INTERFACES}
   - Dependencies: {DEPENDENCIES}

### Patterns to Follow:
- {PATTERN_1}: {EXAMPLE}
- {PATTERN_2}: {EXAMPLE}

### Implementation Order:
1. {STEP_1}
2. {STEP_2}
3. {STEP_3}

### Testing Considerations:
- {TESTING_GUIDANCE_1}
- {TESTING_GUIDANCE_2}

**Ready for implementation.**
```

### Decision Gate 3: Design Approved?
- ✅ **Yes** → Proceed to Phase 4 (Implementation)
- ❌ **No** → Refine design with architect-lens-agent

---

## Phase 4: Implementation (coder-agent)

**Owner**: coder-agent
**Template**: `/wolf-roles/templates/coder-agent-template.md`

### Input (from architect-lens-agent)
- Architecture design and ADR
- Component specifications
- Implementation order
- Patterns to follow

### coder-agent Responsibilities
- [ ] Load wolf-principles (Test-First Development)
- [ ] Load wolf-archetypes and confirm archetype
- [ ] Load wolf-governance (quality gates)
- [ ] Load wolf-roles coder-agent guidance
- [ ] Create feature branch: `feature/{feature-name}`
- [ ] Write tests FIRST (TDD)
- [ ] Implement components following architecture
- [ ] Apply lenses (performance, security, accessibility, observability)
- [ ] Run tests and ensure passing
- [ ] Create PR with detailed description

### Output (Handoff to qa-agent)
```markdown
## Implementation Complete: {FEATURE_NAME}

**PR**: #{PR_NUMBER}
**Branch**: feature/{feature-name}

### What Was Implemented:
- {COMPONENT_1}: {DESCRIPTION_AND_FILE_PATH}
- {COMPONENT_2}: {DESCRIPTION_AND_FILE_PATH}

### Acceptance Criteria Status:
- [x] {CRITERION_1} - Implemented in {FILE_PATH}
- [x] {CRITERION_2} - Implemented in {FILE_PATH}

### Tests Added:
- Unit tests: {UNIT_TEST_COUNT} tests, {COVERAGE}% coverage
- Integration tests: {INTEGRATION_TEST_COUNT} tests
- E2E tests: {E2E_TEST_COUNT} scenarios

### Lenses Applied:
- {LENS_1}: {IMPLEMENTATION_DETAILS}
- {LENS_2}: {IMPLEMENTATION_DETAILS}

### Design Decisions:
- {DECISION_1_WITH_RATIONALE}
- {DECISION_2_WITH_RATIONALE}

### Files Changed:
{FILES_CHANGED_LIST}

**Ready for QA validation.**
```

### Decision Gate 4: Implementation Complete?
- ✅ **Yes** → Proceed to Phase 5 (Testing)
- ❌ **No** → Continue implementation or clarify requirements

---

## Phase 5: Quality Assurance (qa-agent)

**Owner**: qa-agent
**Template**: `/wolf-roles/templates/qa-agent-template.md`

### Input (from coder-agent)
- PR number and implementation details
- Acceptance criteria to validate
- Lenses applied
- Test coverage report

### qa-agent Responsibilities
- [ ] Load wolf-principles (Evidence-Based Decision Making)
- [ ] Load wolf-archetypes and confirm archetype
- [ ] Load wolf-governance (quality gates)
- [ ] Load wolf-roles qa-agent guidance
- [ ] Checkout PR branch
- [ ] Run Fast-Lane tests (5-10 min): ≥60% coverage, ≤5 linting errors
- [ ] Run Full-Suite tests (30-60 min): 90% E2E success, perf ≥70/100
- [ ] Execute lens-specific tests (performance, security, accessibility, observability)
- [ ] Validate acceptance criteria
- [ ] Test edge cases and error conditions
- [ ] Document test results

### Output (Handoff to code-reviewer-agent OR back to coder-agent if failed)

**If Tests Pass**:
```markdown
## Test Validation Complete: {FEATURE_NAME}

**PR**: #{PR_NUMBER}
**QA Result**: ✅ PASS

### Test Results:
- Fast-Lane: ✅ {DURATION}min, {COVERAGE}% coverage, {LINTING_ERRORS} linting errors
- Full-Suite: ✅ {DURATION}min, {E2E_SUCCESS_RATE}% E2E success, perf {PERF_SCORE}/100

### Lens Tests:
- {LENS_1}: ✅ {RESULT}
- {LENS_2}: ✅ {RESULT}

### Acceptance Criteria Validation:
- [x] {CRITERION_1}: ✅ Validated
- [x] {CRITERION_2}: ✅ Validated

### Edge Cases Tested:
- {EDGE_CASE_1}: ✅ Pass
- {EDGE_CASE_2}: ✅ Pass

**Ready for final code review and merge.**
```

**If Tests Fail**:
```markdown
## Test Validation Failed: {FEATURE_NAME}

**PR**: #{PR_NUMBER}
**QA Result**: ❌ FAIL

### Failed Tests:
1. {TEST_NAME}: {FAILURE_REASON}
2. {TEST_NAME}: {FAILURE_REASON}

### Issues Found:
1. {ISSUE_1_WITH_DETAILS}
2. {ISSUE_2_WITH_DETAILS}

### Required Changes:
1. {CHANGE_1}
2. {CHANGE_2}

**PR blocked until issues resolved. Returning to coder-agent.**
```

### Decision Gate 5: Tests Passing?
- ✅ **Yes** → Proceed to Phase 6 (Code Review)
- ❌ **No** → Return to coder-agent for fixes, then re-test

---

## Phase 6: Code Review (code-reviewer-agent)

**Owner**: code-reviewer-agent
**Template**: Use superpowers:code-reviewer via Task tool

### Input (from qa-agent)
- PR number with passing tests
- Test results and coverage
- Implementation details

### code-reviewer-agent Responsibilities
- [ ] Load wolf-principles (Advisory-First Enforcement)
- [ ] Load wolf-governance (review standards)
- [ ] Review code quality and architecture alignment
- [ ] Validate against original requirements
- [ ] Check for security vulnerabilities
- [ ] Verify test coverage and quality
- [ ] Assess maintainability and readability
- [ ] Approve or request changes

### Output

**If Approved**:
```markdown
## Code Review Complete: {FEATURE_NAME}

**PR**: #{PR_NUMBER}
**Review Result**: ✅ APPROVED

### Review Summary:
- Architecture: ✅ Follows ADR-XXX design
- Code Quality: ✅ Clean, maintainable, well-documented
- Security: ✅ No vulnerabilities found
- Tests: ✅ {COVERAGE}% coverage, comprehensive
- Requirements: ✅ All acceptance criteria met

### Highlights:
- {POSITIVE_1}
- {POSITIVE_2}

### Minor Suggestions (non-blocking):
- {SUGGESTION_1}
- {SUGGESTION_2}

**Approved for merge.**
```

**If Changes Requested**:
```markdown
## Code Review: Changes Requested

**PR**: #{PR_NUMBER}
**Review Result**: ⚠️ CHANGES REQUESTED

### Required Changes:
1. {CHANGE_1_WITH_RATIONALE}
2. {CHANGE_2_WITH_RATIONALE}

### Optional Improvements:
- {IMPROVEMENT_1}
- {IMPROVEMENT_2}

**Return to coder-agent for revisions.**
```

### Decision Gate 6: Code Review Approved?
- ✅ **Yes** → Proceed to merge and [optional] Phase 7 (Deployment)
- ❌ **No** → Return to coder-agent for revisions, then re-review

---

## Phase 7: Deployment (devops-agent) [OPTIONAL]

**Owner**: devops-agent
**Template**: `/wolf-roles/templates/devops-agent-template.md`
**When to Use**: Feature requires infrastructure changes, deployment configuration, or operational setup

### Input (from code-reviewer-agent)
- Merged PR
- Deployment requirements
- Infrastructure needs

### devops-agent Responsibilities
- [ ] Load wolf-principles (Guardrails Through Automation)
- [ ] Load wolf-archetypes and confirm archetype
- [ ] Load wolf-governance (deployment requirements)
- [ ] Load wolf-roles devops-agent guidance
- [ ] Create rollback plan BEFORE deploying
- [ ] Deploy to staging first
- [ ] Run smoke tests in staging
- [ ] Deploy to production (with monitoring)
- [ ] Validate with health checks
- [ ] Monitor metrics post-deployment

### Output
```markdown
## Deployment Complete: {FEATURE_NAME}

**Environment**: {ENVIRONMENT} (staging/production)
**Status**: ✅ Deployed and operational

### Deployment Details:
- Deployment Time: {TIMESTAMP}
- Deployment Method: {METHOD} (blue-green, canary, rolling, direct)
- Services Updated: {SERVICES}

### Health Checks:
- {HEALTH_CHECK_1}: ✅ Pass
- {HEALTH_CHECK_2}: ✅ Pass

### Monitoring:
- Dashboard: {DASHBOARD_URL}
- Alerts: {ALERT_CHANNELS}
- Metrics: {KEY_METRICS}

### Rollback Procedure:
{ROLLBACK_STEPS}

**Feature live and monitored.**
```

---

## Workflow Completion Checklist

### Artifacts Created ✅
- [ ] Requirements document (pm-agent)
- [ ] Research report (research-agent, if applicable)
- [ ] ADR documenting design (architect-lens-agent)
- [ ] Implementation PR (coder-agent)
- [ ] Test report (qa-agent)
- [ ] Code review (code-reviewer-agent)
- [ ] Deployment documentation (devops-agent, if applicable)
- [ ] Journal entries from each agent

### Quality Gates Passed ✅
- [ ] Requirements approved by stakeholders
- [ ] Design reviewed and ADR created
- [ ] Fast-Lane tests passing (≥60% coverage, ≤5 linting errors)
- [ ] Full-Suite tests passing (90% E2E success, perf ≥70/100)
- [ ] Lens-specific requirements met (performance, security, accessibility, observability)
- [ ] Code review approved
- [ ] PR merged to main
- [ ] Deployment successful (if applicable)

### Documentation Complete ✅
- [ ] ADR created for architectural decisions
- [ ] README updated (if public API changes)
- [ ] CHANGELOG entry added
- [ ] Runbook updated (if operational changes)
- [ ] Journal entries created

---

## Red Flags - STOP

If you catch yourself thinking:

- ❌ **"Skip research, we know the solution"** - STOP. Research-Before-Code (Principle #3). Unknown unknowns are expensive.
- ❌ **"Design during implementation"** - BACKWARDS. Architecture BEFORE code prevents costly refactors.
- ❌ **"Write code first, tests later"** - FORBIDDEN. Test-First Development (Principle #2). Tests written after = tests that pass but don't validate.
- ❌ **"QA can be skipped if developer tested"** - NO. Independent validation catches what developers miss. Always.
- ❌ **"Fast-Lane is enough, skip Full-Suite to save time"** - Wrong. Full-Suite catches integration issues Fast-Lane misses.
- ❌ **"Merge now, fix issues later"** - DANGEROUS. Failing tests = blocked PR. No exceptions.
- ❌ **"Deploy without rollback plan"** - FORBIDDEN. All deployments need rollback plans. Optimism ≠ reliability.
- ❌ **"One agent can handle multiple phases"** - NO. Role separation prevents scope creep and ensures quality.

**STOP. Use wolf-governance to verify workflow requirements.**

---

## Success Criteria

### Feature Complete ✅
- [ ] All acceptance criteria met and validated
- [ ] All lenses applied and requirements met
- [ ] No critical or high-severity bugs
- [ ] Performance within acceptable thresholds
- [ ] Security scan clean
- [ ] Accessibility compliant (if lens applied)
- [ ] Observability instrumented (if lens applied)

### Quality Validated ✅
- [ ] Test coverage ≥80% (unit), critical paths covered (integration/E2E)
- [ ] All quality gates passed (Fast-Lane + Full-Suite)
- [ ] Code review approved
- [ ] No outstanding review comments
- [ ] CI/CD pipeline green

### Deployment Successful ✅ (if applicable)
- [ ] Deployed to production
- [ ] Health checks passing
- [ ] Monitoring operational
- [ ] No errors in logs
- [ ] Rollback plan documented and tested

---

**Workflow Duration**: {TOTAL_DURATION}
**Agents Involved**: {AGENT_COUNT}
**Quality Gates Passed**: {GATES_PASSED}/{GATES_TOTAL}

**Feature {FEATURE_NAME} successfully delivered.**
