---
name: wolf-principles
description: Wolf's 10 core principles for agent behavior and system design (condensed index)
version: 1.1.0
triggers:
  - "wolf principles"
  - "core principles"
  - "system guidelines"
---

# Wolf Principles Index

**Quick reference for Wolf's 10 core principles.** For detailed implementation guidance, examples, and conflict resolution, use the Skill tool to load `wolf-principles` SKILL.md.

## The 10 Core Principles

1. **Artifact-First Development**
   All work produces durable, verifiable artifacts (PRs, ADRs, journals), not ephemeral conversations.

2. **Role Isolation and Separation of Concerns**
   Each agent role has clearly defined responsibilities with minimal overlap and strict boundaries.

3. **Research-Before-Code**
   All implementation must be preceded by structured research and evidence-based recommendations.

4. **Advisory-First Enforcement**
   New policies are tested in advisory mode (shadow) before becoming hard gates.

5. **Evidence-Based Decision Making**
   All decisions must be supported by concrete evidence and measurable outcomes.

6. **Self-Improving Systems**
   The system continuously learns from operations and evolves based on evidence.

7. **Multi-Provider Resilience**
   Operate reliably across multiple AI providers with graceful fallback.

8. **GitHub-Native Integration**
   Leverage GitHub primitives (Apps, Actions, Issues) to minimize custom infrastructure.

9. **Incremental Value Delivery**
   Work broken into small increments (2-8h) that are independently valuable and deployable.

10. **Transparent Governance**
    All decisions, processes, and constraints are openly documented and auditable.

---

## When Principles Conflict

**Priority Order:**
1. Security and Safety (Principles 2, 7)
2. Evidence and Quality (Principles 3, 5, 6)
3. Operational Efficiency (Principles 1, 8, 9)
4. Governance and Compliance (Principles 4, 10)

---

## Quick Application Guide

- **Making decisions?** → Use Principles 3, 5 (Research-First, Evidence-Based)
- **Designing architecture?** → Use Principles 1, 2, 7 (Artifacts, Isolation, Resilience)
- **Implementing features?** → Use Principles 3, 9 (Research-First, Incremental)
- **Enforcing policies?** → Use Principles 4, 10 (Advisory-First, Transparent)
- **Building automation?** → Use Principles 6, 8 (Self-Improving, GitHub-Native)

---

## Next Steps

**REQUIRED**: Load detailed guidance when needed
- Use Skill tool to load `wolf-principles` for:
  - Detailed implementation guidance
  - Example applications for each principle
  - Conflict resolution patterns
  - Integration with other Wolf skills

**Sequential Skill Chain:**
1. ✅ **Principles** (you are here)
2. → Load `wolf-archetypes` to determine work type
3. → Load `wolf-governance` to understand quality gates
4. → Load `wolf-roles` for role-specific guidance

---

*This is a condensed index (~300 tokens). For full content (~2,700 tokens), load SKILL.md.*
