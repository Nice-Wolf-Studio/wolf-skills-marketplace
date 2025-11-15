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

## Documentation & API Research (WORKFLOW-LEVEL GUIDANCE)

**MANDATORY for ALL agents in this workflow**

Each agent in the workflow MUST follow their role template's documentation lookup guidance:

### Before Starting Each Phase:

**pm-agent (Phase 1)**:
- WebSearch for current product documentation if defining features for existing products
- Check latest API/library versions if requirements involve integrations
- Verify documentation recency (within 12 months for rapidly evolving products)

**research-agent (Phase 2)** [if applicable]:
- WebSearch for recent papers, benchmarks, industry analysis (prefer 2024-2025 sources)
- Verify framework/library versions before POC development
- Check for deprecation notices or breaking changes in technologies being evaluated

**architect-lens-agent (Phase 3)**:
- WebSearch for architectural patterns, design systems documentation
- Verify current best practices for chosen architecture (e.g., "React 19 server components patterns")
- Check for recent changes in architectural recommendations

**coder-agent (Phase 4)**:
- **CRITICAL**: WebSearch for every unfamiliar library/framework before coding
- Query format: "{library} {version} documentation 2025" or "{library} API reference"
- Check breaking changes, new features, migration guides
- **Model cutoff is January 2025** - APIs may have changed

**qa-agent (Phase 5)**:
- WebSearch for testing framework documentation (Jest, Playwright, Cypress, etc.)
- Verify current testing patterns and best practices
- Check for new assertion methods or testing utilities

**code-reviewer-agent (Phase 6)**:
- Reference latest coding standards and security best practices
- Verify against current framework recommendations

**devops-agent (Phase 7)** [if applicable]:
- **CRITICAL**: WebSearch for infrastructure tool versions (Kubernetes, Docker, Terraform)
- Check cloud provider documentation for current deployment patterns
- Verify security best practices for infrastructure

**Why This Matters**: Model knowledge cutoff is January 2025. Libraries, APIs, and best practices evolve rapidly. 2-5 minutes of documentation lookup per phase prevents hours of debugging outdated patterns.

---

## Git/GitHub Workflow Strategy (WORKFLOW-LEVEL)

**Branch Strategy for Multi-Agent Workflows**:

### 1. Create Feature Branch at Start (Phase 2 or 3)
```bash
git checkout -b feature/{feature-name}
```

**When**: After requirements approved (before design or research)
**Who**: research-agent or architect-lens-agent (whichever comes first)
**Why**: Single branch for entire workflow prevents merge conflicts between agents

### 2. Draft PR at Implementation Start (Phase 4)
```bash
gh pr create --draft \
  --title "[WIP] {Feature Name}" \
  --body "Implementation in progress. See workflow: docs/workflows/{filename}.md"
```

**When**: coder-agent starts implementation (Phase 4)
**Who**: coder-agent
**Why**: Early visibility, tracks progress, enables continuous review

### 3. Update PR Throughout Workflow
- **After design (Phase 3)**: Add ADR link to PR description
- **During implementation (Phase 4)**: Push commits incrementally
- **After QA (Phase 5)**: Add test results to PR description
- **After code review (Phase 6)**: Mark PR ready, request final approval

### 4. Mark PR Ready for Review (Phase 6)
```bash
gh pr ready  # Converts draft to ready for review
```

**When**: After qa-agent validation passes (before code-reviewer-agent)
**Who**: qa-agent or coder-agent
**Why**: Signals workflow completion, triggers final review

### 5. Merge After Approval (Phase 6 Complete)
```bash
gh pr merge --squash  # or --merge or --rebase based on project conventions
```

**When**: After code-reviewer-agent approval
**Who**: code-reviewer-agent (has merge authority)
**Why**: Clean history, verified quality

**NEVER**:
- ❌ Commit directly to main/master/develop
- ❌ Create PR when "done" (create DRAFT PR early)
- ❌ Skip draft PR phase (early visibility is critical for multi-agent workflows)
- ❌ Use `git` when `gh` CLI available (prefer `gh pr create`, `gh pr ready`)

---

## Incremental Feature Delivery (WORKFLOW-LEVEL)

**Breaking Features Into Reviewable Increments**:

### Why Incremental Delivery Matters for Multi-Agent Workflows

**Problem**: Large features spanning 7 agents can produce PRs >2000 lines, causing:
- Week-long review cycles
- Merge conflicts with parallel work
- High bug risk (too much to validate at once)
- Delayed feedback loops

**Solution**: Break feature into 2-3 day increments (shards), each independently valuable.

---

### Incremental Patterns for Feature Workflows

**Pattern 1: Layer-by-Layer** (Backend → Frontend)
```
Shard 1 (2 days): Data layer + API endpoints
  - Phases: PM → Architect → Coder → QA → Review
  - Deliverable: Working API, documented, tested
  - Can deploy: Yes (frontend uses later)

Shard 2 (2 days): Frontend integration
  - Phases: PM (refine UX) → Coder → QA → Review
  - Deliverable: UI connected to API
  - Can deploy: Yes (complete feature)
```

