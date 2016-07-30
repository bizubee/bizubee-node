#!/usr/bin/env node

const bnd   = require('../src/index');
const param = process.argv[2];



const isFile = (param.startsWith('./') || param.startsWith('/'));
const file = (isFile) ? param : `./${param}`;

bnd.run(file);