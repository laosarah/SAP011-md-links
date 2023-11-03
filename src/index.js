const fs = require('fs');
const fetch = require('node-fetch');

// função extrair links de arquivo .md
function extractLinks(fileContent, filePath) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const matches = [...fileContent.matchAll(regex)];
  const links = matches.map((match) => ({
    text: match[1],
    href: match[2],
    file: filePath,
  })
  )
  return links;
}

// função validar links do arquivo .md (argumento: link)
function linkValidation(link) {
  return fetch(link.href).then((response) => {
    if(!response.ok) {
      link.valid = false;
      link.error = response.status;
    } else {
      link.valid = true;
      link.status = response.status;
    }
    return link;
  })
}

// função estatistica links do arquivo .md (argumento: links)
function linkStatistics(links, checkingBroken) {
  const totalLinks = links.length;
  const uniqueLinks = new Set(links.map(link => link.href)).size;
  if(checkingBroken) {
    const brokenLinks = links.filter(link => link.status !== 200).length;
    return {
      total: totalLinks,
      unique: uniqueLinks,
      broken: brokenLinks,
    };
  } else {
    return {
      total: totalLinks,
      unique: uniqueLinks,
    };
  }
}

module.exports = { extractLinks, linkValidation, linkStatistics };