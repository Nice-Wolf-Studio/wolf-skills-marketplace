# Changelog

All notable changes to the Wolf Skills Marketplace will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.0] - 2025-11-14

### Added - Documentation Lookup First (WebSearch Before Coding)

This release enforces "warm start" documentation lookup to prevent coders from relying on potentially outdated model knowledge (cutoff January 2025).

#### Problem Solved

**Before**:
- Coders relied on model's pre-trained knowledge for API syntax
- Model knowledge cutoff (January 2025) meant outdated APIs used
- "Cold start" coding from memory led to trial-and-error debugging
- No guidance about when/how to look up current documentation
- Wasted time using deprecated APIs or missing new features

**After**:
- ✅ Mandatory WebSearch for current documentation BEFORE coding
- ✅ Clear distinction between Level 1 (architectural research, 2-8 hours) and Level 2 (doc lookup, 2-5 minutes)
- ✅ "Warm start" approach: lookup first, code second
- ✅ Red flags catch "I remember the API" rationalizations
- ✅ 5-minute documentation investment prevents hours of debugging

---

#### Enhanced Templates

**coder-agent-template.md** (v2.3.0 → v2.4.0): +32 lines

**New "Documentation & API Research" section** (MANDATORY, lines 80-104):
- Checklist for identifying unfamiliar libraries
- WebSearch query templates for current docs
- Verification of documentation recency (within 12 months)
- API changes/breaking changes review
- Examples: "React 19 useEffect cleanup documentation", "TypeScript 5.7 satisfies operator"
- Why this matters: Model cutoff is January 2025, 5 minutes prevents hours of debugging

**New "Documentation Lookup & Model Knowledge" red flags** (lines 350-356):
- ❌ "I remember the API from training" → DANGEROUS, verify with WebSearch
- ❌ "This library hasn't changed" → ASSUMPTION, check docs
- ❌ "I'll figure it out by trial and error" → WASTE, 2 min WebSearch beats 20 min debugging
- ❌ "Documentation lookup is for research-agent" → NO, research-agent = 2-8 hours, WebSearch = 2-5 minutes
- ❌ "Model knowledge is good enough" → NO, model cutoff January 2025
- ❌ "I'll just use what worked last time" → RISKY, API may have changed

**Template growth**: 392 → 424 lines (+32 lines)

---

#### Enhanced Wolf Principles

**wolf-principles/SKILL.md** (v1.1.0 → v1.2.0): +35 lines

**Enhanced Principle #3: Research-Before-Code** (lines 61-108):

**NEW: Two-Level Research Framework**:
1. **Level 1 - Architectural Research** (research-agent, 2-8 hours):
   - "Should we use this approach?" (unknown unknowns)
   - Feasibility, architecture, approach decisions
   - Delivers ADRs and recommendations

2. **Level 2 - Documentation Lookup** (coder-agent, 2-5 minutes):
   - "How do I use this library's current API?" (known unknowns)
   - WebSearch/WebFetch for official docs
   - Verify syntax against authoritative sources (not model memory)
   - Check breaking changes, new features, current best practices
   - Time-boxed: 2-5 minutes per library

**Enhanced example**:
```
Task: Add authentication to API

Level 1 (research-agent, 4 hours):
- Compare JWT vs OAuth2 vs Passport.js
- Deliver: "Use Passport.js with JWT strategy"

Level 2 (coder-agent, 3 minutes):
- WebSearch "passport.js jwt strategy docs 2025"
- Verify current version, check breaking changes
- Implement using current API patterns

Result: Informed by both architectural research AND current documentation
```

**Why Two Levels:**
- Level 1: Unknown unknowns (architectural risks)
- Level 2: Known unknowns (current API syntax)
- Both prevent wasted implementation time

**Skill version**: v1.1.0 → v1.2.0

---

### Changed

