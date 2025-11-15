#!/usr/bin/env ts-node
/**
 * Skill Discovery Enhancement
 *
 * Improves skill finding/loading through fuzzy matching, relevance scoring,
 * and trigger-based search.
 *
 * Pattern Application (from coding-patterns skill):
 * - Pure Functions: Search scoring, filtering, ranking (testable logic)
 * - Function Decomposition: Parsing, indexing, searching broken into small functions
 * - Vertical Slice: Organized by discovery method (search, browse, recommend)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

// ===== TYPES =====

interface SkillMetadata {
  name: string;
  description: string;
  version: string;
  triggers?: string[];
  category?: string;
  integration?: string;
  skillPath: string;
}

interface SearchResult {
  skill: SkillMetadata;
  score: number;
  matchedTriggers: string[];
  matchType: 'exact' | 'partial' | 'fuzzy';
}

interface SkillIndex {
  skills: SkillMetadata[];
  triggerMap: Map<string, SkillMetadata[]>;
  categoryMap: Map<string, SkillMetadata[]>;
}

// ===== PURE FUNCTIONS (80% - Search Logic, Scoring, Filtering) =====

/**
 * Parse frontmatter from skill file content
 *
 * PURE: No side effects, deterministic
 * Complexity: 4 (try/catch + null checks)
 */
function parseFrontmatter(content: string): Record<string, any> | null {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  try {
    const frontmatter = yaml.load(match[1]) as Record<string, any>;
    return frontmatter;
  } catch (error) {
    return null;
  }
}

/**
 * Extract skill metadata from frontmatter
 *
 * PURE: No side effects, deterministic
 * Complexity: 2 (simple extraction)
 */
function extractSkillMetadata(
  frontmatter: Record<string, any>,
  skillPath: string
): SkillMetadata {
  return {
    name: frontmatter.name || 'unknown',
    description: frontmatter.description || '',
    version: frontmatter.version || '1.0.0',
    triggers: frontmatter.triggers || [],
    category: frontmatter.category,
    integration: frontmatter.integration,
    skillPath
  };
}

/**
 * Calculate fuzzy match score between query and text
 *
 * PURE: No side effects, deterministic
 * Complexity: 5 (multiple conditions)
 *
 * Score calculation:
 * - Exact match: 100
 * - Start match: 80
 * - Word boundary match: 60
 * - Contains match: 40
 * - Fuzzy match (subsequence): 20
 * - No match: 0
 */
function calculateFuzzyScore(query: string, text: string): number {
  const q = query.toLowerCase().trim();
  const t = text.toLowerCase().trim();

  // Exact match
  if (q === t) return 100;

  // Starts with query
  if (t.startsWith(q)) return 80;

  // Word boundary match
  const wordBoundaryRegex = new RegExp(`\\b${escapeRegex(q)}`, 'i');
  if (wordBoundaryRegex.test(t)) return 60;

  // Contains query
  if (t.includes(q)) return 40;

  // Fuzzy match (subsequence)
  if (isSubsequence(q, t)) return 20;

  return 0;
}

/**
 * Check if query is a subsequence of text (fuzzy matching)
 *
 * PURE: No side effects, deterministic
 * Complexity: 3 (loop with condition)
 *
 * Example: "fndecom" matches "function decomposition"
 */
function isSubsequence(query: string, text: string): boolean {
  let queryIndex = 0;
  for (let i = 0; i < text.length && queryIndex < query.length; i++) {
    if (text[i] === query[queryIndex]) {
      queryIndex++;
    }
  }
  return queryIndex === query.length;
}

/**
 * Escape special regex characters
 *
 * PURE: No side effects, deterministic
 * Complexity: 1 (simple replacement)
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Calculate relevance score for skill based on query
 *
 * PURE: No side effects, deterministic
 * Complexity: 6 (multiple scoring factors)
 *
 * Scoring factors:
 * - Trigger match (max score from all triggers)
 * - Name match
 * - Description match
 * - Category match
 */
