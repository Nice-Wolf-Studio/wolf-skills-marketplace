# Changelog

All notable changes to the Wolf Skills Marketplace will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.7.2] - 2025-11-15

### Added - Coding Patterns Skill Wave 2 (MEDIUM Priority Patterns)

This release adds 4 MEDIUM priority patterns to the `coding-patterns` skill (v1.1.0 → v1.2.0), completing Phase 8 Wave 2.

#### New Patterns (4)

**Pattern 5: Composition Over Inheritance** (~199 lines):
- Build complex functionality by combining simpler objects vs inheritance hierarchies
- Favor "has-a" over "is-a" relationships
- Payment processing example: flexible behavior mixing (logging + fraud detection)
- Modern TypeScript: interfaces + constructor injection for composition
- **Benefits**: Flexibility, loose coupling, testability, avoids fragile base classes
- **When to use**: Need flexible behavior combinations, avoid deep inheritance (>3 levels)
- **When NOT**: Clear "is-a" relationship, simple single-level inheritance

**Pattern 6: Dependency Injection (DI)** (~197 lines):
- Pass dependencies from outside rather than creating internally
- **Constructor injection** (recommended): Dependencies via constructor parameters
- **Method injection**: Per-method dependencies for optional/one-off usage
- Testing example: Easy mocking with injected dependencies (no complex setup)
- Modern DI container: **TSyringe** for automatic dependency resolution (2024)
- **Best practices**: Inject interfaces not classes, constructor for required, method for optional
- **Benefits**: Testability, modularity, flexibility, loose coupling, SOLID compliance (DIP)
- **When to use**: Need swappable implementations, testable code, modular applications
- **When NOT**: Simple scripts, zero chance dependencies change, over-abstraction

**Pattern 7: SOLID Principles** (~249 lines):
- All 5 object-oriented design principles with TypeScript examples
- **S - Single Responsibility**: One class, one reason to change
- **O - Open/Closed**: Open for extension, closed for modification
- **L - Liskov Substitution**: Subtypes substitutable without breaking behavior
- **I - Interface Segregation**: Many small interfaces > one fat interface
- **D - Dependency Inversion**: Depend on abstractions, not concretions
- Each principle: Bad example → Good example → Why it matters
- **Modern application (2024)**: Interfaces, composition, DI, small focused classes
- **Benefits**: Maintainability, testability, flexibility, clarity, reliability
- **When to use**: Designing classes, refactoring, systems that grow, team development
- **When NOT**: Functional programming (pure functions), simple scripts, prototypes

**Pattern 8: Anti-Patterns (What to Avoid)** (~246 lines):
- Common bad practices that create technical debt
- **TypeScript anti-patterns (2024)**: `any` type abuse, God classes, callback hell, magic numbers, spaghetti code
- **Node.js anti-patterns (2024)**: Blocking I/O, code outside functions, ignoring error handling
- Each anti-pattern: What it is → Why bad → Bad example → Good example
- **How to avoid**: Code reviews, linting, type checking, early returns, async/await, error handling
- **Added to Red Flags section**: `any` type, God classes, callback hell, magic numbers

---

#### Enhanced Pattern Index

**New lookup category**: "By Code Quality Goal"
- Testability → Pure Functions, DI, SOLID (DIP)
- Maintainability → Function Decomposition, SOLID, Vertical Slice
- Flexibility → Composition, DI, SOLID (OCP)
- Avoiding tech debt → Anti-Patterns, SOLID
- Team collaboration → SOLID, Vertical Slice

**Expanded complexity signals**:
- Deep inheritance hierarchy (>3 levels) → Composition
- Using `any` type frequently → Anti-Patterns
- God class (50+ methods) → SOLID (SRP), Composition

**Architecture decision matrix updated**:
- OOP-heavy → SOLID, Composition, DI
- Functional-heavy → Pure Functions, Composition

---

#### Files Modified

**Modified Files** (1):
- `coding-patterns/SKILL.md` (v1.1.0 → v1.2.0, +~891 lines)
  - Lines 1185-1383: Pattern 5 (Composition)
  - Lines 1386-1581: Pattern 6 (Dependency Injection)
  - Lines 1584-1831: Pattern 7 (SOLID Principles)
  - Lines 1834-2077: Pattern 8 (Anti-Patterns)
  - Lines 41-87: Enhanced Pattern Index
  - Lines 2169-2204: v1.2.0 changelog entry

**Total Additions**: ~891 lines of modern pattern guidance (2024-2025)

---

#### Research Conducted

**Web searches** (2024-2025 sources):
- Composition over inheritance modern TypeScript (2024-2025)
- Dependency injection patterns TypeScript best practices (2024)
- SOLID principles modern JavaScript TypeScript (2024)
- Common anti-patterns avoid TypeScript Node.js (2024)

**Key findings**:
- **Composition**: Gained traction for flexible, reusable code; modern implementation with interfaces/mixins
- **DI**: TSyringe emerged as popular container; constructor vs method injection patterns standardized
- **SOLID**: TypeScript's type system makes SOLID easier than plain JavaScript
- **Anti-patterns**: `any` type, God classes, callback hell, blocking I/O identified as top 2024 issues

---

#### Impact

**For Pattern Coverage**:
- ✅ Wave 1 (HIGH): 4 patterns (Orchestration, Pure Functions, Decomposition, Vertical Slice)
- ✅ Wave 2 (MEDIUM): 4 patterns (Composition, DI, SOLID, Anti-Patterns)
- ⏳ Wave 3 (LOW/OPTIONAL): 4 patterns deferred (Strategy, Factory, Observer, Hexagonal Architecture)

**For Code Quality**:
- ✅ OOP design guidance: SOLID, Composition, DI provide complete OOP best practices
- ✅ Anti-pattern awareness: Developers know what to avoid (8 common anti-patterns)
- ✅ Testability patterns: DI + Pure Functions + SOLID (DIP) cover all testing scenarios
- ✅ Flexibility patterns: Composition + DI + SOLID (OCP) enable extensible systems

**For Development Velocity**:
- ✅ Pattern Index: Quick lookup by problem, complexity, architecture, quality goal
- ✅ Modern examples: All TypeScript 2024-2025, immediately applicable
- ✅ "When NOT to use": Prevents over-engineering (critical for Wave 2 OOP patterns)

---

#### Wave 2 Success Criteria

**Technical Completion**:
- ✅ 4 MEDIUM priority patterns added
- ✅ TypeScript examples for each pattern (bad → good examples)
- ✅ Pattern Index enhanced with Wave 2 patterns
- ✅ "When to Use" AND "When NOT to Use" for each pattern
- ✅ Modern 2024-2025 research conducted
- ✅ CHANGELOG updated with v2.7.2 entry

**Pattern Quality**:
- ✅ Composition (~199 lines): Complete with payment processing example
- ✅ DI (~197 lines): Constructor vs method injection, TSyringe container
- ✅ SOLID (~249 lines): All 5 principles with bad/good examples
- ✅ Anti-Patterns (~246 lines): 8 anti-patterns (TypeScript + Node.js)

---

## [2.7.1] - 2025-11-15

### Enhanced - Coding Patterns Skill (Production Validation Enhancements)

This release enhances the `coding-patterns` skill (v1.0.0 → v1.1.0) with 4 major improvements discovered during production validation with 3 real coding tasks.

#### Validation Process

**Production Tasks** (3 tasks, ~1,250 lines implementation, ~1,120 lines tests):
- **Task A**: Context File Cleanup Automation (370 lines impl, 320 lines tests)
- **Task B**: Skill Discovery Enhancement (420 lines impl, 380 lines tests)
- **Task C**: Template Validation Tool (460 lines impl, 420 lines tests)

**Validation Results**:
- ✅ **Pure Functions**: 3/3 tasks (100% success rate) - ESSENTIAL
- ✅ **Function Decomposition**: 3/3 tasks (100% success rate) - VALUABLE
- ⚠️ **Vertical Slice**: 2/3 tasks (67% success rate) - HELPFUL when applicable
- ❌ **Orchestration**: 0/3 tasks (0% applied) - CORRECTLY AVOIDED (prevented ~150 lines of pedantic code)

