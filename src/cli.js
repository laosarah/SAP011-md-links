#!/usr/bin/env node
const chalk = require('chalk');
const { mdLinks } = require('./mdlinks.js');

// caminho do arquivo que o usuário irá fornecer
const path = process.argv[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
}

mdLinks(path, options).then((result) => {
  if(options.validate && options.stats) { // comando com --validate --stats
    if (result.stats) {
      console.log(
        chalk.green('Total: ', result.stats.total) + ' | ' + 
        chalk.blue('Unique: ', result.stats.unique) + ' | ' +
        chalk.red('Broken: ', result.stats.broken)
      );
    }
  } else if(options.stats && !options.validate) { // comando com --stats
    if (result.stats) {
      console.log(
        chalk.green('Total: ', result.stats.total) + ' | ' + 
        chalk.blue('Unique: ', result.stats.unique)
      );
    }
  } else if(options.validate) { // comando com --validate
    if(result.links.length > 0) {
      result.links.forEach((link) => {
        console.log(chalk.bold.cyan('Titulo: '), link.text);
        console.log(chalk.bold.blueBright('URL: '), link.href);
        console.log(chalk.bold.magentaBright('Caminho: '), link.file);
        console.log(
          link.status === 200
            ? chalk.green('Status: OK')
            : chalk.red('Status: ', link.error)
        );
        console.log();
      });
    }
  } else { // comando sem --validate --stats
    result.links.forEach((link) => {
      console.log(chalk.bold.cyan('Titulo: '), link.text);
      console.log(chalk.bold.blueBright('URL: '), link.href);
      console.log(chalk.bold.magentaBright('Caminho: '), link.file);
      console.log();
    });
  }
}).catch((error) => {
  if(options.stats === true && options.validate === true) {
    console.error(chalk.red('Ocorreu um erro ao calcular e validar links: '), error);
  } else if(options === 0) {
    console.error(chalk.red('Não existe link nesse arquivo'));
  } else if(options !== '.md') {
    console.error(chalk.red('Arquivo não é Markdown'));
  }
})
