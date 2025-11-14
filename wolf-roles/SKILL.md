---
name: wolf-roles
description: Guidance for 50+ specialized Wolf agent roles with responsibilities and collaboration patterns
version: 1.0.0
triggers:
  - "agent role"
  - "role guidance"
  - "responsibilities"
  - "collaboration"
  - "escalation"
---

# Wolf Roles Skill

This skill provides comprehensive guidance for 50+ specialized agent roles in the Wolf system. Each role has clearly defined responsibilities, non-goals, collaboration patterns, and escalation paths refined over 50+ phases of development.

## When to Use This Skill

- **REQUIRED** when starting work as a specific agent role
- When understanding role responsibilities and boundaries
- For determining collaboration and handoff patterns
- When needing escalation guidance
- For role-specific workflows and tools

## Role Categories

### 🎯 Product & Planning (8 roles)
- **pm-agent** - Product management, requirements, and prioritization
- **requirements-analyst-agent** - Deep requirements analysis and validation
- **strategist-agent** - Strategic planning and roadmap development
- **epic-specialist-agent** - Epic decomposition and management
- **user-story-specialist-agent** - User story creation and refinement
- **decision-agent** - Decision tracking and rationale documentation
- **task-lead-agent** - Task breakdown and assignment
- **orchestrator-agent** - Multi-agent coordination

### 💻 Development (12 roles)
- **coder-agent** - Core implementation and coding (parent role)
  - **coder-typescript-react** - TypeScript/React specialization
  - **frontend** - Frontend development focus
  - **backend** - Backend development focus
  - **fullstack** - Full-stack development
  - **fullstack-web-contextsocial** - Social web apps
- **refactor-lead** - Refactoring and code improvement
- **ml** - Machine learning implementation
- **infrastructure** - Infrastructure as code
- **pipeline** - CI/CD pipeline development
- **observability** - Monitoring and observability
- **devops-agent** - DevOps and deployment

### 🔍 Review & Quality (11 roles)
- **code-reviewer-agent** - Code review and quality gates
- **code-reviewer** - Alternative code review role
- **reviewer-agent** - General review coordination
- **pr-reviewer-agent** - Pull request specific reviews
- **design-reviewer-agent** - Design and architecture review
- **qa-agent** - Quality assurance coordination (parent role)
  - **qa-unit-system-tester** - Unit and system testing
  - **qa-performance-tester** - Performance testing
  - **qa-security-tester** - Security testing
  - **qa-ux-tester** - UX and usability testing
- **validation-agent** - Validation and verification

### 🛡️ Specialized Functions (10 roles)
- **security-agent** - Security analysis and hardening
- **architect-lens-agent** - Architecture patterns and decisions
- **system-architect-agent** - System-level architecture
- **design-lead-agent** - Design leadership and patterns
- **bash-validation-agent** - Bash script validation
- **error-forensics-agent** - Error analysis and debugging
- **metrics-agent** - Metrics collection and analysis
- **ci-monitor-agent** - CI/CD monitoring
- **tester-agent** - General testing coordination
- **research-agent** - Research and investigation

### 🧹 Maintenance & Operations (9 roles)
- **hygiene-agent** - Repository hygiene
- **hygienist-agent** - Code cleanup and maintenance
- **hygiene** - Alternative hygiene role
- **curator-agent** - Content curation and organization
- **index-agent** - Indexing and cataloging
- **historian-agent** - History and changelog maintenance
- **documentation-agent** - Documentation creation and maintenance
- **release-agent** - Release coordination
- **release-manager-agent** - Release management

### 📢 Support & Communication (6 roles)
- **support-triage-agent** - Support ticket triage
- **communications-agent** - Internal/external communications
- **teacher-agent** - Knowledge transfer and training
- **learning-agent** - Continuous learning and improvement
- **workflow-coach-agent** - Process improvement coaching
- **context-agent** - Context management and preservation
- **intake-agent** - Work intake and initial triage
- **intake-orchestrator** - Intake coordination

