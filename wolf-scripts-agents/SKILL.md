---
name: wolf-scripts-agents
description: Use when coordinating multiple agents or managing workflows - provides agent orchestration patterns including unified executor interface, multi-phase workflow management with lens integration, file scope enforcement, async mailbox communication, and structured signal parsing for agent handoffs
version: 1.0.1
category: agent-coordination
triggers:
  - "agent orchestration"
  - "multi-agent workflows"
  - "workflow coordination"
  - "agent handoffs"
  - "scope enforcement"
  - "mailbox communication"
dependencies:
  - wolf-roles
  - wolf-archetypes
  - wolf-governance
size: large
---

# Wolf Scripts - Agent Coordination

Agent coordination patterns that power Wolf's multi-agent orchestration system. These scripts manage agent lifecycles, workflow handoffs, and cross-agent collaboration.

## Overview

This skill captures **agent coordination and orchestration patterns**:

1. **Agent Executor** - Unified interface for invoking agent binaries
2. **Workflow Orchestrator** - Multi-phase, multi-agent workflow management
3. **Agent Change Validator** - Enforces agent file scope boundaries
4. **Mailbox System** - Async inter-agent communication
5. **Work Claimer** - Agent work assignment and claim management

## 🤖 Agent Executor Pattern

### Purpose
Provides unified interface for invoking real agent binaries (codex, claude-code, custom) with structured output parsing and timeout management.

### Features
- **Multi-backend Support**: codex, claude-code, custom binaries
- **Non-interactive Execution**: `--cwd` and `--prompt-file` for automation
- **Structured Signal Parsing**: `AGENT_RESPONSE_ID`, `AGENT_CREATED_ISSUE_URL`, etc.
- **Timeout Management**: Configurable execution timeouts
- **Error Handling**: Robust error capture and reporting

### Configuration
```javascript
const executor = new AgentExecutor({
  agentBinary: 'codex',          // or 'claude-code', '/path/to/custom'
  timeout: 300000,                // 5 minutes default
  captureOutput: true,            // Capture stdout/stderr
  parseSignals: true,             // Parse structured signals
  env: { ... },                   // Custom environment variables
  executionDir: '/path/to/repo', // Working directory
  verbose: false,                 // Logging verbosity
  logPrefix: '[agent-executor]'  // Log message prefix
});
```

### Execution Parameters
```javascript
const result = await executor.executeAgent({
  cwd: '/path/to/repo',          // Working directory for agent
  promptFile: '/path/to/prompt.md', // Prompt file path
  command: 'run',                 // Agent command (run, create-issue, etc.)
  args: { ... },                  // Additional command arguments
  id: 'unique-request-id'         // Request ID for tracking
});
```

### Structured Signals
Agent output is parsed for special signals:
- `AGENT_RESPONSE_ID`: Unique response identifier
- `AGENT_CREATED_ISSUE_URL`: URL of created issue
- `AGENT_CREATED_PR_URL`: URL of created PR
- `AGENT_STATUS`: Execution status (success, failure, partial)
- `AGENT_NEXT_ACTION`: Suggested next step
- `AGENT_HANDOFF_TO`: Next agent in workflow

### Return Value
```javascript
{
  success: true,
  stdout: '...',
  stderr: '...',
  exitCode: 0,
  signals: {
    responseId: '...',
    createdIssueUrl: '...',
    status: 'success',
    nextAction: '...',
    handoffTo: '...'
  },
  executionTime: 45.2, // seconds
  timeout: false
}
```

### Usage Pattern
```javascript
import { AgentExecutor } from './agent-executor.mjs';

// Initialize executor
const executor = new AgentExecutor({
  agentBinary: 'claude-code',
  timeout: 600000  // 10 minutes
});

// Execute agent with prompt
const result = await executor.executeAgent({
  cwd: '/workspace/project',
  promptFile: '/tmp/prompt.md',
  command: 'run',
  id: 'workflow-123-phase-1'
});

// Check for success
if (result.success) {
  console.log(`Agent completed successfully`);
  console.log(`Response ID: ${result.signals.responseId}`);

  // Handle handoff if specified
  if (result.signals.handoffTo) {
    console.log(`Handing off to: ${result.signals.handoffTo}`);
  }
} else {
  console.error(`Agent failed: ${result.stderr}`);
}
```

### When to Use
- Automating agent invocation from workflows
- Building multi-agent pipelines
- Testing agent behavior programmatically
- Capturing structured agent outputs

**Script Location**: `/agents/shared/scripts/agent-executor.mjs`

---

## 🎯 Workflow Orchestrator Pattern

### Purpose
Coordinates multi-phase, multi-agent workflows with automatic handoffs, lens integration, and state management.

