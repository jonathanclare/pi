let dragElement;
let dragOrigin;
let dragTarget;

// Dragged element.
function onDragStart(evt) 
{
    dragElement = evt.target;

    if (arrHasClass(evt.path, 'target')) 
        dragOrigin = 'target';
    else
        dragOrigin = 'div'

    // Hide if dragged from target box.
    if (dragOrigin === 'target') setTimeout(function() 
    {
        dragElement.parentNode.remove();
    });

    //const o = JSON.stringify({id:evt.target.id, parentId:evt.target.parentNode.id})
    //evt.dataTransfer.setData('text/plain', o);
}
function onDragEnd(evt) 
{
    if (dragTarget !== undefined) dropElement(dragElement.cloneNode(true));


    const elts = document.querySelectorAll('.place-holder');
    for (let elt of elts)
    { 
        elt.remove();
        //removeClass(elt, 'container-on-drag-over');
    }

}

// Target element.
function onDragOver(evt) 
{
    evt.preventDefault();
    if (dragOrigin === 'source')                // Dragged from source.
        evt.dataTransfer.dropEffect = 'copy';
    else                                        // Dragged from target.
        evt.dataTransfer.dropEffect = 'move';
}
function onDragEnter(evt) 
{
    console.log("onDragEnter")
    const elts = document.querySelectorAll('.place-holder');
    for (let elt of elts)
    { 
        elt.remove();
        //removeClass(elt, 'container-on-drag-over');
    }
    if (evt.target.closest('.container') !== null)
    {
        dragTarget = evt.target.closest('.container');
        const cln = dragElement.cloneNode(true);
        cln.setAttribute('ondrop', 'onDrop(event)');
        cln.setAttribute('ondragover', 'onDragOver(event)');
        addClass(cln, 'place-holder');
        dragTarget.parentNode.insertBefore(cln, dragTarget);
    }

    //const container = evt.target.closest('.container');
    //if (container !== null) addClass(container, 'container-on-drag-over');
}
function onDragLeave(evt) 
{
    console.log("onDragLeave")
    //const container = evt.target.closest('.container')
    //if (container !== null) removeClass(container, 'container-on-drag-over');
}
const onDrop = evt =>
{

    dropElement(dragElement.cloneNode(true));

    // const data = JSON.parse(evt.dataTransfer.getData('text'));
    // console.log(data.parentId+" > "+data.id);
}



    //if (dragOrigin === 'target' && evt.dataTransfer.dropEffect === 'none') remove(dragElement);
function onBinOver(evt) 
{
    evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';

}
function onBinEnter(evt) 
{

}
function onBinLeave(evt) 
{

}
const onBinDrop = evt =>
{
    const elts = document.querySelectorAll('.place-holder');
    for (let elt of elts)
    { 
        elt.remove();
        //removeClass(elt, 'container-on-drag-over');
    }

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
function dropElement(elt)
{

    const container = document.createElement('div');
    addClass(container, 'container');
    container.setAttribute('ondragover', 'onDragOver(event)');
    container.setAttribute('ondragenter', 'onDragEnter(event)');
    container.setAttribute('ondragleave', 'onDragLeave(event)');
    container.setAttribute('ondrop', 'onDrop(event)');
    container.appendChild(elt);


    dragTarget.parentNode.insertBefore(container, dragTarget);

    dragTarget = undefined;
    //const closestContainer = target.closest('.container');
    //closestContainer.parentNode.insertBefore(container, closestContainer);
}
const on = (selectors, strEvents, listener, useCapture) =>
{
    useCapture = useCapture === undefined ? true : false;
    if (typeof selectors === 'string')
    {
        const nodeList = document.querySelectorAll(selectors);
        for (let node of nodeList)
        {
            for (var strEvent of strEvents.split(' ')) node.addEventListener(strEvent, listener, useCapture);
        }
    }
    else
    {
        for (var strEvent of strEvents.split(' ')) selectors.addEventListener(strEvent, listener, useCapture);
    }
};