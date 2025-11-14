---
name: wolf-roles
description: Guidance for 50+ specialized Wolf agent roles with responsibilities and collaboration patterns (condensed index)
version: 1.2.0
triggers:
  - "agent role"
  - "role guidance"
  - "responsibilities"
---

# Wolf Roles Index

**Quick reference for role categories and patterns.** For detailed role cards, collaboration flows, and escalation paths, use the Skill tool to load `wolf-roles` SKILL.md.

## The 6 Role Categories (50+ Total Roles)

### 🎯 Product & Planning (8 roles)
**pm-agent**, requirements-analyst, strategist, epic-specialist, user-story-specialist, decision-agent, task-lead, orchestrator

**Key Responsibility**: Define requirements, prioritize work, coordinate agents

### 💻 Development (12 roles)
**coder-agent** (parent), coder-typescript-react, frontend, backend, fullstack, refactor-lead, ml-agent, infrastructure, pipeline, observability, devops-agent

**Key Responsibility**: Implement solutions, write code, build features

### 🔍 Review & Quality (11 roles)
**code-reviewer-agent** (primary), pr-reviewer, design-reviewer, **qa-agent** (parent), qa-unit-tester, qa-performance-tester, qa-security-tester, qa-ux-tester, validation-agent

**Key Responsibility**: Validate quality, enforce gates, ensure compliance

### 🛡️ Specialized Functions (10 roles)
**security-agent**, **architect-lens-agent**, system-architect, design-lead, bash-validation, error-forensics, metrics-agent, ci-monitor, **research-agent**

**Key Responsibility**: Domain expertise, specialized analysis, investigation

### 🧹 Maintenance & Operations (9 roles)
**hygiene-agent**, hygienist, curator, index-agent, historian, documentation-agent, release-agent, release-manager

**Key Responsibility**: Keep system clean, organized, and maintained

### 📢 Support & Communication (6 roles)
support-triage, communications, teacher, learning, workflow-coach, context-agent, **intake-agent**

**Key Responsibility**: Communication, knowledge transfer, work intake

---

## Core Role Pattern

Every role has:
- **Responsibilities**: What this role does
- **Non-Goals**: What this role does NOT do
- **Tools**: Skills and tools available
- **Collaboration**: Who they work with
- **Escalation**: When and to whom to escalate

---

## Common Collaboration Patterns

### Pattern 1: Feature Development
```
pm-agent → research-agent → architect-lens-agent → coder-agent → qa-agent → code-reviewer-agent
```

### Pattern 2: Bug Fix
```
intake-agent → error-forensics-agent → coder-agent → qa-agent → code-reviewer-agent
```

### Pattern 3: Security Issue
```
security-agent → architect-lens-agent → coder-agent → qa-security-tester → code-reviewer-agent
```

### Pattern 4: Refactoring
```
code-reviewer-agent (identifies tech debt) → refactor-lead → coder-agent → qa-agent → code-reviewer-agent
```

---

## Authority Boundaries

**Can Merge:**
- code-reviewer-agent (final authority)

**Cannot Merge Own Work:**
- coder-agent
- refactor-lead
- Any implementer

**Can Block:**
- security-agent (any security issue)
- qa-agent (test failures)
- code-reviewer-agent (quality issues)

**Must Seek Approval:**
- All implementers → code-reviewer
- All specialized work → domain expert

---

## Handoff Protocol

When handing off work:
1. **Create handoff comment** with:
   - Work completed
   - Decisions made
   - Outstanding issues
   - What's needed next

2. **Tag next role** (e.g., @code-reviewer-agent)

3. **Link to evidence** (tests, docs, journal)

4. **Wait for acceptance** before considering work complete

---

## Escalation Guidance

**When stuck:**
1. Document the blocker
2. Identify who can unblock (role category)
3. Tag that role in PR/issue
4. Continue with unblocked work if possible

**Escalation Chain:**
```
Implementer → Code Reviewer → PM Agent → Orchestrator
Specialist → Domain Lead → PM Agent → Orchestrator
```

**Emergency:** Security issues escalate directly to security-agent

---

## Role Templates

For multi-agent work, use role templates:
- `coder-agent-template.md`
- `qa-agent-template.md`
- `architect-agent-template.md`
- `research-agent-template.md`
- `devops-agent-template.md`

Templates provide:
- Pre-filled mission context
- Execution checklists
- Handoff protocols
- Success criteria

---

## Next Steps

**You've completed the core Wolf skill chain!**

**Primary chain loaded:**
1. ✅ Principles (strategic guidance)
2. ✅ Archetypes (work type adaptation)
3. ✅ Governance (quality gates)
4. ✅ **Roles** (execution guidance)

**RECOMMENDED NEXT SKILLS** (depending on work):
- **If implementing code**: Load relevant workflow (feature/security/bugfix)
- **If needs templates**: Load role-specific template
- **If needs verification**: Load `wolf-verification`
- **If making decisions**: Load `wolf-adr`

---

*This is a condensed index (~400 tokens). For full content (~4,100 tokens), load SKILL.md.*
