---
name: code-standards
version: 1.0.0
description: >-
  Use when reviewing branch changes for design principle violations -
  analyzes diffs for YAGNI, DRY, SRP, separation of concerns,
  over-engineering, premature abstraction, dead code, and unnecessary complexity
triggers:
  - code standards
  - code standards review
  - design principle check
  - YAGNI review
  - over-engineering check
  - DRY review
  - SRP review
---

# Code Standards Review

Review current branch changes against software design principles. Surfaces violations of YAGNI, DRY, SRP, Separation of Concerns, and related principles with specific file:line references and actionable suggestions.

## When to Use This Skill

- After completing feature work, before merging
- As a second-pass review complementing `/code-review` (which covers bugs, security, performance, testing)
- When you want a focused check on code design hygiene

## When NOT to Use This Skill

- For bug hunting, security review, or performance analysis (use `/code-review`)
- On branches with no commits ahead of main
- For reviewing the entire codebase (this reviews branch changes only)

---

## The Process (MANDATORY)

### Step 1: Gather Context

Determine the default branch and collect the diff:

```bash
# Detect default branch
DEFAULT_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@' || echo main)

# Current branch
git branch --show-current

# Merge base
MERGE_BASE=$(git merge-base HEAD "origin/$DEFAULT_BRANCH")

# Changed files
git diff --name-only "$MERGE_BASE"..HEAD

# Diff stat
git diff --stat "$MERGE_BASE"..HEAD
```

Then **read every changed file in full** using the Read tool. You need full file context to judge whether patterns are violations or intentional design.

### Step 2: Analyze Against Each Principle

Review the diff (changed/added lines only) against all 8 principles below. Read surrounding code for context, but only flag issues introduced by this branch.

The first group builds on the `coding-patterns` skill — use it for detailed patterns, examples, and remediation guidance. The second group is defined fully here.

#### Principles covered by `coding-patterns` (review reminders)

For detailed patterns, before/after examples, and fix strategies, invoke the `coding-patterns` skill.

| Principle | What to Flag in Review | `coding-patterns` Reference |
|---|---|---|
| **DRY** | Duplicated logic, copy-pasted patterns, near-identical code blocks | Pattern 3: Function Decomposition (decision tree: "Code repeats elsewhere?") |
| **SRP** | Functions/classes handling multiple unrelated responsibilities | Pattern 7: SOLID (S), Pattern 3: Function Decomposition, Pattern 8: God Object anti-pattern |
| **Separation of Concerns** | Mixing architectural layers (UI in data layer, business logic in controllers, infra in domain) | Pattern 4: Vertical Slice, Pattern 2: Pure Functions + Side Effect Isolation |
| **Over-Engineering** | Excessive abstractions for simple problems, factory-of-factories, strategy patterns with one strategy | Pattern 8: Anti-Patterns, "When NOT to use" sections across all patterns |

#### Principles unique to this review (full definitions)

**YAGNI (You Aren't Gonna Need It)**

Flag code that builds for hypothetical future requirements rather than current needs:
- Parameters, config options, or feature flags that no current caller uses
- Abstract interfaces with only one implementation and no planned second consumer
- "Extensibility points" (plugin hooks, event systems) with zero current extensions
- Commented code kept "just in case" or TODO stubs for unplanned features
- Supporting multiple formats/protocols when only one is used today

Ask: "Is there a current, concrete requirement driving this code?" If not, flag it.

**Premature Abstraction**

Flag abstractions introduced before enough concrete cases exist to justify them:
- Generic utility functions used by exactly 1 caller
- Base classes / interfaces with exactly 1 implementation
- Shared modules extracted from a single use site
- Type parameters / generics where a concrete type would work
- Helper layers that just pass through to another layer without adding logic

The rule of three applies: wait for 3 concrete cases before abstracting. Two is a coincidence; three is a pattern.

**Dead/Unused Code**

Flag new code introduced by this branch that is unreachable or unreferenced:
- Exported functions/classes with no importers in the codebase
- Internal functions that are defined but never called
- Variables assigned but never read
- Commented-out code blocks committed alongside active code
- Catch blocks that silently swallow errors without logging or re-throwing
- Feature flags or config paths that are never toggled

**Unnecessary Complexity**

Flag complexity that exceeds what the current problem requires:
- Feature flags or configuration for behavior that could be hardcoded (single use case)
- Backwards-compatibility shims for code that was just written in this branch
- Complex generic types where a simple concrete type suffices
- Multiple layers of indirection (wrapper → adapter → service → impl) when direct calls work
- Builder patterns, factories, or registries for constructing simple objects
- Event-driven architectures for synchronous, single-consumer workflows

### Step 3: Report Findings

Use this exact output format. **Only include sections for principles where you found violations.** Skip clean principles entirely.

```
## [Principle Name]

**path/to/file.ts:42** — [Description of the violation]
> Suggestion: [Concrete recommendation for what to do instead]

**path/to/file.ts:108** — [Description of the violation]
> Suggestion: [Concrete recommendation for what to do instead]
```

If the branch is clean across all principles, output:

```
## No Design Principle Violations Found

The changes in this branch are clean across all 8 design principles reviewed (YAGNI, DRY, SRP, Separation of Concerns, Over-Engineering, Premature Abstraction, Dead/Unused Code, Unnecessary Complexity).
```

### Step 4: Summary

End with a brief summary:

```
---
**Summary:** X findings across Y principles. [1-2 sentence overall assessment.]
```

---

## Review Guidelines

- **Scope**: Only flag issues in changed/added lines. Read full files for context but don't review pre-existing code.
- **Specificity**: Every callout MUST include a `file:line` reference.
- **Actionability**: Every callout MUST include a concrete suggestion. Never flag without offering an alternative.
- **Intent awareness**: Don't flag things that are clearly intentional design decisions with good justification visible in the code or commit messages.
- **Signal over noise**: Fewer high-quality callouts are better than many marginal ones. If you're unsure whether something is a violation, skip it.
- **No overlap with /code-review**: Do NOT comment on bugs, security vulnerabilities, performance issues, test coverage, or documentation. Stay in your lane.