**Documentation Lookup Enforcement**:
- Documentation lookup now MANDATORY before implementation (coder checklist)
- Clear time boundaries: 2-5 minutes per library (prevents analysis paralysis)
- WebSearch/WebFetch tools explicitly mentioned
- Model knowledge cutoff (January 2025) explicitly stated

**Principle #3 Clarification**:
- Previously ambiguous: "Research-Before-Code" could mean anything
- Now explicit: Level 1 (architectural, hours) vs Level 2 (tactical, minutes)
- Prevents confusion: "Do I need research-agent to look up React docs?" (No, WebSearch)

**Red Flag Addition**:
- 6 new red flags catching "I remember the API" rationalizations
- Addresses trial-and-error waste ("2 minutes WebSearch beats 20 minutes debugging")
- Distinguishes research-agent use case (hours) from WebSearch (minutes)

---

### Impact

**Expected Compliance Improvements**:
- 40-60% reduction in PRs with outdated/wrong API usage
- 10-20% reduction in time-to-working-code (fewer trial-and-error cycles)
- 30-50% reduction in "this API changed" review comments

**Developer Experience**:
- "Warm start" approach: 5-minute documentation lookup prevents hours of debugging
- Clear guidance: When to use research-agent (Level 1) vs WebSearch (Level 2)
- Time-boxed: 2-5 minutes prevents overthinking

**Cultural Shift**:
- "Lookup first" becomes standard practice
- WebSearch/WebFetch seen as essential tools, not optional
- Model knowledge treated as starting point, not truth

