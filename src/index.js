const fs = require('fs');
const fetch = require('node-fetch');

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

module.exports = { linkValidation };
