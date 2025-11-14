# Migration Guide: v2.0.0 → v3.0.0

This guide helps existing Wolf Skills Marketplace users upgrade from v2.0.0 (Phase 2) to v3.0.0 (Phase 3: Skill-Chaining Patterns).

## Table of Contents

1. [Overview of Changes](#overview-of-changes)
2. [Breaking Changes](#breaking-changes)
3. [New Features](#new-features)
4. [Migration Steps](#migration-steps)
5. [Updated Workflows](#updated-workflows)
6. [Skill Version Changes](#skill-version-changes)
7. [Troubleshooting](#troubleshooting)

---

## Overview of Changes

Phase 3 introduces **skill-chaining patterns** that make Wolf skill usage more explicit and systematic. Key improvements:

### What's New in v3.0.0

1. **Explicit Skill Chains**: Skills now have "REQUIRED NEXT SKILL" callouts
2. **New wolf-workflows Skill**: Multi-agent workflow orchestration templates
3. **4 New Role Templates**: qa-agent, architect-agent, research-agent, devops-agent
4. **Enhanced Skills**: 5 core skills upgraded with skill-chaining patterns
5. **Verification Checklists**: All enhanced skills have pass/fail criteria
6. **Good/Bad Examples**: Concrete compliance patterns in all enhanced skills

### Philosophy Change

**v2.0.0 (Phase 2)**: Skills were reference documentation
**v3.0.0 (Phase 3)**: Skills are prescriptive workflows with mandatory chains

**What This Means**:
- In v2.0.0, you could consult skills in any order
- In v3.0.0, skills guide you through mandatory sequences
- Skills now explicitly tell you which skill to use next

---

## Breaking Changes

### 1. Primary Skill Chain Now Mandatory

**v2.0.0**: Recommended to load Wolf skills, but optional

**v3.0.0**: PRIMARY SKILL CHAIN is MANDATORY before any work

```
MANDATORY SEQUENCE:
wolf-principles → wolf-archetypes → wolf-governance → wolf-roles
```

**Migration Action**: Update your workflows to always load the primary chain first.

**Before (v2.0.0)**:
```
User: Help me add authentication
Claude: [starts implementing directly]
```

**After (v3.0.0)**:
```
User: Help me add authentication
Claude: [loads primary skill chain]
Claude: [uses wolf-archetypes to determine archetype]
Claude: [uses wolf-workflows to select feature-workflow]
Claude: [follows workflow with decision gates]
```

---

### 2. Skill Usage is Sequential, Not Ad-Hoc

**v2.0.0**: Skills could be used independently in any order

**v3.0.0**: Skills have explicit "REQUIRED NEXT SKILL" chains

**Example Skill Chain** (wolf-scripts-core v1.1.0):
```markdown
## After Using This Skill

### REQUIRED NEXT: wolf-archetypes
After running automation scripts, you MUST load wolf-archetypes to understand the archetype's priorities.

### RECOMMENDED: wolf-governance
Use wolf-governance to understand quality gates that automation scripts enforce.
```

**Migration Action**: Follow skill-chaining guidance in "After Using This Skill" sections.

---

### 3. Workflow Templates Now Explicit

**v2.0.0**: No formal workflow templates, agents improvised

**v3.0.0**: 3 explicit workflow templates with mandatory phases

**Migration Action**: Use `wolf-workflows` skill to select appropriate workflow:
- Feature development → `feature-workflow-template.md`
- Security concerns → `security-workflow-template.md`
- Bug fixes → `bugfix-workflow-template.md`

---

### 4. Decision Gates Are Non-Negotiable

**v2.0.0**: Quality checks were recommendations

**v3.0.0**: Decision gates are blocking checkpoints

**Example Decision Gate**:
```
✅ Requirements approved → Proceed to Design
❌ Requirements incomplete → Block until refined
```

**Migration Action**: Don't skip decision gates. They prevent expensive rework.

---

## New Features

### 1. wolf-workflows Skill (NEW in v3.0.0)

**Purpose**: Orchestrate multi-agent workflows from start to finish

**What It Provides**:
- 3 complete workflow templates (feature, security, bugfix)
- Agent chains (which agents work in sequence)
- Decision gates (when to proceed or block)
- Handoff protocols (what each agent passes to next)
- Success criteria (how to know when complete)

**How to Use**:
```
Use wolf-workflows skill to help me build a new feature.
```

Claude will select the appropriate workflow template and guide you through all phases.

---

### 2. New Role Templates

**Added 4 New Templates** (total now 8):

#### qa-agent-template.md (NEW)
- Test strategy and validation
- Test pyramid (unit, integration, E2E)
- Lens-specific testing (performance, security, accessibility, observability)
- Quality gates (Fast-Lane + Full-Suite)

#### architect-agent-template.md (NEW)
- Architecture design and ADR creation
- Component diagrams
- Alternatives evaluation (minimum 3)
- Implementation guidance for coder-agent

#### research-agent-template.md (NEW)
- Time-boxed research methodology
- Proof-of-concept creation
- Comparative analysis
- Evidence-based recommendations

#### devops-agent-template.md (NEW)
- CI/CD pipeline design
- Infrastructure as Code
- Monitoring and alerting (Four Golden Signals)
- Deployment strategies with rollback plans

**How to Use**:
Role templates are automatically used when following workflows. You can also explicitly request:
```
Act as qa-agent and create a test strategy for my authentication feature.
```

---

### 3. Enhanced Skills with Skill-Chaining Patterns

**5 Skills Upgraded** (v1.0.0 → v1.1.0):

#### wolf-scripts-core v1.1.0
- Added "Red Flags - STOP" (6 rationalizations)
- Added "After Using This Skill" with skill chains
- Added verification checklist (5 items)
- Added 2 Good/Bad examples

#### wolf-scripts-agents v1.1.0
- Added "Red Flags - STOP" (6 rationalizations)
- Added "After Using This Skill" with skill chains
- Added verification checklist (6 items)
- Added 2 Good/Bad examples

#### wolf (master skill) v1.1.0
- Complete skill chain diagram
- Decision tree for skill navigation
- Updated all skill listings with current versions
- Added "Red Flags - STOP" (5 rationalizations)

#### wolf-instructions v1.1.0
- Added cascade resolution patterns
- Added "Red Flags - STOP" (5 rationalizations about priority conflicts)
- Added verification checklist (5 items)
- Added Good/Bad example (instruction priority resolution)

#### wolf-adr v1.1.0
- Added "When ADRs Are REQUIRED vs OPTIONAL" section
- Added "Red Flags - STOP" (5 rationalizations)
- Added ADR creation checklist (7 items)
- Added comprehensive Good/Bad ADR example

**How to Use**:
Skills automatically include skill-chaining guidance. After using a skill, follow the "REQUIRED NEXT SKILL" callout.

---

### 4. "Red Flags - STOP" Sections

**Purpose**: Catch common rationalizations before they cause problems

**Example** (from wolf-scripts-core):
```markdown
## Red Flags - STOP

If you catch yourself thinking:

- ❌ **"Skipping automated checks to save time"** - STOP. Automation exists because manual checks fail.
- ❌ **"Manual validation is good enough"** - NO. Manual validation is inconsistent and error-prone.

**STOP. Use the appropriate automation script BEFORE proceeding.**
```

**Migration Action**: Pay attention to Red Flags sections. They warn against patterns that cause rework.

---

### 5. Verification Checklists

**Purpose**: Ensure work is complete before moving to next phase

**Example** (from wolf-adr):
```markdown
## Verification Checklist

- [ ] ADR created with all required sections
- [ ] At least 3 alternatives documented
- [ ] Decision rationale is evidence-based (not opinion)
- [ ] Consequences (positive and negative) documented
- [ ] Implementation guidance provided
```

**Migration Action**: Use checklists to validate work completeness.

---

## Migration Steps

### Step 1: Update Repository

Pull the latest changes from the marketplace:

```bash
cd ~/.claude/plugins/marketplaces/wolf-skills-marketplace
git pull origin main
```

### Step 2: Restart Claude Code

Restart Claude Code to reload skills:
```bash
# Restart your IDE or Claude Code session
```

### Step 3: Verify New Skills Loaded

Check that new skills are available:
```
List available Wolf skills, including wolf-workflows.
```

You should see:
- wolf-workflows (NEW)
- wolf-scripts-core v1.1.0 (UPGRADED)
- wolf-scripts-agents v1.1.0 (UPGRADED)
- wolf v1.1.0 (UPGRADED)
- wolf-instructions v1.1.0 (UPGRADED)
- wolf-adr v1.1.0 (UPGRADED)

### Step 4: Update Your Workflows

**If you have custom workflows**:
1. Read the new workflow templates in `wolf-workflows/templates/`
2. Update your workflows to include:
   - Primary skill chain loading
   - Decision gates
   - Handoff protocols
   - Success criteria

**If using ad-hoc processes**:
1. Select appropriate workflow template (feature, security, bugfix)
2. Follow workflow phases sequentially
3. Don't skip decision gates

### Step 5: Test with a Small Task

Validate the migration with a simple task:
```
Use the feature workflow to add a "Hello World" endpoint to my API.
```

Claude should:
1. Load primary skill chain
2. Determine archetype
3. Follow feature workflow template
4. Guide through requirements → design → implementation → testing → review

### Step 6: Review Enhanced Skills

Read the enhanced skills to understand new patterns:
1. `wolf-scripts-core/SKILL.md` - Automation patterns
2. `wolf-scripts-agents/SKILL.md` - Coordination patterns
3. `wolf/SKILL.md` - Complete skill chain diagram
4. `wolf-instructions/SKILL.md` - Cascade resolution
5. `wolf-adr/SKILL.md` - ADR requirements

---

## Updated Workflows

### Feature Development (v3.0.0)

**v2.0.0 Workflow** (implicit):
```
User describes feature → Claude implements → Tests → Review → Merge
```

**v3.0.0 Workflow** (explicit):
```
1. Load primary skill chain (principles → archetypes → governance → roles)
2. Use wolf-workflows to select feature-workflow-template
3. Phase 1: Requirements (pm-agent)
   - Decision Gate: Requirements approved?
4. Phase 2: Research (research-agent, optional)
   - Decision Gate: Research findings approved?
5. Phase 3: Design (architect-lens-agent)
   - Decision Gate: Design approved?
6. Phase 4: Implementation (coder-agent)
   - Decision Gate: Implementation complete?
7. Phase 5: Testing (qa-agent)
   - Decision Gate: Tests passing?
8. Phase 6: Review (code-reviewer-agent)
   - Decision Gate: Review approved?
9. Merge
```

**Key Differences**:
- Explicit primary skill chain loading
- Explicit workflow template selection
- Decision gates between phases
- Formal handoff protocols

---

### Security Review (v3.0.0)

**NEW in v3.0.0**: Explicit security workflow template

**Security Workflow**:
```
1. Load primary skill chain
2. Use wolf-workflows to select security-workflow-template
3. Phase 1: Threat Modeling (pm-agent with STRIDE)
   - Decision Gate: Threat model complete?
4. Phase 2: Security Research (research-agent, optional)
   - Decision Gate: Security research complete?
5. Phase 3: Security Design (architect-lens-agent with defense-in-depth)
   - Decision Gate: Security design approved?
6. Phase 4: Secure Implementation (coder-agent with security lens)
   - Decision Gate: Security controls implemented?
7. Phase 5: Security Testing (qa-agent with OWASP Top 10)
   - Decision Gate: Security tests passing? (0 critical, ≤5 high)
8. Phase 6: Security Review (code-reviewer-agent with security lens)
   - Decision Gate: Security review approved?
9. Merge
```

**Key Features**:
- STRIDE threat modeling
- Defense-in-depth architecture
- OWASP Top 10 validation
- Mandatory security gates

---

### Bugfix (v3.0.0)

**NEW in v3.0.0**: Explicit bugfix workflow template

**Bugfix Workflow**:
```
1. Load primary skill chain
2. Use wolf-workflows to select bugfix-workflow-template
3. Phase 1: Triage (pm-agent)
   - Decision Gate: Bug reproduced?
4. Phase 2: Root Cause Analysis (research-agent or coder-agent)
   - Decision Gate: Root cause identified?
5. Phase 3: Fix Implementation (coder-agent with RED-GREEN-REFACTOR)
   - Decision Gate: Fix implemented and tests passing?
6. Phase 4: Regression Testing (qa-agent)
   - Decision Gate: Regression tests passing?
7. Phase 5: Review (code-reviewer-agent)
   - Decision Gate: Review approved?
8. Merge
```

**Key Features**:
- Systematic root cause analysis
- RED-GREEN-REFACTOR (write failing test → minimal fix → refactor)
- Regression test mandatory
- No symptom patching (must fix root cause)

---

## Skill Version Changes

### Enhanced Skills (v1.0.0 → v1.1.0)

| Skill | v2.0.0 | v3.0.0 | Changes |
|-------|--------|--------|---------|
| wolf-scripts-core | v1.0.0 | v1.1.0 | +Red Flags, +Skill chains, +Verification checklist, +Good/Bad examples |
| wolf-scripts-agents | v1.0.0 | v1.1.0 | +Red Flags, +Skill chains, +Verification checklist, +Good/Bad examples |
| wolf (master) | v1.0.0 | v1.1.0 | +Skill chain diagram, +Decision tree, +Red Flags |
| wolf-instructions | v1.0.0 | v1.1.0 | +Cascade resolution, +Red Flags, +Verification checklist, +Good/Bad example |
| wolf-adr | v1.0.0 | v1.1.0 | +ADR requirements section, +Red Flags, +ADR checklist, +Good/Bad ADR example |

### New Skills (v3.0.0)

| Skill | Version | Description |
|-------|---------|-------------|
| wolf-workflows | v1.0.0 | Multi-agent workflow templates (feature, security, bugfix) |

### Unchanged Skills (Still v1.0.0 or other)

- wolf-principles
- wolf-archetypes
- wolf-governance
- wolf-roles (updated to v1.2.0 with 4 new templates, but core skill unchanged)
- wolf-verification

---

## Troubleshooting

### Issue: Skills Not Showing v1.1.0 Versions

**Symptoms**: Skills still showing v1.0.0

**Solution**:
1. Ensure you pulled latest from git: `git pull origin main`
2. Restart Claude Code
3. Clear Claude's skill cache (if applicable)
4. Verify file timestamps are recent: `ls -la ~/.claude/plugins/marketplaces/wolf-skills-marketplace/wolf-scripts-core/`

---

### Issue: wolf-workflows Not Found

**Symptoms**: Claude doesn't recognize wolf-workflows skill

**Solution**:
1. Verify wolf-workflows directory exists: `ls ~/.claude/plugins/marketplaces/wolf-skills-marketplace/wolf-workflows/`
2. Verify SKILL.md exists in wolf-workflows/
3. Restart Claude Code
4. Explicitly request: `Use wolf-workflows skill to help me.`

---

### Issue: Decision Gates Feel Restrictive

**Symptoms**: Workflow blocks at decision gates, feels slower than before

**Reality Check**: Decision gates prevent expensive rework:
- **v2.0.0**: Implement → Realize requirements were wrong → 2 days of rework
- **v3.0.0**: Requirements gate blocks → Refine requirements → Implement correctly → 30 minutes saved vs 2 days lost

**Decision gates are intentional friction to prevent costly mistakes.**

**Solution**: Don't try to bypass decision gates. Address the concerns they raise.

---

### Issue: "REQUIRED NEXT SKILL" Feels Rigid

**Symptoms**: Skill chains feel too prescriptive

**Understanding**: Skill chains exist because skipping steps causes problems:
- Skip wolf-principles → Don't understand Wolf behavioral rules
- Skip wolf-archetypes → Use wrong priorities for work type
- Skip wolf-governance → Miss quality gates, fail CI/CD
- Skip wolf-roles → Work outside role boundaries, scope creep

**Solution**: Trust the skill chains. They exist because skipping causes expensive mistakes.

---

### Issue: Too Many New Patterns to Learn

**Symptoms**: Overwhelmed by Red Flags, Verification Checklists, Good/Bad examples

**Approach**: Learn incrementally:
1. **Week 1**: Just load primary skill chain before work
2. **Week 2**: Follow one workflow template (start with feature workflow)
3. **Week 3**: Pay attention to Red Flags sections
4. **Week 4**: Use verification checklists
5. **Week 5**: Study Good/Bad examples for patterns

**Don't try to learn everything at once.**

---

## Migration Checklist

Use this checklist to ensure smooth migration:

- [ ] Updated repository (`git pull origin main`)
- [ ] Restarted Claude Code
- [ ] Verified new skills loaded (wolf-workflows visible)
- [ ] Verified enhanced skills show v1.1.0 versions
- [ ] Read wolf-workflows/SKILL.md
- [ ] Read at least one enhanced skill (wolf-scripts-core recommended)
- [ ] Tested primary skill chain loading
- [ ] Completed one workflow template end-to-end
- [ ] Read role templates for agents you use frequently
- [ ] Updated custom workflows (if any) to include decision gates
- [ ] Updated team documentation to reference v3.0.0 patterns

---

## What's Next

### Phase 4 (Future)

Phase 4 will focus on:
- Real-world agent testing results
- Performance metrics and efficiency improvements
- Additional workflow templates (deployment-workflow, refactoring-workflow)
- Enhanced MCP integrations
- Community-contributed skills

**Stay tuned for Phase 4 announcements.**

---

## Getting Help

### Documentation
- **GETTING-STARTED.md** - New user onboarding
- **README.md** - Marketplace overview
- **PLAN.md** - Project roadmap

### Community
- **GitHub Issues** - Bug reports and questions
- **Pull Requests** - Contributions welcome

---

## Summary

**Key Changes in v3.0.0**:
1. ✅ Primary skill chain is mandatory (principles → archetypes → governance → roles)
2. ✅ Explicit workflow templates with decision gates
3. ✅ Skill-chaining patterns ("REQUIRED NEXT SKILL" callouts)
4. ✅ 5 enhanced skills with Red Flags + Verification Checklists
5. ✅ New wolf-workflows skill with 3 workflow templates
6. ✅ 4 new role templates (qa, architect, research, devops)

**Migration Steps**:
1. ✅ Update repository (`git pull`)
2. ✅ Restart Claude Code
3. ✅ Load primary skill chain before work
4. ✅ Use workflow templates (feature, security, bugfix)
5. ✅ Follow decision gates
6. ✅ Use verification checklists

**Philosophy**:
- v2.0.0 = Reference documentation
- v3.0.0 = Prescriptive workflows

**Welcome to systematic, skill-chained Wolf Agent development!**
