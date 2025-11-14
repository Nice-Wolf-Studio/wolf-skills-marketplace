# Wolf Skills Marketplace

Custom Wolf Agent skills and integration tools marketplace for Claude Code.

**64 total skills** across 5 plugin collections, combining Wolf Agent framework knowledge with comprehensive development tooling.

## Overview

This marketplace provides five plugin collections optimized for skill discovery and quality:

### 1. Wolf Core (`wolf-core@wolf-skills-marketplace`)

Core Wolf Agent behavioral framework (7 skills):
- **wolf-principles** - Wolf's 10 core principles for agent behavior and system design
- **wolf-archetypes** - Behavioral archetypes for automatic agent adaptation based on work type
- **wolf-governance** - Governance framework, compliance rules, quality gates, and process standards
- **wolf-roles** - Guidance for 50+ specialized Wolf agent roles with responsibilities and collaboration patterns
- **wolf-instructions** - Four-level instruction cascading system (Global → Domain → Project → Role)
- **wolf-verification** - Three-layer verification architecture (CoVe, HSP, RAG) for self-verification
- **wolf-adr** - Architecture Decision Records index with searchable topics and phase-based organization

### 2. Wolf Automation (`wolf-automation@wolf-skills-marketplace`)

Agent coordination and automation scripts (2 skills):
- **wolf-scripts-core** - Core automation scripts for archetype selection, evidence validation, quality scoring
- **wolf-scripts-agents** - Agent coordination, orchestration, and multi-agent workflow management scripts

### 3. Integrations (`integrations@wolf-skills-marketplace`)

External service integration tools (2 skills):
- **databento** - Professional market data analysis using Databento API for ES/NQ futures
- **discord-integration** - Send messages, read channels, and troubleshoot Discord bot access

### 4. Three.js ECS (`threejs-ecs@wolf-skills-marketplace`)

Comprehensive 3D game development toolkit (51 skills across 6 categories):

- **React Three Fiber** (6 skills) - R3F setup, ECS integration, component patterns, performance, state management, mobile patterns
- **Three.js Core** (20 skills) - Scene setup, geometry, materials, textures, raycasting, animations, models, cameras, lighting, shadows, post-processing, particles, PBR, math utilities, fog, environment maps, instancing, sprites, best practices, performance profiling
- **Entity Component System** (7 skills) - Architecture, component patterns, system patterns, queries, events, serialization, performance
- **Mobile Optimization** (4 skills) - Performance, touch input, battery optimization, memory management
- **TypeScript** (3 skills) - Game types, performance optimization, ECS types
- **Game Systems** (11 skills) - Input, collision, physics, AI, audio, UI, camera, spawn, health/combat, inventory, level systems

### 5. Productivity (`productivity@wolf-skills-marketplace`)

Productivity and reporting tools (1 skill):
- **daily-summary** - Automated GitHub PR summary generation for standups and retrospectives

## Skill Quality Standards

All skills follow a consistent, high-quality structure inspired by superpowers marketplace patterns:

### Standardized Frontmatter
```yaml
---
name: skill-name
version: 1.0.x
description: Use when [TRIGGER] - [ACTION]; [BENEFIT]
triggers:
  - "keyword phrase"
  - "user intent"
---
```

### Core Sections

**Process Skills** (databento, daily-summary):
- ✅ "The N Steps (MANDATORY)" with gate functions
- ✅ "Red Flags - STOP" with anti-patterns
- ✅ "Verification Checklist" with quality gates
- ✅ "When NOT to Use" for scope clarity

**Reference Skills** (wolf-principles, wolf-adr):
- ✅ "Quick Reference" with tables
- ✅ "When NOT to Use" for boundaries
- ✅ "Common Misapplications" guidance
- ✅ Clear examples and use cases

**Integration Skills** (discord-integration):
- ✅ Decision trees with priority order
- ✅ Troubleshooting sections
- ✅ Red flags and verification
- ✅ Fallback methods

### Quality Features

- **Clear triggers** - Specific keywords and scenarios for skill discovery
- **Prevention-focused** - Red flags warn against common mistakes
- **Process gates** - Mandatory checkpoints prevent incomplete work
- **Verification checklists** - Quality assurance before completion
- **Scope boundaries** - "When NOT to Use" prevents misapplication
- **Version tracking** - Semantic versioning with changelogs

## Installation

1. Clone this repository to your Claude plugins marketplaces directory:
```bash
git clone https://github.com/Nice-Wolf-Studio/wolf-skills-marketplace.git ~/.claude/plugins/marketplaces/wolf-skills-marketplace
```

2. Register the marketplace in `~/.claude/plugins/known_marketplaces.json`:
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

3. Enable the plugins in `~/.claude/settings.json`:
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

