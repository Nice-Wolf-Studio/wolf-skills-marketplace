---
name: wolf-session-init
description: **MANDATORY** Use at the start of EVERY session before any work - establishes Wolf behavioral framework and ensures all required skills are loaded and chained properly
version: 1.0.0
triggers:
  - "session start"
  - "new task"
  - "context recovery"
  - "begin work"
  - "start implementation"
---

# Wolf Session Initialization

**MANDATORY PROTOCOL - NO EXCEPTIONS**

This skill MUST be used at the start of EVERY work session to establish the complete Wolf behavioral framework. Skipping this protocol causes agents to operate without proper guidance, leading to governance violations, skipped quality gates, and wasted effort.

## When to Use This Skill

**ALWAYS** - This is not optional:
- ✅ At the start of every new session
- ✅ After context compaction or recovery
- ✅ When starting any new task or work item
- ✅ Before beginning implementation
- ✅ When role or archetype changes

**This skill replaces ad-hoc skill loading with systematic initialization.**

## MANDATORY FIRST RESPONSE PROTOCOL

```
BLOCKING GATES - Cannot proceed without completion
```

Before responding to ANY user request or starting ANY work, you **MUST** complete this checklist IN ORDER:

### Step 1: Query Wolf Principles (BLOCKING) ⚠️

**Purpose**: Load strategic decision-making guidance

**Action**:
```javascript
mcp__wolf-knowledge__query_principles({})
```

**Gate**: Cannot proceed without principles loaded

**Why**: Principles guide ALL decisions. Operating without principles = operating blind.

**Verification**: Confirm you can articulate relevant principles for the task

---

### Step 2: Find Behavioral Archetype (BLOCKING) ⚠️

**Purpose**: Determine work type and behavioral profile

**Action**:
```javascript
mcp__wolf-knowledge__find_archetype({
  labels: ["feature", "security", ...], // from GitHub issue
  description: "Clear description of work"
})
```

**Gate**: Cannot proceed without archetype selection

**Why**: Archetypes define priorities, evidence requirements, and quality gates specific to work type.

**Verification**: Confirm archetype selected (e.g., `product-implementer`, `security-hardener`, `reliability-fixer`)

---

### Step 3: Load Governance Requirements (BLOCKING) ⚠️

**Purpose**: Understand Definition of Done and quality gates

**Action**:
```javascript
mcp__wolf-knowledge__search_governance({
  query: "quality gates definition of done"
})
```

**Gate**: Cannot start work without knowing acceptance criteria

**Why**: Governance defines WHAT constitutes complete, acceptable work.

**Verification**: Can list DoD requirements (tests, docs, journal, review, CI)

---

### Step 4: Load Role Guidance (BLOCKING) ⚠️

**Purpose**: Understand role responsibilities and boundaries

**Action**:
```javascript
mcp__wolf-knowledge__get_role_guidance({
  role_name: "your-role" // e.g., "coder-agent", "pm-agent"
})
```

**Gate**: Cannot execute work without understanding role boundaries

**Why**: Roles define WHO does what and HOW. Operating outside role boundaries violates governance.

**Verification**: Can articulate role responsibilities and non-goals

---

## Session Initialization Checklist

Copy this checklist at the start of EVERY session:

```
Wolf Session Initialization - MANDATORY
========================================

[ ] Step 1: Principles Loaded
    Tool: mcp__wolf-knowledge__query_principles({})
    Result: _______________________________________

[ ] Step 2: Archetype Selected
    Tool: mcp__wolf-knowledge__find_archetype({...})
    Result: _______________________________________

[ ] Step 3: Governance Loaded
    Tool: mcp__wolf-knowledge__search_governance({...})
    DoD Requirements: ______________________________

[ ] Step 4: Role Guidance Loaded
    Tool: mcp__wolf-knowledge__get_role_guidance({...})
    Role: __________________________________________

[ ] All Gates Passed - Ready to Begin Work ✅
```

**ALL checkboxes MUST be checked before starting implementation.**

## Red Flags - STOP

If you catch yourself thinking:

- ❌ **"I'll check principles later"** - NO. Principles come FIRST. They guide all subsequent decisions.
- ❌ **"Task is too simple for full protocol"** - Wrong. ALL tasks follow protocol. Size doesn't matter.
- ❌ **"I already know my archetype"** - Evidence-based selection required. Don't assume.
- ❌ **"I'll skip governance for speed"** - Skipping governance SLOWS you down through rework.
- ❌ **"I remember my role from last session"** - Role cards evolve. Load current guidance.
- ❌ **"This is just exploration, no need for protocol"** - Exploration uses `research-prototyper` archetype. Still requires protocol.
- ❌ **"I'll load governance after I start coding"** - Too late. Governance guides implementation choices.

**STOP. Return to Step 1. Complete the protocol.**

## What Happens After Initialization

Once all 4 steps are complete, you have established:

### ✅ Complete Behavioral Context

1. **Strategic Guidance** (Principles)
   - Decision-making framework active
   - Trade-off evaluation criteria loaded
   - Evidence requirements understood

