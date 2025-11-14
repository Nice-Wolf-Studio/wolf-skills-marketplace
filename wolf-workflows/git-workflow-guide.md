# Git/GitHub Workflow Guide for Wolf Agents

**Purpose**: Comprehensive guide for proper Git/GitHub workflows in Wolf agent development.

**Audience**: Coder agents, code-reviewer agents, and all agents that interact with Git/GitHub.

---

## The 4 Golden Rules

### Rule 1: Never Commit to Default Branches

**Default branches**: `main`, `master`, `develop`, `production`

❌ **FORBIDDEN**:
```bash
git checkout main
git commit -m "Add feature"  # WRONG
git push origin main         # FORBIDDEN
```

✅ **CORRECT**:
```bash
# Check what default branch is called
gh repo view --json defaultBranch -q .defaultBranch

# Create feature branch
git checkout -b feature/my-feature

# Make changes, commit
git commit -m "Add feature"

# Push to feature branch
git push origin feature/my-feature

# Create PR using gh CLI (preferred)
gh pr create --draft
```

**Why**: Default branches are protected. Direct commits bypass review, break CI/CD, and violate team workflow.

---

### Rule 2: Draft PR at Task Start (Not Task End)

**Traditional approach** (WRONG):
```
Code → Test → Verify → Create PR
```

**Wolf approach** (CORRECT):
```
Create Draft PR → Code → Test → Verify → Mark "Ready for review"
```

**Implementation**:
```bash
# 1. Check for project PR template FIRST
if [ -f .github/PULL_REQUEST_TEMPLATE.md ]; then
  echo "Project has PR template, will use it"
  # gh pr create automatically uses template if it exists
fi

# 2. Create draft PR at task start
gh pr create --draft \
  --title "[DRAFT] feature/my-feature: Add JWT refresh tokens" \
  --body "$(cat <<'EOF'
## Status
🚧 Work in Progress - NOT ready for review

## Requirements
- [Link to requirements doc]
- Acceptance criteria:
  - [ ] Criterion 1
  - [ ] Criterion 2

## Progress
- [ ] Exploration
- [ ] Implementation
- [ ] Testing
- [ ] Verification

**Will mark ready for review after verification complete.**
EOF
)"

# 3. Work on feature (commit regularly to PR branch)
git commit -m "Add refresh token generation"
git push

# 4. After verification complete, mark ready
gh pr ready
```

**Why**:
- Signals to team what you're working on
- Prevents duplicate work
- Enables early feedback
- Creates paper trail from task start

---

### Rule 3: Code Reviewers Suggest, Don't Edit

**During Active PR Review**:
- ❌ Make changes to PR branch
- ❌ Push commits
- ✅ Post review comments with suggestions
- ✅ Use GitHub suggestion syntax

**Example review comment with suggestion**:
```markdown
This function should handle null values.

```suggestion
if (!data) {
  throw new Error('Data is required');
}
const result = data.map(item => item.value * 2);
\```

This prevents the crash on line 45 when data is undefined.
```

**Pre-Review Improvements** (with approval):
```bash
# ALWAYS ask first
echo "I found 3 issues:"
echo "1. Missing null check in parseData()"
echo "2. Unused import on line 12"
echo "3. Test coverage gap for error path"
echo ""
echo "Approve fixes? (yes/no)"
read approval

if [ "$approval" = "yes" ]; then
  # Make fixes
  # Commit with gh (preferred over git)
  git add .
  git commit -m "Fix null check and remove unused import"

  # Push using git (no gh equivalent)
  git push
else
  echo "Will post suggestions in PR comments instead"
  gh pr comment {pr-number} --body "Suggested fixes: [details]"
fi
```

**Why**:
- Maintains clear ownership (reviewer reviews, author implements)
- Prevents confusion about who changed what
- Respects PR author's coding style choices
- Enables learning (author implements suggestions)

---

### Rule 4: Git Issues → Read GitHub Skills → Try `gh auth switch`