4. Restart Claude Code to load the skills.

## Usage

Once installed, skills automatically trigger based on:
- **Description matching** - Triggers from skill descriptions match user intent
- **Keyword matching** - Triggers list includes relevant keywords
- **Context awareness** - Skills activate when working in relevant domains

You can also explicitly invoke skills using the Skill tool.

## Creating New Skills

Use the included `SKILL-TEMPLATE.md` as a starting point for new skills. The template includes:

- Standardized frontmatter format
- Section templates for different skill types (process, reference, integration, knowledge)
- Language style guidelines
- Best practices for descriptions and triggers
- Version history conventions

**Key principles:**
1. Follow "Use when [TRIGGER] - [ACTION]; [BENEFIT]" description pattern
2. Add 4-7 specific trigger keywords
3. Include "When NOT to Use" for scope clarity
4. Use appropriate sections for skill type (process vs reference)
5. Version semantically and document changes

## Repository Structure

```
wolf-skills-marketplace/
├── .claude-plugin/
│   └── marketplace.json              # Marketplace metadata and plugin definitions
├── SKILL-TEMPLATE.md                 # Template for creating new skills
├── databento/
│   ├── SKILL.md                      # Databento integration skill
│   ├── references/                   # Detailed documentation
│   └── scripts/                      # Reusable automation scripts
├── discord-integration/
│   ├── SKILL.md                      # Discord integration skill
│   └── examples.md                   # Usage examples
├── daily-summary/
│   ├── SKILL.md                      # Daily PR summary skill
│   ├── assets/                       # Templates
│   └── references/                   # Agent framework docs
├── claude-skills-threejs-ecs-ts/     # Complete 3D game development package (51 skills)
│   ├── README.md
│   ├── claude-code-plugin.json
│   └── skills/                       # Organized by category
│       ├── react/                    # React Three Fiber skills
│       ├── threejs/                  # Three.js core skills
│       ├── ecs/                      # Entity Component System skills
│       ├── mobile/                   # Mobile optimization skills
│       ├── typescript/               # TypeScript skills
│       └── game-systems/             # Game system skills
├── wolf-adr/
│   └── SKILL.md                      # Architecture Decision Records
├── wolf-archetypes/
│   ├── SKILL.md                      # Behavioral archetypes
│   ├── data/                         # Archetype registry
│   └── scripts/                      # Selection automation
├── wolf-governance/
│   ├── SKILL.md                      # Governance framework
│   └── scripts/                      # Compliance checking
├── wolf-instructions/
│   └── SKILL.md                      # Instruction cascade system
├── wolf-principles/
│   ├── SKILL.md                      # Core principles
│   └── scripts/                      # Principle query tool
├── wolf-roles/
│   ├── SKILL.md                      # Agent roles
│   └── scripts/                      # Role lookup
├── wolf-scripts-agents/
│   └── SKILL.md                      # Agent coordination
├── wolf-scripts-core/
│   └── SKILL.md                      # Core automation
└── wolf-verification/
    └── SKILL.md                      # Verification architecture
```

## Skill Statistics

- **Total Skills**: 64
- **Plugin Collections**: 5
- **Wolf Framework Skills**: 11 (core + automation)
- **Integration Skills**: 2 (databento, discord)
- **3D Development Skills**: 51 (three.js, ECS, React)
- **Productivity Skills**: 1 (daily-summary)

All skills include:
- ✅ Semantic versioning
- ✅ Trigger keywords for discovery
- ✅ Clear scope boundaries
- ✅ Version history tracking
- ✅ Consistent quality standards

## Contributing

When creating new skills for this marketplace:

1. Use `SKILL-TEMPLATE.md` as your starting point
2. Follow the quality standards documented in the template
3. Choose appropriate skill type (process, reference, integration, knowledge)
4. Test trigger keywords for discoverability
5. Document version history in changelog

## License

MIT

## Author

Jeremy Miranda - Nice Wolf Studio

## Changelog

**v2.0.0** (2025-11-14)
- Added threejs-ecs plugin (51 skills for 3D game development)
- Added productivity plugin (daily-summary skill)
- Improved all 11 Wolf skills with superpowers-style patterns
- Added SKILL-TEMPLATE.md for consistent skill creation
- Standardized frontmatter across all skills (version + triggers)
- Added "When NOT to Use" sections for scope clarity
- Added "Red Flags" and "Verification Checklists" to process skills
- Total: 64 skills across 5 plugin collections

**v1.0.0** (2025-11-13)
- Initial marketplace creation
- 3 plugin collections (wolf-core, wolf-automation, integrations)
- 11 total skills
- Wolf Agent framework skills migrated from ~/.claude/skills/
