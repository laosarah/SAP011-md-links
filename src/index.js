const fs = require('fs');
const fetch = require('node-fetch');

// função extrair links de arquivo .md
function extractLinks(path, options) {
  return fs.promises.readFile(path, 'utf8')
  .then ((fileContent) => {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const newArray = [...fileContent.matchAll(regex)];
    const links = newArray.map((link) => ({
      text: link[1],
      url: link[2],
      file: path,
    })
    )
    if (options.validate) {
      const validations = links.map((link) => 
        linkValidation(link)
      );
      return Promise.all(validations);
    }
    return links;
  })
};

// função para validar os links do arquivo .md
function linkValidation(link) {
  return fetch(link.url)
    .then(response => {
      if(response.ok) {
        link.valid = true;
        link.status = response.status;
      } else {
        link.valid = false;
        link.status = response.status;
      }
      return link;
    })
    .catch(error => {
      link.valid = false;
      link.error = error.message;
      return link;
    });
}

module.exports = { extractLinks, linkValidation };