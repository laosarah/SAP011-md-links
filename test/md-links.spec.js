const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { mdLinks } = require('../src/mdlinks');
const { extractLinks, linkValidation, linkStatistics } = require('../src/index.js');
jest.mock('node-fetch', () => jest.fn());

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

describe('mdLinks', () => {
  it('deve retornar uma Promise', () => {
    fs.promises.readFile.mockResolvedValue('[Exemplo texto 01](https://link1.com)');
    return mdLinks('./files-links/file-existing-links.md', { validate: false, stats: false }).then((result) => {
      expect(result).toEqual(
        {"links": [{
          "file": "/Users/sarahlao/tutoriais/laboratoria/SAP011-md-links/SAP011-md-links/files-links/file-existing-links.md",
          "href": "https://link1.com",
          "text": "Exemplo texto 01"}],
          "stats": {}
        }
      );
    });
  });
});

const fileContent = '[Exemplo texto 01](https://link1.com)';
const filePath = './files-links/file-existing-links.md';

const expectedExtract = [
  { text: 'Exemplo texto 01', href: 'https://link1.com', file: filePath },
];
const result = extractLinks(fileContent, filePath);

describe('extractLinks', () => {
  it('deve extrair os links do arquivo', () => {
    expect(result).toEqual(expectedExtract);
  });
});

describe('linkValidation', () => {
  it('deve validar links no arquivo', () => {
    const response = Promise.resolve({
      ok: true,
      status: 200,
      json: () => {
          return returnBody ? returnBody : {};
      },
     })
    fetch.mockImplementation(()=> response)
    linkValidation({ href: 'https://link2.com' }).then((result) => {
      expect(result).toStrictEqual({ href: 'https://link2.com', status: 200, valid: true });
    })
    })
  });

describe('linkStatistics', () => {
  const arrayLinks = [
    {
      text: 'Exemplo texto 01',
      href: 'https://link1.com',
      file: '/files-links/links-test1.md'
    },
    {
      text: 'Exemplo texto 02',
      href: 'https://link2.com',
      file: '/files-links/links-test2.md'
    },
    {
      text: 'Exemplo texto 02',
      href: 'https://link2.com',
      file: '/files-links/links-test2.md'
    },
    {
      text: 'Exemplo texto 03',
      href: 'https://link3.com',
      file: '/files-links/links-test3.md'
    }
  ]

  const broken = arrayLinks !== 200;

  it('deveria retorna um objeto com tres valores', () => {
    expect(linkStatistics(arrayLinks)).toEqual( {"total": 4, "unique": 3} );
  });
});
