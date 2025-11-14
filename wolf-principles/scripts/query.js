#!/usr/bin/env node

/**
 * Wolf Principles Query Script
 * Searches and filters Wolf's 10 core principles
 *
 * Usage:
 *   node query.js --id 5                    # Get principle by number
 *   node query.js --search "security"       # Search by keyword
 *   node query.js --topic "decision"        # Find by topic
 *   node query.js --all                     # List all principles
 */

const principles = [
  {
    id: 1,
    name: "Artifact-First Development",
    description: "All work produces durable, verifiable artifacts rather than ephemeral conversations",
    keywords: ["artifacts", "PRs", "documentation", "traceability", "audit"],
    topics: ["development", "process", "quality"],
    implementation: [
      "Pull Requests are the primary unit of work",
      "Every change must be committed, reviewed, and merged",
      "Conversations captured in issues, ADRs, and journals",
      "No work complete without merged artifact"
    ]
  },
  {
    id: 2,
    name: "Role Isolation and Separation of Concerns",
    description: "Each agent role has clearly defined responsibilities with minimal overlap and strict boundaries",
    keywords: ["roles", "isolation", "boundaries", "permissions", "security"],
    topics: ["architecture", "security", "organization"],
    implementation: [
      "Individual GitHub Apps per role with minimal permissions",
      "Agents cannot merge their own implementations",
      "Clear ownership matrices and authority boundaries",
      "Role cards define exact scope and non-goals"
    ]
  },
  {
    id: 3,
    name: "Research-Before-Code",
    description: "All implementation work must be preceded by structured research and evidence-based recommendations",
    keywords: ["research", "evidence", "analysis", "planning"],
    topics: ["development", "quality", "decision-making"],
    implementation: [
      "Mandatory Research Agent analysis before coding",
      "Structured research comments with evidence",
      "Research label as blocking gate",
      "Implementation must align with research"
    ]
  },
  {
    id: 4,
    name: "Advisory-First Enforcement",
    description: "New policies and constraints are tested in advisory mode before becoming hard gates",
    keywords: ["advisory", "gradual", "rollout", "testing", "policies"],
    topics: ["governance", "change-management", "stability"],
    implementation: [
      "Shadow-mode validation for new rules",
      "Gradual rollout with confidence thresholds",
      "Evidence collection before enforcement",
      "Fallback and rollback mechanisms"
    ]
  },
  {
    id: 5,
    name: "Evidence-Based Decision Making",
    description: "All decisions must be supported by concrete evidence and measurable outcomes",
    keywords: ["evidence", "metrics", "measurement", "data", "decisions"],
    topics: ["decision-making", "quality", "objectivity"],
    implementation: [
      "Performance budgets with measurements",
      "Security scans and validation evidence",
      "Test coverage and quality metrics",
      "Documented trade-offs with quantified impacts"
    ]
  },
  {
    id: 6,
    name: "Self-Improving Systems",
    description: "The system continuously learns from its operations and evolves based on evidence",
    keywords: ["learning", "improvement", "evolution", "feedback", "journals"],
    topics: ["continuous-improvement", "learning", "adaptation"],
    implementation: [
      "Comprehensive journaling of problems and decisions",
      "Regular retrospectives and pattern identification",
      "Automated metrics collection and analysis",
      "Feedback loops from operations to design"
    ]
  },
  {
    id: 7,
    name: "Multi-Provider Resilience",
    description: "The system must operate reliably across multiple AI providers with graceful fallback",
    keywords: ["resilience", "providers", "fallback", "reliability", "failover"],
    topics: ["architecture", "reliability", "risk-management"],
    implementation: [
      "Provider-agnostic interfaces and abstractions",
      "Automated failover between providers",
      "Rate limit awareness and throttling",
      "Provider-specific optimizations without lock-in"
    ]
  },
  {
    id: 8,
    name: "GitHub-Native Integration",
    description: "Leverage GitHub platform primitives to minimize custom infrastructure and operational overhead",
    keywords: ["GitHub", "integration", "platform", "native", "infrastructure"],
    topics: ["architecture", "operations", "efficiency"],
    implementation: [
      "GitHub Apps for authentication",
      "GitHub Actions for automation",
      "Issues and PRs for coordination",
      "GitHub API for programmatic interactions"
    ]
  },
  {
    id: 9,
    name: "Incremental Value Delivery",
    description: "All work should be broken into small, independently valuable increments",
    keywords: ["incremental", "small", "value", "delivery", "continuous"],
    topics: ["development", "agility", "risk-management"],
    implementation: [
      "Target 2-8 hour work increments",
      "Each PR represents complete functionality",
      "Continuous integration and deployment",
      "Feature flags for gradual rollout"
    ]
  },
  {
    id: 10,
    name: "Transparent Governance",
    description: "All decisions, processes, and constraints must be openly documented and auditable",
    keywords: ["transparency", "governance", "audit", "documentation", "compliance"],
    topics: ["governance", "compliance", "trust"],
    implementation: [
      "Public documentation of all policies",
      "Clear audit trails for all changes",
      "Role-based access controls with justification",
      "Regular governance reviews and updates"
    ]
  }
];

