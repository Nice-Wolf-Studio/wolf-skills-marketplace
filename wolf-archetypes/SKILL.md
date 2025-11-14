---
name: wolf-archetypes
description: Use when starting new work or classifying issues - automatically selects behavioral archetype from 11 profiles (product-implementer, security-hardener, perf-optimizer, etc.) and applies overlay lenses; ensures agents adapt their priorities and evidence requirements to work type
version: 1.0.1
triggers:
  - "select archetype"
  - "behavioral profile"
  - "work type classification"
  - "agent behavior adaptation"
  - "overlay lens application"
  - "evidence requirements"
---

# Wolf Archetypes Skill

This skill provides Wolf's behavioral archetype system that automatically adapts agent behavior based on work type. The system includes 11 core archetypes and 4 overlay lenses, refined over 50+ phases of development.

## When to Use This Skill

- **REQUIRED** at the start of any new work item
- When GitHub issue labels change
- For work type classification and prioritization
- When determining evidence requirements
- For applying specialized quality gates

## The 11 Behavioral Archetypes

### 1. product-implementer
**Triggers**: `feature`, `enhancement`, `user-story`
**Priorities**: Delivery speed, user value, completeness
**Evidence Required**: Acceptance criteria met, tests pass, documentation updated
**Use When**: Building new features or enhancing existing functionality

### 2. security-hardener
**Triggers**: `security`, `auth`, `crypto`, `vulnerability`
**Priorities**: Threat reduction, defense-in-depth, least privilege
**Evidence Required**: Threat model, security scan results, penetration test outcomes
**Use When**: Security-sensitive work requiring specialized threat analysis

### 3. perf-optimizer
**Triggers**: `perf`, `performance`, `optimization`, `slow`
**Priorities**: Latency reduction, throughput increase, resource efficiency
**Evidence Required**: Baseline metrics, post-change metrics, performance budgets
**Use When**: Performance work requiring measurement-driven approach

### 4. reliability-fixer
**Triggers**: `bug`, `regression`, `hotfix`, `incident`
**Priorities**: Root cause analysis, prevention, stability
**Evidence Required**: Root cause documented, tests prevent recurrence, monitoring added
**Use When**: Bug fixes requiring systematic analysis and prevention

### 5. research-prototyper
**Triggers**: `spike`, `research`, `explore`, `prototype`
**Priorities**: Learning, hypothesis validation, risk reduction
**Evidence Required**: Findings documented, recommendations provided, risks identified
**Use When**: Exploration work needing timeboxing and validation

### 6. repository-hygienist
**Triggers**: `hygiene`, `cleanup`, `dependencies`, `gitignore`
**Priorities**: Maintainability, consistency, prevention
**Evidence Required**: Before/after metrics, automation added, recurrence prevented
**Use When**: Repository maintenance requiring systematic cleanup

### 7. accessibility-champion
**Triggers**: `a11y`, `accessibility`, `wcag`, `inclusive-design`
**Priorities**: WCAG compliance, inclusive design, usability
**Evidence Required**: WCAG audit results, screen reader validation, keyboard navigation tests
**Use When**: Accessibility work requiring domain expertise

### 8. data-contract-steward
**Triggers**: `schema`, `migration`, `api`, `contract`, `breaking-change`
**Priorities**: Backward compatibility, safe migration, version management
**Evidence Required**: Migration plan, compatibility matrix, rollback procedure
**Use When**: Contract changes requiring compatibility planning

### 9. platform-gardener
**Triggers**: `infrastructure`, `ci-cd`, `build-system`, `platform`
**Priorities**: Developer productivity, system reliability, automation
**Evidence Required**: Productivity metrics, uptime stats, automation coverage
**Use When**: Platform work affecting team productivity

### 10. maintainability-refactorer
**Triggers**: `refactor`, `tech-debt`, `code-quality`, `patterns`
**Priorities**: Code clarity, pattern consistency, future-proofing
**Evidence Required**: Complexity reduction metrics, test coverage maintained, behavior unchanged
**Use When**: Refactoring requiring discipline to avoid behavior changes

