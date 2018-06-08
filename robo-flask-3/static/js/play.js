let draggedElement;

// Target element.
function onDragOver(evt) 
{
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}
function onDragEnter(evt) 
{
    console.log(evt.target.id);
    if (evt.target.id !== 'target' && !hasClass(evt.target, 'box-hover')) 
    {
        console.log('add class')
        addClass(evt.target, 'box-hover');
    }
}
function onDragLeave(evt) 
{
    removeClass(evt.target,'box-hover');
}


// Dragged element.
function onDragStart(evt) 
{
    draggedElement = evt.target;
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
    removeClass(evt.target,'box-hover');

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
    else  
        evt.target.parentNode.insertBefore(cln, evt.target);
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