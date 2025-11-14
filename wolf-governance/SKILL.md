---
name: wolf-governance
description: Wolf's governance framework, compliance rules, quality gates, and process standards
version: 1.1.0
triggers:
  - "governance"
  - "compliance"
  - "quality gates"
  - "process rules"
  - "approval requirements"
---

# Wolf Governance Skill

This skill provides access to Wolf's governance framework, including compliance requirements, quality gates, approval hierarchies, and process standards refined over 50+ phases of development.

## When to Use This Skill

- **REQUIRED** before making architectural or process changes
- When checking compliance requirements for work
- For understanding approval and review requirements
- When determining quality gates that must pass
- For escalation and authority questions

## Core Governance Framework

### The Four Pillars (Canon Charter)

All governance decisions are evaluated against these foundational principles:

1. **Portability** 🔄
   - Cross-environment compatibility
   - System adaptability
   - Platform independence
   - Provider agnosticism

2. **Reproducibility** 🔁
   - Consistent outcomes
   - Predictable behavior
   - Deterministic processes
   - Verifiable results

3. **Safety** 🛡️
   - Risk mitigation
   - Secure operations
   - Fail-safe mechanisms
   - Progressive validation

4. **Research Value** 🔬
   - Scientific methodology
   - Knowledge advancement
   - Evidence-based decisions
   - Learning capture

## Authority Structure

### Decision Authority Hierarchy

```yaml
Code Reviewers:
  - Final merge authority
  - Architectural decisions
  - Technical standards
  - Pattern enforcement

PM Agents:
  - Requirements authority
  - Prioritization decisions
  - Workflow coordination
  - Release sign-off

Specialist Roles:
  - Domain expertise
  - Comment-only reviews
  - Advisory input
  - Escalation triggers

Implementers:
  - Cannot merge own PRs
  - Cannot bypass gates
  - Cannot grant exceptions
  - Must follow process
```

### Separation of Concerns

**MANDATORY**: No agent can approve their own work
- Implementers → Reviewers
- Reviewers → Different reviewer for meta-reviews
- PM defines requirements → Cannot implement
- Security can block any change

## Quality Gates

### Definition of Done (DoD)

**MUST have** (blocking):
- ✅ All tests passing
- ✅ Code review approved
- ✅ Documentation updated
- ✅ Journal entry created
- ✅ CI/CD checks green

**SHOULD have** (strong recommendation):
- 📊 Performance benchmarks met
- 🔒 Security scan clean
- ♿ Accessibility validated
- 📈 Metrics improved

**MAY have** (optional):
- 🎨 UI/UX review
- 🌍 Internationalization
- 📱 Mobile testing

### Two-Tier Test Pipeline

#### Fast-Lane (5-10 minutes)
**Purpose**: Rapid iteration and basic validation

Requirements:
- Linting: Max 5 errors allowed
- Unit tests: 60% coverage minimum
- Critical integration tests pass
- Security: 0 critical, ≤5 high vulnerabilities
- Smoke tests: Core services start

#### Full-Suite (30-60 minutes)
**Purpose**: Production readiness validation

Requirements:
- E2E tests: 90% success rate
- Performance: Score ≥70/100
- Security: Score ≥80/100
- Cross-platform: Node 18/20/21 compatible
- Migration: Rollback procedures tested

## Process Requirements

### Phase Lifecycle (Canonical)

Every phase MUST follow:

1. **Seed Brief** 📋
   - Problem statement
   - Success criteria
   - Risk assessment
   - Resource allocation

2. **Pre-Phase Sweeps** 🔍
   - Dependency check
   - Conflict resolution
   - Environment preparation
   - Baseline metrics

3. **Shard Work** ⚡
   - Incremental delivery
   - Continuous validation
   - Journal updates
   - Progress tracking

4. **Close-Out Sweeps** ✅
   - Consolidation
   - Verification
   - Documentation
   - Learning capture

### Journal Requirements

**MANDATORY** for all work:

```markdown
## Problems
- Issues encountered
- Blockers identified
- Unexpected behaviors

## Decisions
- Choices made
- Trade-offs accepted
- Rationale documented

## Learnings
- Patterns discovered
- Improvements identified
- Knowledge gained
```

Format: `YYYY-MM-DD-<kebab-slug>.md`

