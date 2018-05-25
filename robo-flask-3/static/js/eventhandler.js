import * as dom from './dom.js';

/*
For a single click the order of events is:

1. touchstart
2. touchmove
3. touchend
4. mouseover
5. mousemove
6. mousedown
7. mouseup
8. click

mouse =  mousemove | mouseup | mousedown | mouseout | mousewheel | DOMMouseScroll
touch =  touchstart | touchmove | touchend | touchcancel
scroll = scroll
resize = resize

Use preventDefault() inside touch event handlers, so the default mouse-emulation handling doesn’t occur.
http://www.html5rocks.com/en/mobile/touchandmouse/

But weve attached handlers to the window rather than the element so only call preventDefault() if were
dragging or over the chart viewport so we dont break default window touch events when not over the chart.

touches         : a list of all fingers currently on the screen.
targetTouches   : a list of fingers on the current DOM element.
changedTouches  : a list of fingers involved in the current event. For example, in a touchend event, this will be the finger that was removed.
*/
export default class EventHandler
{
    constructor(element, listeners = {}) 
    {
        const mouseHandler = evt => handler(evt, 'mouse');
        const touchHandler = evt => handler(evt, 'touch');
        const scrollHandler = evt => handler(evt, 'scroll');
        const resizeHandler = evt => handler(evt, 'resize');
        const handler = (evt, type) =>
        {
            if (listeners.always !== undefined) listeners.always(evt, evt.type, type)
            if (listeners[evt.type] !== undefined) listeners[evt.type](evt)
        };

        let mouseListeners = [], touchListeners = [];

        for (let key in listeners) 
        {
            if (key.toLowerCase().includes('mouse') !== -1) mouseListeners.push(key);
            else if (key.toLowerCase().includes('touch') !== -1) touchListeners.push(key);
            else if (key.toLowerCase().includes('scroll') !== -1) dom.on(element, 'scroll', scrollHandler);
            else if (key.toLowerCase().includes('resize') !== -1) dom.on(element, 'resize', resizeHandler);
        }

        dom.on(element, mouseListeners.join(' '), mouseHandler);
        if ('ontouchstart' in window) dom.on(element, touchListeners.join(' '), touchHandler);
    }
}