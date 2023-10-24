#!/usr/bin/env node

const { extractLinks } = require('./mdlinks');

const path = process.argv[2];

extractLinks(path).then((links) => {
    console.log((links));
});

// console.log(extractLinks(path));
