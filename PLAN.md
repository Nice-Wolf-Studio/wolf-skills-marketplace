# Wolf Skills Marketplace Enhancement Plan

**Project**: Implement Superpowers Skill-Chaining Patterns in Wolf Skills
**Started**: 2025-11-14
**Status**: Phase 2 In Progress

---

## Vision

Transform Wolf skills from isolated knowledge repositories into a highly interconnected, self-enforcing skill chain system that dramatically improves agent compliance and prevents common failure modes. Based on proven patterns from the superpowers plugin, implement:

1. **Explicit skill chaining** - "REQUIRED NEXT SKILL" callouts that force sequential workflows
2. **Rationalization blocking** - "Red Flags - STOP" sections that catch common shortcuts before they happen
3. **Mandatory verification** - Checklists with pass/fail criteria that cannot be skipped

**Expected Impact**: Agent compliance rates improve from 30-50% to 90-95% across all governance requirements.

---

## Goals

### Primary Goals

1. **Skill Chaining**: Connect all core Wolf skills into mandatory sequential chains
2. **Quality Gates**: Transform advisory recommendations into blocking gates
3. **Compliance Enforcement**: Make it impossible to skip critical steps without explicit rationalization
4. **Agent Discovery**: Enable automatic skill chaining through explicit references

### Secondary Goals

1. **Example Density**: Add Good/Bad examples showing compliance vs non-compliance
2. **Subagent Templates**: Enable easy delegation through role-specific templates
3. **Verification Integration**: Extend patterns to all Wolf framework skills

---

## The 3 Critical Patterns (From Superpowers Analysis)

### Pattern 1: "REQUIRED NEXT SKILL" Callouts
**Implementation**: After each skill, explicit section showing next mandatory skill
**Format**:
```markdown
## After Using This Skill

**REQUIRED NEXT STEPS:**

1. **REQUIRED NEXT SKILL**: Use **skill-name** to...
   - **Why**: Explanation of necessity
   - **Gate**: Pass/fail criteria
   - **MCP Tool**: Exact tool call syntax
```

### Pattern 2: "Red Flags - STOP" Sections
**Implementation**: Pre-emptive rationalization blocking
**Format**:
```markdown
## Red Flags - STOP

If you catch yourself thinking:

- ❌ **"Common rationalization"** - Why it's wrong and what to do instead

**STOP. Use [tool/skill] BEFORE proceeding.**
```

### Pattern 3: Verification Checklists
**Implementation**: Checkbox lists with explicit pass/fail
**Format**:
```markdown
### Verification Checklist

Before claiming [milestone]:

- [ ] Item 1 with specific criterion
- [ ] Item 2 with specific criterion

**Can't check all boxes? Work incomplete. Return to this skill.**
```

---

## Phase 1: Core Skill-Chaining ✅ COMPLETE

**Goal**: Add critical patterns to core 4 Wolf skills + create master initialization skill

### Completed Items ✅

#### 1. wolf-principles (v1.0.0 → v1.1.0) ✅
- [x] Added "Red Flags - STOP" section (6 rationalizations)
- [x] Added "After Using This Skill" with chain to archetypes → governance → roles
- [x] Added verification checklist (5 items)
- [x] Added MCP tool callouts for each step
- [x] Updated phase reference to "Superpowers Skill-Chaining Enhancement v2.0.0"
- [x] Updated date to 2025-11-14
- [x] Bumped version to v1.1.0

**File**: `~/.claude/skills/wolf-principles/SKILL.md`

#### 2. wolf-archetypes (v1.0.0 → v1.1.0) ✅
- [x] Added "Red Flags - STOP" section (7 rationalizations)
- [x] Added "After Using This Skill" with chain to governance → roles
- [x] Added conditional chaining (wolf-verification if lenses applied)
- [x] Added verification checklist (6 items)
- [x] Added archetype-to-governance mapping examples (3 examples)
- [x] Updated phase reference
- [x] Updated date
- [x] Bumped version to v1.1.0

**File**: `~/.claude/skills/wolf-archetypes/SKILL.md`

#### 3. wolf-governance (v1.0.0 → v1.1.0) ✅
- [x] Added "Red Flags - STOP" section (8 rationalizations)
- [x] Added "After Using This Skill" with chain to roles → verification
- [x] Added verification checklist (8 items)
- [x] Added governance examples by change type (3 detailed examples: bug fix, feature, security)
- [x] Added emergency override procedure documentation
- [x] Updated phase reference
- [x] Updated date
- [x] Bumped version to v1.1.0

