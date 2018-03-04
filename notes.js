const fs = require('fs');
const util = require('./util')

const addNote = (title, body) =>{
   console.log('New Node to be added = ', title, body)

    notes = [];
    note = { title, body};

    try {
        let notesString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesString);
    }catch(exception){ 
        //doing nothing with exception
    }

    const duplicateNotes = notes.filter(note => note.title === title)

    if(duplicateNotes.length === 0){
        notes.push(note);
        fs.writeFileSync('notes-data.json', JSON.stringify(notes))
    }else{
        console.log(`Note with title ${title} exists. Re-enter note with different title`)
    }  
}


const listAll = () =>{
    notes = []
    try {
      let notesString = fs.readFileSync('notes-data.json')
      notes = JSON.parse(notesString)
    } catch (exception) {
      //doing nothing with exception
    }

    if(notes.length){
        console.log('----- NOTES ----')
         notes.forEach((note, index) => {
           console.log(` [Note ${index+1}] - Title = [${note.title}] Body = [${note.body}]`)
         })
    }else{
        console.log('----NOTES NOT FOUND-----')
    }
   
}

module.exports = {
    addNote,
    listAll
}