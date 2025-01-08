'use strict';


import { addEventOnElements, $getGreetingMessage, activeNotebook, makeElemEditable } from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";
import { db } from "./db.js";
import { client } from "./client.js";
import { NoteModel } from "./components/Modal.js";

// toggle sidebar ========================================

const $sidebar = document.querySelector('[data-sidebar]');
const $sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]');
const $overlay = document.querySelector('[data-sidebar-overlay]');

addEventOnElements($sidebarTogglers, 'click', function(){
    $sidebar.classList.toggle('active');
    $overlay.classList.toggle('active');
});


const $tooltipElm = document.querySelectorAll('[data-tooltip]');

$tooltipElm.forEach(elem => Tooltip(elem));


// show greeting message on homepage======================

const $greetEle= document.querySelector('[data-greeting]');
const currentHour = new Date().getHours();

$greetEle.textContent = $getGreetingMessage(currentHour)

// show current data on homepage==========================

const $currenDateEle = document.querySelector('[data-current-date]');
const currentDate = new Date().toDateString();

$currenDateEle.textContent = currentDate;

// noteBook create ele==============================

const $sidebarList = document.querySelector('[data-sidebar-list]');
const $addNotebookBtn = document.querySelector('[data-add-notebook]');

const showNotebookField = function (){
    const $navItem = document.createElement('div');
    $navItem.classList.add('nav-item');
    $navItem.innerHTML = `
     <span class="text text-label-large" data-notebook-field></span>
     <div class="state-layer"></div>
    `;
    $sidebarList.appendChild($navItem);

    const $navItemField = $navItem.querySelector('[data-notebook-field]')
    activeNotebook.call($navItem)
    makeElemEditable($navItemField)

    $navItemField.addEventListener('keydown', createNotebook)
}

$addNotebookBtn.addEventListener('click', showNotebookField);

const createNotebook = function (event){
    if (event.key === 'Enter'){
        const notebookData = db.post.notebook(this.textContent || 'Untitled');
        this.parentElement.remove();

        client.notebook.create(notebookData);
    }
}

// notebook edit ele==============================

const renderExistedNotebook = function(){
    const notebookList = db.get.notebook();
    // console.log(notebookList);
    client.notebook.read(notebookList);
}

renderExistedNotebook();

//create New note ele=========================================

const $createNoteBtn = document.querySelectorAll('[data-note-create-btn]');

addEventOnElements($createNoteBtn, 'click', function(){
    const model = NoteModel();
    model.open();

    model.onSubmit(noteObj => {
       const activeNotebookId = document.querySelector('[data-notebook].active').dataset.notebook;
       
       const noteData = db.post.note(activeNotebookId, noteObj);

       client.note.create(noteData);
       model.close();
    });
});

// note edit ele==============================================

const renderExistedNote = function (){
    const activeNotebookId = document.querySelector('[data-notebook].active')?.dataset.notebook; 
    if(activeNotebookId){
        const noteList = db.get.note(activeNotebookId);
        // console.log(noteList);
        client.note.read(noteList);
    }
}

renderExistedNote();