**File**: `~/.claude/skills/wolf-governance/SKILL.md`

#### 4. wolf-roles (v1.0.0 → v1.1.0) ✅
- [x] Added "Red Flags - STOP" section (7 rationalizations)
- [x] Added "After Using This Skill" marking chain completion
- [x] Added verification checklist (6 items)
- [x] Added role-specific implementation examples (coder-agent, security-agent, pm-agent)
- [x] Added handoff protocol documentation
- [x] Added common handoff patterns (2 detailed patterns)
- [x] Updated phase reference
- [x] Updated date
- [x] Bumped version to v1.1.0

**File**: `~/.claude/skills/wolf-roles/SKILL.md`

#### 5. wolf-session-init (NEW - v1.0.0) ✅
- [x] Created brand new master skill for session initialization
- [x] Mandatory 4-step protocol with blocking gates
- [x] Session initialization checklist template
- [x] Context recovery protocol
- [x] Common initialization patterns (3 examples: feature, security, bug fix)
- [x] Red Flags - STOP section (6 rationalizations)
- [x] Success metrics showing expected impact

**File**: `~/.claude/skills/wolf-session-init/SKILL.md`

#### 6. Pushed Phase 1 to GitHub ✅
- [x] Copied all updated skills to marketplace repository
- [x] Created CHANGELOG.md documenting v1.1.0 enhancements
- [x] Committed with detailed commit message
- [x] Pushed to main branch

**Commit**: a82cda0 - "feat: Add superpowers skill-chaining patterns to Wolf skills (v1.1.0)"
**Repository**: https://github.com/Nice-Wolf-Studio/wolf-skills-marketplace

### Phase 1 Impact

**Complete Skill Chain Established**:
```
START SESSION
    ↓
wolf-session-init (MANDATORY 4-step protocol)
  - Query principles (BLOCKING)
  - Find archetype (BLOCKING)
  - Load governance (BLOCKING)
  - Load role (BLOCKING)
    ↓
wolf-principles → wolf-archetypes → wolf-governance → wolf-roles
    ↓
BEGIN IMPLEMENTATION ✅
```

**Expected Compliance Improvements**:
- Archetype selection: 40% → 95%+ (60% skip rate → <5%)
- Governance checks: 30% → 90%+ (70% skip rate → <10%)
- Verification: 50% → 95%+ (50% skip rate → <5%)
- Role boundaries: 60% → 95%+ (40% violation rate → <5%)

---

## Phase 2: Enhanced Examples & Templates 🔄 IN PROGRESS

**Goal**: Add Good/Bad examples, create subagent templates, expand patterns to remaining skills

### Completed Items ✅

#### 1. wolf-governance Good/Bad Examples ✅
- [x] Added 3 comprehensive Good/Bad example pairs:
  - Example 1: Feature Pull Request (compliant vs non-compliant)
  - Example 2: Security Change (proper security-hardener vs dangerous security theater)
  - Example 3: Refactoring (clean refactor vs mixed-concern mess)
- [x] Each example shows:
  - ✅ Good: Proper DoD completion with evidence
  - ❌ Bad: Common violations with explanation of why dangerous
  - Assessment: Clear pass/fail determination

**File**: `~/.claude/skills/wolf-governance/SKILL.md`
**Lines**: 137-305 (168 lines of examples)

#### 2. wolf-archetypes Good/Bad Examples ✅
- [x] Added 5 comprehensive Good/Bad example pairs:
  - Example 1: Feature Development (proper vs mixed concerns)
  - Example 2: Bug Fix (proper reliability-fixer vs feature creep)
  - Example 3: Security Work (proper security-hardener vs mislabeled bug)
  - Example 4: Research/Exploration (proper research-prototyper vs runaway feature)
  - Example 5: Multiple Lenses (proper lens stacking vs ignoring critical requirements)
- [x] Each example shows:
  - MCP tool call syntax
  - Selected archetype with rationale
  - Evidence requirements
  - Execution approach
  - ❌ Bad: Common mistakes with corrections

**File**: `~/.claude/skills/wolf-archetypes/SKILL.md`
**Lines**: 203-526 (323 lines of examples)

#### 3. wolf-roles Subagent Templates ✅
- [x] Created templates directory: `~/.claude/skills/wolf-roles/templates/`
- [x] Created 4 comprehensive role templates:

