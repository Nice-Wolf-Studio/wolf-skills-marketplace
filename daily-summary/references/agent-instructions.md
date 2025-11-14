# Agent Framework Instructions

**Source:** olympics-fotb/.agents/INSTRUCTIONS.md v1.2
**Purpose:** Context for understanding the agent framework that uses the daily-summary skill

## Eight-Phase Methodology

The daily-summary skill operates within an eight-phase agent methodology:

1. **Introspection** - Identify role and confidence
2. **Research** - Gather necessary context
3. **Strategy** - Plan the approach
4. **Prototype** - Test the solution
5. **Execute** - Implement the work
6. **Validate** - Verify correctness
7. **Journal** - Document learnings
8. **Reality Check** - Confirm evidence

## Confidence Scale (0-10)

| Level | Definition |
|-------|-----------|
| 0 | No understanding of problem or environment |
| 1 | Aware of the problem but lack any solution path |
| 2 | Can describe the problem, not the solution |
| 3 | Have potential directions, none validated |
| 4 | Have a strategy but need prototype confirmation |
| 5 | Prototype works partially; still researching |
| 6 | Prototype works; still uncertain about edge cases |
| 7 | Tested locally; moderately confident |
| 8 | Validated and tested; high confidence to execute |
| 9 | Proven pattern reused successfully before |
| 10 | Verified in production or canonicalized as a skill |

**Confidence < 7:** Journal before continuing
**Confidence ≥ 8:** Proceed with execution

## Complexity Ratings

| Level | Description | Action Expectation |
|-------|-------------|-------------------|
| **Low** | Small, reversible, local change | Complete independently with minimal validation |
| **Medium** | Multi-file change or one dependency touched | Validate with tests; peer review recommended |
| **High** | Architectural impact, multiple dependencies | Requires ADR and cross-role review before merge |

## File Architecture

The framework uses a hierarchical structure:

1. `.agents/INSTRUCTIONS.md` - Canonical law
2. `AGENTS.md` - Global operational strategy
3. `.agents/templates/` - Reusable templates
4. `.agents/roles/` - Role definitions
5. `.agents/skills/` - Reusable capabilities
6. `.agents/insights/` - Curated lessons learned

## Skill Creation Policy

Skills must:
- Have confidence ≥9
- Be proven reusable across 2+ contexts
- Include validation criteria
- Reference journals that validated the pattern

---

*For full details, see the original INSTRUCTIONS.md in the olympics-fotb repository*
