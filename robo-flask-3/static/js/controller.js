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
            ['speed', 1]
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

            let o;

            if (state.get('left-forward'))          o = {dir:'forward', side:'left'};
            else if (state.get('left-backward'))    o = {dir:'backward', side:'left'};
            else if (state.get('right-forward'))    o = {dir:'forward', side:'right'};
            else if (state.get('right-backward'))   o = {dir:'backward', side:'right'};

            if (o !== undefined)
            {
                o.speed = state.get('speed');
                robo.motor(o);
            }
            else
            {
                if (state.get('left'))              o = {dir:'left'};
                else if (state.get('right'))        o = {dir:'right'};
                else if (state.get('forward'))      o = {dir:'forward'};
                else if (state.get('backward'))     o = {dir:'backward'};

                if (o !== undefined)
                {
                    o.speed = state.get('speed');
                    robo.drive(o);
                }
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
