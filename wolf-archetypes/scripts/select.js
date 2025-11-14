#!/usr/bin/env node

/**
 * Wolf Archetype Selection Script
 * Automatically selects behavioral archetype based on GitHub labels and context
 *
 * Usage:
 *   node select.js --labels "feature,security" --description "Add OAuth"
 *   node select.js --files "src/auth/login.ts,src/api/users.ts"
 *   node select.js --confidence 3 --labels "feature"
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load registry data
let registry;
try {
  const registryPath = join(__dirname, '..', 'data', 'registry.yml');
  const registryContent = readFileSync(registryPath, 'utf-8');
  // For now, use embedded registry since yaml parsing needs external package
  registry = getEmbeddedRegistry();
} catch (error) {
  // Fallback to embedded registry if file not found
  registry = getEmbeddedRegistry();
}

/**
 * Select archetype based on labels
 */
function selectArchetype(labels, description = '', confidence = 10) {
  const normalizedLabels = labels.map(l => l.toLowerCase().trim());

  // Check confidence overrides first
  if (confidence < 5 && registry.confidence_overrides?.low_confidence) {
    return {
      archetype: registry.confidence_overrides.low_confidence.force_archetype,
      reason: registry.confidence_overrides.low_confidence.reason,
      source: 'confidence_override'
    };
  }

  // Check high risk scenarios
  const riskLabels = ['security', 'hotfix', 'incident', 'vulnerability', 'breaking-change'];
  const riskCount = normalizedLabels.filter(l => riskLabels.includes(l)).length;
  if (riskCount >= 2 && registry.confidence_overrides?.high_risk) {
    return {
      archetype: registry.confidence_overrides.high_risk.upgrade_archetype.to,
      reason: registry.confidence_overrides.high_risk.upgrade_archetype.reason,
      source: 'risk_override'
    };
  }

  // Check match order (first match wins)
  for (const rule of registry.match_order) {
    if (rule.labels_any) {
      const matches = rule.labels_any.some(label =>
        normalizedLabels.includes(label.toLowerCase())
      );
      if (matches) {
        return {
          archetype: rule.archetype,
          reason: rule.reason,
          source: 'label_match'
        };
      }
    }
  }

  // Fallback to default
  return {
    archetype: registry.fallback || 'product-implementer',
    reason: 'Default archetype for normal feature work',
    source: 'fallback'
  };
}

/**
 * Select archetype based on file patterns
 */
function selectByFiles(files) {
  for (const [trigger, config] of Object.entries(registry.file_triggers || {})) {
    for (const pattern of config.patterns) {
      const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
      const matches = files.some(file => regex.test(file));
      if (matches) {
        return {
          archetype: config.archetype,
          reason: `Files match ${trigger} pattern`,
          source: 'file_pattern'
        };
      }
    }
  }

  return null;
}

/**
 * Get overlay lenses based on labels and context
 */
function selectLenses(labels, files = []) {
  const lenses = [];
  const normalizedLabels = labels.map(l => l.toLowerCase().trim());

  // Performance lens
  if (normalizedLabels.some(l => ['perf', 'performance', 'slow', 'optimization'].includes(l))) {
    lenses.push({
      name: 'performance',
      requirements: ['Measurement', 'Benchmarks', 'Performance budgets'],
      evidence: ['Baseline metrics', 'Post-change metrics', 'p95 latency targets']
    });
  }

  // Security lens
  if (normalizedLabels.some(l => ['security', 'auth', 'crypto', 'vulnerability'].includes(l))) {
    lenses.push({
      name: 'security',
      requirements: ['Threat modeling', 'Security validation', 'Defense-in-depth'],
      evidence: ['Threat analysis', 'Security scan results', 'Penetration test outcomes']
    });
  }

  // Accessibility lens
  if (normalizedLabels.some(l => ['a11y', 'accessibility', 'wcag', 'inclusive'].includes(l))) {
    lenses.push({
      name: 'accessibility',
      requirements: ['WCAG compliance', 'Inclusive design', 'Screen reader support'],
      evidence: ['WCAG audit results', 'Keyboard navigation tests', 'Screen reader validation']
    });
  }

  // Observability lens
  if (normalizedLabels.some(l => ['observability', 'monitoring', 'tracing', 'metrics'].includes(l))) {
    lenses.push({
      name: 'observability',
      requirements: ['Logging', 'Metrics', 'Distributed tracing'],
      evidence: ['Log coverage', 'Metric dashboards', 'Trace examples']
    });
  }

  return lenses;
}

