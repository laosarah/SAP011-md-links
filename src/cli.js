#!/usr/bin/env node

const { mdLinks } = require('./mdlinks.js');

// caminho do arquivo que o usuário irá fornecer
const path = process.argv[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
}
console.log(options);

mdLinks(path, options).then((links) => {
  console.log((links));
});
