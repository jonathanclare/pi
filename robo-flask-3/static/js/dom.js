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

/** 
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered.
 *
 * @since 0.1.0
 *
 * @param {Function} func      The function to call.
 * @param {Object}   wait      The function will be called after it stops being called for 'wait' milliseconds.
 * @param {Object}   immediate If `immediate` is passed, trigger the function on the leading edge, instead of the trailing.
 */
const debounce = (func, wait, immediate) =>
{
    var timeout;
    return function() 
    {
        var me = this, args = arguments;
        var later = function() 
        {
            timeout = null;
            if (!immediate) func.apply(me, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 250);
        if (callNow) func.apply(me, args);
    };
};

export {on, getWindowForElement, addClass, removeClass, hasClass, arrHasClass, debounce};