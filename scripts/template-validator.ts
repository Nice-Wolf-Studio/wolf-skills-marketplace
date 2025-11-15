#!/usr/bin/env ts-node
/**
 * Template Validation Tool
 *
 * Validates consistency of role and workflow templates (frontmatter, required sections,
 * placeholders, versioning).
 *
 * Pattern Application (from coding-patterns skill):
 * - Pure Functions: Validation rules, section checking (testable logic)
 * - Function Decomposition: Each validation rule is separate function
 * - Vertical Slice: Organized by validation type (structure, content, consistency)
 */

import * as fs from 'fs';
import * as path from 'path';

// ===== TYPES =====

interface TemplateMetadata {
  filePath: string;
  fileName: string;
  type: 'role' | 'workflow';
  content: string;
  version?: string;
  role?: string;
  marketplaceVersion?: string;
}

interface ValidationRule {
  name: string;
  description: string;
  validator: (template: TemplateMetadata) => ValidationResult;
}

interface ValidationResult {
  passed: boolean;
  message?: string;
  details?: string[];
}

interface TemplateReport {
  template: TemplateMetadata;
  results: {
    rule: string;
    passed: boolean;
    message?: string;
    details?: string[];
  }[];
  totalRules: number;
  passedRules: number;
  failedRules: number;
}

interface ValidationSummary {
  templates: TemplateReport[];
  totalTemplates: number;
  totalRules: number;
  totalPassed: number;
  totalFailed: number;
}

// ===== PURE FUNCTIONS (Validation Rules - 80%) =====

/**
 * Extract template version from footer
 *
 * PURE: No side effects, deterministic
 * Complexity: 3 (regex + null check)
 */
function extractTemplateVersion(content: string): string | null {
  const versionRegex = /\*Template Version: ([\d.]+)/;
  const match = content.match(versionRegex);
  return match ? match[1] : null;
}

/**
 * Extract role name from footer
 *
 * PURE: No side effects, deterministic
 * Complexity: 3 (regex + null check)
 */
function extractRoleName(content: string): string | null {
  const roleRegex = /\*Role: ([\w-]+)/;
  const match = content.match(roleRegex);
  return match ? match[1] : null;
}

/**
 * Extract marketplace version from footer
 *
 * PURE: No side effects, deterministic
 * Complexity: 3 (regex + null check)
 */
function extractMarketplaceVersion(content: string): string | null {
  const versionRegex = /\*Part of Wolf Skills Marketplace (v[\d.]+)/;
  const match = content.match(versionRegex);
  return match ? match[1] : null;
}

/**
 * Check if section exists in template
 *
 * PURE: No side effects, deterministic
 * Complexity: 2 (regex test)
 */
function hasSectionHeading(content: string, sectionName: string): boolean {
  const regex = new RegExp(`^## ${sectionName}$`, 'm');
  return regex.test(content);
}

/**
 * Extract all section headings from template
 *
 * PURE: No side effects, deterministic
 * Complexity: 2 (regex matching)
 */
function extractSectionHeadings(content: string): string[] {
  const headingRegex = /^## (.+)$/gm;
  const matches = content.matchAll(headingRegex);
  return Array.from(matches, m => m[1]);
}

/**
 * Find placeholders in template
 *
 * PURE: No side effects, deterministic
 * Complexity: 2 (regex matching)
 */
function findPlaceholders(content: string): string[] {
  const placeholderRegex = /\{([A-Z_]+)\}/g;
  const matches = content.matchAll(placeholderRegex);
  return Array.from(matches, m => m[1]);
}

// ===== VALIDATION RULES (Pure Functions) =====

/**
 * Validate template has footer with version info
 *
 * PURE: No side effects, deterministic
 * Complexity: 4 (multiple checks)
 */
function validateFooter(template: TemplateMetadata): ValidationResult {
  const version = extractTemplateVersion(template.content);
  const marketplace = extractMarketplaceVersion(template.content);

  if (!version) {
    return {
      passed: false,
      message: 'Missing template version in footer'
    };
  }

  if (!marketplace) {
    return {
      passed: false,
      message: 'Missing marketplace version in footer'
    };
  }

  return {
    passed: true,
    message: `Footer present: Template v${version}, Marketplace ${marketplace}`
  };
}

/**
 * Validate role templates have role name in footer
 *
 * PURE: No side effects, deterministic
 * Complexity: 3 (type check + extraction)
 */
function validateRoleFooter(template: TemplateMetadata): ValidationResult {
  if (template.type !== 'role') {
    return { passed: true, message: 'Not a role template (skipped)' };
  }

  const role = extractRoleName(template.content);

  if (!role) {
    return {
      passed: false,
      message: 'Missing role name in footer (role templates must specify *Role: role-name*)'
    };
  }

  return {
    passed: true,
    message: `Role specified: ${role}`
  };
}

/**
 * Validate required sections exist
 *
 * PURE: No side effects, deterministic
 * Complexity: 4 (loop with conditions)
 */
