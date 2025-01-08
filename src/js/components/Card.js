'use strict';

import { Tooltip } from "./Tooltip.js";
import { getRelativeTime } from "../utils.js"
import { DeleteConfirmModel , NoteModel } from "./Modal.js";
import { db } from "../db.js";
import { client } from "../client.js";

export const Card = function(noteData){
    const {id, title, text, postedOn, notebookId } = noteData;
    const $card = document.createElement('div');
    $card.classList.add('card');
    $card.setAttribute('data-note', id);
    $card.innerHTML = `
            <h3 class="card-title text-title-medium">${title}</h3>

            <p class="card-text text-body-large">${text}</p>

            <div class="wrapper">
                <span class="card-time text-label-large">${getRelativeTime(postedOn)}</span>
                <button class="icon-btn large" aria-label="Delete note" data-tooltip="Delete note" data-delete-btn>
                    <span class="material-symbols-rounded" aria-hidden="true">delete</span>
                    <div class="state-layer"></div>
                </button>
            </div>

            <div class="state-layer"></div>
        `

    Tooltip($card.querySelector('[data-tooltip]'));

    $card.addEventListener('click', function(){
        const model = NoteModel(title, text, getRelativeTime(postedOn));
        model.open();

        model.onSubmit(function (noteData){
           const  updatedData = db.update.note(id, noteData);
           client.note.update(id, updatedData);
            model.close();
        })
    });


    const $deleteBtn = $card.querySelector('[data-delete-btn]');
    $deleteBtn.addEventListener('click', function(event){
        event.stopImmediatePropagation();
        const model = DeleteConfirmModel(title);
        model.open();

        model.onSubmit(function(isConfirm){
            if(isConfirm){
                const existedNodes =  db.delete.note(notebookId, id);
                client.note.delete(id, existedNodes.length);

            }
            model.close();
        })
    });
    
    return $card;
}