function calculateRelevanceScore(skill: SkillMetadata, query: string): {
  score: number;
  matchedTriggers: string[];
  matchType: 'exact' | 'partial' | 'fuzzy';
} {
  const triggers = skill.triggers || [];
  const triggerScores = triggers.map(t => ({
    trigger: t,
    score: calculateFuzzyScore(query, t)
  }));

  const bestTriggerMatch = triggerScores.reduce(
    (best, current) => (current.score > best.score ? current : best),
    { trigger: '', score: 0 }
  );

  const nameScore = calculateFuzzyScore(query, skill.name);
  const descScore = calculateFuzzyScore(query, skill.description) * 0.5; // Lower weight
  const categoryScore = skill.category
    ? calculateFuzzyScore(query, skill.category) * 0.3
    : 0;

  const totalScore = Math.max(
    bestTriggerMatch.score,
    nameScore,
    descScore,
    categoryScore
  );

  const matchedTriggers = triggerScores
    .filter(t => t.score > 0)
    .map(t => t.trigger);

  const matchType = totalScore >= 80 ? 'exact' : totalScore >= 40 ? 'partial' : 'fuzzy';

  return {
    score: totalScore,
    matchedTriggers,
    matchType
  };
}

/**
 * Filter skills by minimum relevance score
 *
 * PURE: No side effects, deterministic
 * Complexity: 1 (simple filter)
 */
function filterByMinScore(
  results: SearchResult[],
  minScore: number = 20
): SearchResult[] {
  return results.filter(r => r.score >= minScore);
}

/**
 * Sort search results by relevance score (descending)
 *
 * PURE: No side effects, creates new array
 * Complexity: 1 (simple sort)
 */
function sortByRelevance(results: SearchResult[]): SearchResult[] {
  return [...results].sort((a, b) => b.score - a.score);
}

/**
 * Group skills by category
 *
 * PURE: No side effects, deterministic
 * Complexity: 2 (loop with grouping)
 */
function groupByCategory(skills: SkillMetadata[]): Map<string, SkillMetadata[]> {
  const grouped = new Map<string, SkillMetadata[]>();

  for (const skill of skills) {
    const category = skill.category || 'uncategorized';
    const existing = grouped.get(category) || [];
    grouped.set(category, [...existing, skill]);
  }

  return grouped;
}

/**
 * Build trigger index for fast lookup
 *
 * PURE: No side effects, deterministic
 * Complexity: 3 (nested loops)
 */
function buildTriggerIndex(skills: SkillMetadata[]): Map<string, SkillMetadata[]> {
  const index = new Map<string, SkillMetadata[]>();

  for (const skill of skills) {
    const triggers = skill.triggers || [];
    for (const trigger of triggers) {
      const existing = index.get(trigger.toLowerCase()) || [];
      index.set(trigger.toLowerCase(), [...existing, skill]);
    }
  }

  return index;
}

/**
 * Format search results as readable text
 *
 * PURE: No side effects, deterministic
 * Complexity: 3 (loop with formatting)
 */
function formatSearchResults(
  results: SearchResult[],
  query: string,
  showAll: boolean = false
): string {
  const lines: string[] = [];

  lines.push(`\n=== Skill Search Results for "${query}" ===`);
  lines.push(`Found ${results.length} matches\n`);

  const displayResults = showAll ? results : results.slice(0, 5);

  for (const result of displayResults) {
    const { skill, score, matchedTriggers, matchType } = result;

    lines.push(`📦 ${skill.name} (v${skill.version}) - Score: ${score} [${matchType}]`);
    lines.push(`   ${skill.description}`);

    if (matchedTriggers.length > 0) {
      lines.push(`   🏷️  Matched triggers: ${matchedTriggers.join(', ')}`);
    }

    if (skill.category) {
      lines.push(`   📂 Category: ${skill.category}`);
    }

    lines.push(`   📁 Path: ${skill.skillPath}`);
    lines.push('');
  }

  if (!showAll && results.length > 5) {
    lines.push(`... and ${results.length - 5} more results`);
    lines.push('Use --all flag to show all results\n');
  }

  return lines.join('\n');
}

// ===== IMPURE FUNCTIONS (20% - File I/O at Edges) =====

/**
 * Find all SKILL.md files in directory
 *
 * IMPURE: File system read (I/O)
 * Complexity: 4 (recursive search)
 */
