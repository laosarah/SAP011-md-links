// função para ler arquivo 
const fs = require('fs');

function readFile(path) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

module.exports = { readFile };
