console.log('\n----- app started ------\n')

const util = require('./util');
const notes = require('./notes');
const _ = require('lodash');
const fs = require('fs')
const yargs = require('yargs')

//console.log(yargs.argv);


const argv = yargs
  .command('add', {
    title: {
      describe: 'Title',
      demand: true,
      alias: 't'
    },
    body: {
      describe: 'Note Body',
      demand: true,
      alias: 'b'
    }
  })
  .help().argv
  

const command = yargs.argv._[0]

if (command === 'add') {
  notes.addNote(argv.title, argv.body)
} else if (command === 'list') {
  notes.listAll()
} else if (command === 'remove') {
  notes.deleteNote(argv.title)
}else 
 notes.listAll()
console.log('\n----- app ended ------\n');