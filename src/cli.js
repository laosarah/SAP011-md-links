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
  console.log('result', result);
  if(options.stats && options.validate) {
    console.log(
      chalk.green('Total: ', result.stats.total) + ' | ' + 
      chalk.blue('Unique: ', result.stats.unique) + ' | ' + 
      chalk.red('Broken: ', result.stats.broken)
    );
  }
})
.catch(console.error);
