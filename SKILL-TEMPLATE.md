---
name: skill-name
version: 1.0.0
description: Use when [CLEAR TRIGGER] - [PRIMARY ACTION]; [KEY BENEFIT/PREVENTION]
triggers:
  - "keyword phrase 1"
  - "user intent 2"
  - "before doing X"
  - "tool or command name"
---

# Skill Name

[One-paragraph overview: What this skill provides and why it exists. Keep concise - 2-3 sentences max.]

## When to Use This Skill

Trigger this skill when:
- [Specific scenario 1]
- [Specific scenario 2]
- [Before doing X without Y]
- [When working with Z]
- [User mentions keywords A, B, C]

## When NOT to Use This Skill

[Optional but recommended for clarity]

Don't use this skill for:
- [Out of scope scenario 1] - Use [alternative] instead
- [Out of scope scenario 2] - Use [alternative] instead
- [Boundary condition] - [Reason why]

## [Core Section - Choose based on skill type]

**Option A: For Process Skills** - Use "The N Steps (MANDATORY)"
**Option B: For Reference Skills** - Use "Quick Reference" with tables
**Option C: For Knowledge Skills** - Use "The [N] Core Concepts"

### Process Skills Template:

## The [N] Steps (MANDATORY)

[Optional intro: "You MUST complete each step before proceeding. Skipping leads to [consequences]."]

### Step 1: [Action Name] (REQUIRED)

[Description of what to do]

**Why:** [Explanation of benefit or prevention]

**Gate:** [Validation checkpoint - what must be true before proceeding to next step]

### Step 2: [Action Name] (REQUIRED)

[Continue pattern...]

---

### Reference Skills Template:

## Quick Reference

### [Category 1]

| Column 1 | Column 2 | When to Use |
|----------|----------|-------------|
| Value A  | Info A   | Use case A  |
| Value B  | Info B   | Use case B  |

### [Category 2]

[Additional tables or lists...]

---

### Knowledge Skills Template:

## The [N] Core Concepts

### Concept 1: [Name]

**Definition:** [Clear explanation]

**Implementation:** [How to apply]

**Example:** [Concrete usage]

---

## Red Flags - STOP

[For process and integration skills - not needed for pure reference skills]

If you catch yourself:
- ❌ [Anti-pattern 1] - [Why this is wrong]
- ❌ [Anti-pattern 2] - [Consequence]
- ❌ [Anti-pattern 3] - [Correct approach]
- ❌ [Anti-pattern 4]
- ❌ [Anti-pattern 5]

**STOP. [Return to correct step/process].**

## Verification Checklist

[For skills with multi-step workflows or quality gates]

Before marking work complete:

- [ ] [Checkpoint 1]
- [ ] [Checkpoint 2]
- [ ] [Checkpoint 3]
- [ ] [Checkpoint 4]
- [ ] [Checkpoint 5]

Can't check all boxes? [Guidance on what to do - usually return to specific step]

## [Implementation/Usage Sections]

[Skill-specific content - commands, code examples, workflows]

### Common Patterns

[Reusable patterns or workflows]

### Examples

#### Example 1: [Scenario Name]

**Context:** [When this applies]

**Command/Approach:**
```bash
[code or command]
```

**Expected Output:** [What success looks like]

#### Example 2: [Scenario Name]

[Continue pattern...]

## Reference Files

[If skill uses bundled resources]

Load these reference files as needed:

### references/detailed-doc.md
[Description of content]

**Load when:** [Specific trigger for loading this reference]

### scripts/tool-name.py
[Description of what the script does]

**Use when:** [When to execute this script]

**Features:**
- Feature 1
- Feature 2

## Best Practices

1. **Practice 1** - [Explanation]
2. **Practice 2** - [Explanation]
3. **Practice 3** - [Explanation]
4. **Practice 4** - [Explanation]
5. **Practice 5** - [Explanation]

## Related Resources

### Bundled References
- `references/file1.md` - [When to load]
- `references/file2.md` - [When to load]

### Bundled Scripts
- `scripts/script1.py` - [Purpose]
- `scripts/script2.sh` - [Purpose]

### External Resources
- [Tool Documentation]: [URL]
- [API Reference]: [URL]

## Changelog

**v1.0.0** (YYYY-MM-DD)
- Initial skill creation
- [Key feature 1]
- [Key feature 2]

