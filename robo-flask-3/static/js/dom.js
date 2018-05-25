/** 
 * Add event listeners to the target element.
 * 
 * @param {HTMLElement} element  The target element.
 * @param {string}      types    A space separated string of event types.
 * @param {Function}    listener The function that receives a notification when an event of the specified type occurs.
 */
const on = (element, types, listener, useCapture) =>
{
    useCapture = useCapture === undefined ? true : false;
    for (var type of types.split(' ')) element.addEventListener(type, listener);
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

export {on, getWindowForElement};