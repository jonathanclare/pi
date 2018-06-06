import * as dom from './dom.js';

// This should be replaced with react in future version.
export default class Controller
{
    constructor(robo) 
    {
        // Store controller state.
        const state = new Map([
            ['forward', false],
            ['backward', false],
            ['left', false],
            ['right', false],
            ['speed', robo.speed]
        ]);

        // Sliders.
        const sldrs = document.querySelectorAll('.slider');
        for (let sldr of sldrs)
        { 
            const key = sldr.getAttribute('data-action');
            sldr.value = state.get(key);
        }
        dom.on('.slider', 'change', evt => 
        {
            setState(evt.currentTarget.getAttribute('data-action'), evt.currentTarget.value);
        });

        // Btns.

        // Touch.
        dom.on('.btn', 'touchstart', evt =>
        {
            evt.preventDefault();
            setState(evt.currentTarget.getAttribute('data-action'), true);
        });
        dom.on('.btn', 'touchend', evt =>
        {
            evt.preventDefault();
            setState(evt.currentTarget.getAttribute('data-action'), false);
        });
        
        // Mouse.
        let action = null;
        dom.on('.btn', 'mousedown', evt => 
        {
            action = evt.currentTarget.getAttribute('data-action');    
            setState(action, true);
        });
        dom.on(document, 'mouseup', evt =>  
        {
            if (action !== null) setState(action, false);
            action = null;    
        });

        // Set robot state.
        const setState = (key, value) =>
        {
            state.set(key, value);
            robo.speed = state.get('speed');
            if (state.get('left'))
            {
                if (state.get('forward'))       robo.forwardLeft();
                else if (state.get('backward')) robo.backwardLeft();
                else                            robo.pivotLeft();
            }
            else if (state.get('right'))
            {
                if (state.get('forward'))       robo.forwardRight();
                else if (state.get('backward')) robo.backwardRight();
                else                            robo.pivotRight();
            }
            else if (state.get('forward'))      robo.forward();
            else if (state.get('backward'))     robo.backward();
            else                                robo.stop();
        };
    }
}
