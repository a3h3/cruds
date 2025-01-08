'use strict';


/**
 * @param {HTMLElement} $elment - The function to execute when the event is triggered.
 */



export const Tooltip = function ($elment){
    const $tooltip = document.createElement('span');
    $tooltip.classList.add('tooltip' , 'text-body-small');

    $elment.addEventListener('mouseenter', function(){
        $tooltip.textContent = this.dataset.tooltip;
        const {
            top,
            left,
            width,
            height
            } = this.getBoundingClientRect();

            $tooltip.style.top = `${top + height + 4}px`;
            $tooltip.style.left = `${left + width / 2}px`;
            $tooltip.style.transform = 'translate(-50% , 0)';
            document.body.appendChild($tooltip);
    });
    $elment.addEventListener('mouseleave', function(){
        $tooltip.remove();
    });
}