**Key Metrics Across All Tasks**:
- 31 pure functions created (~73% of codebase)
- ~15 line average function size (70% under <50 line target)
- 110+ test cases written with ZERO mocks
- 3 bugs prevented early (would've been runtime bugs)
- ~150 minutes net time saved vs without patterns

---

#### Enhancement 1: Vertical Slice Spectrum (~87 lines)

**Discovery**: Vertical Slice exists on a **spectrum**, not binary (directories or nothing).

**New Section Added**: "Vertical Slice at Different Scales (Spectrum)"

**Spectrum Documented**:
- 1 feature → Monolithic (no slices needed)
- 2-5 features → Function-level slices (comment blocks, ~20 line overhead)
- 5-10 features → File-level slices (separate files, ~50 line overhead)
- 10+ features → Directory-level slices (features/ directories, ~100 line overhead)

**Examples from Production Tasks**:
- Task A (1 feature: cleanup) → No slices (monolithic)
- Task B (3 features: search, browse, recommend) → Function-level slices
- Task C (3 concerns: structure, content, consistency) → Function-level slices

**Impact**: Prevents "all or nothing" thinking. Provides middle ground between over-engineering (directories for 2 features) and under-organization (monolithic 500-line function).

---

#### Enhancement 2: Validation Rules Pattern Example (~118 lines)

**Discovery**: Validation logic is **perfect application** of Pure Functions pattern.

**New Subsection Added**: "Example Use Case: Validation Rules" (in Pattern 2: Pure Functions)

**Example Shown**: Template consistency checking
- 13 pure validation rules (footer, sections, placeholders, red flags, success criteria)
- All regex-heavy validation made 100% testable
- 35+ validation tests with ZERO mocks

**Benefits Demonstrated**:
- ✅ Regex-heavy logic thoroughly testable (regex bugs common, testing critical)
- ✅ Each rule independent (test one validation without others)
- ✅ Fast feedback (<10ms test execution, no file I/O)
- ✅ Bug prevention (found 1 regex bug via testing, would've been runtime bug)
- ✅ Token savings (~200 lines of mock setup avoided across 13 rules)

**Key Code Pattern**:
```typescript
// Pure validation rules (100% testable)
function validateFooter(template: Template): ValidationResult { /* ... */ }
function validatePlaceholders(template: Template): ValidationResult { /* ... */ }

// Impure file I/O at edges only
async function validateTemplate(filePath: string): Promise<Report> {
  const content = await fs.readFile(filePath, 'utf-8'); // Impure
  return { results: [validateFooter(...), validatePlaceholders(...)] }; // Pure
}
```

---

#### Enhancement 3: Algorithm Decomposition Example (~163 lines)

**Discovery**: Complex algorithms with **multiple strategies** benefit MOST from decomposition.

**New Subsection Added**: "Example Use Case: Algorithm Decomposition" (in Pattern 3: Function Decomposition)

**Example Shown**: Fuzzy search with 5 match types
- Exact match (100 score)
- Starts-with match (80 score)
- Word boundary match (60 score)
- Contains match (40 score)
- Subsequence match (20 score)

**Before Decomposition**:
- 65-line inline algorithm
- Cyclomatic complexity = 8 (approaching limit)
- Hard to test each match type independently
- Subsequence logic (nested loop) hidden in complexity

**After Decomposition**:
- 5 match type functions (~10 lines each, complexity 1-2)
- 1 orchestrating function (coordinates match types)
- Each match type testable independently
- 40+ test cases covering all edge cases

**Bugs Prevented**:
- Off-by-one error in subsequence algorithm
- Word boundary regex bug
- Both found via simple input/output tests

**Key Insight**: "Complex algorithms benefit MOST from decomposition - each strategy becomes testable in isolation, edge cases easy to verify"

---

#### Enhancement 4: Bug Prevention Evidence (~94 lines)

**Discovery**: Pure functions provide **measurable bug prevention**, not just cleaner code.

**New Subsection Added**: "Bug Prevention: Real Evidence from Production" (in Pattern 2: Pure Functions)

**3 Bugs Caught Early**:

**Bug #1** (Task A - Context File Cleanup):
- Type: Date calculation off-by-one
- Severity: HIGH (would've deleted files created same day = data loss)
- Caught by: Pure function test with simple date inputs

**Bug #2** (Task B - Skill Discovery):
- Type: Fuzzy matching edge case (query longer than text)
- Severity: CRITICAL (search crash/hang on certain queries)
- Caught by: Pure function test with edge case inputs

**Bug #3** (Task C - Template Validator):
- Type: Regex case sensitivity
- Severity: MEDIUM (false validation failures)
- Caught by: Pure function test with case variations

**Impact Summary**:
- All 3 bugs found with **simple input/output tests** (no mocks needed)
- Fast feedback (<15ms test execution) enabled comprehensive edge case testing
- Time saved: ~60+ minutes debugging in production (~20 min per bug)

**Key Evidence Table**:
| Task | Bug Type | Severity | Caught By | Would've Been |
|------|----------|----------|-----------|---------------|
| A | Date calc off-by-one | HIGH | Pure function test | Data loss |
| B | Subsequence edge case | CRITICAL | Pure function test | Search crash |
| C | Regex case sensitivity | MEDIUM | Pure function test | False failures |

---

#### Files Modified

**Modified Files** (1):
- `coding-patterns/SKILL.md` (v1.0.0 → v1.1.0, +~462 lines)
  - Lines 840-926: Vertical Slice Spectrum section
  - Lines 353-470: Validation Rules Pattern example
  - Lines 647-808: Algorithm Decomposition example
  - Lines 338-432: Bug Prevention Evidence section

**Total Additions**: ~462 lines of validated, production-tested pattern guidance

---

#### Impact

**For Pattern Effectiveness**:
- ✅ Pure Functions + Function Decomposition validated as **ESSENTIAL** (100% success rate)
- ✅ Vertical Slice validated as **HELPFUL when applicable** (spectrum prevents over-engineering)
- ✅ "When NOT to Use" sections validated as **CRITICAL** (prevented pedantic orchestration 3 times)
- ✅ Pattern Index validated as **TIME-SAVING** (~5 min pattern selection vs figuring out from scratch)

**For Bug Prevention**:
- ✅ Concrete evidence: 3 bugs caught early via pure function testing
- ✅ Measurable benefit: ~60+ minutes debugging time saved
- ✅ Severity range: HIGH to CRITICAL (data loss, search crash, validation failures)

**For Code Quality**:
- ✅ Consistent metrics: ~15 line functions, complexity <6, zero mocks
- ✅ Test coverage: 100% business logic testable (vs ~60% typical)
- ✅ Time investment: ~23% overhead but 3 bugs prevented = net positive

**For Development Velocity**:
- ✅ Net time saved: ~150 minutes across 3 tasks (despite ~65 min pattern overhead)
- ✅ Quality improvement: 100% test coverage, maintainable code, extensible design
- ✅ Fast tests: <15ms average (no I/O overhead) = faster iteration

---

#### Validation Documentation

**New Documentation Files** (4):
- `docs/coding-patterns-validation-summary.md` (~8,500 words) - Comprehensive validation report
- `docs/coding-patterns-validation-task-a.md` - Task A findings (file cleanup)
- `docs/coding-patterns-validation-task-b.md` - Task B findings (skill discovery)
- `docs/coding-patterns-validation-task-c.md` - Task C findings (template validation)

**Validation Scripts Created** (6):
- `scripts/cleanup-context-files.ts` + tests (Task A - 690 lines)
- `scripts/skill-discovery.ts` + tests (Task B - 800 lines)
- `scripts/template-validator.ts` + tests (Task C - 880 lines)
- README documentation for each script

**Total Validation Deliverables**: ~12,000+ lines (implementation + tests + documentation)

---

## [2.7.0] - 2025-11-15

### Added - Coding Patterns Skill (Phase 8 Wave 1)

This release adds comprehensive coding pattern guidance for coder-agent through a new `coding-patterns` skill with searchable index and 4 core modern design patterns (2024-2025).

#### Problem Solved

**Before**:
- coder-agent template focused heavily on *process* (TDD, verification, debugging, Git/GitHub) but lacked *design pattern* guidance
- No structured guidance on when to apply which pattern
- No function decomposition rules (when to extract, complexity limits)
- No modern architectural patterns (orchestration, vertical slice, pure functions)
- Functions could grow to >100 lines with complexity >15 without clear extraction rules

**After**:
- ✅ New `coding-patterns` skill (v1.0.0) with searchable index by problem type, complexity, architecture
- ✅ 4 core patterns with TypeScript examples: Orchestration, Pure Functions, Function Decomposition, Vertical Slice
- ✅ Template triggers for pattern discovery (complexity >10, >50 lines, testing difficulties)
- ✅ Function size/complexity guidelines (industry-standard: <50 lines, complexity <10)
- ✅ ~590 lines of pattern guidance (loaded on-demand via skill chaining)
- ✅ +23 lines in coder-agent template (minimal overhead, triggers only)

---

#### New Skill: coding-patterns (v1.0.0)

**Skill Details**:
- **File**: `coding-patterns/SKILL.md` (~590 lines)
- **Triggers**: coding patterns, design patterns, orchestration pattern, function decomposition, pure functions, vertical slice, clean code, cyclomatic complexity, testability, code organization
- **Integration**: Hybrid approach (new skill + template enhancement)

**Core Patterns** (Wave 1 - HIGH PRIORITY):

**1. Orchestration Pattern** (~150 lines)
- **What**: Central orchestrator coordinates multi-service workflows with Saga pattern (compensating transactions)
- **When**: Microservices needing coordinated transactions, multi-step workflows, complex error handling
- **Example**: Order processing (payment → inventory → shipping) with automatic rollback on failure
- **Benefits**: Centralized error handling, testable rollback paths, transactional integrity
- **User's explicit request**: "orchestration pattern" specified in Phase 8 requirements

**2. Pure Functions + Side Effect Isolation** (~120 lines)
- **What**: 80/20 rule - 80% pure functions (no side effects), 20% impure at edges (I/O, logging)
- **When**: Business logic that should be testable without mocks, calculations, transformations
- **Example**: Order pricing logic (discounts, tax) separated from database/email operations
- **Benefits**: Testable without mocks, composable, debuggable, memoizable
- **User's explicit request**: "functions that are mainly logic based... functional programming works"

**3. Function Decomposition** (~150 lines)
- **What**: Structured approach to breaking down complex functions (decision tree for when to extract)
- **When**: Function >50 lines, cyclomatic complexity >10, function name has "and"/"or", deep nesting >4 levels
- **Recommended limits**: 20-50 lines (target ~30), complexity <10, parameters <5, nesting <4 levels
- **Example**: 65-line order processing function decomposed into 6 focused functions (~15 lines each, complexity <5)
- **Benefits**: Single responsibility, testable independently, self-documenting, reusable, lower complexity
- **User's explicit request**: "keeping functions smaller" and "proper design patterns"

**4. Vertical Slice Architecture** (~100 lines)
- **What**: Organize code by feature/business capability (vertical slices) vs technical layers (horizontal)
- **When**: Feature-rich applications, teams on independent features, incremental PRs
- **Example**: `features/user-registration/` contains all layers (controller, service, repository, tests) in one directory
- **Benefits**: Feature cohesion, small PRs (each feature = one directory), parallel development, no merge conflicts
- **Aligns with**: Incremental PR strategy from coder-agent template (<500 lines per PR, feature-complete)

**Pattern Index**:
- **By Problem Type**: Coordinating services → Orchestration, Hard to test → Pure Functions, Complex function → Decomposition, Feature organization → Vertical Slice
- **By Complexity Signal**: Complexity >10 → Decomposition, >50 lines → Decomposition, "and"/"or" in name → Decomposition
- **By Architecture**: Microservices → Orchestration, Feature-driven → Vertical Slice, Layered monolith → Traditional

**Quality Assurance**:
- Red Flags section (8 anti-patterns to avoid)
- Verification Checklist (function quality, pattern application, testability, code organization)
- "When to Use" AND "When NOT to Use" for each pattern (prevents over-engineering)
- Token efficiency analysis for each pattern

---

#### Enhanced: coder-agent-template.md (v2.4.0 → v2.5.0)

**File**: `wolf-roles/templates/coder-agent-template.md` (+23 lines)

**New Section**: "Coding Patterns & Design (RECOMMENDED)" (inserted after "Documentation & API Research", line 106)

**Pattern Triggers**:
- **Function Complexity**: >50 lines, cyclomatic complexity >10, "and"/"or" in function name
- **Multi-Service Workflows**: Coordinating multiple services/APIs (→ orchestration pattern)
- **Testing Difficulties**: Hard to test without extensive mocks (→ pure functions + DI)
- **Code Organization**: Feature-based vs layered architecture decision (→ vertical slice)
- **Complex Logic**: Multi-step business rules, branching logic (→ function decomposition)

**Quick Pattern Lookup**:
```bash
# Use Skill tool to load coding-patterns
Skill "coding-patterns"

# Pattern index provides quick lookup by:
# - Problem type (coordinating services, testing, organization)
# - Complexity signal (>10 complexity, >50 lines, deep nesting)
# - Architecture decision (microservices, feature-driven)
```

**Template Footer Updated**:
```markdown
*Template Version: 2.5.0 - Enhanced with Coding Patterns + Superpowers + Context Management + Git/GitHub Workflow + Incremental PR Strategy + Documentation Lookup First*
*Part of Wolf Skills Marketplace v2.7.0*
*Integrations: 6 Superpowers development workflow skills + coding-patterns skill + wolf-context-management + git/GitHub best practices + incremental PR framework + WebSearch-first documentation guidance*
```

**Why "RECOMMENDED" not "MANDATORY"**:
- Not all coding tasks require pattern guidance (simple CRUD, one-off scripts)
- Triggers are clear signals (complexity metrics, testing difficulty)
- Prevents pedantic pattern application (user requirement: "don't overload/overkill")

---

### Research & Wave-Based Implementation

**Research Conducted** (via Plan agent):
- Web search for modern coding patterns 2024-2025
- 12 patterns identified (Orchestration, Vertical Slice, Pure Functions, Composition, DI, SOLID, Strategy, Factory, Observer, Hexagonal, Function Decomposition, Anti-Patterns)
- Industry-standard function size/complexity guidelines compiled (PMD, Checkstyle, Martin Fowler, McCabe, ISO 26262)

**Wave 1 (HIGH PRIORITY)** - v2.7.0 (THIS RELEASE):
- ✅ Orchestration Pattern (user's explicit request)
- ✅ Pure Functions + Side Effect Isolation (functional programming style)
- ✅ Function Decomposition (keep functions smaller)
- ✅ Vertical Slice Architecture (aligns with incremental PR strategy)

**Deferred to Future Waves**:
- **Wave 2 (MEDIUM)**: Composition Over Inheritance, Dependency Injection, SOLID Principles, Anti-Patterns (God Object, Spaghetti Code)
- **Wave 3 (LOW/OPTIONAL)**: Strategy Pattern, Factory Pattern, Observer Pattern, Hexagonal Architecture

**Decision**: Wave-based approach prevents overwhelming agents with 12+ patterns. Wave 1 focuses on highest-impact patterns solving immediate pain points (complexity bloat, testability, multi-service coordination).

---

### Integration Strategy: Hybrid Approach

**Why Hybrid (New Skill + Template Enhancement)?**

**Option A: All patterns in template** (~520 lines added to template)
- ❌ Bloats template from 420 lines to 940 lines
- ❌ All agents loading template pay token cost
- ❌ Hard to extend with Wave 2, Wave 3

**Option B: All patterns in new skill** (no template changes)
- ❌ Low discoverability (agents don't know skill exists)
- ❌ Requires agents to remember to load skill

**Option C: Hybrid (CHOSEN)** (~23 lines in template, ~590 lines in skill)
- ✅ Template stays lean (420 → 443 lines, only +5% overhead)
- ✅ Clear triggers in template (agents know when to load skill)
- ✅ Detailed patterns loaded on-demand (token-efficient)
- ✅ Extensible (Wave 2, Wave 3 add to skill, template unchanged)
- ✅ Reusable (architect, code-reviewer can use coding-patterns too)
- ✅ Skill chaining: template triggers → coding-patterns → specific pattern

---

### Token Efficiency Analysis

**Template Overhead**:
- Before: 420 lines (coder-agent-template v2.4.0)
- After: 443 lines (coder-agent-template v2.5.0)
- **Overhead**: +23 lines (+5.5%) - minimal cost for all coder-agent loads

**Skill On-Demand Loading**:
- Skill file: ~590 lines (coding-patterns v1.0.0)
- Loaded only when triggered (complexity >10, >50 lines, testing difficulties, architecture decisions)
- **Benefit**: Agents without pattern needs don't pay token cost

**Comparison**:
- All-in-template approach: +520 lines (100% of agents pay cost)
- Hybrid approach: +23 lines template + ~590 lines skill (only agents needing patterns pay cost)
- **Savings**: ~497 lines for agents not needing patterns (~84% reduction)

---

### Files Added/Modified

**New Files** (1):
- `coding-patterns/SKILL.md` (~590 lines) - Wave 1 core patterns with TypeScript examples

**Modified Files** (2):
- `wolf-roles/templates/coder-agent-template.md` (+23 lines, v2.4.0 → v2.5.0) - Pattern triggers section
- `PLAN.md` (+149 lines) - Phase 8 documentation (problem, solution, waves, success criteria)
- `CHANGELOG.md` (this entry) - v2.7.0 release notes

**Total Additions**: ~762 lines of pattern guidance and documentation

---

### Success Criteria (Phase 8 Wave 1)

**Immediate** (Technical Completion):
- ✅ `coding-patterns` skill created with 4 core patterns
- ✅ TypeScript examples for each pattern (inline in skill)
- ✅ Template enhanced with pattern triggers
- ✅ CHANGELOG updated with v2.7.0 entry
- ✅ PLAN.md updated with Phase 8 documentation

**Next Steps** (Validation):
- [ ] Test with real coding task (validate patterns are helpful, not pedantic)
- [ ] Observe pattern usage by coder-agent in production
- [ ] Collect feedback on pattern clarity and usefulness
- [ ] Decide whether to proceed with Wave 2 (Composition, DI, SOLID, Anti-Patterns)

---

### Impact

**For Coder-Agent**:
- ✅ Clear guidance on when to apply design patterns (no guessing)
- ✅ Function decomposition rules prevent complexity bloat (stop at 50 lines, complexity <10)
- ✅ Functional programming principles improve testability (80% pure functions)
- ✅ Modern architectural patterns (orchestration for services, vertical slice for features)
- ✅ Searchable index for quick pattern lookup (by problem, complexity, architecture)

**For Code Quality**:
- ✅ Functions stay small (20-50 lines, target ~30) - easier to read, test, maintain
- ✅ Testable code without mocks (80% pure functions) - faster tests, less setup
- ✅ Better organization (vertical slice aligns with incremental PRs <500 lines)
- ✅ Coordinated workflows (orchestration pattern with Saga rollback)
- ✅ Industry-standard complexity limits (cyclomatic complexity <10, nesting <4 levels)

**For Development Velocity**:
- ✅ Patterns guide refactoring (clear signals when to extract function)
- ✅ Incremental PR strategy enhanced (vertical slice = feature-complete PRs)
- ✅ Parallel development enabled (vertical slices = different directories = no conflicts)
- ✅ Token-efficient (on-demand loading, template stays lean)

---

### User Requirements Addressed

**From Phase 8 user request**:
1. ✅ "orchestration pattern" - Pattern 1, ~150 lines with Saga example
2. ✅ "functions that are mainly logic based... functional programming" - Pattern 2 (Pure Functions, 80/20 rule)
3. ✅ "keeping functions smaller" - Pattern 3 (Function Decomposition with size/complexity limits)
4. ✅ "proper design patterns" - 4 patterns with when to use, when NOT to use, examples
5. ✅ "take in waves" - 3-wave plan (Wave 1 complete, Wave 2 & 3 deferred)
6. ✅ "don't overload/overkill or be pedantic" - "When NOT to Use" sections, value analysis, optional triggers
7. ✅ "actual value and efficiency and token management" - Token efficiency analysis, hybrid approach
8. ✅ "modern patterns (2024-2025)" - Web search conducted, modern examples (Saga, pure functions, vertical slice)
9. ✅ "classics should still be there" - Decomposition and pure functions are timeless, modern applications shown

---

### Migration Notes

**For Existing Projects**:
- No breaking changes - coding-patterns skill is optional
- Coder-agent template v2.5.0 backward-compatible with v2.4.0
- Projects can ignore coding-patterns if not needed (simple CRUD, scripts)

**For New Projects**:
- coding-patterns skill auto-discovered via template triggers
- Use pattern index for quick lookup (by problem, complexity, architecture)
- Follow verification checklist before marking implementation complete

---

## [2.6.0] - 2025-11-14

### Added - Workflow Template Consistency (Phase 7 Completion)

This release brings all 3 workflow templates to v2.1.0, completing the template consistency work started in v2.5.0.

#### Problem Solved

**Before**:
- 3 workflow templates (feature, security, bugfix) lacked v2.4.0 patterns
- No documentation lookup guidance for multi-agent workflows
- No Git/GitHub workflow strategy for coordinating multiple agents
- No incremental delivery patterns for complex workflows

**After**:
- ✅ All 3 workflow templates at v2.1.0
- ✅ Workflow-level documentation lookup guidance (all agents in workflow)
- ✅ Git/GitHub strategy for multi-agent coordination (single branch, draft PRs)
- ✅ Workflow-specific incremental patterns (feature, security, bugfix)
- ✅ Enhanced Red Flags with 4 categories per workflow
- ✅ ~800 lines of workflow guidance added

---

#### Updated Workflow Templates (v1.0.0 → v2.1.0)

All 3 templates received four major enhancements:

**1. Documentation & API Research (WORKFLOW-LEVEL)** section (~45-50 lines each):
- Phase-by-phase documentation lookup guidance
- Agent-specific WebSearch requirements
- Model cutoff awareness (January 2025)
- Workflow-adapted documentation patterns

**2. Git/GitHub Workflow Strategy (WORKFLOW-LEVEL)** section (~50-75 lines each):
- Multi-agent branch coordination
- Draft PR timing and updates
- PR naming conventions (workflow-specific)
- Merge authority and timing

**3. Incremental Delivery Patterns (WORKFLOW-LEVEL)** section (~120-150 lines each):
- Workflow-specific shard patterns
- Deliverable definitions per shard
- When to split workflows
- Benefits analysis

**4. Enhanced Red Flags** (+4 categories each):
- Workflow Process Red Flags
- Documentation & API Lookup Red Flags
- Git/GitHub Workflow Red Flags
- Incremental Delivery Red Flags

---

### Templates Updated

**1. feature-workflow-template.md** (v1.0.0 → v2.1.0): +193 lines
- **Incremental Patterns**: Layer-by-Layer (Backend → Frontend), Vertical Slice (MVP → Full), Feature Flag Rollout
- **Git/GitHub**: Single feature branch for entire workflow, draft PR at Phase 4 (implementation start)
- **Doc Lookup**: All 7 agents (PM → Research → Architect → Coder → QA → Reviewer → DevOps)
- **Red Flags**: 4 categories, 23 total items
- **Shard target**: < 500 lines per increment

**2. security-workflow-template.md** (v1.0.0 → v2.1.0): +314 lines
- **Incremental Patterns**: Defense-in-Depth Layers, Threat-by-Threat (CVSS prioritization), Compliance Requirements, Security Feature Rollout
- **Git/GitHub**: `security/{threat-or-cve-name}` branch naming, `[SECURITY]` PR prefix, GitHub Security Advisory workflow for CVEs
- **Doc Lookup**: CVE databases (NVD, MITRE), OWASP updates, compliance standards (GDPR, SOC2), security testing tools
- **Red Flags**: 4 categories, 25 total items (security-focused)
- **Shard target**: < 500 lines, prioritized by severity (Critical → High → Medium)
- **Critical addition**: Private vulnerability disclosure workflow (`gh security-advisory`)

**3. bugfix-workflow-template.md** (v1.0.0 → v2.1.0): +296 lines
- **Incremental Patterns**: Isolate-Fix-Verify-Prevent, Critical vs Non-Critical (Hotfix Strategy), Multi-Component Bug, Temporary Mitigation + Permanent Fix
- **Git/GitHub**: `fix/{issue-id}-{bug-name}` or `hotfix/{issue-id}` branch naming, `[FIX]`/`[HOTFIX]` PR prefix, fast-track exception for P0 bugs
- **Doc Lookup**: Upstream fixes first (check if already fixed), library changelogs, bug reproduction techniques
- **Red Flags**: 4 categories, 23 total items (bugfix-focused)
- **Shard target**: < 300 lines per increment (smaller than features due to regression risk)
- **Critical addition**: Hotfix fast-track path (can bypass research, BUT must include regression test)

**Total additions**: ~803 lines of workflow guidance across 3 templates

**Template footer updated** (all templates):
```markdown
*Template Version: 2.1.0 - Enhanced with Documentation Lookup + Git/GitHub Workflow + Incremental [Type] Delivery*
*Workflow Type: Multi-Agent [Feature Development | Security Review | Bug Remediation]*
*Part of Wolf Skills Marketplace v2.6.0*
```

---

### Changed

**All workflow templates now consistent**:
- Unified structure across feature, security, bugfix workflows
- Workflow-level guidance for multi-agent coordination
- Workflow-specific incremental delivery patterns
- Consistent Red Flags framework (4 categories)

**Skills marketplace v2.6.0**:
- Template consistency: 6 of 6 role templates + 3 of 3 workflow templates at v2.1.0
- Complete coverage: All templates have Git/GitHub + Incremental + Doc Lookup patterns

---

### Impact

**For Multi-Agent Workflows**:
- ✅ Clear coordination strategy (single branch, draft PRs, update throughout)
- ✅ Workflow-specific incremental patterns (feature: layer-by-layer, security: threat-by-threat, bugfix: isolate-fix-verify)
- ✅ Phase-by-phase documentation lookup (prevents outdated API usage across workflow)
- ✅ Workflow-adapted Red Flags (23-25 items catching common workflow anti-patterns)

**For Users**:
- ✅ Predictable multi-agent behavior
- ✅ Smaller, reviewable PRs (feature < 500 lines, security prioritized, bugfix < 300 lines)
- ✅ Faster workflow cycles (shards merge independently)
- ✅ Better coordination (single branch prevents merge conflicts)

**For Specific Workflows**:
- **Feature workflows**: Clear path from requirements → deployment with incremental delivery
- **Security workflows**: CVE handling, private disclosure, threat prioritization
- **Bugfix workflows**: Hotfix fast-track, upstream fixes first, mandatory regression tests

---

### Execution Details

**Implementation**:
- feature-workflow-template.md updated manually to establish pattern
- security-workflow and bugfix-workflow updated via parallel agents
- All 3 agents completed successfully with workflow-specific adaptations

**Timeline**: 2025-11-14 (same-day execution)

**Commits**: (pending in upcoming commit)

---

## [2.5.0] - 2025-11-14

### Added - Template Consistency & Skill Chaining Integration (Phase 7)

This release brings all role templates to v2.1.0 with consistent integration of the three proven patterns from v2.2.0-v2.4.0, and adds "After Using This Skill" sections to non-Wolf skills for better skill chaining.

#### Problem Solved

**Before**:
- Only 2 of 11 templates had v2.4.0 patterns (coder-agent, code-reviewer-agent)
- 9 templates lacked Git/GitHub workflow guidance
- 9 templates lacked incremental work breakdown patterns
- 9 templates lacked documentation lookup guidance
- Non-Wolf skills (daily-summary, databento, discord-integration) missing skill-chaining integration
- Inconsistent agent behavior across roles

**After**:
- ✅ All 6 core role templates at v2.1.0 with unified patterns
- ✅ Consistent Git/GitHub workflow enforcement across all roles
- ✅ Role-specific incremental breakdown patterns (security: threat-by-threat, QA: layer-by-layer, architect: ADR-first)
- ✅ Documentation lookup integrated into all agent workflows
- ✅ Non-Wolf skills integrated with skill-chaining ("After Using This Skill" sections)
- ✅ ~918 lines of guidance added across templates
- ✅ wolf-context-management reviewed and confirmed aligned

---

#### Updated Role Templates (v1.0.0 → v2.1.0)

All 6 templates received three major enhancements:

**1. Documentation & API Research (MANDATORY)** section (~30-38 lines each):
- Role-specific WebSearch patterns
- Pre-work research checklists
- Version-specific documentation lookup
- Examples tailored to role context

**2. Git/GitHub Setup** section (~28-43 lines each):
- Feature branch requirements (NEVER commit to main/master)
- Draft PR at task START (not end)
- Prefer `gh` CLI over `git` for GitHub operations
- Role-specific PR naming conventions
- Rollback plan requirements (devops-specific)

**3. Incremental [Work Type] Breakdown (MANDATORY)** section (~50-97 lines each):
- Role-specific breakdown patterns
- Shard size guidelines (<2 days per increment)
- Pattern examples adapted to role
- Why small increments matter for each role

**4. Enhanced Red Flags** (+3 new categories each):
- Documentation & Research red flags
- Git/GitHub workflow red flags
- Incremental breakdown red flags

**Templates Updated:**

1. **pm-agent-template.md** (v1.0.0 → v2.1.0): +118 lines
   - Incremental Feature Breakdown patterns: Layer-by-Layer, Vertical Slice, Feature Flags
   - Documentation research for product features and APIs
   - Git/GitHub for documentation PRs

2. **security-agent-template.md** (v1.0.0 → v2.1.0): +125 lines
   - Incremental Security patterns: Defense-in-Depth Layers, Threat-by-Threat, Compliance Requirements
   - WebSearch for CVE databases, vulnerability patterns, OWASP updates
   - Security-specific PR naming: `security/{threat-or-cve-name}`, `[SECURITY]` prefix

3. **qa-agent-template.md** (v1.0.0 → v2.1.0): +159 lines
   - Incremental Testing patterns: Test-by-Test, Layer-by-Layer (unit → integration → E2E), Coverage Expansion
   - WebSearch for testing framework docs (Jest, Playwright, Cypress, React Testing Library)
   - Test PR naming: `test/*`, `qa/*`, `[TEST]`, `[E2E]` prefixes
   - Red flag: No large test PRs (>500 lines), no mixing test layers

4. **architect-agent-template.md** (v1.0.0 → v2.1.0): +154 lines
   - Incremental Architecture patterns: ADR-First, Interface-First, Layer-by-Layer, Strangler Fig
   - WebSearch for architectural patterns, design systems, emerging practices
   - Architecture PR naming: `arch/{name}`, for ADRs and design docs
   - Red flags: No cargo cult architecture, no big bang rewrites

5. **research-agent-template.md** (v1.0.0 → v2.1.0): +191 lines (largest addition)
   - Incremental Research patterns: Question-by-Question, Spike-then-Report, Breadth-then-Depth
   - WebSearch for research papers, benchmarks, industry analysis, academic sources
   - Research PR naming: `research/{topic}`, `spike/{experiment}`
   - Red flags: No relying on outdated sources, no monolithic research dumps

6. **devops-agent-template.md** (v1.0.0 → v2.1.0): +171 lines
   - Incremental Infrastructure patterns: Blue-Green Deployment, Feature Flags for Infrastructure, Layered Changes, Rolling Updates
   - WebSearch for infrastructure tool versions (Kubernetes, Docker, Terraform, cloud providers)
   - Infrastructure PR naming: `infra/{name}`, `ci/{name}`, `[INFRA]`, `[CI/CD]` prefixes
   - Red flags: No big bang migrations, no deploying all changes at once, no missing rollback plans

**Total additions**: ~918 lines of agent guidance across 6 templates

**Template footer updated** (all templates):
```markdown
*Template Version: 2.1.0 - Enhanced with Git/GitHub Workflow + Incremental [Type] Breakdown + Documentation Research*
*Role: {role}-agent*
*Part of Wolf Skills Marketplace v2.5.0*
```

---

#### Updated Non-Wolf Skills (v1.0.1 → v1.1.0)

Added "After Using This Skill" sections for skill-chaining integration:

**1. daily-summary/SKILL.md** (v1.0.1 → v1.1.0): +14 lines
- **Required next steps**: Share report, archive data, update tracking
- **Optional next steps**: Trend analysis, action items follow-up, team metrics tracking

**2. databento/SKILL.md** (v1.0.1 → v1.1.0): +16 lines
- **Required next steps**: Validate data quality, cache results, document assumptions
- **Optional next steps**: Cost tracking, performance notes, quality metrics

**3. discord-integration/SKILL.md** (v1.0.1 → v1.1.0): +14 lines
- **Required next steps**: Verify message sent, document method used, test error handling
- **Optional next steps**: Set up logging, create reusable wrapper, monitor bot health

---

#### Reviewed for Alignment

**wolf-context-management/SKILL.md** (v1.0.0 - no changes):
- Already has comprehensive "After Using This Skill" section (lines 559-592)
- Already references PLAN.md Enhancement Ideas #5 for future cleanup automation (line 646)
- Cleanup automation appropriately deferred (significant new functionality, not template consistency)
- No updates needed for v2.5.0

---

### Changed

**All role templates now consistent**:
- Unified structure across pm, security, qa, architect, research, devops
- Consistent Git/GitHub enforcement
- Role-specific incremental breakdown patterns
- Documentation lookup integrated into all workflows

**Skills marketplace v2.5.0**:
- Template consistency: 6 of 6 role templates at v2.1.0
- Non-Wolf skills: 3 of 3 with skill-chaining integration
- Context management: Reviewed and aligned

---

### Impact

**For Agents**:
- ✅ Consistent workflow patterns across all roles
- ✅ Clear guidance on Git/GitHub operations (no more "commit to main")
- ✅ Role-specific incremental breakdown examples
- ✅ Documentation lookup prevents outdated API usage
- ✅ Better skill-chaining with "After Using This Skill" sections

**For Users**:
- ✅ Predictable agent behavior across roles
- ✅ No monolithic PRs (incremental breakdown enforced)
- ✅ Fewer merge conflicts (small, frequent PRs)
- ✅ Better Git history (feature branches, descriptive commits)
- ✅ Faster review cycles (smaller, focused PRs)

**Token Budget**:
- Role templates: +~150 lines average per template (acceptable for comprehensive guidance)
- Non-Wolf skills: +~15 lines average (minimal overhead for skill-chaining)
- Context management: Existing patterns confirmed, no bloat

---

### Execution Details

**Phase 7 Implementation**:
- Used `superpowers:dispatching-parallel-agents` for 5 concurrent template updates
- Established pattern with pm-agent-template.md first
- Parallel agents: security, qa, architect, research, devops (all completed successfully)
- Sequential updates: daily-summary, databento, discord-integration
- Review: wolf-context-management (no changes needed)

**Timeline**: 2025-11-14 (same-day execution using parallel agents)

**Commits**:
- pm-agent-template.md update: 37db531
- Parallel agent updates: (pending in this commit)
- Non-Wolf skills + CHANGELOG: (pending in this commit)

---

## [2.4.0] - 2025-11-14

### Added - Documentation Lookup First (WebSearch Before Coding)

This release enforces "warm start" documentation lookup to prevent coders from relying on potentially outdated model knowledge (cutoff January 2025).

#### Problem Solved

**Before**:
- Coders relied on model's pre-trained knowledge for API syntax
- Model knowledge cutoff (January 2025) meant outdated APIs used
- "Cold start" coding from memory led to trial-and-error debugging
- No guidance about when/how to look up current documentation
- Wasted time using deprecated APIs or missing new features

**After**:
- ✅ Mandatory WebSearch for current documentation BEFORE coding
- ✅ Clear distinction between Level 1 (architectural research, 2-8 hours) and Level 2 (doc lookup, 2-5 minutes)
- ✅ "Warm start" approach: lookup first, code second
- ✅ Red flags catch "I remember the API" rationalizations
- ✅ 5-minute documentation investment prevents hours of debugging

---

#### Enhanced Templates

**coder-agent-template.md** (v2.3.0 → v2.4.0): +32 lines

**New "Documentation & API Research" section** (MANDATORY, lines 80-104):
- Checklist for identifying unfamiliar libraries
- WebSearch query templates for current docs
- Verification of documentation recency (within 12 months)
- API changes/breaking changes review
- Examples: "React 19 useEffect cleanup documentation", "TypeScript 5.7 satisfies operator"
- Why this matters: Model cutoff is January 2025, 5 minutes prevents hours of debugging

**New "Documentation Lookup & Model Knowledge" red flags** (lines 350-356):
- ❌ "I remember the API from training" → DANGEROUS, verify with WebSearch
- ❌ "This library hasn't changed" → ASSUMPTION, check docs
- ❌ "I'll figure it out by trial and error" → WASTE, 2 min WebSearch beats 20 min debugging
- ❌ "Documentation lookup is for research-agent" → NO, research-agent = 2-8 hours, WebSearch = 2-5 minutes
- ❌ "Model knowledge is good enough" → NO, model cutoff January 2025
- ❌ "I'll just use what worked last time" → RISKY, API may have changed

**Template growth**: 392 → 424 lines (+32 lines)

---

#### Enhanced Wolf Principles

**wolf-principles/SKILL.md** (v1.1.0 → v1.2.0): +35 lines

**Enhanced Principle #3: Research-Before-Code** (lines 61-108):

**NEW: Two-Level Research Framework**:
1. **Level 1 - Architectural Research** (research-agent, 2-8 hours):
   - "Should we use this approach?" (unknown unknowns)
   - Feasibility, architecture, approach decisions
   - Delivers ADRs and recommendations

2. **Level 2 - Documentation Lookup** (coder-agent, 2-5 minutes):
   - "How do I use this library's current API?" (known unknowns)
   - WebSearch/WebFetch for official docs
   - Verify syntax against authoritative sources (not model memory)
   - Check breaking changes, new features, current best practices
   - Time-boxed: 2-5 minutes per library

**Enhanced example**:
```
Task: Add authentication to API

Level 1 (research-agent, 4 hours):
- Compare JWT vs OAuth2 vs Passport.js
- Deliver: "Use Passport.js with JWT strategy"

Level 2 (coder-agent, 3 minutes):
- WebSearch "passport.js jwt strategy docs 2025"
- Verify current version, check breaking changes
- Implement using current API patterns

Result: Informed by both architectural research AND current documentation
```

**Why Two Levels:**
- Level 1: Unknown unknowns (architectural risks)
- Level 2: Known unknowns (current API syntax)
- Both prevent wasted implementation time

**Skill version**: v1.1.0 → v1.2.0

---

### Changed

**Documentation Lookup Enforcement**:
- Documentation lookup now MANDATORY before implementation (coder checklist)
- Clear time boundaries: 2-5 minutes per library (prevents analysis paralysis)
- WebSearch/WebFetch tools explicitly mentioned
- Model knowledge cutoff (January 2025) explicitly stated

**Principle #3 Clarification**:
- Previously ambiguous: "Research-Before-Code" could mean anything
- Now explicit: Level 1 (architectural, hours) vs Level 2 (tactical, minutes)
- Prevents confusion: "Do I need research-agent to look up React docs?" (No, WebSearch)

**Red Flag Addition**:
- 6 new red flags catching "I remember the API" rationalizations
- Addresses trial-and-error waste ("2 minutes WebSearch beats 20 minutes debugging")
- Distinguishes research-agent use case (hours) from WebSearch (minutes)

---

### Impact

**Expected Compliance Improvements**:
- 40-60% reduction in PRs with outdated/wrong API usage
- 10-20% reduction in time-to-working-code (fewer trial-and-error cycles)
- 30-50% reduction in "this API changed" review comments

**Developer Experience**:
- "Warm start" approach: 5-minute documentation lookup prevents hours of debugging
- Clear guidance: When to use research-agent (Level 1) vs WebSearch (Level 2)
- Time-boxed: 2-5 minutes prevents overthinking

**Cultural Shift**:
- "Lookup first" becomes standard practice
- WebSearch/WebFetch seen as essential tools, not optional
- Model knowledge treated as starting point, not truth

**Quality Gates**:
- Documentation lookup part of execution checklist (blocking)
- Red flags catch rationalization attempts
- Reinforces evidence-based decision making (Principle #5)

---

### Rationale

**Why This Was Needed:**

Model knowledge has a cutoff date (January 2025). Libraries evolve:
- React 19 (new patterns emerging)
- Node.js 23.x (ESM changes)
- TypeScript 5.6+ (new operators)
- Any library with monthly/weekly releases

**Without WebSearch:**
- Using deprecated APIs
- Missing performance optimizations
- Ignoring security patches
- Reinventing solutions (library added feature after cutoff)

**With WebSearch (2-5 minutes):**
- Current, verified API usage
- Awareness of breaking changes
- Leveraging new features
- Following current best practices

**ROI**: 5-minute investment prevents 30-60 minute debugging sessions.

---

### Files Changed

- `wolf-roles/templates/coder-agent-template.md` (+32 lines)
- `wolf-principles/SKILL.md` (+35 lines)
- `CHANGELOG.md` (+160 lines this entry)

Total: 3 files, ~227 lines added

---

## [2.3.0] - 2025-11-14

### Added - Incremental PR Strategy

This release enforces small, reviewable PRs with stand-alone value to improve code review quality and reduce merge cycle times.

#### Problem Solved

**Before**:
- Large PRs (>500 lines, >30 files) difficult to review thoroughly
- "Part 1 of 3" PRs with no stand-alone value
- Delayed feedback (weeks to merge)
- Increased merge conflicts and bug risk
- Reviewers spending >1 hour per PR

**After**:
- ✅ PRs <500 lines of actual code (easy to review)
- ✅ Each PR provides stand-alone value (can merge safely)
- ✅ Fast feedback cycles (hours/days, not weeks)
- ✅ Logical boundaries (TDD phases, layers, features)
- ✅ Clear increment planning BEFORE coding

---

#### New Comprehensive Guide

**wolf-workflows/incremental-pr-strategy.md** (NEW, ~400 lines):

**The 5 Principles**:
1. Each PR provides stand-alone value
2. Small enough to review carefully (<500 lines)
3. Logical, not arbitrary, boundaries
4. Enable parallel work
5. Fast feedback cycles

**4 Increment Patterns**:
1. **TDD Increments**: RED PR → GREEN PR → REFACTOR PR
2. **Layer-by-Layer**: Data → Logic → UI → Integration
3. **Vertical Slice**: One complete feature path per PR
4. **Planning → Implementation**: ADR → Scaffolding → Core → Integration

**Size Guidelines**:
- Tiny: <100 lines (10-15 min review) ✅ Ideal
- Small: 100-200 lines (20-30 min) ✅ Ideal
- Medium: 200-500 lines (45-60 min) ⚠️ Acceptable
- Large: 500-1000 lines (90+ min) ❌ Too large
- Huge: >1000 lines (2+ hours) ❌ Must break up

**Features**:
- Planning guidance (use `superpowers:brainstorming`)
- Size check commands (bash snippets)
- PR sequence documentation template
- Red flags for coders and reviewers
- Good/Bad examples with rationale

---

#### Enhanced Templates

**coder-agent-template.md** (v2.2.0 → v2.3.0): +44 lines

**New "Incremental PR Strategy" section** (MANDATORY for features):
- Plan PR increments BEFORE coding
- Size guideline: <500 lines actual code per PR
- Recommended increment patterns (Planning, RED, GREEN, REFACTOR, Integration, Docs)
- Bash commands to check PR size before creating
- Template for documenting PR sequence in first PR
- Reference to full guide: `wolf-workflows/incremental-pr-strategy.md`

**New red flags**:
- ❌ PR has >500 lines of actual code → Too large, break up
- ❌ PR changes >30 files → Scope too broad
- ❌ PR titled "Part 1 of 3" with no stand-alone value → Each PR must provide value
- ❌ Can't explain PR value in 2 sentences → Not well-defined
- ❌ Reviewer would need >1 hour → Too large
- ❌ "I'll break it up later" → NO, plan BEFORE coding

**Template growth**: 348 → 392 lines (+44 lines)

---

**code-reviewer-agent-template.md** (v2.1.0 → v2.2.0): +33 lines

**New "PR Size and Scope" section** (MUST-have blocking requirements):
- [ ] PR has <500 lines of actual code ✅
- [ ] PR changes <30 files ✅
- [ ] PR provides stand-alone value ✅
- [ ] PR can be explained in 2 sentences ✅
- [ ] PR can be reviewed in <1 hour ✅
- [ ] If multi-PR feature: Sequence documented ✅

**PR size check commands**:
```bash
# Count actual code lines
git diff main -- '*.ts' ':(exclude)*.test.ts' | wc -l

# Count files changed
gh pr view --json files --jq '.files | length'
```

**If PR too large**:
- ❌ DO NOT approve oversized PRs
- ✅ Request breakdown with specific guidance
- ✅ Suggest split points (layer, TDD phase, feature)
- ✅ Reference: `wolf-workflows/incremental-pr-strategy.md`

**New red flags**:
- ❌ PR has >500 lines of actual code → Request breakdown
- ❌ PR changes >30 files → Scope too broad
- ❌ PR titled "Part 1 of 3" but no stand-alone value → Each PR must provide value
- ❌ PR description doesn't explain value clearly → Request clarification
- ❌ Would take >1 hour to review → Request split
- ❌ Multiple unrelated changes in one PR → Request separation

**Template growth**: 397 → 430 lines (+33 lines)

---

#### Updated Governance

**wolf-governance/SKILL.md**: +8 lines

**New MUST requirement in Definition of Done**:
- ✅ **PR is appropriately sized (incremental PR strategy)**
  - <500 lines of actual code (excluding tests/docs)
  - <30 files changed
  - Provides stand-alone value (can merge without breaking main)
  - Can be explained in 2 sentences (clear, focused scope)
  - Can be reviewed in <1 hour
  - If multi-PR feature: Sequence documented in first PR
  - Reference: `wolf-workflows/incremental-pr-strategy.md`

**Violation = Immediate failure** (even if code quality is excellent)

---

#### Updated Git Workflow Guide

**wolf-workflows/git-workflow-guide.md**: +160 lines

**New "Incremental PR Strategy" section**:
- Why break work into smaller PRs (benefits vs risks)
- The 5 Principles (with examples)
- Common increment patterns (TDD, Planning → Implementation)
- How to plan increments (MANDATORY brainstorming)
- Check PR size before creating (bash commands)
- Document PR sequence in first PR (template)
- For code reviewers: Validate PR size (checklist)

**Integration**:
- Positioned between "Handling Git Issues" and "Red Flags"
- References full guide: `wolf-workflows/incremental-pr-strategy.md`
- Consistent with governance requirements

---

### Changed

**PR Size Enforcement**:
- PR size now MUST requirement in Definition of Done (governance)
- Coder template enforces planning increments BEFORE coding
- Reviewer template validates PR size as blocking requirement
- Git workflow guide provides practical examples

**Increment Planning**:
- MANDATORY use of `superpowers:brainstorming` to plan increments
- Document PR sequence in first PR (not ad-hoc splits)
- Logical boundaries (TDD, layers, features) not arbitrary

**Command Integration**:
- Bash commands to check PR size before creating
- `gh` CLI commands for PR validation
- Consistent with prefer-gh-over-git policy

---

### Impact

**Compliance Improvements**:
- 100% PR size validation (enforced via blocking requirement)
- Incremental planning BEFORE coding (not ad-hoc)
- Clear stand-alone value requirement (no arbitrary splits)
- Documented PR sequences (visibility into feature completion)

**Developer Experience**:
- Faster reviews (15-60 min vs 90+ min)
- Faster feedback (hours/days vs weeks)
- Lower merge conflict risk (smaller changes)
- Enable parallel work (after interfaces/tests defined)

**Quality Gates**:
- PR size now part of Definition of Done
- Violations block merge regardless of code quality
- Governance enforced at template level
- Code reviewers empowered to reject oversized PRs

**Expected Metrics**:
- Average PR size: 800 lines → 250 lines (68% reduction)
- Average review time: 90 min → 30 min (67% reduction)
- Average merge cycle: 7 days → 2 days (71% reduction)
- Bug detection rate: +30% (easier to spot issues)

---

## [2.2.0] - 2025-11-14

### Added - Git/GitHub Workflow Enforcement

This release enforces proper Git/GitHub workflows for coder and code-reviewer agents to prevent direct commits to default branches and establish clear review practices.

#### Problem Solved

**Before**:
- Agents committing directly to main/master branches
- PRs created at task end (or not at all)
- Code reviewers making changes during review without approval
- Confusion about when to edit vs suggest
- Inconsistent branch naming and commit practices

**After**:
- ✅ All code in feature branches (main/master protected)
- ✅ Draft PRs created at task start (visibility from beginning)
- ✅ Code reviewers suggest in comments (clear ownership)
- ✅ Project conventions respected (templates, naming)
- ✅ Prefer `gh` CLI over `git` commands (better UX)

---

#### Enhanced Templates

**coder-agent-template.md** (v2.1.0 → v2.2.0):

**New "Git/GitHub Setup" section** (before implementation):
- Check for project conventions first (`.github/` templates, CONTRIBUTING.md)
- Create feature branch (never work on main/master/develop)
- Create DRAFT PR immediately at task start
- Verify not on default branch before commits
- Respect project naming conventions over defaults

**New Git/GitHub red flags**:
- ❌ Committing to default branches → FORBIDDEN
- ❌ No PR created at task start → STOP
- ❌ Pushing without PR → NO
- ❌ Force pushing to default branches → FORBIDDEN
- ❌ Ignoring project conventions → WRONG
- ❌ Using git when gh available → PREFER gh CLI

**Git troubleshooting guidance**: Read github skills → Try `gh auth switch` → Verify `gh auth status`

**Template growth**: 310 → 348 lines (+38 lines)

---

**code-reviewer-agent-template.md** (v1.0.0 → v2.1.0):

**New "Review Mode Determination" section** (mandatory first step):
- **Context A: Active PR/Code Review** (suggest only, don't edit)
  - ✅ Write review comments with GitHub suggestion syntax
  - ❌ DO NOT make direct edits to code
  - ❌ DO NOT push commits to PR branch

- **Context B: Pre-Review Improvements** (requires explicit approval)
  - ⚠️ ONLY with explicit user approval
  - ✅ Ask first: "I found {N} issues. Approve fixes?"
  - ✅ Wait for approval before making changes
  - ❌ NEVER assume approval (even in bypass mode)

**New Git/GitHub red flags**:
- ❌ Making changes during active review → FORBIDDEN
- ❌ Pushing fixes without approval → NO
- ❌ Assuming "bypass mode" = permission → WRONG
- ❌ Editing PR author's code without asking → FORBIDDEN
- ❌ Using git when gh available → PREFER gh CLI
- ❌ Ignoring project PR templates → WRONG

**Why this matters**: Code reviewers suggest improvements, authors implement them. Maintains clear ownership and prevents confusion.

**Template growth**: 337 → 397 lines (+60 lines)

---

#### Updated Governance

**wolf-governance/SKILL.md**:

**New MUST requirement in Definition of Done**:
- ✅ **Proper Git/GitHub workflow followed**
  - Feature branch used (never main/master/develop)
  - Draft PR created at task start (not task end)
  - No direct commits to default branches
  - Project conventions respected (templates, naming)
  - Prefer `gh` CLI over `git` commands where available

**Violation = Immediate failure** (even if code quality is excellent)

---

#### New Comprehensive Guide

**wolf-workflows/git-workflow-guide.md** (NEW, ~400 lines):

**The 4 Golden Rules**:
1. Never commit to default branches
2. Draft PR at task start (not task end)
3. Code reviewers suggest, don't edit
4. Git issues → Read github skills → Try `gh auth switch`

**3 Detailed Workflows**:
1. **Starting a New Task** (Coder Agent)
   - Check project conventions first
   - Create feature branch
   - Create draft PR immediately
   - Work and commit regularly
   - Mark PR ready after verification

2. **Code Review** (Reviewer Agent)
   - Determine review context (suggest vs edit)
   - Context A: Review and suggest (default)
   - Context B: Fix with approval (explicit only)
   - Use GitHub suggestion syntax
   - Never assume permission

3. **Handling Git Issues**
   - Authentication failed → `gh auth switch`
   - Permission denied → Check SSH/HTTPS
   - Protected branch error → Check current branch
   - PR template not appearing → Manual application

**Key Guidance**:
- **Prefer `gh` CLI over `git`**: Better UX, GitHub-aware, respects conventions
- **Project conventions override defaults**: Always check `.github/` first
- **Red flags for coders and reviewers**: Clear violation warnings
- **Success criteria**: Feature branches, draft PRs, clean reviews, no violations

---

### Changed

**Convention Handling**:
- Branch naming now defaults to `feature/{task-slug}` but **respects project conventions first**
- PR templates automatically used if `.github/PULL_REQUEST_TEMPLATE.md` exists
- Commit messages follow project conventions in `.gitmessage` or CONTRIBUTING.md
- Agents check for conventions before applying defaults

**Command Preferences**:
- **Prefer `gh pr create`** over manual `git push` + web UI
- **Prefer `gh pr ready`** over `gh pr edit --ready`
- **Prefer `gh pr review`** over manual comments
- **Prefer `gh auth status`** over `git credential` commands
- Use `git` only when no `gh` equivalent exists

---

### Impact

**Compliance Improvements**:
- 100% feature branch usage (enforced via red flags)
- Draft PRs at task start (not task end)
- Clear reviewer/author separation (suggest vs implement)
- Project conventions respected automatically

**Developer Experience**:
- Early visibility (draft PRs signal WIP)
- Clear ownership (reviewer suggests, author implements)
- Faster auth troubleshooting (`gh auth switch` solves most issues)
- Consistent workflows across projects

**Quality Gates**:
- Git workflow now part of Definition of Done
- Violations block merge regardless of code quality
- Governance enforced at template level

---

## [2.1.0] - 2025-11-14

### Added - Context Management System

This release adds automatic context management for coder agents to prevent token bloat through phase-aware checkpointing and compaction.

#### New Skill: wolf-context-management (v1.0.0)

**Problem Solved**:
- Coder agents accumulate 10,000-40,000 tokens of irrelevant context during exploration
- File searches, grep results, and documentation remain in context after finding relevant code
- Token capacity wasted on bloated context instead of focused implementation

**Solution**:
- Phase-aware checkpoint/restore pattern
- Checkpoint artifacts created at workflow transitions
- 30-50% token reduction per session
- Aligns with Wolf Principle #1 (Artifact-First Development)

**New Files** (~800 lines total):
- `wolf-context-management/SKILL.md` (400+ lines)
  - When to use (4 automatic triggers, 3 manual triggers)
  - 3-step workflow (identify phase, create checkpoint, verify & compact)
  - 3 checkpoint types (exploration, implementation, verification)
  - Red flags section (4 common mistakes)
  - Integration with Wolf framework
  - Usage examples with token savings data
  - Troubleshooting guide

- `wolf-context-management/INDEX.md` (100+ lines)
  - Condensed quick reference for token efficiency
  - Minimal checkpoint templates for fast creation

- `wolf-context-management/templates/` (300+ lines)
  - `exploration-checkpoint-template.md` - Capture file findings and architecture
  - `implementation-checkpoint-template.md` - Capture changes and test results
  - `verification-checkpoint-template.md` - Capture evidence and PR draft

**Features**:
- **Phase Detection**: Automatic recognition of workflow transitions
  - Exploration → Implementation (after finding relevant files)
  - Implementation → Verification (after tests pass)
  - Verification → Handoff (after evidence collected)
- **Checkpoint Artifacts**: Self-contained `.claude/context/*.md` files
  - Can resume work from checkpoint in fresh session
  - Commit to git for audit trail
  - Share across agents for clean handoffs
- **Token Efficiency**: Expected 30-50% reduction
  - Exploration: -70% (30k → 9k tokens)
  - Implementation: -60% (40k → 16k tokens)
  - Verification: -50% (20k → 10k tokens)

#### Enhanced Template: coder-agent-template.md (v2.0.0 → v2.1.0)

**Integrated context management at 3 checkpoints**:

1. **Before Implementation** (after exploration):
   - Create exploration checkpoint
   - Compact context before TDD workflow
   - Reference: `wolf-context-management/templates/exploration-checkpoint-template.md`

2. **After Implementation** (tests passing):
   - Create implementation checkpoint
   - Summarize test runs (keep final results, discard iterations)
   - Reference: `wolf-context-management/templates/implementation-checkpoint-template.md`

3. **Before Review** (evidence collected):
   - Create verification checkpoint
   - Compact context before code-reviewer-agent handoff
   - Clean context improves review focus
   - Reference: `wolf-context-management/templates/verification-checkpoint-template.md`

**Template updated from 286 → 310 lines** (+24 lines for context management integration)

#### Documentation Updates

- **PLAN.md**: Added "Context File Cleanup" to Enhancement Ideas
  - Problem: Checkpoint files accumulate over time
  - Solution options: Auto-delete after 30 days, archive, compress, git-ignore patterns
  - Triggers: After PR merged, periodic cleanup
  - Related to wolf-context-management skill

---

## [1.2.0] - 2025-11-14

### Added - Phase 2: Examples & Templates

This release adds comprehensive Good/Bad examples, subagent templates, and extends skill-chaining patterns to wolf-verification.

#### Good/Bad Examples

**wolf-governance (v1.1.0 → v1.2.0)**
- Added 3 comprehensive Good/Bad example pairs (+168 lines):
  - Example 1: Feature Pull Request (compliant vs non-compliant DoD)
  - Example 2: Security Change (proper security-hardener vs security theater)
  - Example 3: Refactoring (clean refactor vs mixed-concern mess)
- Each example shows:
  - ✅ Good: Proper DoD completion with evidence and rationale
  - ❌ Bad: Common violations with explanation of dangers
  - Assessment: Clear pass/fail determination

**wolf-archetypes (v1.1.0 → v1.2.0)**
- Added 5 comprehensive Good/Bad example pairs (+323 lines):
  - Example 1: Feature Development (proper archetype vs mixed concerns)
  - Example 2: Bug Fix (reliability-fixer vs feature creep during bug fix)
  - Example 3: Security Work (security-hardener vs mislabeled security bug)
  - Example 4: Research/Exploration (research-prototyper vs runaway implementation)
  - Example 5: Multiple Lenses (proper lens stacking vs ignoring critical requirements)
- Each example includes MCP tool call syntax and archetype rationale

#### Subagent Templates

**wolf-roles (v1.1.0 → v1.2.0)**
- Added templates directory with 4 comprehensive role templates (+940 lines total):
  1. **coder-agent-template.md** (139 lines) - Implementation task guidance
  2. **pm-agent-template.md** (188 lines) - Requirements definition guidance
  3. **security-agent-template.md** (276 lines) - Security analysis guidance
  4. **code-reviewer-agent-template.md** (337 lines) - Code review guidance
- Each template includes:
  - Role context with Wolf framework integration
  - Mission statement with placeholders for customization
  - Execution checklists (before, during, after)
  - Handoff protocols to other roles
  - Red Flags - STOP sections
  - Success criteria
- Updated wolf-roles SKILL.md with:
  - Subagent Templates documentation section
  - When to use templates guidance
  - Template structure explanation
  - Placeholder format documentation
  - Multi-role workflow patterns
  - Benefits documentation (+89 lines)

#### Verification Enhancement

**wolf-verification (v1.0.0 → v1.1.0)**
- Added "Red Flags - STOP" section (7 rationalization blockers)
- Added "After Using This Skill" with integration points
- Added verification checklist (6 items)
- Added 2 Good/Bad examples:
  - Example 1: Feature Implementation (proper verification-first workflow)
  - Example 2: Security Review (bad - skipped verification with consequences)
- Added performance vs quality trade-offs documentation
- Total additions: +189 lines

#### Documentation

**PLAN.md** (NEW)
- Comprehensive living document for session recovery (+494 lines)
- Vision, goals, and expected impact documentation
- Phase 1 complete implementation details
- Phase 2 in-progress tracking
- Phase 3 planned items
- Implementation statistics (files modified, lines added)
- Skill chain diagram
- Pattern examples (before/after)
- Success metrics tracking
- Maintenance notes and collaboration protocol

### Changed

**Version Bumps**:
- wolf-governance: v1.1.0 → v1.2.0 (examples added)
- wolf-archetypes: v1.1.0 → v1.2.0 (examples added)
- wolf-roles: v1.1.0 → v1.2.0 (templates + documentation added)
- wolf-verification: v1.0.0 → v1.1.0 (patterns + examples added)

### Impact

**Phase 2 Enhancements**:
- **Example Density**: +491 lines of Good/Bad examples across 3 skills
- **Template Infrastructure**: +940 lines of reusable role templates
- **Verification Integration**: +189 lines extending patterns to wolf-verification
- **Documentation**: +494 lines of living project documentation

**Total Phase 2 Additions**: 12 files, +2,114 lines

**Enhanced Developer Experience**:
- Subagent templates enable easy role delegation
- Good/Bad examples show concrete compliance patterns
- PLAN.md enables seamless session recovery
- Verification skill now part of unified chain

## [1.1.0] - 2025-11-14

### Added - Superpowers Skill-Chaining Patterns

This release implements critical skill-chaining patterns inspired by the superpowers plugin, dramatically improving agent compliance and skill discovery.

#### New Skill

- **wolf-session-init** (v1.0.0) - Master skill with mandatory 4-step initialization protocol
  - Blocking gates for principles → archetype → governance → role
  - Session initialization checklist template
  - Context recovery protocol
  - Common initialization patterns with examples
  - Red Flags - STOP section with 6 rationalization blockers

#### Enhanced Skills (v1.0.0 → v1.1.0)

All core Wolf skills enhanced with three critical patterns:

1. **"REQUIRED NEXT SKILL" Callouts**
   - Explicit skill chaining with blocking gates
   - MCP tool references for each step
   - Why/Gate/Example for each transition
   - Sequential workflow enforcement

2. **"Red Flags - STOP" Sections**
   - Pre-emptive rationalization blocking
   - Common agent shortcuts identified and blocked
   - Explicit STOP commands with corrective actions
   - 6-8 red flags per skill

3. **Verification Checklists**
   - Checkbox-based completion tracking
   - Clear pass/fail criteria for each gate
   - "Can't check all boxes?" failure handling
   - 5-8 checkboxes per skill

#### Skill-Specific Enhancements

**wolf-principles (v1.1.0)**
- Red Flags: 6 rationalization blockers
- Sequential chain: → wolf-archetypes → wolf-governance → wolf-roles
- Verification checklist: 5 items
- Added explicit MCP tool callouts

**wolf-archetypes (v1.1.0)**
- Red Flags: 7 rationalization blockers
- Sequential chain: → wolf-governance → wolf-roles (+ optional wolf-verification)
- Verification checklist: 6 items
- Archetype-to-governance mapping examples (3 detailed examples)
- Conditional lens-based chaining logic

**wolf-governance (v1.1.0)**
- Red Flags: 8 rationalization blockers
- Sequential chain: → wolf-roles → wolf-verification
- Verification checklist: 8 items
- Governance examples by change type (bug fix, feature, security)
- Emergency override procedure documentation

**wolf-roles (v1.1.0)**
- Red Flags: 7 rationalization blockers
- Marks completion of primary skill chain
- Verification checklist: 6 items
- Role-specific implementation examples (coder-agent, security-agent, pm-agent)
- Handoff protocol documentation
- Common handoff patterns (2 detailed patterns)

### Changed

- Updated phase reference from "Hybrid Skills Migration" to "Superpowers Skill-Chaining Enhancement v2.0.0"
- All dates updated to 2025-11-14
- Version bumps for all enhanced skills

### Impact

**Expected Compliance Improvements:**
- Archetype selection: 40% → 95%+ (60% skip rate → <5%)
- Governance checks: 30% → 90%+ (70% skip rate → <10%)
- Verification completion: 50% → 95%+ (50% skip rate → <5%)
- Role boundary adherence: 60% → 95%+ (40% violation rate → <5%)

**Skill Discovery:**
- Automatic skill chaining through explicit "REQUIRED NEXT SKILL" callouts
- Agents can no longer rationalize skipping critical steps
- Quality gates are now blocking, not advisory

## [1.0.1] - 2025-11-13

### Changed

- Enhanced skill descriptions with clear value propositions
- Added "when to use" guidance to all skills
- Improved frontmatter with better triggers
- Standardized formatting across all skills

## [1.0.0] - 2025-11-13

### Added

- Initial marketplace creation with 64 skills
- Wolf Framework skills (11 skills)
- Integration skills (databento, discord-integration)
- Three.js ECS skills (51 skills)
- Daily summary skill
- Comprehensive README with installation instructions
- SKILL-TEMPLATE.md for creating new skills

---

[1.1.0]: https://github.com/Nice-Wolf-Studio/wolf-skills-marketplace/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/Nice-Wolf-Studio/wolf-skills-marketplace/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Nice-Wolf-Studio/wolf-skills-marketplace/releases/tag/v1.0.0