**Pattern 2: Vertical Slice** (Minimal Viable → Full Feature)
```
Shard 1 (2 days): Happy path end-to-end (minimal viable feature)
  - Phases: PM → Architect → Coder → QA → Review
  - Deliverable: Basic functionality works
  - Can deploy: Yes (behind feature flag if incomplete UX)

Shard 2 (2 days): Error handling + edge cases
  - Phases: PM (define edge cases) → Coder → QA → Review
  - Deliverable: Production-ready robustness
  - Can deploy: Yes (remove feature flag)

Shard 3 (1 day): Polish + UX improvements
  - Phases: PM (UX refinement) → Coder → QA → Review
  - Deliverable: Enhanced user experience
```

**Pattern 3: Feature Flag Rollout** (Backend First, Gated Release)
```
Shard 1 (2 days): Backend implementation (feature flag OFF)
  - Phases: PM → Architect → Coder → QA → Review
  - Deliverable: Backend ready, not exposed
  - Can deploy: Yes (feature flag prevents access)

Shard 2 (2 days): Frontend implementation (feature flag OFF)
  - Phases: PM → Coder → QA → Review
  - Deliverable: Full feature, gated
  - Can deploy: Yes (internal testing only)

Shard 3 (1 day): Public release (feature flag ON for all users)
  - Phases: PM (monitor metrics) → DevOps
  - Deliverable: Public availability
```

---

### When to Split the Workflow

**Split BEFORE Phase 4 (Implementation)** if:
- Estimated implementation > 3 days
- Feature touches >5 files or >500 lines
- Multiple independent components
- Research phase reveals complexity

**How to Split**:
1. PM-agent defines acceptance criteria PER SHARD
2. Architect-agent designs shard boundaries (interfaces, dependencies)
3. Each shard follows full workflow: PM → Architect → Coder → QA → Review
4. Shard N+1 builds on merged Shard N

**Benefits**:
- ✅ Each shard < 500 lines (reviewable in 1-2 hours)
- ✅ Merge cycles: Days not weeks
- ✅ Early feedback on direction
- ✅ Parallel work possible (different team members on different shards)
- ✅ Lower bug risk (smaller changes = easier validation)

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

### Workflow Process Red Flags

If you catch yourself thinking:

- ❌ **"Skip research, we know the solution"** - STOP. Research-Before-Code (Principle #3). Unknown unknowns are expensive.
- ❌ **"Design during implementation"** - BACKWARDS. Architecture BEFORE code prevents costly refactors.
- ❌ **"Write code first, tests later"** - FORBIDDEN. Test-First Development (Principle #2). Tests written after = tests that pass but don't validate.
- ❌ **"QA can be skipped if developer tested"** - NO. Independent validation catches what developers miss. Always.
- ❌ **"Fast-Lane is enough, skip Full-Suite to save time"** - Wrong. Full-Suite catches integration issues Fast-Lane misses.
- ❌ **"Merge now, fix issues later"** - DANGEROUS. Failing tests = blocked PR. No exceptions.
- ❌ **"Deploy without rollback plan"** - FORBIDDEN. All deployments need rollback plans. Optimism ≠ reliability.
- ❌ **"One agent can handle multiple phases"** - NO. Role separation prevents scope creep and ensures quality.

---

### Documentation & API Lookup Red Flags

- ❌ **"I remember how this library works"** - DANGEROUS. Model cutoff January 2025. WebSearch for current docs.
- ❌ **"This framework hasn't changed"** - ASSUMPTION. Verify with 2-5 min WebSearch before coding.
- ❌ **"Documentation lookup is for research-agent"** - NO. Research-agent = 2-8 hours (unknown unknowns). WebSearch = 2-5 minutes (known unknowns, current API syntax).
- ❌ **"I'll figure it out by trial and error"** - WASTE. 2 min WebSearch beats 20 min debugging outdated patterns.
- ❌ **"Model knowledge is good enough"** - NO. Every agent must verify current documentation for their phase's libraries.

---

### Git/GitHub Workflow Red Flags

- ❌ **"Commit directly to main/master"** - FORBIDDEN. Create feature branch at Phase 2/3 (research or architecture).
- ❌ **"Create PR when implementation is done"** - BACKWARDS. Create DRAFT PR at Phase 4 start (implementation begins).
- ❌ **"Skip draft PR, go straight to review"** - NO. Multi-agent workflows need early visibility. Draft PR tracks progress.
- ❌ **"Use `git commit` and `git push` for everything"** - SUBOPTIMAL. Prefer `gh pr create --draft`, `gh pr ready`, `gh pr merge`.
- ❌ **"Each agent creates their own branch"** - NO. Single feature branch for entire workflow (prevents merge conflicts).

---

### Incremental Delivery Red Flags

- ❌ **"This feature is too complex to break up"** - FALSE. Every feature can be broken into 2-3 day shards. Use Layer-by-Layer, Vertical Slice, or Feature Flag patterns.
- ❌ **"We'll break it up during implementation"** - TOO LATE. Split BEFORE Phase 4 (PM + Architect define shard boundaries).
- ❌ **"PRs >1000 lines are fine if tests pass"** - NO. Large PRs = week-long reviews, merge conflicts, high bug risk. Target <500 lines per shard.
- ❌ **"Let's merge all shards at once"** - DEFEATS PURPOSE. Merge each shard independently for fast feedback cycles.
- ❌ **"Backend and frontend must ship together"** - NO. Backend can ship first (API-first). Frontend follows in Shard 2.

---

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

---

*Template Version: 2.1.0 - Enhanced with Documentation Lookup + Git/GitHub Workflow + Incremental Delivery*
*Workflow Type: Multi-Agent Feature Development*
*Part of Wolf Skills Marketplace v2.6.0*
