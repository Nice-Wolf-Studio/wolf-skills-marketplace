# Getting Started with Wolf Skills Marketplace

Welcome to the Wolf Skills Marketplace! This guide will help you install, configure, and start using Wolf Agent skills with Claude Code.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Understanding the Primary Skill Chain](#understanding-the-primary-skill-chain)
5. [Using Workflow Templates](#using-workflow-templates)
6. [Using Role Templates](#using-role-templates)
7. [Troubleshooting](#troubleshooting)
8. [Next Steps](#next-steps)

---

## Prerequisites

Before installing Wolf Skills Marketplace, ensure you have:

- **Claude Code** installed and configured
- **Git** installed for cloning the repository
- **Basic familiarity** with command line operations
- **Text editor** for editing JSON configuration files

---

## Installation

### Step 1: Clone the Repository

Clone the Wolf Skills Marketplace to your Claude plugins marketplaces directory:

```bash
git clone https://github.com/Nice-Wolf-Studio/wolf-skills-marketplace.git ~/.claude/plugins/marketplaces/wolf-skills-marketplace
```

### Step 2: Register the Marketplace

Add the marketplace to `~/.claude/plugins/known_marketplaces.json`:

```json
{
  "wolf-skills-marketplace": {
    "source": {
      "source": "github",
      "repo": "Nice-Wolf-Studio/wolf-skills-marketplace"
    },
    "installLocation": "/Users/YOUR_USERNAME/.claude/plugins/marketplaces/wolf-skills-marketplace",
    "lastUpdated": "2025-11-14T00:00:00.000Z"
  }
}
```

**Important**: Replace `YOUR_USERNAME` with your actual username.

### Step 3: Enable Plugin Collections

Add the plugin collections to `~/.claude/settings.json`:

```json
{
  "enabledPlugins": {
    "wolf-core@wolf-skills-marketplace": true,
    "wolf-automation@wolf-skills-marketplace": true,
    "integrations@wolf-skills-marketplace": true,
    "threejs-ecs@wolf-skills-marketplace": true,
    "productivity@wolf-skills-marketplace": true
  }
}
```

**Tip**: You can enable only the collections you need. For Wolf Agent work, enable at minimum:
- `wolf-core@wolf-skills-marketplace` (mandatory)
- `wolf-automation@wolf-skills-marketplace` (recommended)

### Step 4: Restart Claude Code

Restart Claude Code to load the skills:

```bash
# If running Claude Code in terminal, restart the session
# If using IDE integration, restart the IDE
```

### Step 5: Verify Installation

Confirm skills are loaded by asking Claude:

```
Can you list the available Wolf skills?
```

You should see confirmation that wolf-principles, wolf-archetypes, wolf-governance, wolf-roles, and other Wolf skills are available.

---

## Quick Start

### Your First Workflow

Let's walk through a simple feature development workflow to understand how Wolf skills work together.

#### 1. Start with the Primary Skill Chain

Before ANY work, load the primary skill chain:

```
Please load the primary Wolf skill chain:
1. wolf-principles
2. wolf-archetypes
3. wolf-governance
4. wolf-roles
```

Claude will load each skill sequentially and confirm.

#### 2. Define Your Task

Describe what you want to build:

```
I want to add a user authentication feature to my web application.
```

#### 3. Let Claude Use Skills Automatically

Claude will automatically:
- Load `wolf-archetypes` to determine the appropriate archetype
- Load `wolf-workflows` to select the feature-workflow-template
- Guide you through requirements definition (pm-agent)
- Proceed through design, implementation, testing, and review phases

#### 4. Follow the Workflow

Claude will guide you through each phase:
- **Phase 1**: Requirements (pm-agent defines acceptance criteria)
- **Phase 2**: Research (optional, for complex features)
- **Phase 3**: Design (architect-lens-agent creates ADR)
- **Phase 4**: Implementation (coder-agent writes code)
- **Phase 5**: Testing (qa-agent validates)
- **Phase 6**: Review (code-reviewer-agent approves)

Each phase has decision gates that must pass before proceeding.

---

## Understanding the Primary Skill Chain

The **Primary Skill Chain** is the foundation of Wolf Agent work. It must be loaded at the start of EVERY task.

### What is the Primary Skill Chain?

```
wolf-principles → wolf-archetypes → wolf-governance → wolf-roles
```

**Why Sequential?**
- Each skill builds on the previous
- Principles define behavior rules
- Archetypes determine priorities based on work type
- Governance defines quality gates
- Roles define agent responsibilities

### When to Load the Primary Chain

**ALWAYS load before**:
- Starting new features
- Investigating bugs
- Conducting security reviews
- Creating architecture designs
- Any Wolf Agent work

**How to Load**:

Simply ask Claude:
```
Load the primary Wolf skill chain for this task.
```

Claude will load all four skills in sequence.

---

## Using Workflow Templates

Workflow templates orchestrate multiple agents through complete development processes.

### Available Workflows

#### 1. Feature Development Workflow
**Use when**: Building new features or enhancements

**Agent Chain**: pm-agent → architect-lens-agent → coder-agent → qa-agent → code-reviewer-agent

**Example**:
```
Use the feature development workflow to add a shopping cart to my e-commerce site.
```

#### 2. Security Review Workflow
**Use when**: Addressing security concerns, fixing vulnerabilities, implementing security features

**Agent Chain**: pm-agent (threat modeling) → architect-lens-agent (security design) → coder-agent (secure implementation) → qa-agent (security testing) → code-reviewer-agent

**Example**:
```
Use the security workflow to add authentication to my API.
```

#### 3. Bugfix Workflow
**Use when**: Investigating and fixing bugs

**Agent Chain**: pm-agent (triage) → research-agent (root cause) → coder-agent (fix) → qa-agent (regression) → code-reviewer-agent

**Example**:
```
Use the bugfix workflow to investigate why users are experiencing login failures.
```

### Workflow Decision Tree

```
Are you building a new feature?
  YES → Feature Development Workflow
  NO ↓

Are you addressing a security concern?
  YES → Security Review Workflow
  NO ↓

Are you fixing a bug?
  YES → Bugfix Workflow
  NO → Ask Claude which workflow to use
```

---

## Using Role Templates

Role templates provide detailed guidance for specific agent roles.

### Available Role Templates

1. **pm-agent-template.md** - Requirements definition, acceptance criteria
2. **coder-agent-template.md** - Implementation with TDD
3. **code-reviewer-agent-template.md** - Code review and quality validation
4. **security-agent-template.md** - Security implementation and validation
5. **qa-agent-template.md** - Testing strategy and validation
6. **architect-agent-template.md** - Architecture design and ADR creation
7. **research-agent-template.md** - Research methodology and spike creation
8. **devops-agent-template.md** - CI/CD, infrastructure, deployment

### When to Use Role Templates

**Automatically**: Claude will use appropriate role templates when following workflows

**Manually**: If working outside a workflow, you can explicitly request a role:

```
Act as qa-agent and help me create a test strategy for my authentication feature.
```

### Role Template Structure

Each role template includes:
- **Role Context**: Responsibilities and non-goals
- **Wolf Framework Integration**: Principles, archetypes, governance, roles
- **Execution Checklist**: Before/during/after work
- **Handoff Protocol**: How to receive and pass work
- **Red Flags - STOP**: Anti-patterns to avoid
- **Success Criteria**: How to know when complete

---

## Troubleshooting

### Skills Not Loading

**Problem**: Claude doesn't recognize Wolf skills

**Solutions**:
1. Verify marketplace is registered in `known_marketplaces.json`
2. Verify plugins are enabled in `settings.json`
3. Restart Claude Code
4. Check installation path is correct

### Skills Loaded But Not Used

**Problem**: Claude acknowledges skills exist but doesn't use them

**Solution**: Explicitly request skill usage:
```
Use wolf-principles to guide this work.
```

### Decision Gates Blocking Progress

**Problem**: Workflow blocked at a decision gate

**Solution**: Decision gates are intentional. They catch issues early:
- **Requirements gate**: Requirements not clear → Refine with pm-agent
- **Design gate**: Design not complete → Complete ADR with architect-lens-agent
- **Testing gate**: Tests failing → Fix issues with coder-agent
- **Review gate**: Code issues found → Address feedback with coder-agent

**Never skip decision gates.** They exist to prevent expensive rework.

### Workflow Feels Slow

**Problem**: Following workflow seems to take longer than coding directly

**Reality Check**: Workflows prevent rework, which is much more expensive than following the process:
- Coding without requirements → 2 days of wrong implementation
- Coding without design → 3 days of refactoring
- Coding without tests → 1 week of debugging production issues

**Workflow overhead**: 30 minutes of planning + 1 hour of design = saves 6+ days of rework

### Role Confusion

**Problem**: Not sure which agent role to use

**Solution**: Use wolf-roles skill:
```
Which agent role should handle user authentication implementation?
```

Claude will consult wolf-roles and recommend the appropriate role (likely coder-agent).

---

## Next Steps

### 1. Read Core Skills Documentation

Familiarize yourself with the foundational skills:
- Read `wolf-principles/SKILL.md` - Understand the 10 core principles
- Read `wolf-archetypes/SKILL.md` - Understand behavioral archetypes
- Read `wolf-governance/SKILL.md` - Understand quality gates
- Read `wolf-roles/SKILL.md` - Understand agent roles

### 2. Try a Simple Workflow

Practice with a small feature:
```
Use the feature workflow to add a "Contact Us" page to my website.
```

### 3. Explore Advanced Features

- **Security Lens**: Apply security considerations to any workflow
- **Performance Lens**: Optimize for performance
- **Accessibility Lens**: Ensure WCAG compliance
- **Observability Lens**: Add monitoring and alerting

### 4. Customize Workflows

Once comfortable with standard workflows:
- Modify workflows for your team's needs
- Create custom workflow templates
- Add team-specific quality gates

### 5. Contribute Back

Found a useful pattern? Contribute it:
- Create new skills using `SKILL-TEMPLATE.md`
- Submit pull requests with improvements
- Share workflows that worked for your team

---

## Learning Resources

### Official Documentation
- **README.md** - Marketplace overview and skill catalog
- **SKILL-TEMPLATE.md** - Guide for creating new skills
- **MIGRATION-GUIDE.md** - Upgrading from previous versions

### Skill Documentation
- Each skill has a `SKILL.md` file with complete documentation
- Role templates in `wolf-roles/templates/`
- Workflow templates in `wolf-workflows/templates/`

### Community
- GitHub Issues - Bug reports and feature requests
- Pull Requests - Contributions welcome

---

## Summary

**To get started with Wolf Skills Marketplace**:

1. ✅ Install and enable plugins
2. ✅ Load primary skill chain (principles → archetypes → governance → roles)
3. ✅ Select appropriate workflow (feature, security, or bugfix)
4. ✅ Follow workflow phases sequentially
5. ✅ Pass through decision gates
6. ✅ Create required artifacts (ADRs, tests, documentation)

**Remember**:
- **Always load the primary skill chain first**
- **Don't skip phases** (they prevent expensive rework)
- **Don't bypass decision gates** (they catch mistakes early)
- **Trust the process** (workflows exist because skipping causes problems)

**Welcome to systematic, high-quality software development with Wolf Skills!**

---

## Quick Reference Card

```
PRIMARY SKILL CHAIN (Load First):
1. wolf-principles → 2. wolf-archetypes → 3. wolf-governance → 4. wolf-roles

WORKFLOWS:
- New feature? → feature-workflow-template.md
- Security concern? → security-workflow-template.md
- Bug? → bugfix-workflow-template.md

ROLE TEMPLATES:
- Requirements → pm-agent-template.md
- Design → architect-agent-template.md
- Implementation → coder-agent-template.md
- Testing → qa-agent-template.md
- Review → code-reviewer-agent-template.md
- Security → security-agent-template.md
- Research → research-agent-template.md
- Deployment → devops-agent-template.md

DECISION GATES (Never Skip):
- ✅ Requirements approved → Design
- ✅ Design approved → Implementation
- ✅ Tests passing → Review
- ✅ Review approved → Merge
```

Print this reference card and keep it handy while learning Wolf workflows!