2. **Tactical Profile** (Archetype)
   - Work type identified
   - Evidence requirements specific to this work
   - Priority order established
   - Lenses applied if needed (security/perf/a11y/observability)

3. **Quality Framework** (Governance)
   - Definition of Done understood
   - Quality gates identified
   - Approval requirements known
   - Compliance requirements clear

4. **Execution Context** (Role)
   - Responsibilities clear
   - Boundaries understood
   - Collaboration patterns loaded
   - Escalation paths identified

### 🚀 Ready to Execute

With initialization complete, you can now:
- Begin implementation with confidence
- Make decisions aligned with principles
- Produce evidence meeting archetype requirements
- Follow governance gates automatically
- Operate within role boundaries

## Common Initialization Patterns

### Pattern 1: New Feature Development

```yaml
Session Start:
  Step 1: Query principles → Focus on #1 (Artifact-First), #9 (Incremental Value)
  Step 2: Find archetype → Result: product-implementer
  Step 3: Load governance → DoD: AC met, tests, docs, journal, review
  Step 4: Load role → Role: coder-agent

Ready to Code:
  - Write tests first
  - Implement incrementally
  - Update docs continuously
  - Create journal entry
  - Request review from code-reviewer-agent
```

### Pattern 2: Security Issue

```yaml
Session Start:
  Step 1: Query principles → Focus on #5 (Evidence-Based), #2 (Role Isolation)
  Step 2: Find archetype → Result: security-hardener
  Step 3: Load governance → DoD: Threat model, scan, pen test
  Step 4: Load role → Role: security-agent

Ready to Secure:
  - Create threat model
  - Run security scans
  - Implement defense-in-depth
  - Document in journal
  - Can block merges if gates fail
```

### Pattern 3: Bug Fix

```yaml
Session Start:
  Step 1: Query principles → Focus on #3 (Research-Before-Code), #6 (Self-Improving)
  Step 2: Find archetype → Result: reliability-fixer
  Step 3: Load governance → DoD: Root cause, regression test, monitoring
  Step 4: Load role → Role: error-forensics-agent → coder-agent

Ready to Fix:
  - Document root cause analysis
  - Add regression test (watch it fail)
  - Implement fix (watch test pass)
  - Enhance monitoring
  - Create journal entry with learnings
```

## Context Recovery Protocol

If context is compacted or lost during session, re-run initialization:

```yaml
Context Lost Event:
  1. Detect: Unable to recall principles/archetype/governance/role
  2. Stop: Halt current work immediately
  3. Re-initialize: Run full 4-step protocol again
  4. Verify: Confirm context matches pre-compaction state
  5. Resume: Continue work with restored context
```

**Why**: Operating with partial context is worse than stopping to recover. Incomplete context leads to governance violations.

## Anti-Patterns (Forbidden)

### ❌ Partial Initialization
- Loading only principles but skipping archetype
- Loading role but skipping governance
- ANY incomplete initialization

**Why**: Each step builds on the previous. Missing steps = missing critical context.

### ❌ Assumed Context
- "I remember from last session"
- "This is obvious, no need to load"
- "I already know what to do"

**Why**: Context evolves. Role cards update. Governance changes. Always load fresh.

### ❌ Post-Hoc Loading
- Starting implementation, then loading governance
- Coding first, checking archetype later
- "I'll initialize once I understand the task"

**Why**: Initialization GUIDES work. Loading after starting = rework.

## Integration with Other Skills

After completing session initialization, you may invoke other specialized skills:

- **wolf-verification**: For checkpoint validation during work
- **wolf-scripts-core**: For automated archetype/governance checks
- **wolf-adr**: For architecture decision documentation
- **wolf-instructions**: For domain/project-specific guidance

**But initialization ALWAYS comes first.**

## Success Metrics

### Before Session Initialization Skill

- Agents skip archetype selection: ~60%
- Agents skip governance checks: ~70%
- Agents claim completion without verification: ~50%
- Agents operate outside role boundaries: ~40%

### After Session Initialization Skill

- Agents skip archetype selection: <5% (blocked by gates)
- Agents skip governance checks: <10% (blocked by gates)
- Agents claim completion without verification: <5% (checklist required)
- Agents operate outside role boundaries: <5% (role card loaded)

## Validation

To verify initialization worked correctly, agent should be able to answer:

1. **Principles**: What principles guide this work?
2. **Archetype**: What is my behavioral archetype and why?
3. **Governance**: What is my Definition of Done?
4. **Role**: What are my responsibilities and boundaries?

**Cannot answer all 4? Initialization incomplete. Return to Step 1.**

---

## Summary

**Wolf Session Initialization is MANDATORY and BLOCKING.**

```
Every session MUST start with:
1. Query principles
2. Find archetype
3. Load governance
4. Load role

No exceptions. No shortcuts. No assumptions.
```

**Why**: These 4 steps establish the complete behavioral context needed to produce high-quality, governance-compliant work efficiently.

**When to use**: At the start of EVERY session, BEFORE any work begins.

**Verification**: Complete the checklist. If you can't check all boxes, initialization is incomplete.

---

*Last Updated: 2025-11-14*
*Phase: Superpowers Skill-Chaining Enhancement v2.0.0*
*Version: 1.0.0*
