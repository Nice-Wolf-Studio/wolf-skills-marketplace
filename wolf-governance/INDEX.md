---
name: wolf-governance
description: Wolf's governance framework, compliance rules, quality gates, and process standards (condensed index)
version: 1.2.0
triggers:
  - "governance"
  - "compliance"
  - "quality gates"
---

# Wolf Governance Index

**Quick reference for governance requirements.** For detailed examples, process flows, and emergency procedures, use the Skill tool to load `wolf-governance` SKILL.md.

## The Four Pillars (Canon Charter)

All governance decisions evaluated against:

1. **Portability** 🔄 - Cross-environment compatibility, platform independence
2. **Reproducibility** 🔁 - Consistent outcomes, predictable behavior
3. **Safety** 🛡️ - Risk mitigation, secure operations, fail-safe mechanisms
4. **Research Value** 🔬 - Scientific methodology, evidence-based decisions

---

## Authority Structure

```
Code Reviewers → Final merge authority, architectural decisions
PM Agents → Requirements authority, prioritization, release sign-off
Specialist Roles → Domain expertise, advisory input, escalation triggers
Implementers → Cannot merge own PRs, cannot bypass gates
```

**MANDATORY**: No agent can approve their own work

---

## Definition of Done (DoD)

### MUST Have (Blocking ⛔)
- ✅ All tests passing (Fast-Lane + Full-Suite)
- ✅ Code review approved (by different agent)
- ✅ Documentation updated (README, API docs, CHANGELOG)
- ✅ Journal entry created (`YYYY-MM-DD-task-slug.md`)
- ✅ CI/CD checks green

### SHOULD Have (Strong Recommendation ⚠️)
- 📊 Performance benchmarks met
- 🔒 Security scan clean
- ♿ Accessibility validated (if UI work)
- 📈 Metrics improved or maintained

### MAY Have (Optional ℹ️)
- 🎨 UI/UX review
- 🌍 Internationalization
- 📱 Mobile testing

---

## Two-Tier Test Pipeline

### Fast-Lane (5-10 min) - Required for PR Creation
- Linting: Max 5 errors allowed
- Unit tests: 60% coverage minimum
- Critical integration tests pass
- Security: 0 critical, ≤5 high vulnerabilities
- Smoke tests: Core services start

### Full-Suite (30-60 min) - Required for Merge
- E2E tests: 90% success rate
- Performance: Score ≥70/100
- Security: Score ≥80/100
- Cross-platform: Node 18/20/21 compatible
- Migration: Rollback procedures tested

---

## Archetype-Specific Gates

**product-implementer**:
- AC met ✅, Tests pass ✅, Docs updated ✅

**security-hardener**:
- Threat model ✅, Security scan ✅, Pen test ✅

**perf-optimizer**:
- Baseline metrics ✅, Post-change metrics ✅, Budgets met ✅

**reliability-fixer**:
- Root cause documented ✅, Regression test ✅, Monitoring added ✅

**research-prototyper**:
- Findings documented ✅, Recommendations ✅, Risks identified ✅

*(Full archetype gates in SKILL.md)*

---

## Quick Compliance Check

Before requesting review:
- [ ] Can I answer "yes" to all 5 MUST-haves?
- [ ] Did Fast-Lane pass? (tests, linting, security)
- [ ] Did someone else review my work? (not self-approved)
- [ ] Does my journal entry exist?
- [ ] Are CI checks green?

If any "no" → Not ready for merge

---

## Emergency Procedures

**When blocked by failing gate:**
1. Fix the issue (preferred)
2. Escalate to PM for priority decision
3. Document reason in journal
4. Never bypass without approval

**When gates conflict:**
1. Security gates override all others
2. Safety gates override performance
3. Evidence gates override speed

---

## Process Requirements

### Phase Lifecycle
All work follows: Planning → Implementation → Review → Merge

### Artifact Requirements
- **Code**: GitHub PR with descriptive title
- **Docs**: README, API docs, inline comments
- **Journal**: Problems, decisions, learnings
- **Tests**: Unit, integration, E2E coverage

### Review Requirements
- At least 1 approval from code-reviewer
- Address all comments or document why not
- Re-request review after changes
- Pass all CI checks before merge

---

## Next Steps

**REQUIRED NEXT SKILL**: Load `wolf-roles`
- **Why**: Governance defines WHAT must be done. Roles define WHO does it and HOW.
- **Gate**: Cannot execute governance without understanding role boundaries
- **Tool**: Use Skill tool to load `wolf-roles`

**Sequential Skill Chain:**
1. Principles (loaded)
2. Archetypes (loaded)
3. ✅ **Governance** (you are here)
4. → Load `wolf-roles` for role-specific guidance

---

*This is a condensed index (~600 tokens). For full content (~4,500 tokens), load SKILL.md.*
