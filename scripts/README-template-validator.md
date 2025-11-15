# Template Validation Tool

## Overview

Validates consistency of role and workflow templates (frontmatter, required sections, placeholders, versioning).

## Usage

```bash
# Validate all templates
ts-node template-validator.ts

# Verbose mode (show all checks)
ts-node template-validator.ts --verbose

# Help
ts-node template-validator.ts --help
```

## Validation Rules

### Structure Validation
- ✅ Template footer with version info
- ✅ Role name in footer (role templates only)
- ✅ Red Flags section present
- ✅ Success Criteria section present

### Content Validation
- ✅ Placeholders well-formed (`{UPPER_CASE}`)
- ✅ Required sections for template type

### Required Sections

**Role Templates**:
- Your Mission
- Role Context (Loaded via wolf-roles)
- Wolf Framework Context
- Red Flags - STOP
- Success Criteria

**Workflow Templates**:
- Workflow Overview
- Agents Involved
- Red Flags - STOP
- Success Criteria

## Pattern Application

### Pure Functions (80%)
13 validation rules as pure functions:
- `extractTemplateVersion()`, `extractRoleName()`, `extractMarketplaceVersion()`
- `has SectionHeading()`, `findPlaceholders()`
- `validateFooter()`, `validateRoleFooter()`, `validatePlaceholders()`
- `validateRedFlags()`, `validateSuccessCriteria()`, `validateRequiredSections()`

**Benefits**: 100% testable without file system mocks

### Vertical Slice (Validation Types)
Organized by validation concern:
- **Structure Slice**: Footer, sections, format
- **Content Slice**: Placeholders, required sections
- **Consistency Slice**: Cross-template checks (future)

**Benefits**: Easy to find/add rules, can run slices independently

## Testing

```bash
npm test template-validator.test.ts
```

**Coverage**: 13 validation rules, 35+ test cases, zero mocks
