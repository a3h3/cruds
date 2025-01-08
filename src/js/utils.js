'use strict';
import { db } from './db.js';


/**
 * Adds an event listener to an array of elements.

 * @param {Array<HTMLElement>} $elements - The array of elements to add the event listener to.
 * @param {string} eventType - The type of event to listen for.
 * @param {Function} callback - The function to execute when the event is triggered.
 */


const addEventOnElements = function ($elements, eventType, callback)  
{
    $elements.forEach($elements => $elements.addEventListener(eventType, callback));
}

/**
 * @param {number} currentHour - 
 * @param {string} -
 */

const $getGreetingMessage = function (currentHour){
    const greeting = 
    currentHour > 5 ? 'Night' : 
    currentHour > 12? 'Morning' :
    currentHour > 15? 'Noon' :
    currentHour > 17? 'Afternoon' :
    currentHour > 20? 'Evening' :
    'Night';

    return `Good ${greeting}`;
}

let lastActiveNavItems;

const activeNotebook = function (){
    lastActiveNavItems?.classList.remove('active');
    this.classList.add('active');
    lastActiveNavItems = this;
}

const makeElemEditable = function ($element){
    $element.setAttribute('contenteditable', true);
    $element.focus();
}

const generateID = function(){
    return new Date().getTime().toString();
}

const findNotebook = function(db , notebookId){
    return db.notebooks.find(notebook => notebook.id === notebookId);
}

const findNotebookIndex = function(db , notebookId){
    return db.notebooks.findIndex(item => item.id === notebookId);
}

const getRelativeTime = function (milliseconds){
    const currentTime = new Date().getTime();
    const minute = Math.floor((currentTime - milliseconds) / 1000 / 60);
    const hour = Math.floor(minute / 60);
    const day = Math.floor(hour / 24);

    return minute < 1 ? 'just now' : minute < 60 ? `${minute} min age` : hour < 24 ? `${hour} hour age` : `${day} day age`;
}

const findNote = (db, noteId) => {
    let note;
    for (const notebook of db.notebooks){
        note = notebook.notes.find(note => note.id === noteId);
        if(note) break;
    }
    return note;
}

const findNoteIndex = function(notebook ,noteId){
    return notebook.notes.findIndex(item => item.id === noteId);
}

export{
    addEventOnElements,
    $getGreetingMessage,
    activeNotebook,
    makeElemEditable,
    generateID,
    findNotebook,
    findNotebookIndex,
    getRelativeTime,
    findNote,
    findNoteIndex
    }