**Common issues**:
- Authentication errors
- Permission denied
- Protected branch violations

**Solution path**:
1. **Read github skills** (comprehensive troubleshooting)
2. **Try**: `gh auth switch`
3. **Verify**: `gh auth status`

**Never**:
- Force push without approval
- Bypass protection rules
- Assume you have permission

---

## Detailed Workflows

### Workflow 1: Starting a New Task (Coder Agent)

#### Step 1: Check for Project Conventions

**BEFORE creating branch or PR, check for project-specific conventions:**

```bash
# Check for PR template
if [ -f .github/PULL_REQUEST_TEMPLATE.md ]; then
  echo "✅ PR template found, will be used automatically"
  cat .github/PULL_REQUEST_TEMPLATE.md
fi

# Check for branch naming convention
if [ -f .github/BRANCH_NAMING.md ]; then
  echo "✅ Branch naming convention found"
  cat .github/BRANCH_NAMING.md
elif [ -f CONTRIBUTING.md ]; then
  echo "✅ Check CONTRIBUTING.md for conventions"
  grep -i "branch\|naming" CONTRIBUTING.md
fi

# Check for commit message convention
if [ -f .github/COMMIT_CONVENTION.md ]; then
  echo "✅ Commit convention found"
  cat .github/COMMIT_CONVENTION.md
elif [ -f .gitmessage ]; then
  echo "✅ Commit template found"
  cat .gitmessage
fi
```

**Default conventions** (if no project-specific ones exist):
- Branch naming: `feature/{task-slug}` or `fix/{issue-number}`
- PR title: `[DRAFT] {Feature title}`
- Commit messages: Descriptive, imperative mood

**Prefer project conventions over defaults**. Always check first.

---

#### Step 2: Create Feature Branch

```bash
# Get default branch name (prefer gh CLI)
default_branch=$(gh repo view --json defaultBranch -q .defaultBranch)
echo "Default branch: $default_branch"

# Ensure you're up to date with default branch
git checkout $default_branch
git pull origin $default_branch

# Create feature branch (use project convention or default)
# Default: feature/{task-slug} or fix/{issue-number}
git checkout -b feature/jwt-refresh-tokens
```

**Branch naming conventions** (respect project patterns):
- Feature: `feature/jwt-refresh`, `feat/user-auth`, `features/JIRA-123`
- Bugfix: `fix/null-pointer`, `bugfix/issue-456`, `hotfix/security-patch`
- Refactor: `refactor/api-cleanup`, `refactor/TECH-789`

---

#### Step 3: Create Draft PR Immediately

**Use gh CLI** (preferred over git or web UI):

```bash
# Create draft PR
# - Uses .github/PULL_REQUEST_TEMPLATE.md if it exists
# - Opens editor for title/body if not provided
gh pr create --draft \
  --title "[DRAFT] Add JWT refresh token support" \
  --body "$(cat <<'EOF'
## Status
🚧 Work in Progress

## Requirements
- Link: [requirements doc]
- Acceptance Criteria:
  - [ ] Refresh tokens issued on expiration
  - [ ] Tokens rotated on use
  - [ ] Old tokens invalidated

## Progress
- [ ] Exploration phase
- [ ] Implementation (TDD)
- [ ] Testing
- [ ] Verification

**Will mark ready after verification complete.**
EOF
)"

# Get PR number
pr_number=$(gh pr view --json number -q .number)
echo "Draft PR created: #$pr_number"
```

**What if project has PR template?**
- `gh pr create` automatically uses `.github/PULL_REQUEST_TEMPLATE.md`
- Template overwrites `--body` parameter
- Just run: `gh pr create --draft --title "[DRAFT] {title}"`

---

#### Step 4: Work on Feature (Commit Regularly)

```bash
# Make changes
# ... (TDD workflow: write test, watch fail, implement, refactor)

# Stage changes
git add src/auth/jwt.ts tests/auth/jwt.test.ts

# Commit with descriptive message
# Check project convention first!
git commit -m "Add refresh token generation with rotation"

# Push to PR branch (updates draft PR)
git push origin feature/jwt-refresh-tokens

# Or simply (git knows tracking branch):
git push
```

