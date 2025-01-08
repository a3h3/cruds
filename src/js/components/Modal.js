'use strict';

const $overlay = document.createElement('div');
$overlay.classList.add("overlay" , "modal-overlay");

const NoteModel = function(title = 'Untitled', text = 'Add your note ...', time = '') {
    const $model = document.createElement('div');
    $model.classList.add('modal');
    $model.innerHTML = `
        <button class="icon-btn large" aria-label="Close modal" data-close-btn>
                <span class="material-symbols-rounded" aria-hidden="true">close</span>
                <div class="state-layer"></div>
            </button>

            <input type="text" placeholder="Untitled" value="${title}" class="modal-title text-title-medium" data-note-field>
            <textarea placeholder="Take a note..." class="modal-text text-body-large custom-scrollbar" data-note-field>${text}</textarea>

            <div class="modal-footer">
                <span class="time text-label-large">${time}</span>
                <button class="btn text" data-submit-btn>
                    <span class="text-label-large">Save</span>
                    <div class="state-layer"></div>
                </button>
            </div>

        `
    
    const $submitBtn = $model.querySelector('[data-submit-btn]');
    $submitBtn.disabled = true;

    const [$titleField, $textField] = $model.querySelectorAll('[data-note-field]');

    const enableSubmit = function (){
        $submitBtn.disabled = !$titleField.value && !$textField.value;
    }
    $textField.addEventListener('keyup', enableSubmit);
    $titleField.addEventListener('keyup', enableSubmit);

    const open = function(){
    document.body.appendChild($model);
    document.body.appendChild($overlay);
    $titleField.focus();
   }
   // ============================
   const close = function(){
    document.body.removeChild($model);
    document.body.removeChild($overlay);
   }
   const $closeBtn = $model.querySelector('[data-close-btn]');
   $closeBtn.addEventListener('click', close);

   const onSubmit = function (collback) {
    $submitBtn.addEventListener('click', function(){
        const noteData = {
            title: $titleField.value,
            text: $textField.value
        }
        collback(noteData);
    });
   };

   return {open, close, onSubmit}
    
}


const DeleteConfirmModel = function(title){
    const $model = document.createElement('div');
    $model.classList.add('modal');
    $model.innerHTML = `
        <h3 class="modal-title text-title-medium">Are you sure you want to delete <strong>"${title}"</strong>?</h3>
            <div class="modal-footer">
                <button class="btn text" data-action-btn="false">
                    <span class="text-label-large">Cancel</span>
                    <div class="state-layer"></div>
                </button>

                <button class="btn fill" data-action-btn="true">
                    <span class="text-label-large">Delete</span>
                    <div class="state-layer"></div>
                </button>
            </div>
        `;

   const open = function(){
    document.body.appendChild($model);
    document.body.appendChild($overlay);
   } 

   const close = function(){
    document.body.removeChild($model);
    document.body.removeChild($overlay);
   }

   const $actionBtn = $model.querySelectorAll('[data-action-btn]');

   const onSubmit = function(collback){
    $actionBtn.forEach($btn => $btn.addEventListener('click', function(){
        const isConfirm = this.dataset.actionBtn === "true" ? true : false;
        collback(isConfirm);
    }))
   }

   return {open, close, onSubmit}

}


export {DeleteConfirmModel, NoteModel};