/**
 * Validate archetype combination rules
 */
function validateCombination(labels) {
  const normalizedLabels = labels.map(l => l.toLowerCase().trim());

  // Check for invalid combinations
  if (normalizedLabels.includes('refactor') && normalizedLabels.includes('feature')) {
    return {
      valid: false,
      error: 'Refactoring and new features should be separate PRs',
      suggestion: 'Create separate PRs: one for refactor, one for features'
    };
  }

  return { valid: true };
}

/**
 * Get embedded registry (fallback if file not found)
 */
function getEmbeddedRegistry() {
  return {
    match_order: [
      { labels_any: ['security', 'auth', 'vulnerability'], archetype: 'security-hardener', reason: 'Security-sensitive work' },
      { labels_any: ['perf', 'performance', 'optimization'], archetype: 'perf-optimizer', reason: 'Performance optimization' },
      { labels_any: ['bug', 'regression', 'hotfix'], archetype: 'reliability-fixer', reason: 'Bug fix' },
      { labels_any: ['a11y', 'accessibility', 'wcag'], archetype: 'accessibility-champion', reason: 'Accessibility work' },
      { labels_any: ['schema', 'migration', 'api'], archetype: 'data-contract-steward', reason: 'Contract changes' },
      { labels_any: ['infra', 'ci', 'build'], archetype: 'platform-gardener', reason: 'Platform work' },
      { labels_any: ['hygiene', 'cleanup', 'dependencies'], archetype: 'repository-hygienist', reason: 'Repository maintenance' },
      { labels_any: ['refactor', 'tech-debt'], archetype: 'maintainability-refactorer', reason: 'Refactoring' },
      { labels_any: ['spike', 'research', 'explore'], archetype: 'research-prototyper', reason: 'Research work' },
      { labels_any: ['ai-assist', 'codegen'], archetype: 'ai-assist-conductor', reason: 'AI-assisted work' }
    ],
    fallback: 'product-implementer',
    file_triggers: {
      performance: { patterns: ['**/benchmark/**', '**/*.perf.ts'], archetype: 'perf-optimizer' },
      security: { patterns: ['**/auth/**', '**/security/**'], archetype: 'security-hardener' },
      infrastructure: { patterns: ['.github/workflows/**', 'Dockerfile'], archetype: 'platform-gardener' }
    },
    confidence_overrides: {
      low_confidence: { force_archetype: 'research-prototyper', reason: 'Low confidence requires exploration' },
      high_risk: { upgrade_archetype: { to: 'reliability-fixer', reason: 'High risk needs extra validation' } }
    }
  };
}

/**
 * Format output with archetype and lenses
 */
function formatOutput(archetype, lenses, validation) {
  const output = {
    archetype: archetype.archetype,
    reason: archetype.reason,
    source: archetype.source
  };

  if (lenses && lenses.length > 0) {
    output.lenses = lenses;
  }

  if (validation && !validation.valid) {
    output.validation = validation;
  }

  // Add behavioral profile
  output.profile = getArchetypeProfile(archetype.archetype);

  return output;
}

/**
 * Get detailed archetype profile
 */
