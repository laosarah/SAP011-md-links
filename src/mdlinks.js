const fs = require('fs');
const { linkValidation } = require('./index.js');

// função mdLinks
function mdLinks(path, options) {
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
}

module.exports = { mdLinks };
