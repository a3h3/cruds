'use strict';

import { NavItem } from './components/NavItem.js';
import { activeNotebook } from './utils.js';
import { Card } from './components/Card.js';

const $sidebarList = document.querySelector('[data-sidebar-list]');
const $notePanelTitle = document.querySelector('[data-note-panle-title]');
const $notePanel = document.querySelector('[data-note-panle]');
const noteCreateBtn = document.querySelectorAll('[data-note-create-btn]');
const emptynotesTemplate = `
            <div class="empty-notes">
            <span class="material-symbols-rounded" aria-hidden="true">note_stack</span>

            <div class="text-headline-smill">
                No notes
            </div>
            </div>
        `;
const disableNoteCreateBtn = function (isThereAnyNotebooks) {
    noteCreateBtn.forEach(($item) => {
        $item[isThereAnyNotebooks ? 'removeAttribute' : 'setAttribute'](
            'disabled',
            ''
        )
    });
}

export const client = {
    notebook: {
        create(notebookData){
            const $navItem = NavItem(notebookData.id , notebookData.name);
            $sidebarList.appendChild($navItem);
            activeNotebook.call($navItem);
            $notePanelTitle.textContent = notebookData.name;
            $notePanel.innerHTML = emptynotesTemplate;
            disableNoteCreateBtn(true);
        },

        read(notebookList){
            disableNoteCreateBtn(notebookList.length);
            
            notebookList.forEach((notebookData , index) => {
                const $navItem = NavItem(notebookData.id , notebookData.name);

                if (index === 0) {
                    activeNotebook.call($navItem);
                    $notePanelTitle.textContent = notebookData.name;
                }
                
                $sidebarList.appendChild($navItem);
            })
        },

        update(notebookId, notebookData){
            const $oldNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const $newNotebook = NavItem(notebookData.id , notebookData.name);

            $notePanelTitle.textContent = notebookData.name;
            $sidebarList.replaceChild($newNotebook, $oldNotebook);
            activeNotebook.call($newNotebook);
        },

        delete(notebookId){
            const $deleteNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const $activeNavItem = $deleteNotebook.nextElementSibling ?? $deleteNotebook.previousElementSibling;
            
            if ($activeNavItem) {
                $activeNavItem.click();
            }else
            {
                $notePanelTitle.innerHTML = '';
                $notePanel.innerHTML = '';
                disableNoteCreateBtn(false);
            }
            $deleteNotebook.remove();
        }
    },

    note: {
        create(noteData){
            if (!$notePanel.querySelector('[data-note]'))
                $notePanel.innerHTML = '';

            const $card = Card(noteData);
            $notePanel.prepend($card);
        },
        read(noteList){

            if (noteList.length) {
                $notePanel.innerHTML = '';

                noteList.forEach(noteData => {
                    const $card = Card(noteData);
                    $notePanel.appendChild($card);
                })
            }else{
                $notePanel.innerHTML = emptynotesTemplate;
            }
        },
        update(noteId, noteData){
            const $oldCard = document.querySelector(`[data-note="${noteId}"]`);
            const $newCard = Card(noteData);
            $notePanel.replaceChild($newCard, $oldCard);
        },
        delete(noteId, isNoteExist) {
            const $deleteNote = document.querySelector(`[data-note="${noteId}"]`);
            $deleteNote.remove();
        
            if (!isNoteExist) {
                $notePanel.innerHTML = emptynotesTemplate;
            }
        }
    }
}