function getArchetypeProfile(archetypeName) {
  const profiles = {
    'product-implementer': {
      priorities: ['Delivery speed', 'User value', 'Completeness'],
      evidence: ['Acceptance criteria met', 'Tests pass', 'Documentation updated']
    },
    'security-hardener': {
      priorities: ['Threat reduction', 'Defense-in-depth', 'Least privilege'],
      evidence: ['Threat model', 'Security scan results', 'Penetration test outcomes']
    },
    'perf-optimizer': {
      priorities: ['Latency reduction', 'Throughput increase', 'Resource efficiency'],
      evidence: ['Baseline metrics', 'Post-change metrics', 'Performance budgets']
    },
    'reliability-fixer': {
      priorities: ['Root cause analysis', 'Prevention', 'Stability'],
      evidence: ['Root cause documented', 'Tests prevent recurrence', 'Monitoring added']
    },
    'research-prototyper': {
      priorities: ['Learning', 'Hypothesis validation', 'Risk reduction'],
      evidence: ['Findings documented', 'Recommendations provided', 'Risks identified']
    },
    'repository-hygienist': {
      priorities: ['Maintainability', 'Consistency', 'Prevention'],
      evidence: ['Before/after metrics', 'Automation added', 'Recurrence prevented']
    },
    'accessibility-champion': {
      priorities: ['WCAG compliance', 'Inclusive design', 'Usability'],
      evidence: ['WCAG audit results', 'Screen reader validation', 'Keyboard navigation tests']
    },
    'data-contract-steward': {
      priorities: ['Backward compatibility', 'Safe migration', 'Version management'],
      evidence: ['Migration plan', 'Compatibility matrix', 'Rollback procedure']
    },
    'platform-gardener': {
      priorities: ['Developer productivity', 'System reliability', 'Automation'],
      evidence: ['Productivity metrics', 'Uptime stats', 'Automation coverage']
    },
    'maintainability-refactorer': {
      priorities: ['Code clarity', 'Pattern consistency', 'Future-proofing'],
      evidence: ['Complexity reduction metrics', 'Test coverage maintained', 'Behavior unchanged']
    },
    'ai-assist-conductor': {
      priorities: ['Human oversight', 'Validation', 'Prompt optimization'],
      evidence: ['Human review completed', 'Outputs validated', 'Prompts documented']
    }
  };

  return profiles[archetypeName] || profiles['product-implementer'];
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--labels' && args[i + 1]) {
      options.labels = args[i + 1].split(',').map(l => l.trim());
      i++;
    } else if (args[i] === '--description' && args[i + 1]) {
      options.description = args[i + 1];
      i++;
    } else if (args[i] === '--files' && args[i + 1]) {
      options.files = args[i + 1].split(',').map(f => f.trim());
      i++;
    } else if (args[i] === '--confidence' && args[i + 1]) {
      options.confidence = parseInt(args[i + 1]);
      i++;
    }
  }

  return options;
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const options = parseArgs();

  if (!options.labels && !options.files) {
    console.log(JSON.stringify({
      error: 'Please provide --labels or --files',
      usage: 'node select.js --labels "feature,security" [--description "Add OAuth"] [--confidence 8]'
    }, null, 2));
    process.exit(1);
  }

  let archetype;

  // Try label-based selection first
  if (options.labels) {
    archetype = selectArchetype(
      options.labels,
      options.description || '',
      options.confidence || 10
    );
  }

  // Try file-based selection if no labels or as fallback
  if (!archetype && options.files) {
    archetype = selectByFiles(options.files);
  }

  // Get lenses if we have labels
  const lenses = options.labels ? selectLenses(options.labels, options.files || []) : [];

  // Validate combination
  const validation = options.labels ? validateCombination(options.labels) : { valid: true };

  // Format and output
  const result = formatOutput(archetype, lenses, validation);
  console.log(JSON.stringify(result, null, 2));
}

// Export for use as module
export {
  selectArchetype,
  selectByFiles,
  selectLenses,
  validateCombination,
  getArchetypeProfile
};