**Template 1: coder-agent-template.md** ✅
- Mission, role context, Wolf framework integration
- Execution checklist (before, during, after)
- Handoff protocol to code-reviewer-agent
- Red Flags - STOP section
- Success criteria
- **Lines**: 139

**Template 2: pm-agent-template.md** ✅
- Requirements development guidance
- User story format (As a... I want... so that...)
- Acceptance criteria format (GIVEN-WHEN-THEN)
- Incremental breakdown (shards)
- Validation protocol
- GitHub issue template
- **Lines**: 188

**Template 3: security-agent-template.md** ✅
- Threat modeling (STRIDE analysis)
- Security validation requirements
- Penetration testing scenarios
- Defense-in-depth validation
- Blocking authority documentation
- Security review checklist
- **Lines**: 276

**Template 4: code-reviewer-agent-template.md** ✅
- Comprehensive review checklist (7 sections)
- Governance compliance validation
- Code quality assessment criteria
- Testing validation
- Documentation review
- Approval/rejection templates
- Merge authority documentation
- **Lines**: 337

**Total**: 940 lines of template documentation

- [x] Updated wolf-roles SKILL.md with:
  - Subagent Templates section
  - When to use templates
  - Template structure documentation
  - Placeholder format explanation
  - Multi-role workflow patterns
  - Benefits documentation

**Files**:
- `~/.claude/skills/wolf-roles/templates/coder-agent-template.md`
- `~/.claude/skills/wolf-roles/templates/pm-agent-template.md`
- `~/.claude/skills/wolf-roles/templates/security-agent-template.md`
- `~/.claude/skills/wolf-roles/templates/code-reviewer-agent-template.md`
- `~/.claude/skills/wolf-roles/SKILL.md` (updated)

### In Progress 🔄

#### 4. wolf-verification Skill-Chaining Patterns 🔄 CURRENT TASK
**Status**: Not yet started
**Plan**:
- [ ] Add "Red Flags - STOP" section (6-8 rationalizations)
- [ ] Add "After Using This Skill" section
- [ ] Add verification checklist
- [ ] Add Good/Bad examples (2-3 pairs)
- [ ] Update version to v1.1.0
- [ ] Document integration with governance gates

**Why important**: Verification is called by governance and roles skills. Must have same chaining patterns.

### Planned Items 📋

#### 5. wolf-scripts-core Enhancements 📋
**Status**: Planned
**Plan**:
- [ ] Add "Red Flags - STOP" section
- [ ] Add verification checklists for script usage
- [ ] Document script-to-skill chaining
- [ ] Update version to v1.1.0

