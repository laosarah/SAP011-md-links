const fs = require('fs');

// função extrair links de arquivo .md
function extractLinks(path) {
  return fs.promises.readFile(path, 'utf8')
  .then ((fileContent) => {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const matches = [...fileContent.matchAll(regex)];
    const links = matches.map((link) => ({
      text: link[1],
      url: link[2],
      file: path,
    })
    )
    return links;
  })
};

module.exports = { extractLinks };