**Commit message guidelines** (if no project convention):
- Imperative mood: "Add feature" not "Added feature"
- Clear and descriptive
- Reference issue if applicable: "Fix #123: Handle null in parseData"

---

#### Step 5: Mark PR Ready After Verification

```bash
# After verification complete (all tests pass, evidence collected)
# Mark draft PR as ready for review
gh pr ready

# Or specify PR number
gh pr ready 123

# PR automatically moves from "Draft" to "Open" state
# Reviewers are notified
```

**Don't use**: `gh pr edit --ready` (incorrect command)

---

### Workflow 2: Code Review (Reviewer Agent)

#### Step 0: Determine Review Context (MANDATORY)

**BEFORE doing anything, determine context:**

```bash
# Get PR details
gh pr view {pr-number}

# Check PR description for review request
# Check user message for explicit delegation

# If PR description says "Please review" → Context A (suggest)
# If user says "Fix these issues" → Context B (edit with approval)
# When in doubt → Context A (default)
```

**Context A: Active PR Review** (most common)
**Context B: Pre-Review Improvements** (requires approval)

---

#### Step 1A: Review Code (Context A - Suggest Only)

**Actions allowed**:
```bash
# 1. Checkout PR branch to review locally (optional)
gh pr checkout {pr-number}

# 2. Read code, identify issues
# ... (use Read tool, analyze code)

# 3. Post review comments with suggestions
gh pr comment {pr-number} --body "$(cat <<'EOF'
## Review Feedback

### Issue 1: Missing null check (line 45)

Current code:
\```typescript
const result = data.map(item => item.value * 2);
\```

Suggestion:
\```suggestion
if (!data || !Array.isArray(data)) {
  throw new Error('Data must be a non-empty array');
}
const result = data.map(item => item.value * 2);
\```

This prevents crashes when data is undefined or not an array.

### Issue 2: Test coverage gap

Missing test for error path when token is expired. Please add test case.
EOF
)"

# 4. Submit review
gh pr review {pr-number} --request-changes --body "Found 2 issues, see comments"
```

**Actions FORBIDDEN**:
```bash
# ❌ DO NOT make changes to code
# ❌ DO NOT commit to PR branch
# ❌ DO NOT push
```

---

#### Step 1B: Fix Issues (Context B - With Approval)

**ALWAYS ask first**:
```bash
echo "I found 3 issues:"
echo "1. Missing null check in parseData() (line 45)"
echo "2. Unused import on line 12"
echo "3. Test coverage gap for error path"
echo ""
echo "Approve fixes? (yes/no)"
```

**If approved**:
```bash
# 1. Checkout PR branch
gh pr checkout {pr-number}

# 2. Make approved fixes
# ... (edit code)

# 3. Commit with descriptive message
git add .
git commit -m "Fix null check and remove unused import per review feedback"

# 4. Push (updates PR)
git push

# 5. Comment on PR
gh pr comment {pr-number} --body "Applied approved fixes. Ready for re-review."
```

**If not approved**:
```bash
# Post suggestions instead
gh pr comment {pr-number} --body "[suggestions using Context A approach]"
```

---

### Workflow 3: Handling Git Issues

#### Issue 1: Authentication Failed

**Symptoms**:
```
fatal: Authentication failed for 'https://github.com/...'
remote: Invalid username or password
```

**Solution**:
```bash
# 1. Check current auth status
gh auth status

# Expected output:
# ✓ Logged in to github.com as username (oauth)
# ✓ Git operations: configured
# ✓ Token: *******************

# 2. If not authenticated or wrong account, switch
gh auth switch

# 3. Or login fresh
gh auth login

# 4. Verify it works
gh auth status
gh repo view

# 5. Try operation again
git push origin feature-branch
```

---

#### Issue 2: Permission Denied (SSH)