function validateRequiredSections(
  template: TemplateMetadata,
  requiredSections: string[]
): ValidationResult {
  const missingSections: string[] = [];

  for (const section of requiredSections) {
    if (!hasSectionHeading(template.content, section)) {
      missingSections.push(section);
    }
  }

  if (missingSections.length > 0) {
    return {
      passed: false,
      message: `Missing ${missingSections.length} required sections`,
      details: missingSections.map(s => `  - ## ${s}`)
    };
  }

  return {
    passed: true,
    message: `All ${requiredSections.length} required sections present`
  };
}

/**
 * Validate placeholders are well-formed
 *
 * PURE: No side effects, deterministic
 * Complexity: 3 (extraction + validation)
 */
function validatePlaceholders(template: TemplateMetadata): ValidationResult {
  const placeholders = findPlaceholders(template.content);

  // Check for common mistakes
  const invalidPlaceholders = placeholders.filter(p => {
    // Placeholders should be UPPER_CASE_WITH_UNDERSCORES
    return !/^[A-Z_]+$/.test(p);
  });

  if (invalidPlaceholders.length > 0) {
    return {
      passed: false,
      message: `Found ${invalidPlaceholders.length} invalid placeholders`,
      details: invalidPlaceholders.map(p => `  - {${p}} (should be UPPER_CASE)`)
    };
  }

  return {
    passed: true,
    message: `${placeholders.length} placeholders validated`
  };
}

/**
 * Validate template has Red Flags section
 *
 * PURE: No side effects, deterministic
 * Complexity: 2 (section check)
 */
function validateRedFlags(template: TemplateMetadata): ValidationResult {
  if (!hasSectionHeading(template.content, 'Red Flags - STOP')) {
    return {
      passed: false,
      message: 'Missing "Red Flags - STOP" section (all templates should have red flags)'
    };
  }

  return {
    passed: true,
    message: 'Red Flags section present'
  };
}

/**
 * Validate template has Success Criteria section
 *
 * PURE: No side effects, deterministic
 * Complexity: 2 (section check)
 */
function validateSuccessCriteria(template: TemplateMetadata): ValidationResult {
  if (!hasSectionHeading(template.content, 'Success Criteria')) {
    return {
      passed: false,
      message: 'Missing "Success Criteria" section (all templates should define success)'
    };
  }

  return {
    passed: true,
    message: 'Success Criteria section present'
  };
}

/**
 * Get required sections by template type
 *
 * PURE: No side effects, deterministic
 * Complexity: 2 (switch statement)
 */
function getRequiredSections(templateType: 'role' | 'workflow'): string[] {
  switch (templateType) {
    case 'role':
      return [
        'Your Mission',
        'Role Context (Loaded via wolf-roles)',
        'Wolf Framework Context',
        'Red Flags - STOP',
        'Success Criteria'
      ];
    case 'workflow':
      return [
        'Workflow Overview',
        'Agents Involved',
        'Red Flags - STOP',
        'Success Criteria'
      ];
    default:
      return [];
  }
}

// ===== VALIDATION SUITE (Organized by Validation Type - Vertical Slice) =====

/**
 * Structure Validation Slice - Footer, Sections, Format
 */
const structureValidations: ValidationRule[] = [
  {
    name: 'Footer Validation',
    description: 'Template has footer with version info',
    validator: validateFooter
  },
  {
    name: 'Role Footer Validation',
    description: 'Role templates have role name in footer',
    validator: validateRoleFooter
  },
  {
    name: 'Red Flags Section',
    description: 'Template has Red Flags section',
    validator: validateRedFlags
  },
  {
    name: 'Success Criteria Section',
    description: 'Template has Success Criteria section',
    validator: validateSuccessCriteria
  }
];

/**
 * Content Validation Slice - Placeholders, Sections
 */
const contentValidations: ValidationRule[] = [
  {
    name: 'Placeholder Format',
    description: 'Placeholders are well-formed (UPPER_CASE)',
    validator: validatePlaceholders
  },
  {
    name: 'Required Sections',
    description: 'Template has all required sections for its type',
    validator: (template) => {
      const requiredSections = getRequiredSections(template.type);
      return validateRequiredSections(template, requiredSections);
    }
  }
];

/**
 * All validation rules (combined slices)
 */
const allValidationRules: ValidationRule[] = [
  ...structureValidations,
  ...contentValidations
];

// ===== IMPURE FUNCTIONS (20% - File I/O at Edges) =====

/**
 * Find all template files
 *
 * IMPURE: File system read (I/O)
 * Complexity: 3 (directory reads)
 */
function findTemplateFiles(rootDir: string): string[] {
  const roleTemplatesDir = path.join(rootDir, 'wolf-roles', 'templates');
  const workflowTemplatesDir = path.join(rootDir, 'wolf-workflows', 'templates');

  const roleTemplates = fs.existsSync(roleTemplatesDir)
    ? fs.readdirSync(roleTemplatesDir)
        .filter(f => f.endsWith('.md'))
        .map(f => path.join(roleTemplatesDir, f))
    : [];

  const workflowTemplates = fs.existsSync(workflowTemplatesDir)
    ? fs.readdirSync(workflowTemplatesDir)
        .filter(f => f.endsWith('.md'))
        .map(f => path.join(workflowTemplatesDir, f))
    : [];

  return [...roleTemplates, ...workflowTemplates];
}

