---
name: wolf-archetypes
description: Behavioral archetypes for automatic agent adaptation based on work type (condensed index)
version: 1.2.0
triggers:
  - "select archetype"
  - "behavioral profile"
  - "work type"
---

# Wolf Archetypes Index

**Quick reference for archetype selection.** For detailed evidence requirements, examples, and anti-patterns, use the Skill tool to load `wolf-archetypes` SKILL.md.

## The 11 Behavioral Archetypes

**Label-Based Selection:**

1. **product-implementer** (`feature`, `enhancement`, `user-story`)
   Building new features or enhancing existing functionality. Priority: Delivery speed, user value.

2. **security-hardener** (`security`, `auth`, `crypto`, `vulnerability`)
   Security-sensitive work requiring threat analysis. Priority: Threat reduction, defense-in-depth.

3. **perf-optimizer** (`perf`, `performance`, `optimization`, `slow`)
   Performance work requiring measurement-driven approach. Priority: Latency, throughput.

4. **reliability-fixer** (`bug`, `regression`, `hotfix`, `incident`)
   Bug fixes requiring systematic analysis and prevention. Priority: Root cause, stability.

5. **research-prototyper** (`spike`, `research`, `explore`, `prototype`)
   Exploration work needing timeboxing and validation. Priority: Learning, hypothesis validation.

6. **repository-hygienist** (`hygiene`, `cleanup`, `dependencies`, `gitignore`)
   Repository maintenance requiring systematic cleanup. Priority: Maintainability, consistency.

7. **accessibility-champion** (`a11y`, `accessibility`, `wcag`, `inclusive-design`)
   Accessibility work requiring WCAG compliance. Priority: Inclusive design, usability.

8. **data-contract-steward** (`schema`, `migration`, `api`, `contract`, `breaking-change`)
   Contract changes requiring compatibility planning. Priority: Backward compatibility, safe migration.

9. **platform-gardener** (`infrastructure`, `ci-cd`, `build-system`, `platform`)
   Platform work affecting team productivity. Priority: Developer productivity, system reliability.

10. **maintainability-refactorer** (`refactor`, `tech-debt`, `code-quality`, `patterns`)
    Refactoring requiring discipline to avoid behavior changes. Priority: Code clarity, consistency.

11. **ai-assist-conductor** (`ai-assist`, `prompt-engineering`, `model-coordination`)
    AI-assisted work requiring human validation. Priority: Human oversight, validation.

---

## The 4 Overlay Lenses

Apply on top of any archetype for specialized requirements:

**🎯 Performance Lens**
Apply when: Work impacts system performance or has latency requirements
Evidence: Baseline metrics, post-change metrics, p95 latency targets met

**🔒 Security Lens**
Apply when: Work touches authentication, authorization, data protection, or crypto
Evidence: Threat model, security scan results, penetration test passed

**♿ Accessibility Lens**
Apply when: Work involves UI/UX or user-facing features
Evidence: WCAG audit, keyboard navigation, screen reader validation

**📊 Observability Lens**
Apply when: Work involves distributed systems or debugging requirements
Evidence: Logging implemented, metrics collected, distributed tracing enabled

---

## Quick Selection Guide

**Got labels?** → Match primary label to archetype
- `feature` → product-implementer
- `bug` → reliability-fixer
- `security` → security-hardener
- `perf` → perf-optimizer

**Multiple labels?** → Primary archetype + overlay lenses
- Example: `[feature, security]` → product-implementer + security lens
- Example: `[bug, performance]` → reliability-fixer + performance lens

**No labels?** → Use work description
- "Add user dashboard" → product-implementer
- "Fix login crash" → reliability-fixer
- "Explore GraphQL options" → research-prototyper

---

## Evidence Requirements by Archetype

- **product-implementer**: AC met, tests pass, docs updated
- **security-hardener**: Threat model, security scan, pen test
- **perf-optimizer**: Baseline + post metrics, budgets met
- **reliability-fixer**: Root cause documented, regression test, monitoring
- **research-prototyper**: Findings documented, recommendations, risks
- *(Full evidence details in SKILL.md)*

---

## Next Steps

**REQUIRED NEXT SKILL**: Load `wolf-governance`
- **Why**: Archetype defines priorities. Governance defines concrete acceptance criteria.
- **Gate**: Cannot start implementation without knowing Definition of Done
- **Tool**: Use Skill tool to load `wolf-governance`

**Sequential Skill Chain:**
1. Principles (loaded)
2. ✅ **Archetypes** (you are here)
3. → Load `wolf-governance` for quality gates
4. → Load `wolf-roles` for role-specific guidance

---

*This is a condensed index (~500 tokens). For full content (~5,300 tokens), load SKILL.md.*
