import * as dom from './dom.js';

let dragElement = null;
let dragOrigin = null;
let dropZone = null;
let placeHolder;
let overBin = false

dom.on('.box', 'dragstart dragend', evt => 
{
    if (evt.type === 'dragstart') boxOnDragStart(evt);
    else if (evt.type === 'dragend') boxOnDragEnd(evt);
});
dom.on('.bin', 'drop dragover dragenter dragleave', evt => 
{
    if (evt.type === 'drop') binOnDrop(evt);
    else if (evt.type === 'dragover') binOnDragOver(evt);
    else if (evt.type === 'dragenter') binOnDragEnter(evt);
    else if (evt.type === 'dragleave') binOnDragLeave(evt);
}); 
dom.on('.target', 'dragover', evt => 
{
    if (evt.type === 'dragover') targetOnDragOver(evt);
}); 
dom.on('.target', 'dragenter', evt => 
{
    if (evt.type === 'dragenter') containerOnDragEnter(evt);
}, true); 


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

    //const o = JSON.stringify({id:evt.target.id, parentId:evt.target.parentNode.id})
    //evt.dataTransfer.setData('text/plain', o);
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
            console.log("dragstart")
            if (evt.type === 'dragstart') boxOnDragStart(evt);
            else if (evt.type === 'dragend') boxOnDragEnd(evt);
        });
        container.appendChild(cln);
        console.log(container)
        dropZone.parentNode.insertBefore(container, dropZone);

    }
    placeHolder.remove();
    overBin = false;
    dropZone = null;

    dom.removeClass(document.querySelector('.target'), 'target-highlight');
    dom.removeClass(document.querySelector('.bin'), 'bin-highlight');
}

// Target.
const targetOnDragOver = evt =>
{
    if (dropZone !== null) 
    {
        evt.preventDefault();
        if (dragOrigin === 'source')                // Dragged from source.
            evt.dataTransfer.dropEffect = 'copy';
        else                                        // Dragged from target.
            evt.dataTransfer.dropEffect = 'move';
    }
}

// Container elements (drop zones).
const containerOnDragEnter = evt =>
{
    console.log("containerOnDragEnter")
    console.log(evt.target)
    dropZone = evt.target.closest('.target-container');
    console.log(dropZone)
    if (dropZone !== null) dropZone.parentNode.insertBefore(placeHolder, dropZone);
}

// Bin element.
const binOnDragOver = evt =>
{
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
    overBin = true;
}
const binOnDragEnter = evt =>
{
    dom.addClass(evt.target.closest('.bin'), 'bin-on-drag-over');
}
const binOnDragLeave = evt => 
{
    overBin = false;
    dom.removeClass(evt.target.closest('.bin'), 'bin-on-drag-over');
}
const binOnDrop = evt =>
{
    dom.removeClass(evt.target.closest('.bin'), 'bin-on-drag-over');
}