/**
 * Load template metadata
 *
 * IMPURE: File system read (I/O)
 * Complexity: 4 (file read + metadata extraction)
 */
function loadTemplateMetadata(filePath: string): TemplateMetadata | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const type = filePath.includes('wolf-roles') ? 'role' : 'workflow';

    return {
      filePath,
      fileName,
      type,
      content,
      version: extractTemplateVersion(content) || undefined,
      role: type === 'role' ? extractRoleName(content) || undefined : undefined,
      marketplaceVersion: extractMarketplaceVersion(content) || undefined
    };
  } catch (error) {
    console.error(`Failed to load template: ${filePath}`, error);
    return null;
  }
}

/**
 * Run all validation rules on template
 *
 * Uses pure validation functions
 * Complexity: 3 (loop with validation calls)
 */
function validateTemplate(
  template: TemplateMetadata,
  rules: ValidationRule[]
): TemplateReport {
  const results = rules.map(rule => {
    const result = rule.validator(template); // Pure function call
    return {
      rule: rule.name,
      ...result
    };
  });

  const passedRules = results.filter(r => r.passed).length;
  const failedRules = results.filter(r => !r.passed).length;

  return {
    template,
    results,
    totalRules: rules.length,
    passedRules,
    failedRules
  };
}

/**
 * Format validation report
 *
 * PURE: No side effects, deterministic
 * Complexity: 4 (loops with formatting)
 */
function formatValidationReport(summary: ValidationSummary): string {
  const lines: string[] = [];

  lines.push('\n=== Template Validation Report ===\n');
  lines.push(`Validated ${summary.totalTemplates} templates`);
  lines.push(`Total Checks: ${summary.totalPassed}/${summary.totalRules} passed\n`);

  for (const report of summary.templates) {
    const status = report.failedRules === 0 ? '✅' : '❌';
    lines.push(`${status} ${report.template.fileName} (${report.passedRules}/${report.totalRules})`);

    if (report.template.version) {
      lines.push(`   Version: ${report.template.version}`);
    }

    // Show failed rules
    const failedResults = report.results.filter(r => !r.passed);
    if (failedResults.length > 0) {
      lines.push('   Failed Checks:');
      for (const result of failedResults) {
        lines.push(`     ❌ ${result.rule}: ${result.message}`);
        if (result.details) {
          result.details.forEach(d => lines.push(`        ${d}`));
        }
      }
    }

    lines.push('');
  }

  return lines.join('\n');
}

// ===== MAIN EXECUTION =====

/**
 * Main entry point
 *
 * IMPURE: Entry point with I/O
 * Complexity: 4 (CLI parsing + execution)
 */
function main() {
  const args = process.argv.slice(2);
  const help = args.includes('--help') || args.includes('-h');
  const verbose = args.includes('--verbose') || args.includes('-v');

  if (help) {
    console.log(`
Usage: template-validator.ts [options]

Options:
  --verbose, -v   Show all validation results (including passed)
  --help, -h      Show this help message

Validates:
  - Template footer format (version, role, marketplace version)
  - Required sections (Red Flags, Success Criteria, etc.)
  - Placeholder format ({UPPER_CASE} only)
  - Role-specific requirements
    `);
    process.exit(0);
  }

  // Find and load templates
  const rootDir = process.cwd();
  const templateFiles = findTemplateFiles(rootDir); // I/O
  const templates = templateFiles
    .map(f => loadTemplateMetadata(f)) // I/O
    .filter((t): t is TemplateMetadata => t !== null);

  console.log(`Found ${templates.length} templates\n`);

  if (templates.length === 0) {
    console.log('No templates found. Run from repository root.');
    process.exit(1);
  }

  // Run validations (pure functions)
  const reports = templates.map(t => validateTemplate(t, allValidationRules));

  const summary: ValidationSummary = {
    templates: reports,
    totalTemplates: templates.length,
    totalRules: reports.reduce((sum, r) => sum + r.totalRules, 0),
    totalPassed: reports.reduce((sum, r) => sum + r.passedRules, 0),
    totalFailed: reports.reduce((sum, r) => sum + r.failedRules, 0)
  };

  // Format and display (pure + I/O)
  const report = formatValidationReport(summary);
  console.log(report);

  // Exit with error if any templates failed
  const hasFailures = summary.totalFailed > 0;
  process.exit(hasFailures ? 1 : 0);
}

// Execute if run directly
if (require.main === module) {
  main();
}

// Export for testing
export {
  extractTemplateVersion,
  extractRoleName,
  extractMarketplaceVersion,
  hasSectionHeading,
  extractSectionHeadings,
  findPlaceholders,
  validateFooter,
  validateRoleFooter,
  validateRequiredSections,
  validatePlaceholders,
  validateRedFlags,
  validateSuccessCriteria,
  getRequiredSections,
  formatValidationReport
};