**Symptoms**:
```
Permission denied (publickey)
fatal: Could not read from remote repository
```

**Solution**:
```bash
# 1. Check auth status
gh auth status

# 2. Switch to HTTPS if SSH failing
git remote set-url origin https://github.com/username/repo.git

# 3. Or fix SSH keys
gh ssh-key add ~/.ssh/id_ed25519.pub --title "My Machine"

# 4. Test connection
ssh -T git@github.com
```

---

#### Issue 3: Protected Branch Error

**Symptoms**:
```
! [remote rejected] main -> main (protected branch hook declined)
error: failed to push some refs to 'https://github.com/...'
```

**Solution**:
```bash
# 1. Check current branch
current_branch=$(git branch --show-current)
echo "Current branch: $current_branch"

# 2. If on main/master → YOU'RE ON WRONG BRANCH
if [ "$current_branch" = "main" ] || [ "$current_branch" = "master" ]; then
  echo "❌ ERROR: You're on default branch!"
  echo "✅ Creating feature branch..."

  # Create feature branch from current changes
  git checkout -b feature/my-feature

  # Push to feature branch
  git push origin feature/my-feature

  # Create PR
  gh pr create --draft
else
  echo "Branch is correct, but push failed for other reason"
  gh auth status
fi
```

**NEVER**:
- `git push --force` to default branches
- `git push --no-verify` to bypass hooks
- Ask user to disable branch protection

---

#### Issue 4: PR Template Not Appearing

**Symptoms**:
- Created PR but template didn't fill in
- Missing sections from `.github/PULL_REQUEST_TEMPLATE.md`

**Solution**:
```bash
# Check if template exists
if [ -f .github/PULL_REQUEST_TEMPLATE.md ]; then
  echo "Template exists"

  # Manual application if gh didn't use it
  template=$(cat .github/PULL_REQUEST_TEMPLATE.md)

  # Edit PR body
  gh pr edit {pr-number} --body "$template"
else
  echo "No template found in .github/"
fi
```

---

## Red Flags - STOP 🛑

### For Coder Agents

- ❌ **On main/master/develop branch** → Switch to feature branch NOW
- ❌ **No draft PR created** → Create it before next commit
- ❌ **Ready to merge but no PR** → Create PR, request review
- ❌ **Force pushing** → Only with explicit user approval
- ❌ **Ignoring project conventions** → Check `.github/` first
- ❌ **Using git when gh available** → Prefer `gh pr create`, `gh pr ready`, `gh auth status`

### For Reviewer Agents

- ❌ **Editing code during active review** → Suggest in comments
- ❌ **Pushing to PR branch** → Only with explicit approval
- ❌ **Assuming permission** → Always ask first
- ❌ **Bypassing user approval** → Even in bypass mode, ASK
- ❌ **Using git when gh available** → Prefer `gh pr review`, `gh pr comment`, `gh pr merge`

---

## Prefer `gh` CLI Over `git`

**Why**: `gh` CLI is GitHub-aware, respects conventions, and provides better UX.

### PR Operations

❌ **Don't use git/web**:
```bash
# Creating PR via web UI (manual, slow)
git push && open https://github.com/org/repo/compare/feature...main
```

✅ **Use gh CLI**:
```bash
gh pr create --draft --title "..." --body "..."
gh pr ready
gh pr review 123 --approve
gh pr merge 123 --squash
```

### Repository Operations

❌ **Don't manually construct URLs**:
```bash
open https://github.com/$OWNER/$REPO
```

✅ **Use gh CLI**:
```bash
gh repo view --web
gh pr view --web
gh issue view 123 --web
```

### Authentication

❌ **Don't use git credential manager directly**:
```bash
git config --global credential.helper manager
```

✅ **Use gh CLI**:
```bash
gh auth login
gh auth switch
gh auth status
```

### Checking PR Status

❌ **Don't parse git log or GitHub API**:
```bash
curl -H "Authorization: token $TOKEN" https://api.github.com/repos/$OWNER/$REPO/pulls
```

