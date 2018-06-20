import * as dom from './dom.js';

let dragElement = null;
let dragOrigin = null;
let dropZone = null;
let overBin = false

dom.on('.box', 'dragstart dragend', evt => 
{
    switch (evt.type) 
    {
        case 'dragstart':
            onDragStart(evt);
        break;
        case 'dragend':
            onDragEnd(evt);
        break;
    }
});
dom.on('.target', 'dragenter dragover', evt => 
{
    switch (evt.type) 
    {
        case 'dragenter':
            onDragEnter(evt);
        break;
        case 'dragover':
            onDragOver(evt);
        break;
    }
});
dom.on('.bin', 'dragenter dragover dragleave drop', evt => 
{
    switch (evt.type) 
    {
        case 'dragenter':
            dom.addClass(evt.target.closest('.bin'), 'bin-on-drag-over');
        break;
        case 'dragover':
            evt.preventDefault();
            overBin = true;
            evt.dataTransfer.dropEffect = 'move';
        break;
        case 'dragleave':
            overBin = false;
            dom.removeClass(evt.target.closest('.bin'), 'bin-on-drag-over');
        break;
        case 'drop':
            dom.removeClass(evt.target.closest('.bin'), 'bin-on-drag-over');
        break;
    }
}); 

// Box element enters target element.
const onDragEnter = evt => 
{
    updateCursor(evt);

    const container = evt.target.closest('.container');
    if (container !== null) 
        container.parentNode.insertBefore(dropZone, container);
    else if (dom.hasClass(evt.target, 'target'))
        evt.target.append(dropZone);
};

// Box element dragged over target element.
const onDragOver = evt => 
{
    updateCursor(evt);
};

const updateCursor = evt =>
{
    evt.preventDefault();
    if (dragOrigin === 'source')
        evt.dataTransfer.dropEffect = 'copy';
    else
        evt.dataTransfer.dropEffect = 'move';
};

// Start dragging box element.
const onDragStart = evt => 
{
    dragElement = evt.target;

    dropZone = document.createElement('div');
    dom.addClass(dropZone, 'drop-zone');
    dropZone.appendChild(evt.target.cloneNode(true))

    dom.addClass(document.querySelector('.target'), 'target-highlight');
    dom.addClass(document.querySelector('.bin'), 'bin-highlight');

    if (dom.arrHasClass(evt.path, 'target')) 
    {
        dragOrigin = 'target';
        setTimeout(function() {evt.target.parentNode.remove();}); // Hide container if dragged from target box.
    }
    else dragOrigin = 'source'

    //const o = JSON.stringify({id:evt.target.id, parentId:evt.target.parentNode.id})
    //evt.dataTransfer.setData('text/plain', o);
};

// End dragging box element.
const onDragEnd = evt =>
{
    if (dropZone.parentNode !== null && overBin === false) 
    {
        dom.removeClass(dropZone, 'drop-zone');
        dom.addClass(dropZone, 'container');
        dom.on(dropZone.querySelector('.box'), 'dragstart dragend', evt => 
        {
            if (evt.type === 'dragstart') onDragStart(evt);
            else if (evt.type === 'dragend') onDragEnd(evt);
        });
    }
    else dropZone.remove();

    overBin = false;
    dom.removeClass(document.querySelector('.target'), 'target-highlight');
    dom.removeClass(document.querySelector('.bin'), 'bin-highlight');
};