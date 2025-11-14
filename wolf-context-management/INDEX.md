# Wolf Context Management Index

**Quick Reference** | [Full Documentation](./SKILL.md)

---

## Purpose

Prevent context bloat through phase-aware checkpointing and compaction.

**Problem**: Exploration accumulates 10-40k tokens of irrelevant files/searches
**Solution**: Create checkpoint artifacts before compacting context

---

## When to Use

✅ After exploration (found files, ready to implement)
✅ After implementation (tests pass, ready for verification)
✅ Before review handoff (evidence collected)
✅ Context feels bloated (token warnings)

---

## The 3-Step Workflow

### Step 1: Identify Phase
- Exploration → Implementation
- Implementation → Verification
- Verification → Handoff
- Reference compaction (anytime)

### Step 2: Create Checkpoint ⚠️ REQUIRED

```bash
mkdir -p .claude/context
```

**Templates** (in `wolf-context-management/templates/`):
- `exploration-checkpoint-template.md`
- `implementation-checkpoint-template.md`
- `verification-checkpoint-template.md`

**Naming**: `{phase}-{YYYY-MM-DD}-{feature-slug}.md`

**Content**: Use template, fill all sections, ensure self-contained

### Step 3: Verify and Compact

**Checklist**:
- [ ] Checkpoint file created
- [ ] Filename follows convention
- [ ] All sections filled (no placeholders)
- [ ] Self-contained (can resume from it alone)
- [ ] Essential context preserved

**Request User Approval**:
```
Context checkpoint created: .claude/context/{filename}
Ready to compact context.
Review checkpoint and approve.
```

**Execute**:
```
/compact preserve checkpoints in .claude/context/
```

---

## Red Flags 🛑

❌ Compact before checkpoint → FORBIDDEN
❌ Checkpoint before finding solution → NO
❌ Checkpoint missing essential info → STOP
❌ Checkpoint has {TODO} placeholders → NO

---

## Expected Results

**Token Savings**: 30-50% per session
- Exploration: -70% (30k → 9k)
- Implementation: -60% (40k → 16k)
- Verification: -50% (20k → 10k)

**Preserved**:
- ✅ Essential context in checkpoint file
- ✅ Wolf framework context
- ✅ Current task requirements

**Discarded**:
- ❌ Irrelevant file contents
- ❌ Failed searches/test runs
- ❌ Full documentation pages

---

## Integration Points

**Coder-Agent Workflow**:
1. After exploration → Create checkpoint before TDD
2. After implementation → Create checkpoint before verification
3. Before review → Create checkpoint before handoff

**Multi-Agent Workflow**:
Each agent creates checkpoint at handoff for clean context transfer.

---

## Quick Templates

### Exploration Checkpoint (Minimal)
```markdown
# Exploration Summary - {FEATURE}

## Relevant Files
1. `{path}` (lines {X}-{Y}) - {what/why}

## Key Findings
- Current state: {summary}
- Pattern to follow: {pattern}

## Ready for Implementation
- Files to modify: {list}
- Tests to add: {list}
```

### Implementation Checkpoint (Minimal)
```markdown
# Implementation Summary - {FEATURE}

## Changes
1. `{path}` (+{N}/-{M}) - {summary}

## Test Results
✅ {X} tests passing
✅ Coverage: {%}

## Key Decisions
1. {Decision}: {Rationale}

## Ready for Verification
Tests passing, docs updated, journal created.
```

### Verification Checkpoint (Minimal)
```markdown
# Verification Summary - {FEATURE}

## Evidence
- Tests: {passing/count}
- Coverage: {%}
- CI: {status}

## Acceptance Criteria
- [x] {AC1} - ✅ Met
- [x] {AC2} - ✅ Met

## Ready for Review
All evidence collected, PR ready.
```

---

## Troubleshooting

**Don't know which phase?**
- Check coder-agent template checklist position
- When in doubt, checkpoint anyway

**Checkpoint feels incomplete?**
- Test: Can you resume from it in fresh session?
- Add missing files/decisions/understanding

**Compaction removed needed context?**
- Read checkpoint file first
- If missing, re-explore (why we checkpoint first)

**Too many checkpoint files?**
- Short term: Ignore (small files)
- Long term: Manual cleanup after PR merged
- Future: Auto-cleanup (see PLAN.md)

---

## Success Criteria

✅ Checkpoint created before compaction
✅ Checkpoint self-contained
✅ 30-50% token reduction
✅ Essential context preserved
✅ Can continue with clean context

---

**For Full Details**: See [SKILL.md](./SKILL.md)

**Related Skills**:
- superpowers:verification-before-completion (evidence collection)
- wolf-governance (Definition of Done)
- wolf-roles coder-agent (integration points)

---

*Version: 1.0.0*
*Part of Wolf Skills Marketplace*