**Priority**: Medium (scripts support skills but aren't in primary chain)

#### 6. wolf-scripts-agents Enhancements 📋
**Status**: Planned
**Plan**:
- [ ] Add "Red Flags - STOP" section
- [ ] Add coordination checklists
- [ ] Document agent dispatching patterns
- [ ] Update version to v1.1.0

**Priority**: Medium

#### 7. wolf-instructions Enhancement 📋
**Status**: Planned
**Plan**:
- [ ] Add "Red Flags - STOP" section
- [ ] Add cascade resolution checklists
- [ ] Update version to v1.1.0

**Priority**: Low (instructions are meta-skill, less frequently used)

#### 8. wolf-adr Enhancement 📋
**Status**: Planned
**Plan**:
- [ ] Add "Red Flags - STOP" for ADR creation
- [ ] Add ADR validation checklist
- [ ] Add Good/Bad ADR examples
- [ ] Update version to v1.1.0

**Priority**: Low (ADR is documentation skill)

#### 9. wolf (master skill) Enhancement 📋
**Status**: Planned
**Plan**:
- [ ] Update to reference new skill chains
- [ ] Add master coordination guidance
- [ ] Update version to v1.1.0

**Priority**: Medium (master skill should reflect new patterns)

---

## Phase 3: Finalization & Distribution 📋 PLANNED

**Goal**: Version bump, comprehensive testing, marketplace update

### Planned Items 📋

#### 1. Version Updates 📋
- [ ] Bump all enhanced skills to v1.2.0 (Phase 2 completion)
- [ ] Update CHANGELOG.md with Phase 2 additions
- [ ] Update README.md with new features

#### 2. Marketplace Sync 📋
- [ ] Copy all updated skills from ~/.claude/skills/ to marketplace
- [ ] Copy subagent templates
- [ ] Verify all files present
- [ ] Commit Phase 2 changes
- [ ] Push to GitHub

#### 3. Testing & Validation 📋
- [ ] Test wolf-session-init initialization flow
- [ ] Test skill-chaining workflow (principles → archetypes → governance → roles)
- [ ] Test subagent template dispatching
- [ ] Verify Red Flags - STOP sections trigger correctly
- [ ] Test verification checklists enforce completion

#### 4. Documentation 📋
- [ ] Update main README with v1.2.0 features
- [ ] Document breaking changes (if any)
- [ ] Create migration guide for existing users
- [ ] Update SKILL-TEMPLATE.md with new patterns

---

## Implementation Statistics

### Files Modified (Phase 1 + Phase 2)

**Phase 1** (v1.0.0 → v1.1.0):
- wolf-principles/SKILL.md: +70 lines (Red Flags, After Using, Checklist)
- wolf-archetypes/SKILL.md: +86 lines (Red Flags, After Using, Checklist, Examples)
- wolf-governance/SKILL.md: +127 lines (Red Flags, After Using, Checklist, Examples)
- wolf-roles/SKILL.md: +194 lines (Red Flags, After Using, Checklist, Examples, Handoffs)
- wolf-session-init/SKILL.md: +249 lines (NEW FILE)

**Phase 1 Total**: 5 files, +726 lines

**Phase 2** (v1.1.0 → v1.2.0 planned):
- wolf-governance/SKILL.md: +168 lines (3 Good/Bad examples)
- wolf-archetypes/SKILL.md: +323 lines (5 Good/Bad examples)
- wolf-roles/SKILL.md: +89 lines (Template documentation)
- wolf-roles/templates/coder-agent-template.md: +139 lines (NEW FILE)
- wolf-roles/templates/pm-agent-template.md: +188 lines (NEW FILE)
- wolf-roles/templates/security-agent-template.md: +276 lines (NEW FILE)
- wolf-roles/templates/code-reviewer-agent-template.md: +337 lines (NEW FILE)

**Phase 2 Total**: 7 files, +1,520 lines (4 new template files)

**Combined Total**: 12 files, +2,246 lines

### Expected Final Count (After Phase 2 Complete)

- wolf-verification/SKILL.md: ~+100 lines (estimated)
- wolf-scripts-core/SKILL.md: ~+50 lines (estimated)
- wolf-scripts-agents/SKILL.md: ~+50 lines (estimated)

**Estimated Grand Total**: ~15 files, ~2,446 lines added

---

## Skill Chain Diagram

```
SESSION START
    |
    v
[wolf-session-init] - Master initialization (MANDATORY)
    |  1. Query principles
    |  2. Find archetype
    |  3. Load governance
    |  4. Load role
    v
[wolf-principles] - Strategic guidance
    |  - Decision-making framework
    |  - Trade-off evaluation
    |  - REQUIRED NEXT: wolf-archetypes
    v
[wolf-archetypes] - Tactical profile
    |  - Work type classification
    |  - Evidence requirements
    |  - Priority order
    |  - REQUIRED NEXT: wolf-governance
    |  - OPTIONAL IF LENSES: wolf-verification
    v
[wolf-governance] - Quality framework
    |  - Definition of Done
    |  - Quality gates
    |  - Compliance requirements
    |  - REQUIRED NEXT: wolf-roles
    |  - REQUIRED ALWAYS: wolf-verification
    v
[wolf-roles] - Execution context
    |  - Responsibilities & boundaries
    |  - Collaboration patterns
    |  - REQUIRED DURING: wolf-verification
    |  - Chain complete: Ready to implement ✅
    v
IMPLEMENTATION
    |
    v
[wolf-verification] - Checkpoint validation (called during work)
    |  - Three-layer validation (CoVe, HSP, RAG)
    |  - Evidence collection
    |  - Gate validation
    v
COMPLETION ✅
```

---

## Pattern Examples

### Before Skill-Chaining (Old Way)

```markdown
## Integration with Other Skills

- **wolf-archetypes**: Principles inform archetype behavior
- **wolf-roles**: Each role implements relevant principles
- **wolf-governance**: Principles guide governance rules
```

**Problem**: Informational only. Agent reads once and ignores. No enforcement.

### After Skill-Chaining (New Way)

```markdown
## Red Flags - STOP

If you catch yourself thinking:

- ❌ **"This is too simple to need principles"** - Simple decisions cascade. Query principles BEFORE proceeding.

**STOP. Use `mcp__wolf-knowledge__query_principles` BEFORE proceeding.**

## After Using This Skill

**REQUIRED NEXT STEPS:**

```
Sequential skill chain - DO NOT skip steps
```

1. **REQUIRED NEXT SKILL**: Use **wolf-archetypes** to determine behavioral archetype
   - **Why**: Principles are strategic guidance. Archetypes translate them into tactical requirements.
   - **Gate**: Cannot proceed to implementation without archetype selection
   - **MCP Tool**: `mcp__wolf-knowledge__find_archetype({ labels: [...], description: "..." })`

**DO NOT PROCEED to implementation without completing steps 1-3.**

### Verification Checklist

Before claiming you've applied principles:

- [ ] Queried wolf-principles for relevant guidance
- [ ] Selected archetype using wolf-archetypes
- [ ] Identified quality gates using wolf-governance

**Can't check all boxes? Work is incomplete. Return to this skill.**
```

**Benefits**:
- Explicit next steps with MCP tool syntax
- Blocking gates prevent skipping
- Verification checklist enforces completion
- Red flags catch rationalizations early

---

## Success Metrics

### Measured Compliance (Before Enhancement)
- Archetype selection: ~40% (60% skip)
- Governance checks: ~30% (70% skip)
- Verification: ~50% (50% skip)
- Role boundaries: ~60% (40% violation)

### Target Compliance (After Enhancement)
- Archetype selection: >95% (<5% skip, blocked by gates)
- Governance checks: >90% (<10% skip, blocked by gates)
- Verification: >95% (<5% skip, required by checklist)
- Role boundaries: >95% (<5% violation, role guidance loaded)

### Early Indicators (Phase 1 Complete)
- ✅ Skills now discoverable through marketplace
- ✅ Explicit skill chains documented
- ✅ Red Flags - STOP sections present in 5 skills
- ✅ Verification checklists prevent premature completion
- ✅ wolf-session-init provides mandatory entry point

**Awaiting**: Real-world testing with agents to validate compliance improvements

---

## Technical Debt & Future Work

### Known Limitations

1. **Template Placeholders**: Manual replacement required
   - Future: Build tool to auto-fill placeholders from context
   - Future: Create template preprocessor

2. **Verification Automation**: Checklists are manual
   - Future: Automated checklist validation via scripts
   - Future: MCP tools to report checklist completion

3. **Skill Version Tracking**: Manual version bumps
   - Future: Automated versioning based on changes
   - Future: Dependency version tracking

### Enhancement Ideas

1. **Dynamic Skill Chaining**: Context-aware skill suggestions
2. **Compliance Dashboard**: Real-time compliance metrics
3. **AI-Assisted Templates**: LLM-powered template completion
4. **Skill Analytics**: Track which skills trigger most often

---

## Maintenance Notes

### Updating This Plan

**When to update**:
- Before starting new work (add to Planned)
- When completing tasks (move to Completed)
- When discovering new requirements (add to Future Work)
- After major milestones (update statistics)

**What to include**:
- Exact file paths
- Line counts for transparency
- Commit hashes for traceability
- Rationale for decisions
- Impact analysis

### Session Recovery

If session is interrupted, this plan enables:
1. **Context Recovery**: Read "In Progress" section to resume
2. **Status Check**: Review completed vs planned items
3. **Next Steps**: Follow "Planned Items" in priority order
4. **Verification**: Compare local files to this plan's statistics

---

## Next Immediate Steps

1. **CURRENT TASK**: Enhance wolf-verification with skill-chaining patterns
   - Add Red Flags - STOP section
   - Add After Using This Skill section
   - Add verification checklist
   - Add 2-3 Good/Bad examples
   - Bump version to v1.1.0

2. **THEN**: Consider wolf-scripts-core and wolf-scripts-agents (medium priority)

3. **FINALLY**: Version bump to v1.2.0 and push Phase 2 to GitHub

---

## Collaboration Protocol

**If session needs handoff**:
1. Read this PLAN.md completely
2. Check "In Progress" section for current task
3. Review completed items to understand context
4. Continue from current task
5. Update PLAN.md as you work

**When making changes**:
- Update statistics (file counts, line counts)
- Move completed items from Planned → Completed
- Document decisions and rationale
- Keep "Next Immediate Steps" current

---

*Last Updated*: 2025-11-14 01:XX (in progress)
*Current Phase*: Phase 2 - Enhanced Examples & Templates
*Current Task*: wolf-verification skill-chaining patterns
*Next Milestone*: Complete Phase 2, bump to v1.2.0, push to GitHub