function findSkillFiles(rootDir: string): string[] {
  const skillFiles: string[] = [];

  function searchDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip node_modules and hidden directories
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          searchDir(fullPath);
        }
      } else if (entry.name === 'SKILL.md') {
        skillFiles.push(fullPath);
      }
    }
  }

  searchDir(rootDir);
  return skillFiles;
}

/**
 * Load skill metadata from file
 *
 * IMPURE: File system read (I/O)
 * Complexity: 3 (file read + parsing)
 */
function loadSkillMetadata(skillPath: string): SkillMetadata | null {
  try {
    const content = fs.readFileSync(skillPath, 'utf-8');
    const frontmatter = parseFrontmatter(content); // Pure function

    if (!frontmatter) return null;

    return extractSkillMetadata(frontmatter, skillPath); // Pure function
  } catch (error) {
    console.error(`Failed to load skill: ${skillPath}`, error);
    return null;
  }
}

/**
 * Build complete skill index
 *
 * IMPURE: File system reads (I/O)
 * Complexity: 3 (loop with I/O)
 */
function buildSkillIndex(rootDir: string): SkillIndex {
  const skillFiles = findSkillFiles(rootDir); // I/O
  const skills: SkillMetadata[] = [];

  for (const skillPath of skillFiles) {
    const metadata = loadSkillMetadata(skillPath); // I/O
    if (metadata) {
      skills.push(metadata);
    }
  }

  return {
    skills,
    triggerMap: buildTriggerIndex(skills), // Pure
    categoryMap: groupByCategory(skills)   // Pure
  };
}

/**
 * Search skills by query
 *
 * Uses pure functions for scoring, filtering, sorting
 * Complexity: 3 (map + filter + sort via pure functions)
 */
function searchSkills(
  index: SkillIndex,
  query: string,
  options: { minScore?: number; showAll?: boolean } = {}
): SearchResult[] {
  const { minScore = 20, showAll = false } = options;

  // Calculate relevance scores for all skills (pure)
  const results: SearchResult[] = index.skills.map(skill => {
    const { score, matchedTriggers, matchType } = calculateRelevanceScore(skill, query);
    return { skill, score, matchedTriggers, matchType };
  });

  // Filter and sort using pure functions
  const filtered = filterByMinScore(results, minScore);
  const sorted = sortByRelevance(filtered);

  return sorted;
}

// ===== MAIN EXECUTION (Orchestration at Edge) =====

/**
 * Main entry point
 *
 * IMPURE: Entry point with I/O
 * Complexity: 5 (CLI parsing + execution)
 */
function main() {
  const args = process.argv.slice(2);

  // Parse CLI arguments
  const help = args.includes('--help') || args.includes('-h');
  const showAll = args.includes('--all');
  const query = args.filter(a => !a.startsWith('--'))[0];

  if (help || !query) {
    console.log(`
Usage: skill-discovery.ts <query> [options]

Arguments:
  <query>         Search query (triggers, name, description, category)

Options:
  --all           Show all results (default: top 5)
  --help, -h      Show this help message

Examples:
  skill-discovery.ts "coding patterns"
  skill-discovery.ts "orchestration" --all
  skill-discovery.ts "fndecom"  # Fuzzy match: "function decomposition"
    `);
    process.exit(help ? 0 : 1);
  }

  // Build index (I/O)
  const rootDir = process.cwd();
  console.log(`Indexing skills in ${rootDir}...`);
  const index = buildSkillIndex(rootDir);
  console.log(`Indexed ${index.skills.length} skills\n`);

  // Search using pure functions
  const results = searchSkills(index, query, { showAll });

  // Format and display (pure + I/O)
  const output = formatSearchResults(results, query, showAll);
  console.log(output);
}

// Execute if run directly
if (require.main === module) {
  main();
}

// Export for testing
export {
  parseFrontmatter,
  extractSkillMetadata,
  calculateFuzzyScore,
  isSubsequence,
  calculateRelevanceScore,
  filterByMinScore,
  sortByRelevance,
  groupByCategory,
  buildTriggerIndex,
  formatSearchResults
};
