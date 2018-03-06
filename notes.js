const fs = require('fs');
const util = require('./util')

const addNote = (title, body) => {
    console.log('New Node to be added = ', title, body)
    notes = fetchNotes();
    const duplicateNotes = notes.filter(note => note.title === title)

    if (duplicateNotes.length === 0) {
        note = {
            title,
            body
        }
        notes.push(note);
        saveNotes(notes)
    } else {
        console.log(`Note with title ${title} exists. Re-enter note with different title`)
    }
}

const deleteNote = (title) =>{
    console.log("delete node command ")
    notes = fetchNotes();
    const filteredNote = notes.filter(note => note.title !== title)

    if (filteredNote.length !== 0) {
        saveNotes(filteredNote)
    }

    const message = notes.length === filteredNote.length ? 'Note not found' : `${title} note revoved`
    console.log(message);
}

const listAll = () => {
    notes = fetchNotes();

    if (notes.length) {
        console.log('----- NOTES ----')
        notes.forEach((note, index) => {
            console.log(` [Note ${index+1}] - Title = [${note.title}] Body = [${note.body}]`)
        })
    } else {
        console.log('----NOTES NOT FOUND-----')
    }

}

const fetchNotes = () => {
    notes = []
    try {
        let notesString = fs.readFileSync('notes-data.json')
        notes = JSON.parse(notesString)
    } catch (exception) {
        //doing nothing with exception
    }
    return notes
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}

module.exports = {
    addNote,
    listAll,
    deleteNote
}