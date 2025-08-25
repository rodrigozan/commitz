const inquirer = require('inquirer');
const { execSync } = require('child_process');

const tiposCommit = [
  { name: 'feat (✨ - Nova funcionalidade)', value: { emoji: '✨', chave: 'feat' } },
  { name: 'fix (🐛 - Correção de bug)', value: { emoji: '🐛', chave: 'fix' } },
  { name: 'refactor (♻️ - Refatoração)', value: { emoji: '♻️', chave: 'refactor' } },
  { name: 'docs (📚 - Documentação)', value: { emoji: '📚', chave: 'docs' } },
  { name: 'test (🧪 - Testes)', value: { emoji: '🧪', chave: 'test' } },
  { name: 'ci (⚙️ - Integração/Configuração)', value: { emoji: '⚙️', chave: 'ci' } },
  { name: 'perf (⚡ - Performance)', value: { emoji: '⚡', chave: 'perf' } },
  { name: 'chore (🧹 - Tarefas)', value: { emoji: '🧹', chave: 'chore' } },
  { name: 'style (🎨 - Estilo)', value: { emoji: '🎨', chave: 'style' } },
  { name: 'raw (💾 - Dados)', value: { emoji: '💾', chave: 'raw' } },
  // Adicione outros tipos conforme a necessidade
];

async function run() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'tipo',
      message: 'Qual o tipo do commit?',
      choices: tiposCommit,
    },
    {
      type: 'input',
      name: 'mensagem',
      message: 'Mensagem do commit:',
      validate: input => input.length > 0 || 'Mensagem obrigatória.',
    },
  ]);

  const commitMsg = `${answers.tipo.emoji} ${answers.tipo.chave}: ${answers.mensagem}`;
  console.log('\nCommit Gerado:', commitMsg);

  try {
    execSync('git add .', { stdio: 'inherit' }); // Adiciona todas as alterações
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' }); // Faz o commit
    console.log('\nCommit realizado com sucesso!');
  } catch (e) {
    console.error('\nFalha ao realizar commit. Verifique se está em um repositório git e há alterações.');
  }
}

run();
