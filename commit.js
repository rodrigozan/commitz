#!/usr/bin/env node

import inquirer from "inquirer";
import { execSync } from "child_process";

const commitTypes = [
  { name: 'Accessibility (🦽)', value: { emoji: '🦽', keyword: 'accessibility' } },
  { name: 'Add test (☑️)', value: { emoji: '☑️', keyword: 'test' } },
  { name: 'Update submodule version (↗️)', value: { emoji: '↗️', keyword: 'build' } },
  { name: 'Downgrade submodule version (↘️)', value: { emoji: '↘️', keyword: 'build' } },
  { name: 'Add dependency (➕)', value: { emoji: '➕', keyword: 'build' } },
  { name: 'Code revision changes (✍️)', value: { emoji: '✍️', keyword: 'style' } },
  { name: 'Animations and transitions (🎞️)', value: { emoji: '🎞️', keyword: 'style' } },
  { name: 'Bugfix (🐞)', value: { emoji: '🐞', keyword: 'fix' } },
  { name: 'Comments (💬)', value: { emoji: '💬', keyword: 'fix' } },
  { name: 'Initial commit (🎉)', value: { emoji: '🎉', keyword: 'chore' } },
  { name: 'Configuration (🔧)', value: { emoji: '🔧', keyword: 'chore' } },
  { name: 'Database (📁)', value: { emoji: '📁', keyword: 'database' } },
  { name: 'Create file (🗒️)', value: { emoji: '🗒️', keyword: 'create' } },
  { name: 'Deploy (🚀)', value: { emoji: '🚀', keyword: 'chore' } },
  { name: 'Documentation (📚)', value: { emoji: '📚', keyword: 'docs' } },
  { name: 'In progress (🚧)', value: { emoji: '🚧', keyword: 'chore' } },
  { name: 'UI Styling (🎨)', value: { emoji: '🎨', keyword: 'test' } },
  { name: 'Infrastructure (🏗️)', value: { emoji: '🏗️', keyword: 'ci' } },
  { name: 'Todo/task list (📝)', value: { emoji: '📝', keyword: 'chore' } },
  { name: 'Move/remove (🚚)', value: { emoji: '🚚', keyword: 'chore' } },
  { name: 'New feature (✨)', value: { emoji: '✨', keyword: 'feat' } },
  { name: 'JS package (📦)', value: { emoji: '📦', keyword: 'build' } },
  { name: 'Performance (⚡)', value: { emoji: '⚡', keyword: 'perf' } },
  { name: 'Refactor (♻️)', value: { emoji: '♻️', keyword: 'refactor' } },
  { name: 'Code cleanup (🧹)', value: { emoji: '🧹', keyword: 'cleanup' } },
  { name: 'Remove file (🗑️)', value: { emoji: '🗑️', keyword: 'cleanup' } },
  { name: 'Remove dependency (➖)', value: { emoji: '➖', keyword: 'build' } },
  { name: 'Responsiveness (🖥️)', value: { emoji: '🖥️', keyword: 'fix' } },
  { name: 'Revert changes (⏪)', value: { emoji: '⏪', keyword: 'fix' } },
  { name: 'Security (🔒)', value: { emoji: '🔒', keyword: 'fix' } },
  { name: 'SEO (🔍)', value: { emoji: '🔍', keyword: 'fix' } },
  { name: 'Tag version (🔖)', value: { emoji: '🔖', keyword: 'test' } },
  { name: 'Approval test (☑️)', value: { emoji: '☑️', keyword: 'test' } },
  { name: 'Texts (📝)', value: { emoji: '📝', keyword: 'test' } },
  { name: 'Typing (✒️)', value: { emoji: '✒️', keyword: 'test' } },
  { name: 'Error handling (🚨)', value: { emoji: '🚨', keyword: 'fix' } },
  { name: 'Data (💾)', value: { emoji: '💾', keyword: 'raw' } },
];


async function main() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Select the commit type:",
        choices: commitTypes,
      },
      {
        type: "input",
        name: "message",
        message: "Commit message:",
        validate: (input) => input.length > 0 || "Message is required.",
      },
    ]);

    const commitMsg = `${answers.type.emoji} ${answers.type.keyword}: ${answers.message}`;
    console.log("\nGenerated commit:", commitMsg);

    // Stage all changes
    execSync("git add .", { stdio: "inherit" });

    // Commit changes
    execSync(`git commit -m "${commitMsg}"`, { stdio: "inherit" });

    // Get current branch name AFTER commit success
    const branchName = execSync("git rev-parse --abbrev-ref HEAD", {
      encoding: "utf-8",
    }).trim();
    console.log(`\nPushing to origin/${branchName}...`);

    // Push to current branch
    execSync(`git push origin ${branchName}`, { stdio: "inherit" });

    console.log("\nCommit and push completed successfully!");
  } catch (error) {
    console.error(
      "\nFailed to commit or push. Check if you are in a git repository and have staged changes."
    );
    console.error("Error:", error.message);
  }
}

main();
