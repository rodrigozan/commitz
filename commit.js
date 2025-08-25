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
];

async function main() {
  try {
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

    // Stage all changed files
    execSync('git add .', { stdio: 'inherit' });

    // Commit with the formatted message
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });

    console.log(`\nPushing to origin/${branchName}...`);

    // Push to current branch
    execSync(`git push origin ${branchName}`, { stdio: 'inherit' });

    // Get current branch
    const branchName = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();

    console.log('\nCommit completed successfully!');
  } catch (error) {
    console.error('\nFailed to commit. Make sure you are inside a git repository and have staged changes.');
    console.error('Error:', error.message);
  }
}

main();