---

# Template Usage Guidelines

## Skill Type Decision Tree

### 1. **Process Skill**
Use when: Skill enforces a multi-step workflow to prevent mistakes
- Use "The N Steps (MANDATORY)"
- Add gate functions
- Include "Red Flags - STOP"
- Include "Verification Checklist"
- Examples: databento, daily-summary

### 2. **Reference Skill**
Use when: Skill provides lookup information or quick reference
- Use "Quick Reference" with tables
- Minimal process enforcement
- "When NOT to Use" is important for scope
- Examples: wolf-principles, wolf-adr

### 3. **Integration Skill**
Use when: Skill guides integration with external tool/service
- Combine process + reference elements
- Decision tree for method selection
- Troubleshooting sections
- Examples: discord-integration

### 4. **Knowledge Skill**
Use when: Skill teaches concepts or frameworks
- Use "Core Concepts" structure
- Examples and explanations
- "Common Misapplications" instead of "Red Flags"
- Examples: wolf-archetypes, wolf-verification

## Frontmatter Best Practices

### Description Formula
```
Use when [CLEAR TRIGGER] - [PRIMARY ACTION]; [KEY BENEFIT/PREVENTION]
```

**Components:**
- **CLEAR TRIGGER**: Specific scenario that causes skill invocation
- **PRIMARY ACTION**: What the skill does (verb phrase)
- **KEY BENEFIT**: What problem it solves or prevents

**Good Examples:**
- "Use when working with ES/NQ futures market data, before calling any Databento API - follow mandatory four-step workflow; prevents costly API errors and ensures data quality"
- "Use when preparing daily standups or status reports - automates PR summary generation with categorization and metrics; eliminates manual report compilation"

**Bad Examples:**
- "A skill for market data" (too vague)
- "Professional market data analysis" (no trigger or benefit)

### Triggers List

Include 4-7 specific phrases:
- Keyword phrases users might say
- Tool or command names
- Work scenarios
- "before doing X" patterns

**Good triggers:**
```yaml
triggers:
  - "ES futures"
  - "databento"
  - "mcp__databento"
  - "market data"
  - "historical prices"
```

**Bad triggers:**
```yaml
triggers:
  - "data"  # too generic
  - "help"  # too vague
```

## Section Priority by Skill Type

### Process Skills (MUST have)
1. ✅ The N Steps (MANDATORY)
2. ✅ Red Flags - STOP
3. ✅ Verification Checklist
4. ✅ When NOT to Use
5. ⚠️ Quick Reference (if applicable)

### Reference Skills (MUST have)
1. ✅ Quick Reference (tables/lists)
2. ✅ When NOT to Use
3. ✅ Examples
4. ⚠️ Common Misapplications (if applicable)

### Integration Skills (MUST have)
1. ✅ Integration Methods (priority order)
2. ✅ Red Flags - STOP
3. ✅ Troubleshooting
4. ✅ Verification Checklist
5. ✅ When NOT to Use

## Language Style Guide

### Process Skills
- **Imperative mood**: "Check", "Verify", "STOP"
- **Absolute statements**: "MANDATORY", "REQUIRED", "NO EXCEPTIONS"
- **Gates**: "You MUST complete X before Y"
- **Warnings**: "Red Flags", "STOP"

### Reference Skills
- **Descriptive mood**: "This provides", "Use when"
- **Informative**: "Available options", "Common patterns"
- **Guidance**: "Best practices", "Recommendations"
- **Lighter warnings**: "Common Misapplications"

### Integration Skills
- **Mix of both**: Imperative for process, descriptive for options
- **Priority language**: "ALWAYS try X first", "Fallback to Y"
- **Troubleshooting focus**: "If X fails, then Y"

## Version History Best Practices

Use semantic versioning:
- **Major (X.0.0)**: Breaking changes, complete rewrites
- **Minor (1.X.0)**: New features, sections added
- **Patch (1.0.X)**: Bug fixes, clarifications, small improvements

Document changes clearly:
```markdown
## Changelog

**v1.0.1** (2025-11-14)
- Added "When NOT to Use" section
- Strengthened process with MANDATORY language
- Added Red Flags and Verification Checklist
- Improved description for better discoverability

**v1.0.0** (2025-11-01)
- Initial skill creation
```