## Core Role Responsibilities Pattern

Every role follows this structure:

### Identity & Mission
- Clear mission statement
- Role identity for context recovery
- Behavioral boundaries

### Ownership Areas
```yaml
Owns:
  - Primary responsibilities
  - Decision authority
  - Deliverable ownership

Non-Goals:
  - Explicitly NOT responsible for
  - Boundaries with other roles
  - Escalation triggers
```

### Collaboration Matrix
```yaml
Collaborates With:
  - Role: Type of interaction
  - Handoff patterns
  - Information exchange
```

### Wolf MCP Integration
All roles MUST use Wolf MCP tools for:
- Querying principles before decisions
- Finding behavioral archetypes
- Understanding role boundaries
- Checking governance requirements

## Role Inheritance Hierarchy

```
1. agents/instructions/global/*        # Universal policies
2. agents/instructions/domain/<family>  # Domain guidance
3. agents/roles/<role>/role-card.md    # Role-specific
4. agents/roles/<role>/variants/*      # Specializations
```

## Common Patterns Across Roles

### Session Initialization
Every role must:
1. Query Wolf principles
2. Find behavioral archetype
3. Load role-specific guidance
4. Verify current context

### Context Recovery
After compaction events:
1. Reload role card
2. Reassert identity
3. Verify boundaries
4. Confirm task alignment

### Handoff Protocol
When transitioning work:
1. Document current state
2. Create handoff journal entry
3. Tag receiving role
4. Verify acceptance

## Key Role Interactions

### Development Flow
```
pm-agent → coder-agent → code-reviewer-agent → qa-agent → release-agent
```

### Architecture Decisions
```
architect-lens-agent ↔ system-architect-agent ↔ design-lead-agent
                     ↓
                coder-agent
```

### Issue Resolution
```
support-triage-agent → error-forensics-agent → coder-agent
                                              ↓
                                         qa-agent
```

## Escalation Patterns

### Authority Hierarchy
1. **Requirements**: PM Agent has final authority
2. **Architecture**: System Architect > Design Lead
3. **Code Quality**: Code Reviewer > individual coders
4. **Security**: Security Agent can block any change
5. **Release**: Release Manager has deployment authority

### Conflict Resolution
When roles disagree:
1. Check role cards for authority
2. Escalate to orchestrator if needed
3. Document decision in journal
4. Update role cards if pattern emerges

## Role Selection Guide

### By Work Type
- **New Feature**: pm-agent → coder-agent → qa-agent
- **Bug Fix**: error-forensics-agent → coder-agent → validation-agent
- **Refactoring**: refactor-lead → coder-agent → code-reviewer-agent
- **Security Issue**: security-agent → coder-agent → qa-security-tester
- **Performance**: metrics-agent → qa-performance-tester → coder-agent

### By GitHub Labels
- `bug` → error-forensics-agent
- `feature` → pm-agent
- `security` → security-agent
- `performance` → qa-performance-tester
- `documentation` → documentation-agent
- `hygiene` → hygienist-agent

## Scripts Available

- `lookup.js` - Find role by name, responsibility, or category
- `matrix.js` - Generate collaboration matrix for roles
- `escalate.js` - Determine escalation path for conflicts

## Quality Gates by Role

### Development Roles
- Tests written and passing
- Documentation updated
- Journal entry created

### Review Roles
- Code standards verified
- Security scan complete
- Performance impact assessed

### QA Roles
- Test plans executed
- Coverage targets met
- Regression suite updated

## Integration with Other Skills

- **wolf-principles**: Roles implement core principles
- **wolf-archetypes**: Roles adapt per archetype
- **wolf-governance**: Roles enforce governance rules

---

*Source: agents/roles/*/role-card.md files*
*Last Updated: 2025-10-19*
*Phase: Hybrid Skills Migration*