'use strict';

import { generateID, findNotebook, findNotebookIndex, findNote, findNoteIndex } from "./utils.js";


// DB opject ===================
let noteKeeperDB = {};


const initDB = function(){
    const db = localStorage.getItem('noteKeeperDB');
    if(db){
        noteKeeperDB = JSON.parse(db);
    }else{
        noteKeeperDB.notebooks = [];
        localStorage.setItem('noteKeeperDB', JSON.stringify(noteKeeperDB));
    }
}
initDB();

const readDB = function(){
    noteKeeperDB = JSON.parse(localStorage.getItem('noteKeeperDB'));
}

const writeDB = function(){
    localStorage.setItem('noteKeeperDB', JSON.stringify(noteKeeperDB));
}


export const db = {
    post: {
        notebook(name){
            readDB();
            
            const notebookData = {
                id: generateID(),
                name,
                notes: []
            }
            noteKeeperDB.notebooks.push(notebookData);

            writeDB();
            return notebookData;
        },

        note(notebookId, object){
            readDB();

            const notebook = findNotebook(noteKeeperDB, notebookId);
            const noteData = {
                id: generateID(),
                notebookId,
                ...object,
                postedOn: new Date().getTime(),
            }

            console.log(noteData);
            notebook.notes.unshift(noteData);

            writeDB();

            return noteData;
        }
    },

    get: {
        notebook(){
            readDB();

            return noteKeeperDB.notebooks;
        },

        note(notebookId){
            readDB();

            const notebook = findNotebook(noteKeeperDB, notebookId);
            return notebook.notes;

            // writeDB();
        }
    },

    update: {
        notebook(notebookId, name){
            readDB();

            const notebook = findNotebook(noteKeeperDB, notebookId);
            notebook.name = name;

            writeDB();

            return notebook;
        },
        note(noteId, object){
            readDB();

            const oldNote = findNote(noteKeeperDB, noteId);
            const newNote = Object.assign(oldNote, object);

            writeDB();

            return newNote;
        }
    },

    delete: {
        notebook(notebookId){
            readDB();

            const notebookIndex = findNotebookIndex(noteKeeperDB, notebookId);
            noteKeeperDB.notebooks.splice(notebookIndex, 1);
            
            writeDB();
        },
        note(notebookId, noteId){
            readDB();

            const notebook = findNotebook(noteKeeperDB, notebookId);
            const noteIndex = findNoteIndex(notebook, noteId);
            notebook.notes.splice(noteIndex, 1);

            writeDB();
            return notebook.notes;
        }
    },



};