/**
 * Query principles by ID
 */
function queryById(id) {
  const principle = principles.find(p => p.id === parseInt(id));
  if (!principle) {
    return { error: `No principle found with ID ${id}` };
  }
  return formatPrinciple(principle, true);
}

/**
 * Search principles by keyword
 */
function searchByKeyword(keyword) {
  const lower = keyword.toLowerCase();
  const matches = principles.filter(p =>
    p.name.toLowerCase().includes(lower) ||
    p.description.toLowerCase().includes(lower) ||
    p.keywords.some(k => k.toLowerCase().includes(lower)) ||
    p.implementation.some(i => i.toLowerCase().includes(lower))
  );

  if (matches.length === 0) {
    return { message: `No principles found matching "${keyword}"` };
  }

  return {
    query: keyword,
    count: matches.length,
    principles: matches.map(p => formatPrinciple(p, false))
  };
}

/**
 * Find principles by topic
 */
function findByTopic(topic) {
  const lower = topic.toLowerCase();
  const matches = principles.filter(p =>
    p.topics.some(t => t.toLowerCase().includes(lower))
  );

  if (matches.length === 0) {
    return { message: `No principles found for topic "${topic}"` };
  }

  return {
    topic: topic,
    count: matches.length,
    principles: matches.map(p => formatPrinciple(p, false))
  };
}

/**
 * Get all principles
 */
function getAllPrinciples() {
  return {
    count: principles.length,
    principles: principles.map(p => formatPrinciple(p, false))
  };
}

/**
 * Format a principle for output
 */
function formatPrinciple(principle, detailed = false) {
  const base = {
    id: principle.id,
    name: principle.name,
    description: principle.description
  };

  if (detailed) {
    return {
      ...base,
      keywords: principle.keywords,
      topics: principle.topics,
      implementation: principle.implementation,
      usage_example: getUsageExample(principle.id)
    };
  }

  return base;
}

/**
 * Get usage example for a principle
 */
function getUsageExample(id) {
  const examples = {
    1: "Create PR with fix, tests, and documentation instead of just reporting 'fixed'",
    2: "PM defines requirements, Coder implements, Reviewer validates, QA verifies",
    3: "Research existing patterns before implementing new authentication",
    4: "Test new coverage rules in advisory mode before enforcing",
    5: "Benchmark REST vs GraphQL with real metrics before choosing",
    6: "Journal CI failures, identify patterns, implement preventive checks",
    7: "Use OpenAI with Claude fallback and local model for basic ops",
    8: "Use GitHub Issues instead of custom task tracking",
    9: "Break dashboard into 2-4 hour increments, each deployable",
    10: "Document decisions in ADRs with clear audit trails"
  };

  return examples[id] || "See skill documentation for examples";
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--id' && args[i + 1]) {
      options.id = args[i + 1];
      i++;
    } else if (args[i] === '--search' && args[i + 1]) {
      options.search = args[i + 1];
      i++;
    } else if (args[i] === '--topic' && args[i + 1]) {
      options.topic = args[i + 1];
      i++;
    } else if (args[i] === '--all') {
      options.all = true;
    }
  }

  return options;
}

// Main execution
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if running as main module
if (import.meta.url === `file://${process.argv[1]}`) {
  const options = parseArgs();
  let result;

  if (options.id) {
    result = queryById(options.id);
  } else if (options.search) {
    result = searchByKeyword(options.search);
  } else if (options.topic) {
    result = findByTopic(options.topic);
  } else if (options.all) {
    result = getAllPrinciples();
  } else {
    result = {
      error: "Please specify --id, --search, --topic, or --all",
      usage: "node query.js --id 5 | --search 'security' | --topic 'decision' | --all"
    };
  }

  console.log(JSON.stringify(result, null, 2));
}

// Export for use as module
export {
  queryById,
  searchByKeyword,
  findByTopic,
  getAllPrinciples,
  principles
};