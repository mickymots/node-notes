console.log('\n----- app started ------\n')

const util = require('./util');
const notes = require('./notes');
const _ = require('lodash');
const fs = require('fs')
const yargs = require('yargs')

//console.log(yargs.argv);

const command = yargs.argv._[0];
const argv = yargs.argv

if (command === 'add') {
  notes.addNote(argv.title, argv.body)
} else if (command === 'list') {
  notes.listAll()
}

console.log('\n----- app ended ------\n');