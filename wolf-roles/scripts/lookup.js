#!/usr/bin/env node

/**
 * Wolf Roles Lookup Script
 * Query and find Wolf agent roles by name, responsibility, or category
 *
 * Usage:
 *   node lookup.js --role "pm-agent"              # Get specific role
 *   node lookup.js --category "development"       # List roles in category
 *   node lookup.js --search "security"            # Search across all roles
 *   node lookup.js --responsibility "code review" # Find by responsibility
 *   node lookup.js --all                          # List all roles
 */

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Role database with categorization and key information
const roles = {
  'product-planning': [
    {
      name: 'pm-agent',
      title: 'Product Manager Agent',
      mission: 'Deliver clear, testable requirements and incremental plans',
      owns: ['Backlog shaping', 'Prioritization', 'Acceptance criteria', 'Release sign-off'],
      collaborates: ['coder-agent', 'qa-agent', 'reviewer-agent'],
      escalates_to: 'strategist-agent'
    },
    {
      name: 'requirements-analyst-agent',
      title: 'Requirements Analyst',
      mission: 'Deep requirements analysis and validation',
      owns: ['Requirements decomposition', 'Dependency analysis', 'Validation criteria'],
      collaborates: ['pm-agent', 'system-architect-agent'],
      escalates_to: 'pm-agent'
    },
    {
      name: 'strategist-agent',
      title: 'Strategy Agent',
      mission: 'Strategic planning and roadmap development',
      owns: ['Strategic vision', 'Roadmap', 'Resource allocation'],
      collaborates: ['pm-agent', 'system-architect-agent'],
      escalates_to: 'executive'
    },
    {
      name: 'epic-specialist-agent',
      title: 'Epic Specialist',
      mission: 'Epic decomposition and management',
      owns: ['Epic breakdown', 'Story mapping', 'Dependency tracking'],
      collaborates: ['pm-agent', 'user-story-specialist-agent'],
      escalates_to: 'pm-agent'
    },
    {
      name: 'user-story-specialist-agent',
      title: 'User Story Specialist',
      mission: 'User story creation and refinement',
      owns: ['Story writing', 'Acceptance criteria', 'Story sizing'],
      collaborates: ['pm-agent', 'epic-specialist-agent'],
      escalates_to: 'pm-agent'
    },
    {
      name: 'decision-agent',
      title: 'Decision Tracking Agent',
      mission: 'Track decisions and document rationale',
      owns: ['Decision records', 'ADRs', 'Trade-off documentation'],
      collaborates: ['all-agents'],
      escalates_to: 'orchestrator-agent'
    },
    {
      name: 'task-lead-agent',
      title: 'Task Lead',
      mission: 'Task breakdown and assignment coordination',
      owns: ['Task decomposition', 'Assignment', 'Progress tracking'],
      collaborates: ['pm-agent', 'coder-agent'],
      escalates_to: 'pm-agent'
    },
    {
      name: 'orchestrator-agent',
      title: 'Orchestrator',
      mission: 'Multi-agent coordination and conflict resolution',
      owns: ['Agent coordination', 'Conflict resolution', 'Workflow optimization'],
      collaborates: ['all-agents'],
      escalates_to: 'human'
    }
  ],
  'development': [
    {
      name: 'coder-agent',
      title: 'Coder Agent',
      mission: 'Deliver small, well-tested increments that pass CI',
      owns: ['Feature implementation', 'Bug fixes', 'Unit tests', 'Documentation'],
      collaborates: ['pm-agent', 'code-reviewer-agent', 'qa-agent'],
      escalates_to: 'architect-lens-agent'
    },
    {
      name: 'frontend',
      title: 'Frontend Developer',
      mission: 'UI/UX implementation and frontend optimization',
      owns: ['UI components', 'State management', 'Frontend performance'],
      collaborates: ['backend', 'design-lead-agent', 'qa-ux-tester'],
      escalates_to: 'coder-agent'
    },
    {
      name: 'backend',
      title: 'Backend Developer',
      mission: 'API and backend service implementation',
      owns: ['APIs', 'Database operations', 'Backend services'],
      collaborates: ['frontend', 'devops-agent', 'security-agent'],
      escalates_to: 'coder-agent'
    },
    {
      name: 'fullstack',
      title: 'Full-Stack Developer',
      mission: 'End-to-end feature implementation',
      owns: ['Full features', 'Integration', 'E2E functionality'],
      collaborates: ['pm-agent', 'qa-agent', 'devops-agent'],
      escalates_to: 'coder-agent'
    },
    {
      name: 'refactor-lead',
      title: 'Refactoring Lead',
      mission: 'Code improvement and technical debt reduction',
      owns: ['Refactoring plans', 'Code quality', 'Pattern implementation'],
      collaborates: ['coder-agent', 'code-reviewer-agent'],
      escalates_to: 'architect-lens-agent'
    },
    {
      name: 'ml',
      title: 'Machine Learning Engineer',
      mission: 'ML model development and integration',
      owns: ['ML models', 'Training pipelines', 'Model deployment'],
      collaborates: ['coder-agent', 'devops-agent', 'metrics-agent'],
      escalates_to: 'system-architect-agent'
    },
    {
      name: 'infrastructure',
      title: 'Infrastructure Engineer',
      mission: 'Infrastructure as code and cloud resources',
      owns: ['IaC', 'Cloud resources', 'Infrastructure automation'],
      collaborates: ['devops-agent', 'security-agent'],
      escalates_to: 'system-architect-agent'
    },
    {
      name: 'pipeline',
      title: 'Pipeline Engineer',
      mission: 'CI/CD pipeline development and optimization',
      owns: ['CI/CD pipelines', 'Build automation', 'Deployment workflows'],
      collaborates: ['devops-agent', 'coder-agent'],
      escalates_to: 'devops-agent'
    },
    {
      name: 'observability',
      title: 'Observability Engineer',
      mission: 'Monitoring, logging, and observability implementation',
      owns: ['Monitoring', 'Logging', 'Metrics', 'Alerting'],
      collaborates: ['devops-agent', 'metrics-agent'],
      escalates_to: 'system-architect-agent'
    },
    {
      name: 'devops-agent',
      title: 'DevOps Agent',
      mission: 'Deployment, operations, and infrastructure management',
      owns: ['Deployments', 'Operations', 'Infrastructure', 'Monitoring'],
      collaborates: ['coder-agent', 'security-agent', 'release-agent'],
      escalates_to: 'system-architect-agent'
    }
  ],
  'review-quality': [
    {
      name: 'code-reviewer-agent',
      title: 'Code Reviewer',
      mission: 'Code quality assurance and standards enforcement',
      owns: ['Code reviews', 'Quality gates', 'Standards enforcement'],
      collaborates: ['coder-agent', 'qa-agent', 'security-agent'],
      escalates_to: 'architect-lens-agent'
    },
    {
      name: 'reviewer-agent',
      title: 'General Reviewer',
      mission: 'Coordinate review processes across domains',
      owns: ['Review coordination', 'Review standards', 'Feedback aggregation'],
      collaborates: ['all-review-agents'],
      escalates_to: 'orchestrator-agent'
    },
    {
      name: 'pr-reviewer-agent',
      title: 'PR Reviewer',
      mission: 'Pull request validation and approval',
      owns: ['PR reviews', 'Merge decisions', 'PR quality'],
      collaborates: ['code-reviewer-agent', 'qa-agent'],
      escalates_to: 'code-reviewer-agent'
    },
    {
      name: 'design-reviewer-agent',
      title: 'Design Reviewer',
      mission: 'Design and architecture review',
      owns: ['Design reviews', 'Architecture validation', 'Pattern compliance'],
      collaborates: ['architect-lens-agent', 'design-lead-agent'],
      escalates_to: 'system-architect-agent'
    },
    {
      name: 'qa-agent',
      title: 'Quality Assurance Agent',
      mission: 'Test coordination and quality validation',
      owns: ['Test planning', 'Quality metrics', 'Test execution'],
      collaborates: ['coder-agent', 'pm-agent', 'release-agent'],
      escalates_to: 'validation-agent'
    },
    {
      name: 'qa-unit-system-tester',
      title: 'Unit/System Tester',
      mission: 'Unit and system test implementation',
      owns: ['Unit tests', 'System tests', 'Integration tests'],
      collaborates: ['coder-agent', 'qa-agent'],
      escalates_to: 'qa-agent'
    },
    {
      name: 'qa-performance-tester',
      title: 'Performance Tester',
      mission: 'Performance testing and optimization validation',
      owns: ['Performance tests', 'Load tests', 'Benchmark validation'],
      collaborates: ['coder-agent', 'metrics-agent'],
      escalates_to: 'qa-agent'
    },
    {
      name: 'qa-security-tester',
      title: 'Security Tester',
      mission: 'Security testing and vulnerability assessment',
      owns: ['Security tests', 'Vulnerability scans', 'Penetration testing'],
      collaborates: ['security-agent', 'coder-agent'],
      escalates_to: 'security-agent'
    },
    {
      name: 'qa-ux-tester',
      title: 'UX Tester',
      mission: 'User experience and usability testing',
      owns: ['UX tests', 'Usability validation', 'Accessibility tests'],
      collaborates: ['frontend', 'design-lead-agent'],
      escalates_to: 'qa-agent'
    },
    {
      name: 'validation-agent',
      title: 'Validation Agent',
      mission: 'Final validation and verification',
      owns: ['Final validation', 'Compliance checks', 'Sign-off'],
      collaborates: ['qa-agent', 'release-agent'],
      escalates_to: 'release-manager-agent'
    },
    {
      name: 'tester-agent',
      title: 'General Tester',
      mission: 'General testing coordination',
      owns: ['Test coordination', 'Test strategy', 'Test reporting'],
      collaborates: ['qa-agent', 'coder-agent'],
      escalates_to: 'qa-agent'
    }
  ],
  'specialized': [
    {
      name: 'security-agent',
      title: 'Security Agent',
      mission: 'Security analysis, hardening, and compliance',
      owns: ['Security reviews', 'Threat modeling', 'Security standards'],
      collaborates: ['coder-agent', 'devops-agent', 'qa-security-tester'],
      escalates_to: 'ciso'
    },
    {
      name: 'architect-lens-agent',
      title: 'Architecture Lens Agent',
      mission: 'Architecture patterns and technical decisions',
      owns: ['Architecture patterns', 'Technical standards', 'Design decisions'],
      collaborates: ['system-architect-agent', 'coder-agent'],
      escalates_to: 'system-architect-agent'
    },
    {
      name: 'system-architect-agent',
      title: 'System Architect',
      mission: 'System-level architecture and design',
      owns: ['System architecture', 'Technology choices', 'Integration patterns'],
      collaborates: ['architect-lens-agent', 'design-lead-agent'],
      escalates_to: 'cto'
    },
    {
      name: 'design-lead-agent',
      title: 'Design Lead',
      mission: 'Design leadership and pattern establishment',
      owns: ['Design patterns', 'UX standards', 'Design systems'],
      collaborates: ['frontend', 'qa-ux-tester'],
      escalates_to: 'system-architect-agent'
    },
    {
      name: 'bash-validation-agent',
      title: 'Bash Validation Agent',
      mission: 'Bash script validation and security',
      owns: ['Bash script reviews', 'Shell security', 'Script standards'],
      collaborates: ['coder-agent', 'security-agent'],
      escalates_to: 'security-agent'
    },
    {
      name: 'error-forensics-agent',
      title: 'Error Forensics Agent',
      mission: 'Error analysis and root cause investigation',
      owns: ['Error analysis', 'Root cause analysis', 'Debug strategies'],
      collaborates: ['coder-agent', 'support-triage-agent'],
      escalates_to: 'system-architect-agent'
    },
    {
      name: 'metrics-agent',
      title: 'Metrics Agent',
      mission: 'Metrics collection, analysis, and reporting',
      owns: ['Metrics definition', 'Data collection', 'Performance analysis'],
      collaborates: ['observability', 'qa-performance-tester'],
      escalates_to: 'data-lead'
    },
    {
      name: 'ci-monitor-agent',
      title: 'CI Monitor Agent',
      mission: 'CI/CD pipeline monitoring and optimization',
      owns: ['CI monitoring', 'Build failure analysis', 'Pipeline optimization'],
      collaborates: ['pipeline', 'devops-agent'],
      escalates_to: 'devops-agent'
    },
    {
      name: 'research-agent',
      title: 'Research Agent',
      mission: 'Technical research and investigation',
      owns: ['Technical research', 'POCs', 'Technology evaluation'],
      collaborates: ['system-architect-agent', 'coder-agent'],
      escalates_to: 'system-architect-agent'
    }
  ],
  'maintenance-ops': [
    {
      name: 'hygiene-agent',
      title: 'Repository Hygiene Agent',
      mission: 'Repository cleanliness and organization',
      owns: ['Repo cleanup', 'Dependency updates', 'File organization'],
      collaborates: ['coder-agent', 'curator-agent'],
      escalates_to: 'orchestrator-agent'
    },
    {
      name: 'hygienist-agent',
      title: 'Code Hygienist',
      mission: 'Code cleanup and maintenance',
      owns: ['Code cleanup', 'Refactoring', 'Dead code removal'],
      collaborates: ['coder-agent', 'refactor-lead'],
      escalates_to: 'code-reviewer-agent'
    },
    {
      name: 'curator-agent',
      title: 'Content Curator',
      mission: 'Content organization and curation',
      owns: ['Content organization', 'Documentation structure', 'Asset management'],
      collaborates: ['documentation-agent', 'index-agent'],
      escalates_to: 'orchestrator-agent'
    },
    {
      name: 'index-agent',
      title: 'Index Agent',
      mission: 'Indexing and cataloging system resources',
      owns: ['Resource indexing', 'Search optimization', 'Catalog maintenance'],
      collaborates: ['curator-agent', 'documentation-agent'],
      escalates_to: 'curator-agent'
    },
    {
      name: 'historian-agent',
      title: 'Historian Agent',
      mission: 'History tracking and changelog maintenance',
      owns: ['Changelogs', 'Version history', 'Historical documentation'],
      collaborates: ['release-agent', 'documentation-agent'],
      escalates_to: 'release-manager-agent'
    },
    {
      name: 'documentation-agent',
      title: 'Documentation Agent',
      mission: 'Documentation creation and maintenance',
      owns: ['Documentation', 'API docs', 'User guides', 'README files'],
      collaborates: ['coder-agent', 'pm-agent'],
      escalates_to: 'curator-agent'
    },
    {
      name: 'release-agent',
      title: 'Release Agent',
      mission: 'Release coordination and deployment',
      owns: ['Release process', 'Version management', 'Deployment coordination'],
      collaborates: ['pm-agent', 'devops-agent', 'qa-agent'],
      escalates_to: 'release-manager-agent'
    },
    {
      name: 'release-manager-agent',
      title: 'Release Manager',
      mission: 'Strategic release management',
      owns: ['Release strategy', 'Release calendar', 'Risk assessment'],
      collaborates: ['release-agent', 'pm-agent'],
      escalates_to: 'product-owner'
    }
  ],
  'support-communication': [
    {
      name: 'support-triage-agent',
      title: 'Support Triage Agent',
      mission: 'Support ticket triage and routing',
      owns: ['Ticket triage', 'Priority assignment', 'Issue routing'],
      collaborates: ['error-forensics-agent', 'coder-agent'],
      escalates_to: 'support-lead'
    },
    {
      name: 'communications-agent',
      title: 'Communications Agent',
      mission: 'Internal and external communications',
      owns: ['Announcements', 'Status updates', 'Stakeholder communication'],
      collaborates: ['pm-agent', 'release-agent'],
      escalates_to: 'communications-lead'
    },
    {
      name: 'teacher-agent',
      title: 'Teacher Agent',
      mission: 'Knowledge transfer and training',
      owns: ['Training materials', 'Workshops', 'Knowledge transfer'],
      collaborates: ['documentation-agent', 'learning-agent'],
      escalates_to: 'education-lead'
    },
    {
      name: 'learning-agent',
      title: 'Learning Agent',
      mission: 'Continuous learning and improvement capture',
      owns: ['Learning capture', 'Best practices', 'Retrospectives'],
      collaborates: ['all-agents'],
      escalates_to: 'orchestrator-agent'
    },
    {
      name: 'workflow-coach-agent',
      title: 'Workflow Coach',
      mission: 'Process improvement and workflow optimization',
      owns: ['Process improvement', 'Workflow optimization', 'Efficiency metrics'],
      collaborates: ['orchestrator-agent', 'metrics-agent'],
      escalates_to: 'process-owner'
    },
    {
      name: 'context-agent',
      title: 'Context Agent',
      mission: 'Context preservation and management',
      owns: ['Context tracking', 'State management', 'Session continuity'],
      collaborates: ['all-agents'],
      escalates_to: 'orchestrator-agent'
    },
    {
      name: 'intake-agent',
      title: 'Intake Agent',
      mission: 'Work intake and initial triage',
      owns: ['Work intake', 'Initial assessment', 'Routing'],
      collaborates: ['pm-agent', 'support-triage-agent'],
      escalates_to: 'intake-orchestrator'
    },
    {
      name: 'intake-orchestrator',
      title: 'Intake Orchestrator',
      mission: 'Intake process coordination',
      owns: ['Intake strategy', 'Capacity planning', 'Priority balancing'],
      collaborates: ['intake-agent', 'pm-agent'],
      escalates_to: 'orchestrator-agent'
    }
  ]
};

