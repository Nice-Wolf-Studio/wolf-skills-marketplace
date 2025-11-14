# Wolf Skills Marketplace

Custom Wolf Agent skills and integration tools marketplace for Claude Code.

## Overview

This marketplace provides three plugin collections:

### 1. Wolf Core (`wolf-core@wolf-skills-marketplace`)

Core Wolf Agent behavioral framework including:
- **wolf-principles** - Wolf's 10 core principles for agent behavior and system design
- **wolf-archetypes** - Behavioral archetypes for automatic agent adaptation based on work type
- **wolf-governance** - Governance framework, compliance rules, quality gates, and process standards
- **wolf-roles** - Guidance for 50+ specialized Wolf agent roles with responsibilities and collaboration patterns
- **wolf-instructions** - Four-level instruction cascading system (Global → Domain → Project → Role)
- **wolf-verification** - Three-layer verification architecture (CoVe, HSP, RAG) for self-verification
- **wolf-adr** - Architecture Decision Records index with searchable topics and phase-based organization

### 2. Wolf Automation (`wolf-automation@wolf-skills-marketplace`)

Agent coordination and automation scripts:
- **wolf-scripts-core** - Core automation scripts for archetype selection, evidence validation, quality scoring
- **wolf-scripts-agents** - Agent coordination, orchestration, and multi-agent workflow management scripts

### 3. Integrations (`integrations@wolf-skills-marketplace`)

External service integration tools:
- **databento** - Professional market data analysis using Databento API for ES/NQ futures
- **discord-integration** - Send messages, read channels, and troubleshoot Discord bot access

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
    "lastUpdated": "2025-11-13T23:46:00.000Z"
  }
}
```

3. Enable the plugins in `~/.claude/settings.json`:
```json
{
  "enabledPlugins": {
    "wolf-core@wolf-skills-marketplace": true,
    "wolf-automation@wolf-skills-marketplace": true,
    "integrations@wolf-skills-marketplace": true
  }
}
```

4. Restart Claude Code to load the skills.

## Usage

Once installed, the skills will automatically trigger based on their descriptions and the context of your work. You can also explicitly invoke them using the Skill tool.

## Repository Structure

```
wolf-skills-marketplace/
├── .claude-plugin/
│   └── marketplace.json          # Marketplace metadata and plugin definitions
├── databento/
│   └── SKILL.md                  # Databento integration skill
├── discord-integration/
│   └── SKILL.md                  # Discord integration skill
├── wolf-adr/
│   └── SKILL.md                  # Architecture Decision Records skill
├── wolf-archetypes/
│   └── SKILL.md                  # Archetypes skill
├── wolf-governance/
│   └── SKILL.md                  # Governance skill
├── wolf-instructions/
│   └── SKILL.md                  # Instructions skill
├── wolf-principles/
│   └── SKILL.md                  # Principles skill
├── wolf-roles/
│   └── SKILL.md                  # Roles skill
├── wolf-scripts-agents/
│   └── SKILL.md                  # Agent scripts skill
├── wolf-scripts-core/
│   └── SKILL.md                  # Core scripts skill
└── wolf-verification/
    └── SKILL.md                  # Verification skill
```

## License

MIT

## Author

Jeremy Miranda - Nice Wolf Studio
