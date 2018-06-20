import * as dom from './dom.js';

let dragElement = null;
let dragOrigin = null;
let dropZone = null;
let placeHolder;
let overBin = false


dom.on('.box', 'dragstart dragend', evt => 
{
    if (evt.type === 'dragstart') 
        boxOnDragStart(evt);
    else if (evt.type === 'dragend') 
        boxOnDragEnd(evt);
});
dom.on('.bin', 'drop dragover dragenter dragleave', evt => 
{
    if (evt.type === 'dragover')
    {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
        overBin = true;
    }
    else if (evt.type === 'dragenter') 
    {
        dom.addClass(evt.target.closest('.bin'), 'bin-on-drag-over');
    }
    else if (evt.type === 'drop') 
    {
    console.log('drop')
        dom.removeClass(evt.target.closest('.bin'), 'bin-on-drag-over');
    }
    else if (evt.type === 'dragleave') 
    {
        overBin = false;
        dom.removeClass(evt.target.closest('.bin'), 'bin-on-drag-over');
    }
}); 
dom.on('.target', 'dragover dragenter', evt => 
{
    if (evt.type === 'dragover')
    {
        evt.preventDefault();
        if (dragOrigin === 'source')                // Dragged from source.
            evt.dataTransfer.dropEffect = 'copy';
        else                                        // Dragged from target.
            evt.dataTransfer.dropEffect = 'move';
    }
    else if (evt.type === 'dragenter')
    {
        if (evt.target.closest('.target-container') !== null) 
        {
            dropZone = evt.target.closest('.target-container');
            dropZone.parentNode.insertBefore(placeHolder, dropZone);
        }
        else if (evt.target.querySelector('.target-container:last-child') !== null)
        {
            dropZone = evt.target.querySelector('.target-container:last-child');
            dropZone.parentNode.insertBefore(placeHolder, dropZone);
        }
    }
});


// Box element (element being dragged).
const boxOnDragStart = evt => 
{
    dragElement = evt.target;

    placeHolder = dragElement.cloneNode(true);
    dom.addClass(placeHolder, 'place-holder');

    dom.addClass(document.querySelector('.target'), 'target-highlight');
    dom.addClass(document.querySelector('.bin'), 'bin-highlight');

    if (dom.arrHasClass(evt.path, 'target')) 
    {
        dragOrigin = 'target';
        setTimeout(function() {dragElement.parentNode.remove();}); // Hide container if dragged from target box.
    }
    else dragOrigin = 'source'


    const o = JSON.stringify({id:evt.target.id, parentId:evt.target.parentNode.id})
    evt.dataTransfer.setData('text/plain', o);
}
const boxOnDragEnd = evt =>
{
    if (dropZone !== null && overBin === false) 
    {
        const container = document.querySelector('.master-container').cloneNode(true);
        dom.removeClass(container, 'master-container');

        const cln = dragElement.cloneNode(true);
        dom.on(cln, 'dragstart dragend', evt => 
        {
            if (evt.type === 'dragstart') boxOnDragStart(evt);
            else if (evt.type === 'dragend') boxOnDragEnd(evt);
        });
        container.appendChild(cln);
        dropZone.parentNode.insertBefore(container, dropZone);

    }
    placeHolder.remove();
    overBin = false;
    dropZone = null;

    dom.removeClass(document.querySelector('.target'), 'target-highlight');
    dom.removeClass(document.querySelector('.bin'), 'bin-highlight');
}