### Available Workflows
```javascript
const WORKFLOWS = {
  'issue-to-release': {
    name: 'Issue to Release Pipeline',
    description: 'Complete journey from issue creation to deployment',
    phases: [
      { agent: 'intake-agent', action: 'triage' },
      { agent: 'pm-agent', action: 'curate' },
      { agent: 'coder-agent', action: 'implement' },
      { agent: 'reviewer-agent', action: 'review' },
      { agent: 'qa-agent', action: 'test' },
      { agent: 'release-agent', action: 'deploy' }
    ]
  },
  'pr-review-cycle': {
    name: 'PR Review Cycle',
    description: 'Automated PR review and feedback loop',
    phases: [
      { agent: 'reviewer-agent', action: 'initial-review' },
      { agent: 'coder-agent', action: 'address-feedback' },
      { agent: 'reviewer-agent', action: 'final-review' }
    ]
  },
  'ci-failure-recovery': {
    name: 'CI Failure Recovery',
    description: 'Automatic diagnosis and fix of CI failures',
    phases: [
      { agent: 'devops-agent', action: 'diagnose' },
      { agent: 'coder-agent', action: 'fix' },
      { agent: 'qa-agent', action: 'verify' }
    ]
  }
};
```

### WorkflowOrchestrator Class
```javascript
class WorkflowOrchestrator {
  constructor() {
    this.currentWorkflow = null;
    this.currentPhase = 0;
    this.workflowState = {};
  }

  // List all available workflows
  async listWorkflows() {
    // Display workflow catalog
  }

  // Start a workflow
  async startWorkflow(workflowName, options = {}) {
    // Initialize workflow state
    // Integrate lens selection if issue provided
    // Execute workflow phases
  }

  // Execute workflow phases sequentially
  async executeWorkflow() {
    // For each phase:
    //   1. Prepare agent context
    //   2. Execute agent action
    //   3. Capture results
    //   4. Determine handoff
    //   5. Update state
  }

  // Execute a single phase
  async executePhase(phase, context) {
    // Run agent action with context
    // Parse output signals
    // Return phase result
  }

  // Save workflow state for resume
  saveWorkflowState() {
    // Persist state to disk/database
  }

  // Resume incomplete workflow
  async resumeWorkflow(workflowId) {
    // Load state
    // Continue from last phase
  }
}
```

### Lens Integration
Workflows automatically integrate with the lens system:
```javascript
// Lens selection happens at workflow start
const lensIntegration = await integrateLensWithOrchestration(
  workflowName,
  issueNumber,
  repository
);

// Lenses modify workflow phases
this.currentWorkflowDefinition = lensIntegration.applyToWorkflow(baseWorkflow);

// Example modifications:
// - Performance lens adds benchmark phase
// - Security lens adds security review phase
// - Accessibility lens adds a11y validation phase
```

### Workflow State
```javascript
{
  workflowName: 'issue-to-release',
  startTime: '2025-10-20T12:00:00Z',
  currentPhase: 3,
  phases: [
    {
      phase: 0,
      agent: 'intake-agent',
      action: 'triage',
      startTime: '2025-10-20T12:00:00Z',
      endTime: '2025-10-20T12:02:30Z',
      status: 'completed',
      output: { ... },
      signals: { ... }
    },
    { ... } // More phases
  ],
  lenses: ['performance', 'security'],
  metadata: { issueNumber: 123, prNumber: 456 }
}
```

### Command Line Usage
```bash
# List all workflows
node orchestrate-workflow.mjs --list-workflows

# Start issue-to-release workflow
node orchestrate-workflow.mjs --workflow=issue-to-release --issue=123

# Start PR review cycle
node orchestrate-workflow.mjs --workflow=pr-review-cycle --pr=456

# Dry run mode
DRY_RUN=true node orchestrate-workflow.mjs --workflow=ci-failure-recovery --issue=78
```

### When to Use
- Multi-agent collaboration required
- Sequential phase execution needed
- Automatic handoffs between agents
- State persistence for long-running workflows
- Lens-aware workflow modification

**Script Location**: `/agents/shared/scripts/orchestrate-workflow.mjs`

---

## 🛡️ Agent Change Validator Pattern

### Purpose
Enforces agent file scope boundaries to prevent cross-cutting changes that could interfere with other agents.

### Role File Patterns
Each agent role has explicitly defined allowed file patterns:

```javascript
const ROLE_FILE_PATTERNS = {
  'pm-agent': {
    allowed: [
      'agents/roles/pm-agent/**/*',
      'agents/shared/templates/pm-*',
      '.github/ISSUE_TEMPLATE/**/*',
      'docs/**/*.md',
      'README.md',
      'CONTRIBUTING.md'
    ],
    description: 'PM templates, documentation, issue templates'
  },

  'coder-agent': {
    allowed: [
      'src/**/*',
      'lib/**/*',
      'components/**/*',
      'test/**/*',
      '*.test.*',
      '*.spec.*',
      'package.json',
      'tsconfig.json',
      '*.config.js'
    ],
    description: 'Source code, tests, build configs, dependencies'
  },

  'qa-agent': {
    allowed: [
      'test/**/*',
      'e2e/**/*',
      '*.test.*',
      '*.spec.*',
      '.github/workflows/*test*',
      'playwright.config.*',
      'jest.config.*'
    ],
    description: 'Test files, CI test workflows, testing configs'
  },

  'reviewer-agent': {
    allowed: [
      'agents/roles/reviewer-agent/**/*',
      '.eslintrc*',
      '.prettierrc*',
      '.github/workflows/*review*',
      '.github/workflows/*lint*',
      '.gitignore'
    ],
    description: 'Code standards, linting configs, review templates'
  }

  // ... more agent patterns
};
```

### Validation Algorithm
```javascript
function validateAgentChanges(agentRole, changedFiles) {
  const rolePatterns = ROLE_FILE_PATTERNS[agentRole];

  if (!rolePatterns) {
    throw new Error(`Unknown agent role: ${agentRole}`);
  }

  const violations = [];

  for (const file of changedFiles) {
    const isAllowed = rolePatterns.allowed.some(pattern =>
      minimatch(file, pattern)
    );

    if (!isAllowed) {
      violations.push({
        file,
        agent: agentRole,
        reason: `File outside agent scope. Allowed patterns: ${rolePatterns.description}`
      });
    }
  }

  return {
    valid: violations.length === 0,
    violations,
    totalFiles: changedFiles.length,
    allowedFiles: changedFiles.length - violations.length
  };
}
```

### Command Line Usage
```bash
# Validate from file list
node validate-agent-changes.mjs --agent=pm-agent --files=changed-files.txt

# Validate from git diff
node validate-agent-changes.mjs --agent=coder-agent --git-diff

# Validate specific PR
node validate-agent-changes.mjs --agent=qa-agent --pr=456

# Check without failing (report only)
node validate-agent-changes.mjs --agent=reviewer-agent --git-diff --no-fail
```

### Integration with CI
```yaml
# .github/workflows/agent-scope-validation.yml
- name: Validate Agent File Scope
  run: |
    AGENT=$(gh pr view ${{ github.event.pull_request.number }} --json labels --jq '.labels[].name' | grep 'agent:' | sed 's/agent://')
    node agents/shared/scripts/validate-agent-changes.mjs --agent=$AGENT --git-diff
```

### When to Use
- PR validation gates
- Pre-commit hooks for agent work
- Preventing scope creep
- Enforcing separation of concerns
- CI/CD validation

**Script Location**: `/agents/shared/scripts/validate-agent-changes.mjs`

---

## 📬 Mailbox System Pattern

### Purpose
Asynchronous inter-agent communication using file-based mailboxes.

### Mailbox Structure
```
agents/shared/mailbox/
├── intake/           # intake-agent mailbox
│   ├── inbox/
│   ├── outbox/
│   └── archive/
├── pm/               # pm-agent mailbox
│   ├── inbox/
│   ├── outbox/
│   └── archive/
└── coder/            # coder-agent mailbox
    ├── inbox/
    ├── outbox/
    └── archive/
```

### Message Format
```json
{
  "id": "msg-2025-10-20-001",
  "from": "pm-agent",
  "to": "coder-agent",
  "subject": "Implementation request for issue #123",
  "timestamp": "2025-10-20T12:00:00Z",
  "priority": "normal",
  "payload": {
    "issueNumber": 123,
    "archetype": "product-implementer",
    "acceptanceCriteria": [ ... ],
    "technicalContext": { ... }
  },
  "metadata": {
    "workflowId": "workflow-456",
    "phaseNumber": 2
  }
}
```

### Mailbox API
```javascript
class MailboxClient {
  constructor(agentName) {
    this.agentName = agentName;
    this.inboxPath = `agents/shared/mailbox/${agentName}/inbox`;
    this.outboxPath = `agents/shared/mailbox/${agentName}/outbox`;
  }

  // Send message to another agent
  async sendMessage(toAgent, subject, payload) {
    const message = {
      id: this.generateMessageId(),
      from: this.agentName,
      to: toAgent,
      subject,
      timestamp: new Date().toISOString(),
      payload
    };

    // Write to outbox and recipient's inbox
    await this.writeMessage(this.outboxPath, message);
    await this.writeMessage(`agents/shared/mailbox/${toAgent}/inbox`, message);

    return message.id;
  }

  // Check inbox for new messages
  async checkInbox() {
    const messages = await this.readMessages(this.inboxPath);
    return messages.filter(msg => !msg.read);
  }

  // Mark message as read
  async markAsRead(messageId) {
    // Update message metadata
  }

  // Archive message
  async archiveMessage(messageId) {
    // Move to archive folder
  }
}
```

