#!/usr/bin/env node

/**
 * Wolf Governance Compliance Check Script
 * Validates compliance requirements for different types of work
 *
 * Usage:
 *   node check.js --type "feature" --risk "medium"
 *   node check.js --type "bug" --labels "security,hotfix"
 *   node check.js --type "architecture" --scope "major"
 *   node check.js --checklist                         # Full compliance checklist
 */

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Compliance requirements by work type
const complianceMatrix = {
  'bug': {
    required: {
      approvals: ['code-review'],
      evidence: ['tests', 'root-cause-analysis'],
      gates: ['ci-pass', 'tests-pass'],
      documentation: ['journal-entry']
    },
    optional: {
      approvals: [],
      evidence: ['performance-impact'],
      gates: ['security-scan']
    }
  },
  'feature': {
    required: {
      approvals: ['pm-approval', 'code-review'],
      evidence: ['acceptance-criteria-met', 'tests', 'documentation'],
      gates: ['dod-complete', 'ci-pass', 'tests-pass'],
      documentation: ['journal-entry', 'user-docs']
    },
    optional: {
      approvals: ['ux-review'],
      evidence: ['performance-benchmarks'],
      gates: ['accessibility-check']
    }
  },
  'security': {
    required: {
      approvals: ['security-review', 'code-review'],
      evidence: ['threat-model', 'security-scan', 'penetration-test'],
      gates: ['security-gates', 'ci-pass', 'tests-pass'],
      documentation: ['journal-entry', 'security-docs', 'adr']
    },
    optional: {
      approvals: ['ciso-approval'],
      evidence: ['third-party-audit'],
      gates: ['compliance-check']
    }
  },
  'architecture': {
    required: {
      approvals: ['architect-approval', 'code-review'],
      evidence: ['adr', 'impact-analysis', 'migration-plan'],
      gates: ['full-suite', 'ci-pass', 'backward-compatibility'],
      documentation: ['adr', 'journal-entry', 'architecture-docs']
    },
    optional: {
      approvals: ['cto-approval'],
      evidence: ['performance-analysis', 'cost-analysis'],
      gates: ['load-testing']
    }
  },
  'refactor': {
    required: {
      approvals: ['code-review'],
      evidence: ['tests', 'behavior-unchanged', 'complexity-metrics'],
      gates: ['ci-pass', 'tests-pass', 'coverage-maintained'],
      documentation: ['journal-entry']
    },
    optional: {
      approvals: ['architect-review'],
      evidence: ['performance-improvement'],
      gates: ['mutation-testing']
    }
  },
  'process': {
    required: {
      approvals: ['pm-approval', 'architect-approval'],
      evidence: ['adr', 'stakeholder-review', 'impact-assessment'],
      gates: ['governance-check'],
      documentation: ['adr', 'process-docs', 'communication-plan']
    },
    optional: {
      approvals: ['executive-approval'],
      evidence: ['pilot-results'],
      gates: []
    }
  },
  'hotfix': {
    required: {
      approvals: ['code-review', 'emergency-approval'],
      evidence: ['incident-report', 'fix-validation'],
      gates: ['smoke-tests', 'critical-paths'],
      documentation: ['incident-journal', 'post-mortem']
    },
    optional: {
      approvals: [],
      evidence: [],
      gates: []
    }
  }
};

// Risk modifiers
const riskModifiers = {
  'low': {
    additional_approvals: [],
    additional_evidence: [],
    additional_gates: []
  },
  'medium': {
    additional_approvals: ['second-reviewer'],
    additional_evidence: ['extended-testing'],
    additional_gates: ['extended-tests']
  },
  'high': {
    additional_approvals: ['security-review', 'second-reviewer'],
    additional_evidence: ['rollback-plan', 'monitoring-plan'],
    additional_gates: ['security-scan', 'performance-tests']
  },
  'critical': {
    additional_approvals: ['executive-approval', 'security-review', 'architect-approval'],
    additional_evidence: ['staged-rollout-plan', 'incident-response-plan', 'communication-plan'],
    additional_gates: ['full-suite', 'security-audit', 'load-testing']
  }
};

// Quality gates definitions
const qualityGates = {
  'ci-pass': {
    name: 'CI Pipeline Pass',
    requirements: ['All CI checks green', 'No failing builds'],
    blocking: true
  },
  'tests-pass': {
    name: 'Tests Passing',
    requirements: ['Unit tests pass', 'Integration tests pass'],
    blocking: true
  },
  'dod-complete': {
    name: 'Definition of Done',
    requirements: ['All DoD criteria met', 'Documentation updated', 'Tests written'],
    blocking: true
  },
  'security-gates': {
    name: 'Security Gates',
    requirements: ['Security scan clean', '0 critical vulnerabilities', '≤5 high vulnerabilities'],
    blocking: true
  },
  'full-suite': {
    name: 'Full Test Suite',
    requirements: ['E2E tests pass (90%)', 'Performance score ≥70', 'Security score ≥80'],
    blocking: true
  },
  'governance-check': {
    name: 'Governance Validation',
    requirements: ['Process compliance', 'Documentation complete', 'Approvals obtained'],
    blocking: true
  },
  'smoke-tests': {
    name: 'Smoke Tests',
    requirements: ['Core functionality works', 'No regressions in critical paths'],
    blocking: true
  }
};

/**
 * Get compliance requirements for a work type
 */
