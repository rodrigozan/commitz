import inquirer from 'inquirer';
import { execSync } from 'child_process';

const commitTypes = [
  { name: 'feat (✨ - New feature)', value: { emoji: '✨', keyword: 'feat' } },
  { name: 'fix (🐛 - Bug fix)', value: { emoji: '🐛', keyword: 'fix' } },
  { name: 'refactor (♻️ - Refactor code)', value: { emoji: '♻️', keyword: 'refactor' } },
  { name: 'docs (📚 - Documentation)', value: { emoji: '📚', keyword: 'docs' } },
  { name: 'test (🧪 - Add/modify tests)', value: { emoji: '🧪', keyword: 'test' } },
  { name: 'ci (⚙️ - CI/CD config)', value: { emoji: '⚙️', keyword: 'ci' } },
  { name: 'perf (⚡ - Performance improvements)', value: { emoji: '⚡', keyword: 'perf' } },
  { name: 'chore (🧹 - Routine maintenance)', value: { emoji: '🧹', keyword: 'chore' } },
  { name: 'style (🎨 - Code style changes)', value: { emoji: '🎨', keyword: 'style' } },
  { name: 'raw (💾 - Data)', value: { emoji: '💾', keyword: 'raw' } },
  // Add other types as needed
];

async function run() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Select the commit type:',
      choices: commitTypes,
    },
    {
      type: 'input',
      name: 'message',
      message: 'Commit message:',
      validate: input => input.length > 0 || 'Message is required.',
    },
  ]);

  const commitMsg = `${answers.type.emoji} ${answers.type.keyword}: ${answers.message}`;
  console.log('\nGenerated commit:', commitMsg);

  try {
    execSync('git add .', { stdio: 'inherit' }); // Stage all changes
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' }); // Commit with standard message
    console.log('\nCommit completed successfully!');
  } catch (e) {
    console.error('\nFailed to commit. Ensure you are in a git repository and there are staged changes.');
  }
}

run();
