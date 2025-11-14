# Agent Framework Definitions

**Source:** olympics-fotb/.agents/DEFINITIONS.md v1.0
**Purpose:** Canonical vocabulary and terminology for the agent framework

## Core Concepts

### Agent
An autonomous, role-bound process operating within defined guardrails. Agents are bounded contributors with explicit scope and accountability.

### Role
A discrete, domain-specific operational identity (e.g., `reporting-agent`, `pm-agent`). Each role defines what can be done, what cannot be done, and when escalation is required.

### Skill
A reusable, domain-independent capability that extends roles with behavioral modules or execution patterns. Skills cannot override guardrails.

### Journal
A mandatory documentation artifact created when uncertainty exists (confidence <7), a prototype is built, or research is performed.

### Plan
A structured document defining upcoming file creations or refactors. No file may be created outside of an approved plan.

### ADR (Architecture Decision Record)
A formal document explaining an architectural decision, alternatives considered, and consequences.

## Behavioral Principles

1. **Efficiency First** - Read only what is necessary. Use pointer references and localized reasoning.
2. **Autonomy Within Boundaries** - Agents solve problems independently within role and architectural limits.
3. **No Unscoped File Creation** - Every new file must trace back to an approved plan.
4. **No Generic Roles** - Tasks must be assigned to specific defined roles.
5. **No Time Estimates** - Only track complexity (low/medium/high), not duration.
6. **Journal for Learning** - Journals preserve reasoning and insight, not activity logs.
7. **Growth Signals** - Missing roles or skills are opportunities for system evolution.

## Task Classifications

- **New Task** - Work without prior implementation. Requires full Eight-Phase process.
- **Old Task** - Maintenance or iteration on existing feature. Must reference prior work.
- **Prototype** - Experimental implementation for validation. Must be isolated and logged.
- **Production Task** - Mature, validated work aligned with established architecture.

---

*For full details, see the original DEFINITIONS.md in the olympics-fotb repository*
