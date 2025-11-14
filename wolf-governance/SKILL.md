---
name: wolf-governance
description: Use when checking compliance or process requirements - provides governance framework with quality gates, approval hierarchies, and mandatory validation rules; enforces Definition of Done, two-tier test pipeline, and authority structure across 4 pillars (portability, reproducibility, safety, research value)
version: 1.0.1
triggers:
  - "governance framework"
  - "compliance requirements"
  - "quality gates enforcement"
  - "approval hierarchy"
  - "process standards"
  - "authority structure"
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

---

*Source: docs/governance/*, Canon Charter, ADRs*
*Last Updated: 2025-10-19*
*Phase: Hybrid Skills Migration*

## Changelog

### 1.0.1 (2025-11-14)
- Enhanced frontmatter with governance-specific triggers
- Improved description to highlight four pillars and mandatory gates
- Added authority structure and enforcement keywords