### ADR (Architecture Decision Record)

Required for:
- Architectural changes
- Process modifications
- Tool selections
- Major refactoring

Format:
```markdown
# ADR-XXX: Title

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
[Problem description]

## Decision
[What was decided]

## Consequences
[Trade-offs and impacts]
```

## Compliance Matrix

### By Change Type

| Change Type | Required Approvals | Evidence | Gates |
|------------|-------------------|----------|-------|
| Bug Fix | Code Review | Tests, Root Cause | CI Pass |
| Feature | PM + Code Review | AC Met, Tests | DoD Complete |
| Security | Security + Code Review | Threat Model, Scan | Security Gates |
| Architecture | Architect + Code Review | ADR, Impact Analysis | Full Suite |
| Process | PM + Architect | ADR, Stakeholder Review | Governance Check |

### By Risk Level

| Risk | Additional Requirements |
|------|------------------------|
| Low | Standard gates |
| Medium | +1 reviewer, extended tests |
| High | Security review, rollback plan |
| Critical | Executive approval, staged rollout |

## Governance Enforcement

### Automated Checks

```yaml
Pre-commit:
  - Linting
  - Format validation
  - Secrets scanning

CI Pipeline:
  - Test execution
  - Coverage validation
  - Security scanning
  - Performance checks

Pre-merge:
  - Review approval
  - Gate validation
  - Documentation check
  - Journal verification
```

### Manual Reviews

Required human validation:
- Architecture alignment
- Business logic correctness
- Security implications
- UX impact

## Change Management

### Canon Charter Changes
**HIGHEST GOVERNANCE LEVEL**
- Research analysis required
- ADR documentation mandatory
- Multi-stakeholder review
- 30-day comment period

### Lifecycle Changes
- ADR required
- Architect approval
- Code Reviewer approval
- Backward compatibility analysis

### Policy Updates
- Impact assessment
- Migration plan if breaking
- Communication plan
- Grace period for adoption

## Escalation Paths

### Technical Escalation
```
Developer → Code Reviewer → Architect → CTO
```

### Process Escalation
```
Agent → PM → Orchestrator → Product Owner
```

### Security Escalation
```
ANY → Security Agent → CISO → Executive
```

### Emergency Override
Only for production incidents:
1. Document override reason
2. Apply temporary fix
3. Create follow-up ticket
4. Conduct post-mortem

## Anti-Patterns (Forbidden)

### ❌ Process Violations
- Skipping quality gates
- Merging own PRs
- Bypassing security scans
- Ignoring test failures

### ❌ Authority Violations
- Exceeding role boundaries
- Granting unauthorized exceptions
- Overriding specialist objections
- Ignoring escalation requirements

### ❌ Documentation Violations
- Missing journal entries
- No ADR for architecture changes
- Outdated documentation
- No evidence for decisions

## Governance Metrics

### Compliance Indicators
- Gate pass rate: >95%
- Review turnaround: <4 hours
- Journal compliance: 100%
- ADR coverage: All major changes

### Health Metrics
- CI reliability: >99%
- Test stability: >95%
- Security score: >80/100
- Documentation currency: <7 days

## Scripts Available

- `check.js` - Validate compliance for current work
- `gates.js` - List applicable quality gates
- `escalate.js` - Determine escalation path

## Integration with Other Skills

- **wolf-principles**: Governance implements principles
- **wolf-archetypes**: Archetypes follow governance rules
- **wolf-roles**: Roles have governance boundaries

## Red Flags - STOP

If you catch yourself thinking:

- ❌ **"Skipping quality gates to save time"** - STOP. Gates exist because skipping them costs MORE time in rework and incidents.
- ❌ **"This change is too small for governance"** - Wrong. Small changes compound. All work follows governance.
- ❌ **"I'll create the journal entry later"** - NO. Journal entry is part of Definition of Done. Create it NOW.
- ❌ **"Tests are passing locally, CI doesn't matter"** - CI is the source of truth. Local != production.
- ❌ **"I'm just fixing a typo, no review needed"** - ALL changes need review. Separation of concerns is non-negotiable.
- ❌ **"We can make an exception this time"** - Exceptions become habits. Follow Advisory-First Enforcement (Principle 4).
- ❌ **"Documentation can wait until after merge"** - NO. Documentation is part of DoD. Must be complete BEFORE merge.
- ❌ **"Merging my own PR is faster"** - FORBIDDEN. You cannot approve your own work (Authority Structure).

