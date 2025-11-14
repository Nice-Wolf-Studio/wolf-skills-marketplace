---
name: wolf-session-init
description: **MANDATORY** Use at the start of EVERY session - establishes Wolf behavioral framework (condensed index)
version: 1.1.0
triggers:
  - "session start"
  - "new task"
  - "context recovery"
  - "begin work"
---

# Wolf Session Initialization Index

**MANDATORY PROTOCOL - NO EXCEPTIONS**

This condensed index provides the essential 4-step initialization checklist. For detailed examples, red flags, and troubleshooting, use the Skill tool to load `wolf-session-init` SKILL.md.

---

## MANDATORY FIRST RESPONSE PROTOCOL

**BLOCKING GATES** - Cannot proceed without completion

Before responding to ANY user request or starting ANY work, complete these 4 steps IN ORDER:

### Step 1: Query Wolf Principles (BLOCKING) ⚠️

**Purpose**: Load strategic decision-making guidance

**Action**: Use the Skill tool to load **wolf-principles** (or INDEX.md for quick reference)

**Gate**: Cannot proceed without principles loaded

**Verify**: Can articulate which principles guide this work

---

### Step 2: Find Behavioral Archetype (BLOCKING) ⚠️

**Purpose**: Determine work type and behavioral profile

**Action**: Use the Skill tool to load **wolf-archetypes** (or INDEX.md for quick reference)

**Gate**: Cannot proceed without archetype selection

**Selection Method**:
- Check GitHub issue labels
- Match primary label to archetype (feature → product-implementer, bug → reliability-fixer, etc.)
- Apply overlay lenses if needed (security, performance, accessibility, observability)

**Verify**: Can name selected archetype and why

---

### Step 3: Load Governance Requirements (BLOCKING) ⚠️

**Purpose**: Understand Definition of Done and quality gates

**Action**: Use the Skill tool to load **wolf-governance** (or INDEX.md for quick reference)

**Gate**: Cannot start work without knowing acceptance criteria

**Key Requirements**:
- **MUST**: Tests passing, code review, docs, journal, CI green
- **SHOULD**: Performance benchmarks, security scan, accessibility
- **Two-tier pipeline**: Fast-Lane (PR creation) + Full-Suite (merge)

**Verify**: Can list Definition of Done for this work

---

### Step 4: Load Role Guidance (BLOCKING) ⚠️

**Purpose**: Understand role responsibilities and boundaries

**Action**: Use the Skill tool to load **wolf-roles** (or INDEX.md for quick reference)

**Gate**: Cannot execute work without understanding role boundaries

**Key Boundaries**:
- Cannot merge own PRs
- Cannot approve own work
- Must follow role-specific workflows
- Escalate when outside role scope

**Verify**: Can describe role responsibilities and non-goals

---

## Quick Initialization Checklist

Copy this at session start:

```
Wolf Session Initialization - MANDATORY
========================================

[ ] Step 1: Principles Loaded
    Used: Skill tool → wolf-principles/INDEX.md
    Can articulate: _______________________________

[ ] Step 2: Archetype Selected
    Used: Skill tool → wolf-archetypes/INDEX.md
    Selected: _____________________________________

[ ] Step 3: Governance Loaded
    Used: Skill tool → wolf-governance/INDEX.md
    DoD Requirements: _____________________________

[ ] Step 4: Role Guidance Loaded
    Used: Skill tool → wolf-roles/INDEX.md
    Role: _________________________________________

[ ] All Gates Passed - Ready to Begin Work ✅
```

**ALL checkboxes MUST be checked before starting implementation.**

---

## Red Flags - STOP ⚠️

If you catch yourself thinking:

