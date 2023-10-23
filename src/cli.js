#!/usr/bin/env node
console.log('Oi CLI!');

const chalk = require('chalk');
const { readFile } = require('./mdlinks');

const input = process.argv;
console.log(input);

const path = process.argv[2];

readFile(path)
.then((content) => {
    console.log(chalk.bgGrey(content))
});
