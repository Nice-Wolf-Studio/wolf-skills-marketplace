# Exploration Summary - {FEATURE_NAME}

**Date**: {YYYY-MM-DD}
**Phase**: Exploration → Implementation
**Archetype**: {archetype-name}

---

## Relevant Files Identified

### Primary Files (Will Modify)

1. **`{file-path}`** (lines {start}-{end})
   - **Purpose**: {What this file does}
   - **Relevance**: {Why it's relevant to this task}
   - **Key APIs/Patterns**: {Important functions, classes, or patterns}
   - **Dependencies**: {What it imports or requires}

2. **`{file-path}`** (lines {start}-{end})
   - **Purpose**: {Description}
   - **Relevance**: {Why relevant}
   - **Key APIs/Patterns**: {Details}

### Related Files (Reference Only)

3. **`{file-path}`** (full file or lines {X}-{Y})
   - **Purpose**: {What it does}
   - **Relationship**: {How it relates to primary files}
   - **Key Takeaway**: {What you learned from it}

---

## Key Findings

### Current State
{Describe how the feature/system currently works}

**Example**:
- Current auth uses JWT with 1h expiration
- No refresh token mechanism exists
- Middleware validates on every request

### Gap Identified
{What's missing, broken, or needs improvement}

**Example**:
- Users logged out after 1h (poor UX)
- No way to extend session without re-login
- Security risk: tokens can't be revoked

### Pattern to Follow
{Existing patterns in codebase to maintain consistency}

**Example**:
- Middleware pattern already established in `/src/auth/middleware.ts`
- Use existing JWT library (jsonwebtoken)
- Follow response header convention for tokens

### Testing Strategy
{How you plan to test this feature}

**Example**:
- TDD: Write expiration test first
- Integration test: Full auth flow with refresh
- Edge cases: Invalid refresh token, rotation

---

## Architecture Understanding

{Brief description of relevant architecture - can use ASCII diagrams}

**Current Architecture**:
```
Request → Middleware → JWT Validation → Route Handler
                ↓ (if invalid)
              401 Response
```

**Proposed Architecture**:
```
Request → Middleware → JWT Validation → Check Expiry → Route Handler
                ↓                           ↓ (if expired)
              401                     Issue Refresh Token
                                            ↓
                                      Rotate Old Token
```

### Key Components
- **{Component 1}**: {What it does}
- **{Component 2}**: {What it does}

### Data Flow
1. {Step 1}
2. {Step 2}
3. {Step 3}

### Dependencies
- **External**: {Libraries, APIs, services}
- **Internal**: {Other modules this depends on}

---

## Ready for Implementation

### Files to Modify

1. **`{file-path}`**
   - **Change**: {What you'll change}
   - **Why**: {Rationale}
   - **Estimated Lines**: +{add} -{remove}

2. **`{file-path}`**
   - **Change**: {Description}

### Tests to Add

1. **Test**: {Test description}
   - **Type**: Unit / Integration / E2E
   - **File**: `{test-file-path}`
   - **Covers**: {What it validates}

2. **Test**: {Test description}
   - **Type**: {Type}

### Patterns to Follow

1. **{Pattern Name}**
   - **Description**: {How it works}
   - **Example Location**: `{file}:{lines}`
   - **Apply To**: {Where you'll use it}

2. **{Pattern Name}**
   - **Description**: {Details}

### Edge Cases to Consider

- **{Edge Case 1}**: {Description and how to handle}
- **{Edge Case 2}**: {Description}
- **{Edge Case 3}**: {Description}

---

## Wolf Framework Context

### Archetype
**Archetype**: {archetype-name}

**Why This Archetype**:
- {Reason this archetype was selected}

**Archetype Priorities**:
1. {Priority 1}
2. {Priority 2}

### Lenses Applied
- **{Lens Name}** (if applicable): {Why applied, what it requires}

### Acceptance Criteria

From requirements/PM:

- [ ] {Acceptance criterion 1}
- [ ] {Acceptance criterion 2}
- [ ] {Acceptance criterion 3}

### Definition of Done (Wolf Governance)

**MUST Have** (from wolf-governance):
- [ ] All tests passing
- [ ] Code review approved
- [ ] Documentation updated
- [ ] Journal entry created
- [ ] CI/CD checks green

**Archetype-Specific** (from {archetype}):
- [ ] {Archetype-specific requirement 1}
- [ ] {Archetype-specific requirement 2}

---

## Exploration Notes

### Search Queries Used
{Document what searches led you here - helps if need to re-explore}

- `{grep/glob pattern}` → Found {result}
- `{search query}` → Led to {file/doc}

### Dead Ends (Don't Re-Explore)
{Document what you explored that wasn't relevant - saves time}

- **`{file-path}`**: Looked promising but is deprecated
- **{Approach}**: Tried but doesn't fit our use case

### External Resources
{Documentation, Stack Overflow, examples consulted}

- **{Resource Name}**: {URL} - Key takeaway: {summary}
- **{Resource Name}**: {URL} - {Why relevant}

---

## Next Steps

**Immediate Next Actions**:
1. {Action 1 - e.g., "Create branch: feature/jwt-refresh"}
2. {Action 2 - e.g., "Write first test in `tests/auth/jwt.test.ts`"}
3. {Action 3 - e.g., "Implement refresh token generation in `src/auth/jwt.ts`"}

**Blockers** (if any):
- {Blocker 1}: {What's blocking and how to resolve}

**Questions for Review**:
- {Question 1 that might need architect/PM input}

---

## Exploration Complete

**Status**: ✅ Ready for TDD implementation

**Confidence Level**: {High/Medium/Low}
- If Low: {What's uncertain and why}

**Estimated Effort**: {X} hours

**Recommended Next Skill**: superpowers:test-driven-development

---

*Checkpoint Created*: {YYYY-MM-DD HH:MM}
*Agent*: coder-agent
*Can Resume Work From This Checkpoint*: Yes / No (if No, explain what's missing)
