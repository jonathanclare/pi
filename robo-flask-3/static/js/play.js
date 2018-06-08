let draggedElement;

// Dragged element.
function onDragStart(evt) 
{
    draggedElement = evt.target;
    console.log(draggedElement)
    evt.dataTransfer.dropEffect = 'copy';
    var o = JSON.stringify({id:evt.target.id, parentId:evt.target.parentNode.id});
    evt.dataTransfer.setData('text/plain', o);
}
function onDragEnd(evt) 
{
    if (hasClass(evt.target.parentNode, 'target') && evt.dataTransfer.dropEffect === 'none') remove(evt.target);
}
function onDrop(evt) 
{
    evt.preventDefault();
    if (hasClass(evt.target, 'draggable-on-drag-over')) removeClass(evt.target,'draggable-on-drag-over');

    const data = JSON.parse(evt.dataTransfer.getData('text'));
    console.log(data.parentId+" > "+data.id);

    let cln;
    if (data.parentId === 'source')
    {
        cln = draggedElement.cloneNode(true);

    }
    else // target.
    {
        cln = draggedElement;
    }

    if (evt.target.id === 'target')
        evt.target.appendChild(cln);  
    else if (hasClass(evt.target, 'draggable'))
        evt.target.parentNode.insertBefore(cln, evt.target);
}

// Target element.
function onDragOver(evt) 
{
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}
function onDragEnter(evt) 
{
    if (hasClass(evt.target, 'draggable')) addClass(evt.target, 'draggable-on-drag-over');
}
function onDragLeave(evt) 
{
    if (hasClass(evt.target, 'draggable-on-drag-over')) removeClass(evt.target, 'draggable-on-drag-over');
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