/** 
 * Add event listeners to the target element.
 * 
 * @param {string|HtmlElement} 		selectors  	A list of selectors or a HtmlElement
 * @param {string}      			types   	A space separated string of event types.
 * @param {Function}    			listener 	The function that receives a notification when an event of the specified type occurs.
 */
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

/**
 * Get the window object of an element.
 * 
 * @param {HTMLElement} element The target element.
 * @returns {DocumentView|Window} The window.
 */
const getWindowForElement = element =>
{
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
};

const addClass = (elt, className) =>
{
    elt.className += ' ' + className;
}

const removeClass = (elt, className) =>
{
    elt.className = elt.className.replace(new RegExp('(?:^|\\s)'+ className + '(?:\\s|$)'), ' ');
}

const hasClass = (elt, className) =>
{
    return (' ' + elt.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + className + ' ') > -1;
}

const arrHasClass = (arrElts, className) =>
{
    for (let elt of arrElts)
    {
        if (hasClass(elt, className)) return true;
    }
    return false;
}

export {on, getWindowForElement, addClass, removeClass, hasClass, arrHasClass};