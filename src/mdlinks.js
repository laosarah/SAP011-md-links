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
      let links = extractLinks(fileContent, absolutePath)
      if(links.length === 0) {
        reject(new Error('No links found in this file'));
      }
      if(options.validate) {
        links = links.map(link => linkValidation(link));
        Promise.all(links)
        .then((linksValidated) => {
          let stats = {};
          if(options.stats) {
            stats = linkStatistics(linksValidated, true);
          }
          resolve({ links: linksValidated, stats: stats });
        }).catch(reject);
      } else {
        let stats = {};
        if(options.stats) {
          stats = linkStatistics(links, false);
        }
        resolve({ links: links, stats: stats });
      }
    })
    .catch(reject);
  });
}

module.exports = { mdLinks };