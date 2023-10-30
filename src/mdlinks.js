const fs = require('fs');
const path = require('path');
const { extractLinks, linkValidation, linkStatistics } = require('./index.js');

// função mdLinks
function mdLinks(filePath, options) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath);
    if(path.extname(absolutePath).toLowerCase() !== '.md') {
      reject(new Error('Incompatible file: not a Markdown file'));
    }
    fs.promises.readFile(absolutePath, 'utf8')
    .then((fileContent) => {
      const links = extractLinks(fileContent, absolutePath)
      if(links.length === 0) {
        reject(new Error('No links found in this file'));
      }
      if(options.validate || options.stats) {
        const linkValidationPromises = links.map(link => linkValidation(link));
        Promise.all(linkValidationPromises)
          .then((link) => {
            if(options.stats) {
              const stats = linkStatistics(link);
              resolve({ links: link, stats: stats });
            } else {
              resolve(link);
            }
          })
          .catch(reject);
        } else {
          resolve(links);
        }
      })
      .catch(reject);
    });
}

module.exports = { mdLinks };