### 11. ai-assist-conductor
**Triggers**: `ai-assist`, `prompt-engineering`, `model-coordination`
**Priorities**: Human oversight, validation, prompt optimization
**Evidence Required**: Human review completed, outputs validated, prompts documented
**Use When**: AI-assisted work requiring human validation

## The 4 Overlay Lenses

Lenses can be applied on top of any archetype to add specialized requirements:

### 🎯 Performance Lens
**Requirements**:
- Measurement before and after changes
- Performance budgets defined
- Benchmarks documented

**Evidence**:
- Baseline metrics captured
- Post-change metrics validated
- p95 latency targets met

**Apply When**: Work impacts system performance or has latency requirements

### 🔒 Security Lens
**Requirements**:
- Threat modeling completed
- Security validation performed
- Defense-in-depth applied

**Evidence**:
- Threat analysis documented
- Security scan results clean
- Penetration test passed

**Apply When**: Work touches authentication, authorization, data protection, or crypto

### ♿ Accessibility Lens
**Requirements**:
- WCAG compliance checked
- Inclusive design principles followed
- Screen reader support verified

**Evidence**:
- WCAG audit results documented
- Keyboard navigation tested
- Screen reader validation completed

**Apply When**: Work involves UI/UX or user-facing features

### 📊 Observability Lens
**Requirements**:
- Logging implemented
- Metrics collected
- Distributed tracing enabled

**Evidence**:
- Log coverage adequate
- Metric dashboards created
- Trace examples provided

**Apply When**: Work involves distributed systems or debugging requirements

## Archetype Selection Process

1. **Primary Selection**: Based on GitHub issue labels (first match wins)
   - Security labels → `security-hardener`
   - Performance labels → `perf-optimizer`
   - Bug labels → `reliability-fixer`
   - Feature labels → `product-implementer` (default)

2. **File-Based Triggers**: Secondary selection based on files modified
   - `**/auth/**` → `security-hardener`
   - `**/benchmark/**` → `perf-optimizer`
   - `.github/workflows/**` → `platform-gardener`

3. **Confidence Overrides**:
   - Low confidence (<5/10) → Force `research-prototyper`
   - High risk (multiple risk labels) → Upgrade to `reliability-fixer`

4. **Lens Application**: Stack lenses based on additional requirements
   - Can combine multiple lenses (e.g., security + performance)
   - Lenses add requirements, don't replace archetype

## How to Use Archetypes

### Automatic Selection
```javascript
// Based on GitHub labels
const labels = ['feature', 'security', 'performance'];
const archetype = selectArchetype(labels);
// Returns: 'security-hardener' (security takes precedence)
```

### Manual Override
```javascript
// Force specific archetype for special cases
const archetype = forceArchetype('research-prototyper', 'Unknown territory');
```

### With Lenses
```javascript
// Apply multiple lenses to an archetype
const profile = {
  archetype: 'product-implementer',
  lenses: ['performance', 'accessibility']
};
```

## Archetype Combinations

When multiple labels are present:

- **Security + Performance**: Primary = `security-hardener`, add performance evidence
- **Bug + Performance**: Primary = `reliability-fixer`, add performance checks
- **Refactor + Features**: Reject - should be separate PRs

## Anti-Patterns to Avoid

### ❌ Cowboy Coder
- Skips process and quality gates
- Large PRs without justification (>500 lines)
- Missing tests on logic changes
- Bypasses required checks

**Prevention**: Archetype system enforces gates

### ❌ Analysis Paralysis
- Over-researching simple problems
- Excessive documentation for trivial changes
- Delayed delivery without value

**Prevention**: Time-boxed research archetypes

## Scripts Available

- `select.js` - Automatically select archetype based on labels/context
- `compose.js` - Combine archetype with overlay lenses
- `validate.js` - Validate work against archetype requirements

## Integration with Other Skills

- **wolf-principles**: Archetypes implement core principles
- **wolf-roles**: Each role adapts behavior per archetype
- **wolf-governance**: Archetypes enforce governance rules

---

*Source: agents/archetypes/registry.yml, README.md*
*Last Updated: 2025-10-19*
*Phase: Hybrid Skills Migration*

## Changelog

### 1.0.1 (2025-11-14)
- Enhanced frontmatter with specific trigger keywords
- Improved description to emphasize automatic behavioral adaptation
- Added evidence requirements to triggers list