- ❌ **"I'll check principles later"** - NO. Principles come FIRST.
- ❌ **"Task is too simple for full protocol"** - Wrong. ALL tasks follow protocol.
- ❌ **"I already know my archetype"** - Evidence-based selection required.
- ❌ **"I'll skip governance for speed"** - Skipping governance SLOWS you down through rework.
- ❌ **"I remember my role from last session"** - Role cards evolve. Load current guidance.
- ❌ **"This is just exploration"** - Exploration uses `research-prototyper` archetype. Still requires protocol.

**STOP. Return to Step 1. Complete the protocol.**

---

## What Happens After Initialization

Once all 4 steps are complete, you have established:

### ✅ Complete Behavioral Context

1. **Strategic Guidance** (Principles)
   - Decision-making framework active
   - Trade-off evaluation criteria loaded

2. **Tactical Profile** (Archetype)
   - Work type identified
   - Evidence requirements specific to this work
   - Priority order established

3. **Quality Framework** (Governance)
   - Definition of Done understood
   - Quality gates identified
   - Compliance requirements clear

4. **Execution Context** (Role)
   - Responsibilities clear
   - Boundaries understood
   - Collaboration patterns loaded

### 🚀 Ready to Execute

With initialization complete, you can now:
- Begin implementation with confidence
- Make decisions aligned with principles
- Produce evidence meeting archetype requirements
- Follow governance gates automatically
- Operate within role boundaries

---

## Common Initialization Patterns

### Pattern 1: New Feature
```
Step 1: Query principles → Focus on #1 (Artifact-First), #9 (Incremental Value)
Step 2: Find archetype → Result: product-implementer
Step 3: Load governance → DoD: AC met, tests, docs, journal, review
Step 4: Load role → Role: coder-agent

Ready to Code: Write tests first, implement incrementally, create journal
```

### Pattern 2: Security Issue
```
Step 1: Query principles → Focus on #5 (Evidence-Based), #2 (Role Isolation)
Step 2: Find archetype → Result: security-hardener
Step 3: Load governance → DoD: Threat model, scan, pen test
Step 4: Load role → Role: security-agent

Ready to Secure: Threat model, security scan, defense-in-depth, journal
```

### Pattern 3: Bug Fix
```
Step 1: Query principles → Focus on #3 (Research-Before-Code), #6 (Self-Improving)
Step 2: Find archetype → Result: reliability-fixer
Step 3: Load governance → DoD: Root cause, regression test, monitoring
Step 4: Load role → Role: error-forensics-agent → coder-agent

Ready to Fix: Root cause analysis, regression test, monitoring, journal
```

---

## Using INDEX vs SKILL.md Files

### Use INDEX.md (Quick Reference)
- **When**: Fast initialization, familiar with system
- **Token cost**: ~2,600 tokens total (all 5 INDEX files)
- **Content**: Core principles, checklists, quick reference
- **Best for**: Experienced users, simple tasks

### Use SKILL.md (Full Guidance)
- **When**: Complex work, new users, need examples
- **Token cost**: ~20,400 tokens total (all 5 SKILL files)
- **Content**: Detailed examples, red flags, troubleshooting
- **Best for**: High-risk work, unfamiliar situations

### Smart Loading (Recommended)
- Load INDEX files for all 4 skills (~2,600 tokens)
- Load full SKILL.md ONLY for selected archetype (~1,500 tokens)
- Total: ~4,100 tokens (80% reduction)

---

## Next Steps After Initialization

**RECOMMENDED NEXT SKILLS** (depending on task):

1. **If implementing code**: Load appropriate workflow
   - Use `wolf-workflows` to select (feature/security/bugfix)

2. **If needs research**: Use research patterns
   - Time-boxed spikes with proof-of-concept

3. **During implementation**: Use verification checkpoints
   - Load `wolf-verification` for continuous validation

4. **For architecture decisions**: Document in ADR
   - Load `wolf-adr` when making architectural choices

**Session initialization ALWAYS comes first. Other skills follow as needed.**

---

*This is a condensed index (~800 tokens). For full content (~3,700 tokens), load SKILL.md.*