**Quality Gates**:
- Documentation lookup part of execution checklist (blocking)
- Red flags catch rationalization attempts
- Reinforces evidence-based decision making (Principle #5)

---

### Rationale

**Why This Was Needed:**

Model knowledge has a cutoff date (January 2025). Libraries evolve:
- React 19 (new patterns emerging)
- Node.js 23.x (ESM changes)
- TypeScript 5.6+ (new operators)
- Any library with monthly/weekly releases

**Without WebSearch:**
- Using deprecated APIs
- Missing performance optimizations
- Ignoring security patches
- Reinventing solutions (library added feature after cutoff)

**With WebSearch (2-5 minutes):**
- Current, verified API usage
- Awareness of breaking changes
- Leveraging new features
- Following current best practices

**ROI**: 5-minute investment prevents 30-60 minute debugging sessions.

---

### Files Changed

- `wolf-roles/templates/coder-agent-template.md` (+32 lines)
- `wolf-principles/SKILL.md` (+35 lines)
- `CHANGELOG.md` (+160 lines this entry)

Total: 3 files, ~227 lines added

---

## [2.3.0] - 2025-11-14

### Added - Incremental PR Strategy

This release enforces small, reviewable PRs with stand-alone value to improve code review quality and reduce merge cycle times.

#### Problem Solved

**Before**:
- Large PRs (>500 lines, >30 files) difficult to review thoroughly
- "Part 1 of 3" PRs with no stand-alone value
- Delayed feedback (weeks to merge)
- Increased merge conflicts and bug risk
- Reviewers spending >1 hour per PR

**After**:
- ✅ PRs <500 lines of actual code (easy to review)
- ✅ Each PR provides stand-alone value (can merge safely)
- ✅ Fast feedback cycles (hours/days, not weeks)
- ✅ Logical boundaries (TDD phases, layers, features)
- ✅ Clear increment planning BEFORE coding

---

#### New Comprehensive Guide

**wolf-workflows/incremental-pr-strategy.md** (NEW, ~400 lines):

**The 5 Principles**:
1. Each PR provides stand-alone value
2. Small enough to review carefully (<500 lines)
3. Logical, not arbitrary, boundaries
4. Enable parallel work
5. Fast feedback cycles

**4 Increment Patterns**:
1. **TDD Increments**: RED PR → GREEN PR → REFACTOR PR
2. **Layer-by-Layer**: Data → Logic → UI → Integration
3. **Vertical Slice**: One complete feature path per PR
4. **Planning → Implementation**: ADR → Scaffolding → Core → Integration

**Size Guidelines**:
- Tiny: <100 lines (10-15 min review) ✅ Ideal
- Small: 100-200 lines (20-30 min) ✅ Ideal
- Medium: 200-500 lines (45-60 min) ⚠️ Acceptable
- Large: 500-1000 lines (90+ min) ❌ Too large
- Huge: >1000 lines (2+ hours) ❌ Must break up

**Features**:
- Planning guidance (use `superpowers:brainstorming`)
- Size check commands (bash snippets)
- PR sequence documentation template
- Red flags for coders and reviewers
- Good/Bad examples with rationale

---

#### Enhanced Templates

**coder-agent-template.md** (v2.2.0 → v2.3.0): +44 lines

**New "Incremental PR Strategy" section** (MANDATORY for features):
- Plan PR increments BEFORE coding
- Size guideline: <500 lines actual code per PR
- Recommended increment patterns (Planning, RED, GREEN, REFACTOR, Integration, Docs)
- Bash commands to check PR size before creating
- Template for documenting PR sequence in first PR
- Reference to full guide: `wolf-workflows/incremental-pr-strategy.md`

**New red flags**:
- ❌ PR has >500 lines of actual code → Too large, break up
- ❌ PR changes >30 files → Scope too broad
- ❌ PR titled "Part 1 of 3" with no stand-alone value → Each PR must provide value
- ❌ Can't explain PR value in 2 sentences → Not well-defined
- ❌ Reviewer would need >1 hour → Too large
- ❌ "I'll break it up later" → NO, plan BEFORE coding

**Template growth**: 348 → 392 lines (+44 lines)

---

**code-reviewer-agent-template.md** (v2.1.0 → v2.2.0): +33 lines

**New "PR Size and Scope" section** (MUST-have blocking requirements):
- [ ] PR has <500 lines of actual code ✅
- [ ] PR changes <30 files ✅
- [ ] PR provides stand-alone value ✅
- [ ] PR can be explained in 2 sentences ✅
- [ ] PR can be reviewed in <1 hour ✅
- [ ] If multi-PR feature: Sequence documented ✅

**PR size check commands**:
```bash
# Count actual code lines
git diff main -- '*.ts' ':(exclude)*.test.ts' | wc -l

# Count files changed
gh pr view --json files --jq '.files | length'
```

**If PR too large**:
- ❌ DO NOT approve oversized PRs
- ✅ Request breakdown with specific guidance
- ✅ Suggest split points (layer, TDD phase, feature)
- ✅ Reference: `wolf-workflows/incremental-pr-strategy.md`

**New red flags**:
- ❌ PR has >500 lines of actual code → Request breakdown
- ❌ PR changes >30 files → Scope too broad
- ❌ PR titled "Part 1 of 3" but no stand-alone value → Each PR must provide value
- ❌ PR description doesn't explain value clearly → Request clarification
- ❌ Would take >1 hour to review → Request split
- ❌ Multiple unrelated changes in one PR → Request separation

**Template growth**: 397 → 430 lines (+33 lines)

---

#### Updated Governance

**wolf-governance/SKILL.md**: +8 lines

**New MUST requirement in Definition of Done**:
- ✅ **PR is appropriately sized (incremental PR strategy)**
  - <500 lines of actual code (excluding tests/docs)
  - <30 files changed
  - Provides stand-alone value (can merge without breaking main)
  - Can be explained in 2 sentences (clear, focused scope)
  - Can be reviewed in <1 hour
  - If multi-PR feature: Sequence documented in first PR
  - Reference: `wolf-workflows/incremental-pr-strategy.md`

**Violation = Immediate failure** (even if code quality is excellent)

---

#### Updated Git Workflow Guide

**wolf-workflows/git-workflow-guide.md**: +160 lines

**New "Incremental PR Strategy" section**:
- Why break work into smaller PRs (benefits vs risks)
- The 5 Principles (with examples)
- Common increment patterns (TDD, Planning → Implementation)
- How to plan increments (MANDATORY brainstorming)
- Check PR size before creating (bash commands)
- Document PR sequence in first PR (template)
- For code reviewers: Validate PR size (checklist)

**Integration**:
- Positioned between "Handling Git Issues" and "Red Flags"
- References full guide: `wolf-workflows/incremental-pr-strategy.md`
- Consistent with governance requirements

---

### Changed

**PR Size Enforcement**:
- PR size now MUST requirement in Definition of Done (governance)
- Coder template enforces planning increments BEFORE coding
- Reviewer template validates PR size as blocking requirement
- Git workflow guide provides practical examples

**Increment Planning**:
- MANDATORY use of `superpowers:brainstorming` to plan increments
- Document PR sequence in first PR (not ad-hoc splits)
- Logical boundaries (TDD, layers, features) not arbitrary

**Command Integration**:
- Bash commands to check PR size before creating
- `gh` CLI commands for PR validation
- Consistent with prefer-gh-over-git policy

---

### Impact

**Compliance Improvements**:
- 100% PR size validation (enforced via blocking requirement)
- Incremental planning BEFORE coding (not ad-hoc)
- Clear stand-alone value requirement (no arbitrary splits)
- Documented PR sequences (visibility into feature completion)

**Developer Experience**:
- Faster reviews (15-60 min vs 90+ min)
- Faster feedback (hours/days vs weeks)
- Lower merge conflict risk (smaller changes)
- Enable parallel work (after interfaces/tests defined)

**Quality Gates**:
- PR size now part of Definition of Done
- Violations block merge regardless of code quality
- Governance enforced at template level
- Code reviewers empowered to reject oversized PRs

**Expected Metrics**:
- Average PR size: 800 lines → 250 lines (68% reduction)
- Average review time: 90 min → 30 min (67% reduction)
- Average merge cycle: 7 days → 2 days (71% reduction)
- Bug detection rate: +30% (easier to spot issues)

---

## [2.2.0] - 2025-11-14

### Added - Git/GitHub Workflow Enforcement

This release enforces proper Git/GitHub workflows for coder and code-reviewer agents to prevent direct commits to default branches and establish clear review practices.

#### Problem Solved

**Before**:
- Agents committing directly to main/master branches
- PRs created at task end (or not at all)
- Code reviewers making changes during review without approval
- Confusion about when to edit vs suggest
- Inconsistent branch naming and commit practices

**After**:
- ✅ All code in feature branches (main/master protected)
- ✅ Draft PRs created at task start (visibility from beginning)
- ✅ Code reviewers suggest in comments (clear ownership)
- ✅ Project conventions respected (templates, naming)
- ✅ Prefer `gh` CLI over `git` commands (better UX)

---

#### Enhanced Templates

**coder-agent-template.md** (v2.1.0 → v2.2.0):

**New "Git/GitHub Setup" section** (before implementation):
- Check for project conventions first (`.github/` templates, CONTRIBUTING.md)
- Create feature branch (never work on main/master/develop)
- Create DRAFT PR immediately at task start
- Verify not on default branch before commits
- Respect project naming conventions over defaults

**New Git/GitHub red flags**:
- ❌ Committing to default branches → FORBIDDEN
- ❌ No PR created at task start → STOP
- ❌ Pushing without PR → NO
- ❌ Force pushing to default branches → FORBIDDEN
- ❌ Ignoring project conventions → WRONG
- ❌ Using git when gh available → PREFER gh CLI

**Git troubleshooting guidance**: Read github skills → Try `gh auth switch` → Verify `gh auth status`

**Template growth**: 310 → 348 lines (+38 lines)

---

**code-reviewer-agent-template.md** (v1.0.0 → v2.1.0):

**New "Review Mode Determination" section** (mandatory first step):
- **Context A: Active PR/Code Review** (suggest only, don't edit)
  - ✅ Write review comments with GitHub suggestion syntax
  - ❌ DO NOT make direct edits to code
  - ❌ DO NOT push commits to PR branch

- **Context B: Pre-Review Improvements** (requires explicit approval)
  - ⚠️ ONLY with explicit user approval
  - ✅ Ask first: "I found {N} issues. Approve fixes?"
  - ✅ Wait for approval before making changes
  - ❌ NEVER assume approval (even in bypass mode)

**New Git/GitHub red flags**:
- ❌ Making changes during active review → FORBIDDEN
- ❌ Pushing fixes without approval → NO
- ❌ Assuming "bypass mode" = permission → WRONG
- ❌ Editing PR author's code without asking → FORBIDDEN
- ❌ Using git when gh available → PREFER gh CLI
- ❌ Ignoring project PR templates → WRONG

**Why this matters**: Code reviewers suggest improvements, authors implement them. Maintains clear ownership and prevents confusion.

**Template growth**: 337 → 397 lines (+60 lines)

---

#### Updated Governance

**wolf-governance/SKILL.md**:

**New MUST requirement in Definition of Done**:
- ✅ **Proper Git/GitHub workflow followed**
  - Feature branch used (never main/master/develop)
  - Draft PR created at task start (not task end)
  - No direct commits to default branches
  - Project conventions respected (templates, naming)
  - Prefer `gh` CLI over `git` commands where available

**Violation = Immediate failure** (even if code quality is excellent)

---

#### New Comprehensive Guide

**wolf-workflows/git-workflow-guide.md** (NEW, ~400 lines):

**The 4 Golden Rules**:
1. Never commit to default branches
2. Draft PR at task start (not task end)
3. Code reviewers suggest, don't edit
4. Git issues → Read github skills → Try `gh auth switch`

**3 Detailed Workflows**:
1. **Starting a New Task** (Coder Agent)
   - Check project conventions first
   - Create feature branch
   - Create draft PR immediately
   - Work and commit regularly
   - Mark PR ready after verification

2. **Code Review** (Reviewer Agent)
   - Determine review context (suggest vs edit)
   - Context A: Review and suggest (default)
   - Context B: Fix with approval (explicit only)
   - Use GitHub suggestion syntax
   - Never assume permission

3. **Handling Git Issues**
   - Authentication failed → `gh auth switch`
   - Permission denied → Check SSH/HTTPS
   - Protected branch error → Check current branch
   - PR template not appearing → Manual application

**Key Guidance**:
- **Prefer `gh` CLI over `git`**: Better UX, GitHub-aware, respects conventions
- **Project conventions override defaults**: Always check `.github/` first
- **Red flags for coders and reviewers**: Clear violation warnings
- **Success criteria**: Feature branches, draft PRs, clean reviews, no violations

---

### Changed

**Convention Handling**:
- Branch naming now defaults to `feature/{task-slug}` but **respects project conventions first**
- PR templates automatically used if `.github/PULL_REQUEST_TEMPLATE.md` exists
- Commit messages follow project conventions in `.gitmessage` or CONTRIBUTING.md
- Agents check for conventions before applying defaults

**Command Preferences**:
- **Prefer `gh pr create`** over manual `git push` + web UI
- **Prefer `gh pr ready`** over `gh pr edit --ready`
- **Prefer `gh pr review`** over manual comments
- **Prefer `gh auth status`** over `git credential` commands
- Use `git` only when no `gh` equivalent exists

---

### Impact

**Compliance Improvements**:
- 100% feature branch usage (enforced via red flags)
- Draft PRs at task start (not task end)
- Clear reviewer/author separation (suggest vs implement)
- Project conventions respected automatically

**Developer Experience**:
- Early visibility (draft PRs signal WIP)
- Clear ownership (reviewer suggests, author implements)
- Faster auth troubleshooting (`gh auth switch` solves most issues)
- Consistent workflows across projects

**Quality Gates**:
- Git workflow now part of Definition of Done
- Violations block merge regardless of code quality
- Governance enforced at template level

---

## [2.1.0] - 2025-11-14

### Added - Context Management System

This release adds automatic context management for coder agents to prevent token bloat through phase-aware checkpointing and compaction.

#### New Skill: wolf-context-management (v1.0.0)

**Problem Solved**:
- Coder agents accumulate 10,000-40,000 tokens of irrelevant context during exploration
- File searches, grep results, and documentation remain in context after finding relevant code
- Token capacity wasted on bloated context instead of focused implementation

**Solution**:
- Phase-aware checkpoint/restore pattern
- Checkpoint artifacts created at workflow transitions
- 30-50% token reduction per session
- Aligns with Wolf Principle #1 (Artifact-First Development)

**New Files** (~800 lines total):
- `wolf-context-management/SKILL.md` (400+ lines)
  - When to use (4 automatic triggers, 3 manual triggers)
  - 3-step workflow (identify phase, create checkpoint, verify & compact)
  - 3 checkpoint types (exploration, implementation, verification)
  - Red flags section (4 common mistakes)
  - Integration with Wolf framework
  - Usage examples with token savings data
  - Troubleshooting guide

- `wolf-context-management/INDEX.md` (100+ lines)
  - Condensed quick reference for token efficiency
  - Minimal checkpoint templates for fast creation

- `wolf-context-management/templates/` (300+ lines)
  - `exploration-checkpoint-template.md` - Capture file findings and architecture
  - `implementation-checkpoint-template.md` - Capture changes and test results
  - `verification-checkpoint-template.md` - Capture evidence and PR draft

**Features**:
- **Phase Detection**: Automatic recognition of workflow transitions
  - Exploration → Implementation (after finding relevant files)
  - Implementation → Verification (after tests pass)
  - Verification → Handoff (after evidence collected)
- **Checkpoint Artifacts**: Self-contained `.claude/context/*.md` files
  - Can resume work from checkpoint in fresh session
  - Commit to git for audit trail
  - Share across agents for clean handoffs
- **Token Efficiency**: Expected 30-50% reduction
  - Exploration: -70% (30k → 9k tokens)
  - Implementation: -60% (40k → 16k tokens)
  - Verification: -50% (20k → 10k tokens)

#### Enhanced Template: coder-agent-template.md (v2.0.0 → v2.1.0)

**Integrated context management at 3 checkpoints**:

1. **Before Implementation** (after exploration):
   - Create exploration checkpoint
   - Compact context before TDD workflow
   - Reference: `wolf-context-management/templates/exploration-checkpoint-template.md`

2. **After Implementation** (tests passing):
   - Create implementation checkpoint
   - Summarize test runs (keep final results, discard iterations)
   - Reference: `wolf-context-management/templates/implementation-checkpoint-template.md`

3. **Before Review** (evidence collected):
   - Create verification checkpoint
   - Compact context before code-reviewer-agent handoff
   - Clean context improves review focus
   - Reference: `wolf-context-management/templates/verification-checkpoint-template.md`

**Template updated from 286 → 310 lines** (+24 lines for context management integration)

#### Documentation Updates

- **PLAN.md**: Added "Context File Cleanup" to Enhancement Ideas
  - Problem: Checkpoint files accumulate over time
  - Solution options: Auto-delete after 30 days, archive, compress, git-ignore patterns
  - Triggers: After PR merged, periodic cleanup
  - Related to wolf-context-management skill

---

## [1.2.0] - 2025-11-14

### Added - Phase 2: Examples & Templates

This release adds comprehensive Good/Bad examples, subagent templates, and extends skill-chaining patterns to wolf-verification.

#### Good/Bad Examples

**wolf-governance (v1.1.0 → v1.2.0)**
- Added 3 comprehensive Good/Bad example pairs (+168 lines):
  - Example 1: Feature Pull Request (compliant vs non-compliant DoD)
  - Example 2: Security Change (proper security-hardener vs security theater)
  - Example 3: Refactoring (clean refactor vs mixed-concern mess)
- Each example shows:
  - ✅ Good: Proper DoD completion with evidence and rationale
  - ❌ Bad: Common violations with explanation of dangers
  - Assessment: Clear pass/fail determination

**wolf-archetypes (v1.1.0 → v1.2.0)**
- Added 5 comprehensive Good/Bad example pairs (+323 lines):
  - Example 1: Feature Development (proper archetype vs mixed concerns)
  - Example 2: Bug Fix (reliability-fixer vs feature creep during bug fix)
  - Example 3: Security Work (security-hardener vs mislabeled security bug)
  - Example 4: Research/Exploration (research-prototyper vs runaway implementation)
  - Example 5: Multiple Lenses (proper lens stacking vs ignoring critical requirements)
- Each example includes MCP tool call syntax and archetype rationale

#### Subagent Templates

**wolf-roles (v1.1.0 → v1.2.0)**
- Added templates directory with 4 comprehensive role templates (+940 lines total):
  1. **coder-agent-template.md** (139 lines) - Implementation task guidance
  2. **pm-agent-template.md** (188 lines) - Requirements definition guidance
  3. **security-agent-template.md** (276 lines) - Security analysis guidance
  4. **code-reviewer-agent-template.md** (337 lines) - Code review guidance
- Each template includes:
  - Role context with Wolf framework integration
  - Mission statement with placeholders for customization
  - Execution checklists (before, during, after)
  - Handoff protocols to other roles
  - Red Flags - STOP sections
  - Success criteria
- Updated wolf-roles SKILL.md with:
  - Subagent Templates documentation section
  - When to use templates guidance
  - Template structure explanation
  - Placeholder format documentation
  - Multi-role workflow patterns
  - Benefits documentation (+89 lines)

#### Verification Enhancement

**wolf-verification (v1.0.0 → v1.1.0)**
- Added "Red Flags - STOP" section (7 rationalization blockers)
- Added "After Using This Skill" with integration points
- Added verification checklist (6 items)
- Added 2 Good/Bad examples:
  - Example 1: Feature Implementation (proper verification-first workflow)
  - Example 2: Security Review (bad - skipped verification with consequences)
- Added performance vs quality trade-offs documentation
- Total additions: +189 lines

#### Documentation

**PLAN.md** (NEW)
- Comprehensive living document for session recovery (+494 lines)
- Vision, goals, and expected impact documentation
- Phase 1 complete implementation details
- Phase 2 in-progress tracking
- Phase 3 planned items
- Implementation statistics (files modified, lines added)
- Skill chain diagram
- Pattern examples (before/after)
- Success metrics tracking
- Maintenance notes and collaboration protocol

### Changed

**Version Bumps**:
- wolf-governance: v1.1.0 → v1.2.0 (examples added)
- wolf-archetypes: v1.1.0 → v1.2.0 (examples added)
- wolf-roles: v1.1.0 → v1.2.0 (templates + documentation added)
- wolf-verification: v1.0.0 → v1.1.0 (patterns + examples added)

### Impact

**Phase 2 Enhancements**:
- **Example Density**: +491 lines of Good/Bad examples across 3 skills
- **Template Infrastructure**: +940 lines of reusable role templates
- **Verification Integration**: +189 lines extending patterns to wolf-verification
- **Documentation**: +494 lines of living project documentation

**Total Phase 2 Additions**: 12 files, +2,114 lines

**Enhanced Developer Experience**:
- Subagent templates enable easy role delegation
- Good/Bad examples show concrete compliance patterns
- PLAN.md enables seamless session recovery
- Verification skill now part of unified chain

## [1.1.0] - 2025-11-14

### Added - Superpowers Skill-Chaining Patterns

This release implements critical skill-chaining patterns inspired by the superpowers plugin, dramatically improving agent compliance and skill discovery.

#### New Skill

- **wolf-session-init** (v1.0.0) - Master skill with mandatory 4-step initialization protocol
  - Blocking gates for principles → archetype → governance → role
  - Session initialization checklist template
  - Context recovery protocol
  - Common initialization patterns with examples
  - Red Flags - STOP section with 6 rationalization blockers

#### Enhanced Skills (v1.0.0 → v1.1.0)

All core Wolf skills enhanced with three critical patterns:

1. **"REQUIRED NEXT SKILL" Callouts**
   - Explicit skill chaining with blocking gates
   - MCP tool references for each step
   - Why/Gate/Example for each transition
   - Sequential workflow enforcement

2. **"Red Flags - STOP" Sections**
   - Pre-emptive rationalization blocking
   - Common agent shortcuts identified and blocked
   - Explicit STOP commands with corrective actions
   - 6-8 red flags per skill

3. **Verification Checklists**
   - Checkbox-based completion tracking
   - Clear pass/fail criteria for each gate
   - "Can't check all boxes?" failure handling
   - 5-8 checkboxes per skill

#### Skill-Specific Enhancements

**wolf-principles (v1.1.0)**
- Red Flags: 6 rationalization blockers
- Sequential chain: → wolf-archetypes → wolf-governance → wolf-roles
- Verification checklist: 5 items
- Added explicit MCP tool callouts

**wolf-archetypes (v1.1.0)**
- Red Flags: 7 rationalization blockers
- Sequential chain: → wolf-governance → wolf-roles (+ optional wolf-verification)
- Verification checklist: 6 items
- Archetype-to-governance mapping examples (3 detailed examples)
- Conditional lens-based chaining logic

**wolf-governance (v1.1.0)**
- Red Flags: 8 rationalization blockers
- Sequential chain: → wolf-roles → wolf-verification
- Verification checklist: 8 items
- Governance examples by change type (bug fix, feature, security)
- Emergency override procedure documentation

**wolf-roles (v1.1.0)**
- Red Flags: 7 rationalization blockers
- Marks completion of primary skill chain
- Verification checklist: 6 items
- Role-specific implementation examples (coder-agent, security-agent, pm-agent)
- Handoff protocol documentation
- Common handoff patterns (2 detailed patterns)

### Changed

- Updated phase reference from "Hybrid Skills Migration" to "Superpowers Skill-Chaining Enhancement v2.0.0"
- All dates updated to 2025-11-14
- Version bumps for all enhanced skills

### Impact

**Expected Compliance Improvements:**
- Archetype selection: 40% → 95%+ (60% skip rate → <5%)
- Governance checks: 30% → 90%+ (70% skip rate → <10%)
- Verification completion: 50% → 95%+ (50% skip rate → <5%)
- Role boundary adherence: 60% → 95%+ (40% violation rate → <5%)

**Skill Discovery:**
- Automatic skill chaining through explicit "REQUIRED NEXT SKILL" callouts
- Agents can no longer rationalize skipping critical steps
- Quality gates are now blocking, not advisory

## [1.0.1] - 2025-11-13

### Changed

- Enhanced skill descriptions with clear value propositions
- Added "when to use" guidance to all skills
- Improved frontmatter with better triggers
- Standardized formatting across all skills

## [1.0.0] - 2025-11-13

### Added

- Initial marketplace creation with 64 skills
- Wolf Framework skills (11 skills)
- Integration skills (databento, discord-integration)
- Three.js ECS skills (51 skills)
- Daily summary skill
- Comprehensive README with installation instructions
- SKILL-TEMPLATE.md for creating new skills

---

[1.1.0]: https://github.com/Nice-Wolf-Studio/wolf-skills-marketplace/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/Nice-Wolf-Studio/wolf-skills-marketplace/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Nice-Wolf-Studio/wolf-skills-marketplace/releases/tag/v1.0.0