function getCompliance(type, risk = 'low', labels = []) {
  const baseCompliance = complianceMatrix[type.toLowerCase()];

  if (!baseCompliance) {
    return {
      error: `Unknown work type: ${type}`,
      available_types: Object.keys(complianceMatrix)
    };
  }

  const riskMod = riskModifiers[risk.toLowerCase()] || riskModifiers.low;

  // Build complete requirements
  const requirements = {
    type: type,
    risk: risk,
    labels: labels,
    required: {
      approvals: [...baseCompliance.required.approvals, ...riskMod.additional_approvals],
      evidence: [...baseCompliance.required.evidence, ...riskMod.additional_evidence],
      gates: [...baseCompliance.required.gates, ...riskMod.additional_gates],
      documentation: baseCompliance.required.documentation
    },
    optional: baseCompliance.optional,
    checklist: []
  };

  // Generate checklist
  requirements.checklist = generateChecklist(requirements);

  // Add special requirements based on labels
  if (labels.includes('security')) {
    requirements.required.approvals.push('security-review');
    requirements.required.gates.push('security-scan');
  }

  if (labels.includes('breaking-change')) {
    requirements.required.evidence.push('migration-guide');
    requirements.required.documentation.push('breaking-change-notice');
  }

  if (labels.includes('performance')) {
    requirements.required.evidence.push('performance-benchmarks');
    requirements.required.gates.push('performance-tests');
  }

  // Remove duplicates
  requirements.required.approvals = [...new Set(requirements.required.approvals)];
  requirements.required.evidence = [...new Set(requirements.required.evidence)];
  requirements.required.gates = [...new Set(requirements.required.gates)];

  return requirements;
}

/**
 * Generate compliance checklist
 */
function generateChecklist(requirements) {
  const checklist = [];

  // Approvals checklist
  requirements.required.approvals.forEach(approval => {
    checklist.push({
      category: 'Approval',
      item: approval.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      required: true,
      status: 'pending'
    });
  });

  // Evidence checklist
  requirements.required.evidence.forEach(evidence => {
    checklist.push({
      category: 'Evidence',
      item: evidence.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      required: true,
      status: 'pending'
    });
  });

  // Gates checklist
  requirements.required.gates.forEach(gate => {
    const gateInfo = qualityGates[gate];
    checklist.push({
      category: 'Quality Gate',
      item: gateInfo ? gateInfo.name : gate.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      required: true,
      blocking: gateInfo ? gateInfo.blocking : true,
      status: 'pending'
    });
  });

  // Documentation checklist
  requirements.required.documentation.forEach(doc => {
    checklist.push({
      category: 'Documentation',
      item: doc.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      required: true,
      status: 'pending'
    });
  });

  return checklist;
}

/**
 * Get full compliance checklist
 */
function getFullChecklist() {
  return {
    pre_work: [
      { item: 'Review relevant Wolf principles', required: true },
      { item: 'Determine behavioral archetype', required: true },
      { item: 'Check role responsibilities', required: true },
      { item: 'Verify governance requirements', required: true }
    ],
    during_work: [
      { item: 'Follow test-driven development', required: false },
      { item: 'Write tests for new code', required: true },
      { item: 'Update documentation', required: true },
      { item: 'Create journal entries', required: true },
      { item: 'Run linting and formatting', required: true }
    ],
    pre_commit: [
      { item: 'Run fast-lane tests', required: true },
      { item: 'Fix linting errors', required: true },
      { item: 'Update journal with decisions', required: true },
      { item: 'Verify CI will pass', required: true }
    ],
    pre_merge: [
      { item: 'Code review approved', required: true },
      { item: 'CI/CD pipeline green', required: true },
      { item: 'Documentation updated', required: true },
      { item: 'Quality gates passed', required: true },
      { item: 'No security vulnerabilities', required: true }
    ],
    post_merge: [
      { item: 'Verify deployment successful', required: true },
      { item: 'Monitor for issues', required: true },
      { item: 'Update release notes', required: false },
      { item: 'Conduct retrospective', required: false }
    ]
  };
}

/**
 * Get escalation path for issues
 */
function getEscalationPath(domain) {
  const paths = {
    technical: ['Developer', 'Code Reviewer', 'Architect', 'CTO'],
    process: ['Agent', 'PM', 'Orchestrator', 'Product Owner'],
    security: ['ANY', 'Security Agent', 'CISO', 'Executive'],
    quality: ['QA', 'QA Lead', 'Release Manager', 'VP Engineering'],
    business: ['PM', 'Product Owner', 'VP Product', 'Executive']
  };

  return paths[domain.toLowerCase()] || paths.process;
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--type' && args[i + 1]) {
      options.type = args[i + 1];
      i++;
    } else if (args[i] === '--risk' && args[i + 1]) {
      options.risk = args[i + 1];
      i++;
    } else if (args[i] === '--labels' && args[i + 1]) {
      options.labels = args[i + 1].split(',').map(l => l.trim());
      i++;
    } else if (args[i] === '--checklist') {
      options.checklist = true;
    } else if (args[i] === '--escalation' && args[i + 1]) {
      options.escalation = args[i + 1];
      i++;
    }
  }

  return options;
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const options = parseArgs();
  let result;

  if (options.checklist) {
    result = getFullChecklist();
  } else if (options.escalation) {
    result = {
      domain: options.escalation,
      path: getEscalationPath(options.escalation)
    };
  } else if (options.type) {
    result = getCompliance(
      options.type,
      options.risk || 'low',
      options.labels || []
    );
  } else {
    result = {
      error: "Please specify --type, --checklist, or --escalation",
      usage: "node check.js --type feature [--risk medium] [--labels security,performance]",
      available_types: Object.keys(complianceMatrix),
      risk_levels: Object.keys(riskModifiers)
    };
  }

  console.log(JSON.stringify(result, null, 2));
}

// Export for use as module
export {
  getCompliance,
  getFullChecklist,
  getEscalationPath,
  complianceMatrix,
  qualityGates
};