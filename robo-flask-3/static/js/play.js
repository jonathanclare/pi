let dragElement = null;
let dragOrigin = null;
let dropZone = null;
let overBin = false

// Box element (element being dragged).
const boxOnDragStart = evt => 
{
    dragElement = evt.target;

    if (arrHasClass(evt.path, 'target')) 
        dragOrigin = 'target';
    else
        dragOrigin = 'source'

    // Hide if dragged from target box.
    if (dragOrigin === 'target') setTimeout(function() {dragElement.parentNode.remove();});

    //const o = JSON.stringify({id:evt.target.id, parentId:evt.target.parentNode.id})
    //evt.dataTransfer.setData('text/plain', o);
}
const boxOnDragEnd = evt =>
{
    drop();

    const elts = document.querySelectorAll('.place-holder');
    for (let elt of elts)
    { 
        elt.remove();
    }
    overBin = false;
    dragElement = null;
    dragOrigin = null;
}

// Target element.
const onDragOver = evt =>
{
    evt.preventDefault();
    if (dragOrigin === 'source')                // Dragged from source.
        evt.dataTransfer.dropEffect = 'copy';
    else                                        // Dragged from target.
        evt.dataTransfer.dropEffect = 'move';
}

// Container elements (drop zones).
const onDragEnter = evt =>
{
    const placeHolders = document.querySelectorAll('.place-holder');
    for (let elt of placeHolders) {elt.remove();}

    if (evt.target.closest('.container') !== null)
    {
        dropZone = evt.target.closest('.container');
        const placeHolder = dragElement.cloneNode(true);
        addClass(placeHolder, 'place-holder');
        dropZone.parentNode.insertBefore(placeHolder, dropZone);
    }
}
const onDragLeave = evt => 
{

}
const onDrop = evt =>
{
    drop();
    // const data = JSON.parse(evt.dataTransfer.getData('text'));
    // console.log(data.parentId+" > "+data.id);
}


function drop(elt)
{
    if (dropZone !== null && overBin === false) 
    {
        const container = document.querySelector('.master-container').cloneNode(true);
        removeClass(container, 'master-container');
        container.appendChild(dragElement.cloneNode(true));
        dropZone.parentNode.insertBefore(container, dropZone);
        dropZone = null;
    }
}

// Bin element.
const binOnDragOver = evt =>
{
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
}
const binOnDragEnter = evt =>
{
    overBin = true;
    addClass(evt.target, 'bin-hover');
}
const binOnDragLeave = evt => 
{
    overBin = false;
    removeClass(evt.target, 'bin-hover');
}
const binOnDrop = evt =>
{
    removeClass(evt.target, 'bin-hover');
}

// Util functions.
function addClass (elt, className)
{
    elt.className += ' ' + className;
}
function removeClass (elt, className)
{
    elt.className = elt.className.replace(new RegExp('(?:^|\\s)'+ className + '(?:\\s|$)'), ' ');
}
function hasClass (elt, className)
{
    return (' ' + elt.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + className + ' ') > -1;
}
function remove (elt)
{
    elt.parentNode.removeChild(elt);
};
function arrHasClass (arrElts, className)
{
    for (let elt of arrElts)
    {
        if (hasClass(elt, className)) return true;
    }
    return false;
}