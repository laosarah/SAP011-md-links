#!/usr/bin/env node

const { extractLinks, linkValidation } = require('./index.js');

// caminho do arquivo que o usuário irá fornecer
const path = process.argv[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
}
console.log(options);

extractLinks(path, options).then((links) => {
  console.log((links));
});