/**
 * Get a specific role by name
 */
function getRole(roleName) {
  for (const category of Object.values(roles)) {
    const role = category.find(r => r.name === roleName.toLowerCase());
    if (role) {
      return { ...role, category: getCategoryName(roles, role) };
    }
  }
  return null;
}

/**
 * Get category name for a role
 */
function getCategoryName(rolesData, role) {
  for (const [category, roleList] of Object.entries(rolesData)) {
    if (roleList.includes(role)) {
      return category;
    }
  }
  return 'unknown';
}

/**
 * List roles in a category
 */
function listByCategory(categoryName) {
  const normalizedCategory = categoryName.toLowerCase().replace(/[- ]/g, '-');
  const category = roles[normalizedCategory];

  if (!category) {
    const availableCategories = Object.keys(roles);
    return {
      error: `Category '${categoryName}' not found`,
      available: availableCategories
    };
  }

  return {
    category: normalizedCategory,
    count: category.length,
    roles: category.map(r => ({
      name: r.name,
      title: r.title,
      mission: r.mission
    }))
  };
}

/**
 * Search roles by keyword
 */
function searchRoles(keyword) {
  const lower = keyword.toLowerCase();
  const matches = [];

  for (const [category, roleList] of Object.entries(roles)) {
    for (const role of roleList) {
      if (
        role.name.includes(lower) ||
        role.title.toLowerCase().includes(lower) ||
        role.mission.toLowerCase().includes(lower) ||
        role.owns.some(o => o.toLowerCase().includes(lower)) ||
        role.collaborates.some(c => c.toLowerCase().includes(lower))
      ) {
        matches.push({ ...role, category });
      }
    }
  }

  return {
    query: keyword,
    count: matches.length,
    roles: matches
  };
}

