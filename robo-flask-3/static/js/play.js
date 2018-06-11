let draggedElement;

// Dragged element.
function onDragStart(evt) 
{
    draggedElement = evt.target.closest('.draggable');

    if (hasClass(draggedElement.parentNode, 'target'))  // Dragged from source.
    {
        setTimeout(function(){addClass(draggedElement, 'hide-source');});
    }

    //const o = JSON.stringify({id:evt.target.id, parentId:evt.target.parentNode.id})
    //evt.dataTransfer.setData('text/plain', o);
}
function onDragEnd(evt) 
{
    // Dragged outside target box.
    if (hasClass(draggedElement.parentNode, 'target') && evt.dataTransfer.dropEffect === 'none') remove(draggedElement);
}

// Target element.
function onDragOver(evt) 
{
    evt.preventDefault();
    if (hasClass(draggedElement.parentNode, 'source'))  // Dragged from source.
        evt.dataTransfer.dropEffect = 'copy';
    else                                                // Dragged from target.
        evt.dataTransfer.dropEffect = 'move';
}
function onDragEnter(evt) 
{
    const elt = evt.target.closest('.draggable');
    if (elt !== null) addClass(elt, 'draggable-on-drag-over');
}
function onDragLeave(evt) 
{
    const elt = evt.target.closest('.draggable')
    if (elt !== null) removeClass(elt, 'draggable-on-drag-over');
}
function onDrop(evt) 
{
    const elts = document.querySelectorAll('.draggable');
    for (let elt of elts)
    { 
        removeClass(elt, 'draggable-on-drag-over');
        removeClass(elt, 'hide-source');
    }

    let draggable;
    if (hasClass(draggedElement.parentNode, 'source'))  // Dragged from source.
        draggable = draggedElement.cloneNode(true);
    else                                                // Dragged from target.
        draggable = draggedElement;

    if (hasClass(evt.target, 'target'))     // Dropped on to target.
        evt.target.appendChild(draggable);  
    else                                    // Dropped on to another draggable.
        evt.target.closest('.draggable').parentNode.insertBefore(draggable, evt.target.closest('.draggable'));


    //const data = JSON.parse(evt.dataTransfer.getData('text'));
   // console.log(data.parentId+" > "+data.id);
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