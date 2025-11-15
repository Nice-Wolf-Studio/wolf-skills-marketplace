#!/usr/bin/env ts-node
/**
 * Context File Cleanup Automation
 *
 * Cleans up old checkpoint files from .claude/context/ directory
 * following retention policies to prevent bloat while preserving
 * recent context.
 *
 * Pattern Application (from coding-patterns skill):
 * - Pure Functions: Date calculations, file filtering (80% pure)
 * - Function Decomposition: Small focused functions (<50 lines, complexity <10)
 * - Side Effects at Edges: I/O operations only in main execution flow
 */

import * as fs from 'fs';
import * as path from 'path';

// ===== TYPES =====

interface CheckpointFile {
  filename: string;
  fullPath: string;
  phase: string;
  date: Date;
  slug: string;
  ageInDays: number;
}

interface RetentionPolicy {
  explorationType: number;    // days to keep exploration checkpoints
  implementationType: number; // days to keep implementation checkpoints
  verificationType: number;   // days to keep verification checkpoints
  referenceType: number;      // days to keep reference checkpoints
}

interface CleanupResult {
  scanned: number;
  deleted: number;
  archived: number;
  kept: number;
  files: {
    deleted: string[];
    archived: string[];
    kept: string[];
  };
}

// ===== PURE FUNCTIONS (80% - Business Logic, No Side Effects) =====

/**
 * Parse checkpoint filename to extract metadata
 *
 * PURE: No side effects, deterministic
 * Complexity: 3 (simple branching)
 */
function parseCheckpointFilename(filename: string): CheckpointFile | null {
  // Pattern: {phase}-{YYYY-MM-DD}-{feature-slug}.md
  const pattern = /^(exploration|implementation|verification|reference)-(\d{4}-\d{2}-\d{2})-(.+)\.md$/;
  const match = filename.match(pattern);

  if (!match) return null;

  const [, phase, dateStr, slug] = match;
  const date = new Date(dateStr);

  // Invalid date check
  if (isNaN(date.getTime())) return null;

  const ageInDays = calculateAgeInDays(date);

  return {
    filename,
    fullPath: '', // Will be set by caller
    phase,
    date,
    slug,
    ageInDays
  };
}

/**
 * Calculate age of checkpoint in days
 *
 * PURE: No side effects, deterministic (given same date and today)
 * Complexity: 1
 */
function calculateAgeInDays(checkpointDate: Date, today: Date = new Date()): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffMs = today.getTime() - checkpointDate.getTime();
  return Math.floor(diffMs / msPerDay);
}

/**
 * Determine if checkpoint should be deleted based on retention policy
 *
 * PURE: No side effects, deterministic
 * Complexity: 4 (switch statement)
 */
function shouldDelete(checkpoint: CheckpointFile, policy: RetentionPolicy): boolean {
  const retentionDays = getRetentionDays(checkpoint.phase, policy);
  return checkpoint.ageInDays > retentionDays;
}

/**
 * Get retention days for specific checkpoint phase
 *
 * PURE: No side effects, deterministic
 * Complexity: 4 (switch statement)
 */
function getRetentionDays(phase: string, policy: RetentionPolicy): number {
  switch (phase) {
    case 'exploration':
      return policy.explorationType;
    case 'implementation':
      return policy.implementationType;
    case 'verification':
      return policy.verificationType;
    case 'reference':
      return policy.referenceType;
    default:
      return 30; // Default fallback
  }
}

/**
 * Group checkpoints by action (delete, archive, keep)
 *
 * PURE: No side effects, deterministic
 * Complexity: 2 (simple filter)
 */
function groupCheckpointsByAction(
  checkpoints: CheckpointFile[],
  policy: RetentionPolicy
): { toDelete: CheckpointFile[]; toKeep: CheckpointFile[] } {
  const toDelete = checkpoints.filter(cp => shouldDelete(cp, policy));
  const toKeep = checkpoints.filter(cp => !shouldDelete(cp, policy));

  return { toDelete, toKeep };
}

/**
 * Default retention policy
 *
 * PURE: No side effects, deterministic
 */
function getDefaultRetentionPolicy(): RetentionPolicy {
  return {
    explorationType: 30,    // Keep exploration checkpoints for 30 days
    implementationType: 60, // Keep implementation checkpoints for 60 days
    verificationType: 90,   // Keep verification checkpoints for 90 days
    referenceType: 45       // Keep reference checkpoints for 45 days
  };
}

// ===== IMPURE FUNCTIONS (20% - I/O at Edges) =====

/**
 * Find all checkpoint files in directory
 *
 * IMPURE: File system read (I/O)
 * Complexity: 3
 */
function findCheckpointFiles(contextDir: string): CheckpointFile[] {
  if (!fs.existsSync(contextDir)) {
    return [];
  }

  const files = fs.readdirSync(contextDir);
  const checkpoints: CheckpointFile[] = [];

  for (const filename of files) {
    const parsed = parseCheckpointFilename(filename);
    if (parsed) {
      checkpoints.push({
        ...parsed,
        fullPath: path.join(contextDir, filename)
      });
    }
  }

  return checkpoints;
}