/**
 * Find roles by responsibility
 */
function findByResponsibility(responsibility) {
  const lower = responsibility.toLowerCase();
  const matches = [];

  for (const [category, roleList] of Object.entries(roles)) {
    for (const role of roleList) {
      if (role.owns.some(o => o.toLowerCase().includes(lower))) {
        matches.push({
          name: role.name,
          title: role.title,
          category,
          responsibility: role.owns.filter(o => o.toLowerCase().includes(lower))
        });
      }
    }
  }

  return {
    responsibility: responsibility,
    count: matches.length,
    roles: matches
  };
}

/**
 * Get all roles
 */
function getAllRoles() {
  const allRoles = [];

  for (const [category, roleList] of Object.entries(roles)) {
    allRoles.push({
      category,
      count: roleList.length,
      roles: roleList.map(r => r.name)
    });
  }

  const totalCount = Object.values(roles).reduce((sum, cat) => sum + cat.length, 0);

  return {
    total: totalCount,
    categories: allRoles
  };
}

/**
 * Get collaboration matrix for a role
 */
function getCollaborationMatrix(roleName) {
  const role = getRole(roleName);

  if (!role) {
    return { error: `Role '${roleName}' not found` };
  }

  const matrix = {
    role: role.name,
    title: role.title,
    collaborates_with: role.collaborates,
    escalates_to: role.escalates_to,
    receives_from: []
  };

  // Find who collaborates with this role
  for (const category of Object.values(roles)) {
    for (const r of category) {
      if (r.collaborates.includes(role.name) || r.collaborates.includes('all-agents')) {
        matrix.receives_from.push(r.name);
      }
    }
  }

  return matrix;
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--role' && args[i + 1]) {
      options.role = args[i + 1];
      i++;
    } else if (args[i] === '--category' && args[i + 1]) {
      options.category = args[i + 1];
      i++;
    } else if (args[i] === '--search' && args[i + 1]) {
      options.search = args[i + 1];
      i++;
    } else if (args[i] === '--responsibility' && args[i + 1]) {
      options.responsibility = args[i + 1];
      i++;
    } else if (args[i] === '--matrix' && args[i + 1]) {
      options.matrix = args[i + 1];
      i++;
    } else if (args[i] === '--all') {
      options.all = true;
    }
  }

  return options;
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const options = parseArgs();
  let result;

  if (options.role) {
    result = getRole(options.role);
    if (!result) {
      result = { error: `Role '${options.role}' not found` };
    }
  } else if (options.category) {
    result = listByCategory(options.category);
  } else if (options.search) {
    result = searchRoles(options.search);
  } else if (options.responsibility) {
    result = findByResponsibility(options.responsibility);
  } else if (options.matrix) {
    result = getCollaborationMatrix(options.matrix);
  } else if (options.all) {
    result = getAllRoles();
  } else {
    result = {
      error: "Please specify an option",
      usage: "node lookup.js --role pm-agent | --category development | --search security | --responsibility 'code review' | --matrix coder-agent | --all"
    };
  }

  console.log(JSON.stringify(result, null, 2));
}

// Export for use as module
export {
  getRole,
  listByCategory,
  searchRoles,
  findByResponsibility,
  getAllRoles,
  getCollaborationMatrix,
  roles
};