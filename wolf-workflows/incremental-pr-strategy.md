# Incremental PR Strategy: Small, Valuable, Reviewable Changes

**Purpose**: Guide for breaking work into small, incremental PRs that provide stand-alone value without being pedantic.

**Core Principle**: Each PR should be **small enough to review in 30 minutes** but **large enough to provide real value**.

---

## The Problem with Large PRs

**Typical anti-pattern**:
```
Feature: Add user authentication with JWT refresh tokens

PR #123: [4,500 lines changed, 47 files modified]
- Add JWT library
- Implement token generation
- Add refresh token logic
- Update middleware
- Add tests (200+ tests)
- Update documentation
- Add migration scripts
- Update API
```

**Problems**:
- Reviewer fatigue (can't review 4,500 lines carefully)
- High risk (large blast radius if something breaks)
- Slow feedback (takes days to review and merge)
- Blocks other work (dependent PRs wait for this mega-PR)
- Difficult to revert (too much in one PR)

---

## The Incremental Approach

**Same feature, broken into 5 incremental PRs**:

### PR #123: [50 lines] Planning & Scaffolding
- ADR: JWT refresh token architecture
- Interface definitions
- Type definitions
- Scaffolding (empty functions, TODOs)
- **Value**: Team understands plan, can give early feedback

### PR #124: [100 lines] RED - Failing Tests
- Comprehensive test suite for token generation
- Tests for refresh logic
- Tests for middleware integration
- All tests FAIL (expected)
- **Value**: Tests define behavior, prove what "done" means

### PR #125: [150 lines] GREEN - Token Generation
- Implement token generation to pass tests
- Minimal implementation, no premature optimization
- Tests now PASS for generation
- **Value**: Core functionality works, can iterate

### PR #126: [120 lines] GREEN - Refresh Logic
- Implement refresh token rotation
- Implement token validation
- Tests now PASS for refresh flow
- **Value**: Refresh mechanism works, secure

### PR #127: [80 lines] Integration & Docs
- Wire token generation into existing auth
- Update middleware to use new tokens
- Documentation and examples
- **Value**: Feature complete and documented

**Total**: 500 lines across 5 PRs (same work, better process)

---

## The 5 Principles of Incremental PRs

### Principle 1: Each PR Provides Stand-Alone Value

**Good examples of "stand-alone value"**:
- ✅ Planning PR: Team can review architecture before code written
- ✅ RED PR: Tests define "done", serve as executable spec
- ✅ Foundation PR: Abstractions others can build on
- ✅ GREEN PR: Feature partially works, can be tested
- ✅ Integration PR: Feature fully wired, ready for users

**Bad examples (NOT stand-alone)**:
- ❌ "Part 1 of 3" with no value until Part 3 merges
- ❌ Half a function (merge would break build)
- ❌ Tests without implementation AND implementation without tests (unless TDD RED/GREEN split)

**Test**: Can this PR merge to main without breaking anything? If yes, it has stand-alone value.

---

### Principle 2: Small Enough to Review Carefully

**Size guidelines** (code only, excluding tests/docs):

**Ideal**: <200 lines of actual code
- Reviewer can read every line carefully
- Review in 15-30 minutes
- High confidence in quality

**Acceptable**: 200-500 lines
- Reviewer can review in 30-60 minutes
- Still manageable, but approaching limit

**Too large**: >500 lines
- Reviewer fatigue sets in
- Quality of review degrades
- Should be broken into smaller PRs

**Exception**: Generated code, migrations, or unavoidable bulk changes
- Mark clearly in PR: "[Generated] Add protobuf definitions"
- Provide summary of what changed
- Reviewer focuses on non-generated parts

---

### Principle 3: Logical, Not Arbitrary, Boundaries

**Good boundaries** (logical stopping points):
- ✅ After defining interfaces/types (planning)
- ✅ After writing failing tests (RED phase)
- ✅ After making tests pass (GREEN phase)
- ✅ After refactoring (REFACTOR phase)
- ✅ After one feature vertical (login complete, then registration)
- ✅ After one layer (data layer, then business logic, then API)

**Bad boundaries** (arbitrary cuts):
- ❌ "500 lines, time for a PR!" (mid-function)
- ❌ "Friday at 5pm, shipping what I have" (incomplete work)
- ❌ "Halfway through the feature" (no value yet)

---

### Principle 4: Enable Parallel Work

**Good incremental strategy enables parallelization**:

```
PR #123: ADR + Interfaces [You]
   ↓
PR #124: Failing tests [You]
   ↓
├─ PR #125: Token generation [You]
└─ PR #126: Token validation [Teammate, in parallel]
   ↓
PR #127: Integration [You]
```

**After PR #124 merges** (failing tests define contract):
- You work on token generation
- Teammate works on token validation (different files)
- Both can develop in parallel using test contract

**Contrast with monolithic PR**:
- Only one person can work on feature at a time
- No parallelization
- Slower delivery

---

### Principle 5: Fast Feedback Cycles

**Incremental PRs = Faster feedback**:

**Monolithic approach**:
```
Day 1-5: Write all code
Day 6: Create PR
Day 7-9: Wait for review
Day 10: Reviewer finds architectural issue
Day 11-12: Rewrite significant portions
Day 13: Re-review
Day 14: Merge
```
**Time to merge**: 14 days
**Risk**: High (architectural issue found late)

**Incremental approach**:
```
Day 1: Planning PR (ADR)
Day 1 evening: Review, feedback on architecture
Day 2: Update plan, merge
Day 2: RED PR (failing tests)
Day 2 evening: Review, feedback on test coverage
Day 3: Update tests, merge
Day 3-4: GREEN PR (implementation)
Day 4 evening: Review, minor fixes
Day 5: Merge
```
**Time to merge**: 5 days
**Risk**: Low (architectural feedback on Day 1)

---

## Incremental PR Patterns

### Pattern 1: TDD Increments (RED → GREEN → REFACTOR)

**Use when**: Implementing new feature with TDD

**Progression**:

**PR #1: RED - Failing Tests**
```
files:
  tests/auth/jwt.test.ts [+200 lines, all failing]
  src/auth/jwt.ts [+10 lines, stubs only]

description:
  Comprehensive test suite for JWT refresh tokens.
  All tests FAIL (expected). Defines "done" for feature.

value:
  - Tests serve as executable specification
  - Team can review test coverage before code written
  - Contract defined for implementation

can merge?: Yes (tests fail, but that's expected)
```

**PR #2: GREEN - Minimal Implementation**
```
files:
  src/auth/jwt.ts [+150 lines, implementation]
  tests/auth/jwt.test.ts [~5 lines, minor test fixes]

description:
  Implement JWT refresh token generation and validation.
  All tests now PASS. Minimal implementation, no optimization yet.

value:
  - Feature works end-to-end
  - Can be tested in staging
  - Foundation for future optimization

can merge?: Yes (tests pass, feature works)
```

**PR #3: REFACTOR - Code Quality**
```
files:
  src/auth/jwt.ts [+50, -30 lines, refactoring]
  src/auth/token-utils.ts [+40 lines, extracted utilities]

description:
  Extract token utilities, improve naming, add comments.
  No behavior changes (tests unchanged).

value:
  - Code is more maintainable
  - Utilities reusable elsewhere
  - Clear separation of concerns

can merge?: Yes (tests still pass, quality improved)
```

---

### Pattern 2: Layer-by-Layer Increments

**Use when**: Building feature across multiple layers (data → business → API → UI)

**Progression**:

**PR #1: Data Layer**
```
schema/user.sql [+30 lines, migration]
src/db/user-repository.ts [+100 lines]
tests/db/user-repository.test.ts [+150 lines]

value: Database schema and repository ready for business logic
```

**PR #2: Business Logic**
```
src/services/user-service.ts [+120 lines]
tests/services/user-service.test.ts [+180 lines]

value: Business rules implemented, ready for API layer
```

**PR #3: API Layer**
```
src/api/user-routes.ts [+80 lines]
tests/api/user-routes.test.ts [+100 lines]

value: API endpoints available, ready for UI
```

**PR #4: UI Integration**
```
src/components/UserProfile.tsx [+150 lines]
src/hooks/useUserProfile.ts [+50 lines]

value: Feature complete and visible to users
```

---

### Pattern 3: Vertical Slice Increments

**Use when**: Feature has multiple related capabilities

**Progression**:

**PR #1: Happy Path Only**
```
files:
  src/auth/login.ts [+100 lines, happy path]
  tests/auth/login.test.ts [+80 lines, happy path tests]

description:
  Implement login with valid credentials only.
  No error handling yet (just happy path).

value:
  - Core functionality works
  - Can test in staging with valid users
  - Foundation for error handling

can merge?: Yes (happy path works, errors return generic 500)
```

**PR #2: Error Handling**
```
files:
  src/auth/login.ts [+50 lines, error handling]
  tests/auth/login.test.ts [+100 lines, error cases]

description:
  Add error handling for invalid credentials, locked accounts, etc.
  Proper error messages and status codes.

value:
  - Production-ready error handling
  - User experience improved
  - Security hardened

can merge?: Yes (errors handled gracefully)
```

**PR #3: Rate Limiting**
```
files:
  src/middleware/rate-limit.ts [+80 lines]
  src/auth/login.ts [+10 lines, rate limit integration]
  tests/middleware/rate-limit.test.ts [+60 lines]

description:
  Add rate limiting to prevent brute force attacks.
  5 attempts per 15 minutes.

value:
  - Security improved
  - Prevents brute force
  - Production-ready

can merge?: Yes (rate limiting works)
```

---

### Pattern 4: Planning → Implementation Increments

**Use when**: Complex feature requiring upfront design

**Progression**:

**PR #1: ADR + Plan**
```
files:
  docs/adr/0042-jwt-refresh-tokens.md [+200 lines]
  docs/plans/jwt-implementation-plan.md [+150 lines]
  src/auth/jwt-interfaces.ts [+50 lines, interfaces only]

description:
  Architecture Decision Record for JWT refresh tokens.
  Implementation plan with milestones.
  Interface definitions (no implementation).

value:
  - Team aligned on approach
  - Can catch architectural issues early
  - Contract defined for implementation

can merge?: Yes (no breaking changes, just documentation and interfaces)
```

**PR #2: Scaffolding**
```
files:
  src/auth/jwt.ts [+30 lines, empty functions with TODOs]
  src/auth/middleware.ts [+20 lines, stub middleware]
  tests/auth/jwt.test.ts [+50 lines, test structure]

description:
  Scaffolding for JWT implementation.
  Empty functions with JSDoc comments.
  Test file structure (no assertions yet).

value:
  - File structure established
  - Others can start parallel work
  - Clear what needs implementation

can merge?: Yes (functions exist but throw NotImplementedError)
```

**PR #3-N: Implementation**
[Follow TDD or layer-by-layer patterns from above]

---

## How to Plan Incremental PRs

### Step 1: Use Brainstorming Skill (RECOMMENDED)

Before writing code, use `superpowers:brainstorming` to plan increments:

```markdown
User: I need to implement JWT refresh tokens. Help me plan incremental PRs.

Agent (using brainstorming skill):
Let's break this down into reviewable increments:

1. What's the core value proposition?
   → Users stay logged in longer without compromising security

2. What's the minimal first increment?
   → ADR + interfaces (get team alignment)

3. What's the logical sequence?
   → Planning → RED tests → GREEN impl → Refactor → Integration

4. Where are the natural boundaries?
   → After interfaces defined
   → After tests written (RED)
   → After tests pass (GREEN)
   → After integration complete

5. Can any work happen in parallel?
   → After tests defined, token gen and validation can parallelize

Recommended PR sequence:
PR #1: ADR + Interfaces (~50 lines)
PR #2: Failing tests (~200 lines)
PR #3: Token generation (~150 lines)
PR #4: Token validation (~120 lines, parallel with #3)
PR #5: Integration (~80 lines)
PR #6: Docs + examples (~60 lines)
```

---

### Step 2: Document in Draft PR Description

When creating first PR, document the full sequence:

```markdown
## PR #1 of 6: ADR + Interfaces

This is the first of 6 incremental PRs for JWT refresh tokens.

### Sequence
- **PR #1** (this PR): ADR + Interfaces [~50 lines]
- PR #2: Failing tests [~200 lines]
- PR #3: Token generation [~150 lines]
- PR #4: Token validation [~120 lines, parallel]
- PR #5: Integration [~80 lines]
- PR #6: Docs + examples [~60 lines]

### This PR
Establishes architecture and interfaces for JWT refresh tokens.
No implementation yet. Seeking early feedback on approach.

### Next PR
After this merges, PR #2 will add comprehensive failing tests
that define "done" for the feature.
```

---

### Step 3: Review Increment Size

**Before creating PR, check size**:

```bash
# Check lines added in your branch
git diff main --stat

# Count actual code lines (excluding tests, docs, config)
git diff main -- '*.ts' ':(exclude)*.test.ts' ':(exclude)*.spec.ts' | wc -l

# If > 500 lines of code, too large
# If > 30 files changed, probably too large
# If review would take >1 hour, too large
```

**If too large**:
1. Identify logical boundaries (where can you split?)
2. Create multiple branches: `feature/jwt-1-adr`, `feature/jwt-2-tests`, etc.
3. Create sequential PRs
4. Each PR references the next: "Next: PR #124 will add tests"

---

## Red Flags - STOP 🛑

### For Coder Agents

- ❌ **PR has >500 lines of actual code** → Too large, break it up
- ❌ **PR changes >30 files** → Scope too broad, focus on smaller increment
- ❌ **PR title: "Part 1 of 3"** → Each part should have stand-alone value
- ❌ **Can't explain value in 2 sentences** → Increment not well-defined
- ❌ **Tests and implementation in separate PRs, but not TDD** → Ship together unless doing RED/GREEN split
- ❌ **PR would break main if merged** → Not stand-alone, needs more work
- ❌ **Reviewer would need >1 hour to review** → Too large, break it up

### For Code Reviewer Agents

- ❌ **PR is too large (>500 lines code)** → Request breakdown
- ❌ **PR has no clear value statement** → Request clarification
- ❌ **PR is "Part N of M" with no stand-alone value** → Request reframe
- ❌ **PR mixes multiple concerns** → Request separation (e.g., refactor + feature)
- ❌ **PR includes scaffolding + full implementation** → Suggest splitting (scaffolding first, then impl)

---

## Size Guidelines Summary

### Code Size (excluding tests, docs, config)

| Size | Lines | Files | Review Time | Status |
|------|-------|-------|-------------|--------|
| **Tiny** | <100 | <5 | 10-15 min | ✅ Ideal for quick feedback |
| **Small** | 100-200 | 5-10 | 20-30 min | ✅ Ideal |
| **Medium** | 200-500 | 10-20 | 45-60 min | ⚠️ Acceptable, approaching limit |
| **Large** | 500-1000 | 20-30 | 90+ min | ❌ Too large, break it up |
| **Huge** | >1000 | >30 | 2+ hours | ❌ Unreviewed, must break up |

### Total PR Size (including tests, docs)

**Typical ratio**: 1 line of code → 2 lines of tests/docs

- 200 lines code → 400 lines total (including tests) → ✅ Ideal
- 500 lines code → 1000 lines total → ⚠️ Acceptable
- 1000 lines code → 2000 lines total → ❌ Too large

---

## When NOT to Use Incremental PRs

**Sometimes a single PR is appropriate**:

1. **Simple bug fix**:
   - <50 lines changed
   - Single file
   - One PR is fine

2. **Trivial changes**:
   - Typo fix
   - Dependency version bump
   - Config update

3. **Emergency hotfix**:
   - Production down
   - Security vulnerability
   - Need immediate fix

4. **Generated code**:
   - Protobuf generation
   - Database migrations (schema + data together)
   - API client generation

**Rule of thumb**: If PR is <200 lines and <1 hour to review, single PR is fine.

---

## Integration with Wolf Framework

### Aligns with Wolf Principle #9: Incremental Value Delivery

**From wolf-principles**:
> Break work into 2-8 hour increments, each delivering a durable artifact.

**Incremental PRs achieve this**:
- Each PR is 2-4 hours of work
- Each PR is a durable artifact (merged to main)
- Each PR provides value
- Feedback cycles every 1-2 days instead of every 1-2 weeks

### Enforced via Wolf Governance

**Definition of Done now includes**:
- ✅ PR is appropriately sized (<500 lines of actual code)
- ✅ PR provides stand-alone value (can merge without breaking)
- ✅ PR has clear value statement (what does this enable?)

### Integrated with Superpowers Workflows

**superpowers:brainstorming**:
- Use to plan PR sequence before coding
- Identify natural boundaries
- Define value for each increment

**superpowers:test-driven-development**:
- RED → GREEN → REFACTOR naturally creates 3 PRs
- Each phase is a valuable increment

**superpowers:writing-plans**:
- For complex features, write plan document
- Plan document defines PR sequence
- First PR can be the plan itself

---

## Success Criteria

**You're doing incremental PRs correctly when**:

- ✅ PRs merge every 1-2 days (not every 1-2 weeks)
- ✅ Code reviews take 30-60 minutes (not 2+ hours)
- ✅ PRs rarely have more than 1 round of changes (fast feedback)
- ✅ Team can work in parallel on same feature (clear contracts)
- ✅ Reverts are easy (small blast radius per PR)
- ✅ Can pause feature mid-way without leaving main broken
- ✅ Each PR has clear "why" and "what value it provides"

**You're doing it wrong when**:

- ❌ PRs sit open for weeks waiting for review
- ❌ Reviewers say "too large to review carefully"
- ❌ Multiple round-trips of large changes
- ❌ "I'll merge when all 5 PRs are ready" (defeats the point)
- ❌ PRs block each other unnecessarily
- ❌ Can't explain value of a PR in 2 sentences

---

*Version: 1.0.0*
*Part of Wolf Skills Marketplace v2.3.0*
*Related: wolf-principles #9, superpowers:brainstorming, superpowers:test-driven-development*