/**
 * Delete checkpoint file
 *
 * IMPURE: File system write (I/O)
 * Complexity: 1
 */
function deleteCheckpointFile(filePath: string): void {
  fs.unlinkSync(filePath);
}

/**
 * Archive checkpoint file to archive directory
 *
 * IMPURE: File system write (I/O)
 * Complexity: 2
 */
function archiveCheckpointFile(filePath: string, archiveDir: string): void {
  const filename = path.basename(filePath);
  const archivePath = path.join(archiveDir, filename);

  // Ensure archive directory exists
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }

  fs.renameSync(filePath, archivePath);
}

/**
 * Execute cleanup with dry run option
 *
 * IMPURE: File system operations (I/O)
 * Complexity: 5
 */
function executeCleanup(
  checkpoints: CheckpointFile[],
  policy: RetentionPolicy,
  options: { dryRun: boolean; archive: boolean; archiveDir?: string }
): CleanupResult {
  const { toDelete, toKeep } = groupCheckpointsByAction(checkpoints, policy);

  const result: CleanupResult = {
    scanned: checkpoints.length,
    deleted: 0,
    archived: 0,
    kept: toKeep.length,
    files: {
      deleted: [],
      archived: [],
      kept: toKeep.map(cp => cp.filename)
    }
  };

  if (options.dryRun) {
    // Dry run - just report what would happen
    result.deleted = toDelete.length;
    result.files.deleted = toDelete.map(cp => cp.filename);
    return result;
  }

  // Execute cleanup
  for (const checkpoint of toDelete) {
    try {
      if (options.archive && options.archiveDir) {
        archiveCheckpointFile(checkpoint.fullPath, options.archiveDir);
        result.archived++;
        result.files.archived.push(checkpoint.filename);
      } else {
        deleteCheckpointFile(checkpoint.fullPath);
        result.deleted++;
        result.files.deleted.push(checkpoint.filename);
      }
    } catch (error) {
      console.error(`Failed to process ${checkpoint.filename}:`, error);
    }
  }

  return result;
}

/**
 * Format cleanup result as human-readable summary
 *
 * PURE: No side effects, deterministic
 * Complexity: 2
 */
function formatCleanupSummary(result: CleanupResult, dryRun: boolean): string {
  const lines: string[] = [];

  lines.push(`\n=== Context File Cleanup ${dryRun ? '(DRY RUN)' : 'Summary'} ===`);
  lines.push(`Scanned: ${result.scanned} files`);

  if (result.deleted > 0) {
    lines.push(`Deleted: ${result.deleted} files`);
    result.files.deleted.forEach(f => lines.push(`  - ${f}`));
  }

  if (result.archived > 0) {
    lines.push(`Archived: ${result.archived} files`);
    result.files.archived.forEach(f => lines.push(`  - ${f}`));
  }

  lines.push(`Kept: ${result.kept} files`);

  if (dryRun) {
    lines.push(`\nRun without --dry-run to execute cleanup`);
  }

  return lines.join('\n');
}

// ===== MAIN EXECUTION (Orchestration at Edge) =====

/**
 * Main entry point - orchestrates pure functions with I/O at edges
 *
 * IMPURE: Entry point with I/O
 * Complexity: 4
 */
function main() {
  // Parse CLI arguments
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const archive = args.includes('--archive');
  const help = args.includes('--help') || args.includes('-h');

  if (help) {
    console.log(`
Usage: cleanup-context-files.ts [options]

Options:
  --dry-run       Show what would be deleted without actually deleting
  --archive       Archive old files instead of deleting them
  --help, -h      Show this help message

Retention Policy (default):
  - Exploration checkpoints: 30 days
  - Implementation checkpoints: 60 days
  - Verification checkpoints: 90 days
  - Reference checkpoints: 45 days
    `);
    process.exit(0);
  }

  // Configuration
  const contextDir = path.join(process.cwd(), '.claude', 'context');
  const archiveDir = path.join(contextDir, 'archive');
  const policy = getDefaultRetentionPolicy();

  // Execute cleanup workflow (pure functions + I/O at edges)
  const checkpoints = findCheckpointFiles(contextDir); // I/O

  if (checkpoints.length === 0) {
    console.log('No checkpoint files found in .claude/context/');
    process.exit(0);
  }

  const result = executeCleanup(checkpoints, policy, {
    dryRun,
    archive,
    archiveDir
  }); // I/O

  const summary = formatCleanupSummary(result, dryRun); // Pure
  console.log(summary); // I/O
}

// Execute if run directly
if (require.main === module) {
  main();
}

// Export for testing
export {
  parseCheckpointFilename,
  calculateAgeInDays,
  shouldDelete,
  getRetentionDays,
  groupCheckpointsByAction,
  getDefaultRetentionPolicy,
  formatCleanupSummary
};