**STOP. Use `mcp__wolf-knowledge__search_governance` to check compliance requirements BEFORE proceeding.**

## After Using This Skill

**REQUIRED NEXT STEPS:**

```
Sequential skill chain - DO NOT skip steps
```

1. **REQUIRED NEXT SKILL**: Use **wolf-roles** to understand role-specific compliance requirements
   - **Why**: Governance defines WHAT must be done. Roles define WHO does it and HOW.
   - **Gate**: Cannot execute governance without understanding role boundaries
   - **MCP Tool**: `mcp__wolf-knowledge__get_role_guidance({ role_name: "your-role" })`
   - **Example**: `pm-agent` validates acceptance criteria, `coder-agent` implements, `code-reviewer` approves

2. **REQUIRED NEXT SKILL**: Use **wolf-verification** to set up verification checkpoints
   - **Why**: Governance gates require verification. Verification skill provides three-layer validation (CoVe, HSP, RAG).
   - **Gate**: Cannot claim compliance without verification evidence
   - **When**: Always - verification is mandatory for all governance gates
   - **Example**: Security gate requires threat model verification + scan validation

3. **REQUIRED BEFORE COMPLETION**: Create compliance artifacts
   - **Journal Entry**: `YYYY-MM-DD-<kebab-slug>.md` documenting problems, decisions, learnings
   - **ADR (if applicable)**: For architectural/process changes
   - **Evidence**: Test results, security scans, performance benchmarks
   - **Gate**: Cannot merge without complete artifact set

**DO NOT PROCEED to merge without completing steps 1-3.**

### Verification Checklist

Before claiming governance compliance:

- [ ] Archetype selected (from wolf-archetypes)
- [ ] Quality gates identified for this work type
- [ ] Definition of Done requirements understood
- [ ] Role boundaries confirmed (from wolf-roles)
- [ ] All MUST-have DoD items completed (tests, review, docs, journal, CI)
- [ ] SHOULD-have items evaluated (performance, security, a11y, metrics)
- [ ] Approval from authorized reviewer (not self-approval)
- [ ] CI/CD checks green (not just local)

**Can't check all boxes? Governance compliance incomplete. Return to this skill.**

### Governance Examples by Change Type

**Example 1: Bug Fix (reliability-fixer archetype)**
```
DoD Requirements:
✅ Root cause documented in journal
✅ Regression test added
✅ All tests passing (Fast-Lane + Full-Suite)
✅ Code review approved
✅ CI checks green

Gates:
- Fast-Lane: <10 min, linting ≤5 errors, 60% coverage
- Full-Suite: 90% E2E success, rollback tested
- Review: Code reviewer approval (not self)
```

**Example 2: Feature (product-implementer archetype)**
```
DoD Requirements:
✅ Acceptance criteria met (PM validation)
✅ Tests pass (unit + integration + E2E)
✅ Documentation updated (README, API docs)
✅ Journal entry created
✅ Performance benchmarks met

Gates:
- PM: Acceptance criteria validation
- Code Review: Technical quality + tests
- Security: Scan clean (if data handling involved)
- CI: Fast-Lane + Full-Suite green
```

**Example 3: Security Change (security-hardener archetype)**
```
DoD Requirements:
✅ Threat model documented
✅ Security scan clean
✅ Penetration test passed
✅ Defense-in-depth applied
✅ Monitoring/alerting added

Gates:
- Security Review: Threat model approved
- Security Scan: 0 critical, ≤5 high vulns
- Code Review: Implementation quality
- CI: Security gates + standard gates
- ADR: If architectural security decision
```

### Emergency Override Procedure

**ONLY for production incidents:**

```
1. Document override reason immediately
2. Apply minimum necessary temporary fix
3. Create follow-up ticket for proper fix
4. Conduct post-mortem within 48 hours
5. Update governance if process failed
```

**Override does NOT mean skip governance. It means parallel governance with expedited review.**

---

*Source: docs/governance/*, Canon Charter, ADRs*
*Last Updated: 2025-11-14*
*Phase: Superpowers Skill-Chaining Enhancement v2.0.0*