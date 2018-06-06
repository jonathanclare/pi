import * as dom from './dom.js';

// This should be replaced with react in future version.
export default class Controller
{
    constructor(robo) 
    {
        // Store controller state.
        const state = new Map([
            ['left-forward', false],
            ['left-backward', false],
            ['right-forward', false],
            ['right-backward', false],
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
            if (evt.touches.length === 0) 
                kill();
            else
                setState(evt.currentTarget.getAttribute('data-action'), false);
        });
        
        // Mouse.
        let btnPressed = false;
        dom.on('.btn', 'mousedown', evt => 
        {
            btnPressed = true;    
            setState(evt.currentTarget.getAttribute('data-action'), true);
        });
        dom.on(document, 'mouseup', evt =>  
        {
            if (btnPressed === true) kill();
            btnPressed = false;    
        });

        // Set robot state.
        const setState = (key, value) =>
        {
            state.set(key, value);

            robo.speed = state.get('speed');

            if (state.get('left-forward'))          robo.forwardLeft();
            else if (state.get('left-backward'))    robo.backwardLeft();
            else if (state.get('right-forward'))    robo.forwardRight();
            else if (state.get('right-backward'))   robo.backwardRight();
            else
            {
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
                else robo.stop();
            }
        };

        // Reset state and stop robot.
        const kill = () =>
        {
            for (let [key, value] of state) 
            {
                if (typeof(value) === 'boolean') state.set(key, false);
            } 
            robo.stop();
        };
    }
}