✅ **Use gh CLI**:
```bash
gh pr list
gh pr status
gh pr view 123 --json state,title,author
```

---

## Project Convention Examples

### Example 1: Custom Branch Naming

**File**: `.github/BRANCH_NAMING.md`
```markdown
# Branch Naming Convention

- Features: `feat/JIRA-123-description`
- Bugs: `bug/JIRA-456-description`
- Hotfixes: `hotfix/JIRA-789-description`
```

**Agent behavior**:
```bash
# Read convention
if [ -f .github/BRANCH_NAMING.md ]; then
  # Use project convention
  git checkout -b feat/JIRA-123-jwt-refresh
else
  # Use default
  git checkout -b feature/jwt-refresh
fi
```

### Example 2: Custom PR Template

**File**: `.github/PULL_REQUEST_TEMPLATE.md`
```markdown
## Summary
<!-- Brief description -->

## Jira Ticket
<!-- Link to JIRA ticket -->

## Type of Change
- [ ] Feature
- [ ] Bugfix
- [ ] Refactor

## Checklist
- [ ] Tests added
- [ ] Docs updated
```

**Agent behavior**:
```bash
# gh pr create automatically uses template
gh pr create --draft --title "[DRAFT] Add JWT refresh"
# Template is automatically filled in, agent just adds specifics
```

### Example 3: Custom Commit Convention

**File**: `.gitmessage`
```
[JIRA-XXX] Short summary

Detailed description:
-
-

Tested:
-
```

**Agent behavior**:
```bash
# Check for commit template
if [ -f .gitmessage ]; then
  git config commit.template .gitmessage
  # Commit opens editor with template
  git commit
else
  # Use standard format
  git commit -m "Add JWT refresh token support"
fi
```

---

## Success Criteria

✅ **All code in feature branches**
- Never commit to main/master/develop
- Always create feature branch first

✅ **Draft PR created at task start**
- Not at task end
- Signals work in progress

✅ **Regular commits pushed to PR branch**
- Keeps PR up to date
- Shows progress

✅ **PR marked "Ready for review" after verification**
- Not before verification complete
- Only when Definition of Done met

✅ **Code reviewer suggests changes in comments**
- Uses GitHub suggestion syntax
- Doesn't edit code without approval

✅ **PR author implements suggestions**
- Clear ownership maintained
- Learning opportunity

✅ **Clean merge to default branch after review approval**
- Via gh pr merge, not manual git merge
- Squash or merge based on project convention

**Violations = Immediate failure, regardless of code quality.**

---

## Quick Reference

### Coder Agent Checklist

Before starting:
- [ ] Check for project conventions (`.github/`, CONTRIBUTING.md)
- [ ] Create feature branch (respect naming convention)
- [ ] Create draft PR immediately (use `gh pr create --draft`)
- [ ] Verify not on default branch (`git branch --show-current`)

During work:
- [ ] Commit regularly with descriptive messages
- [ ] Push to PR branch to keep it updated
- [ ] Follow TDD workflow

After verification:
- [ ] Mark PR ready (`gh pr ready`)
- [ ] Request review from code-reviewer-agent
- [ ] DO NOT merge own PR

### Code Reviewer Agent Checklist

Before reviewing:
- [ ] Determine context (suggest vs edit with approval)
- [ ] Default to Context A (suggest only)

During review (Context A):
- [ ] Checkout PR (`gh pr checkout {n}`)
- [ ] Identify issues
- [ ] Post comments with suggestions (`gh pr comment`)
- [ ] Use suggestion syntax in comments
- [ ] Submit review (`gh pr review`)
- [ ] DO NOT edit code

If asked to fix (Context B):
- [ ] Ask for approval FIRST
- [ ] Only proceed if explicitly approved
- [ ] Make changes, commit, push
- [ ] Comment on PR with what was fixed

---

*Version: 1.0.0*
*Part of Wolf Skills Marketplace v2.2.0*
*Related: coder-agent-template.md, code-reviewer-agent-template.md, wolf-governance*