### Usage Pattern
```javascript
// PM agent sends work to coder agent
const pmMailbox = new MailboxClient('pm');
const messageId = await pmMailbox.sendMessage('coder', 'Implement feature #123', {
  issueNumber: 123,
  archetype: 'product-implementer',
  acceptanceCriteria: [ ... ]
});

// Coder agent checks inbox
const coderMailbox = new MailboxClient('coder');
const newMessages = await coderMailbox.checkInbox();

for (const msg of newMessages) {
  console.log(`New work from ${msg.from}: ${msg.subject}`);

  // Process message
  await processWork(msg.payload);

  // Mark as read
  await coderMailbox.markAsRead(msg.id);

  // Send completion notification
  await coderMailbox.sendMessage(msg.from, `Completed: ${msg.subject}`, {
    prUrl: '...',
    completionTime: '...'
  });
}
```

### When to Use
- Async agent communication
- Work queue management
- Handoff tracking
- Audit trails
- Decoupled agent coordination

---

## Integration Patterns

### Complete Workflow Example
```javascript
// 1. Start orchestrated workflow
const orchestrator = new WorkflowOrchestrator();

await orchestrator.startWorkflow('issue-to-release', {
  issue: 123,
  repository: 'org/repo'
});

// 2. Workflow internally uses agent executor
const executor = new AgentExecutor({ agentBinary: 'claude-code' });

for (const phase of workflow.phases) {
  // 3. Execute agent with validation
  const changedFiles = await getChangedFiles();
  const validation = validateAgentChanges(phase.agent, changedFiles);

  if (!validation.valid) {
    throw new Error(`Agent scope violation: ${validation.violations}`);
  }

  // 4. Run agent
  const result = await executor.executeAgent({
    cwd: '/workspace',
    promptFile: `/tmp/phase-${phase.number}-prompt.md`,
    command: phase.action
  });

  // 5. Use mailbox for async communication if needed
  if (phase.requiresHandoff) {
    const mailbox = new MailboxClient(phase.agent);
    await mailbox.sendMessage(phase.nextAgent, 'Work ready for review', {
      prUrl: result.signals.createdPrUrl
    });
  }

  // 6. Save state
  orchestrator.saveWorkflowState();
}
```

---

## Related Skills

- **wolf-roles**: Agent role definitions and responsibilities
- **wolf-archetypes**: Behavioral profiles
- **wolf-workflows-ci**: GitHub Actions integration
- **wolf-governance**: Quality gates and policies

---

## File Locations

All agent coordination scripts in `/agents/shared/scripts/`:
- `agent-executor.mjs` - Unified agent execution interface
- `orchestrate-workflow.mjs` - Multi-agent workflow orchestration
- `validate-agent-changes.mjs` - Agent scope enforcement
- `intake-agent-with-mailbox.mjs` - Mailbox-integrated intake agent
- `work-claimer.mjs` - Work assignment and claim management

---

## Best Practices

### Agent Execution
- ✅ Always set reasonable timeouts
- ✅ Parse structured signals for automation
- ✅ Capture both stdout and stderr
- ✅ Use unique request IDs for tracking
- ❌ Don't run agents without timeout limits
- ❌ Don't ignore exit codes

### Workflow Orchestration
- ✅ Save state after each phase for resume capability
- ✅ Integrate lens modifications early
- ✅ Use dry-run mode for testing
- ✅ Log all phase transitions
- ❌ Don't skip error handling
- ❌ Don't hardcode workflow definitions

### Agent Scope Validation
- ✅ Validate file changes in CI
- ✅ Provide clear violation messages
- ✅ Keep role patterns up to date
- ✅ Document allowed patterns clearly
- ❌ Don't allow broad wildcards
- ❌ Don't skip validation for "small" changes

### Mailbox Communication
- ✅ Use structured message formats
- ✅ Archive read messages
- ✅ Set message priorities
- ✅ Include workflow context in metadata
- ❌ Don't leave inbox unprocessed
- ❌ Don't lose message delivery confirmation

---

**Last Updated**: October 2025 (Phase 50+)
**Maintainer**: Wolf Orchestration Team

## Changelog

### 1.0.1 (2025-11-14)
- Enhanced frontmatter with orchestration pattern emphasis
- Improved description to highlight lens integration and signal parsing
- Added scope enforcement and mailbox communication to triggers
