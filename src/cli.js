const chalk = require('chalk');
const { soma, sub } = require('./mdlinks');

const resultadoSoma = soma(1, 3);
const resultadoSub = sub(4, 2);

console.log(chalk.blue(resultadoSoma), chalk.red(resultadoSub));

const idade = 24;
const novaIdade = idade + 1;

console.log(novaIdade);
