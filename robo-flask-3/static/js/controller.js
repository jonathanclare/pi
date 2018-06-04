import * as dom from './dom.js';
import EventHandler from './eventhandler.js';

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
            ['speed', 1],
            ['curve', 0.7]
        ]);

        robo.getState().then(json =>
        {   
            setState('speed', json.speed);

            // Sliders.
            const sldrs = document.querySelectorAll('.slider');
            for (let sldr of sldrs)
            { 
                const key = sldr.getAttribute('data-action');
                sldr.value = state.get(key);
                dom.on(sldr, 'change', function(evt)
                {
                    setState(this.getAttribute('data-action'), this.value);
                });
            }

            // Btns.
            const btns = document.querySelectorAll('.btn');
            for (let btn of btns)
            {
                dom.on(btn, 'touchstart', function(evt)
                {
                    evt.preventDefault();
                    setState(this.getAttribute('data-action'), true);
                });
                dom.on(btn, 'touchend', function(evt)
                {
                    evt.preventDefault();
                    setState(this.getAttribute('data-action'), false);
                });
                dom.on(btn, 'mousedown', function(evt)
                {
                    setState(this.getAttribute('data-action'), true);
                });
            }
            dom.on(document, 'mouseup', function(evt)
            {
                kill();
            });
        });
        const setState = (key, value) =>
        {
            state.set(key, value);
            onStateChanged();
        };
        const kill = () =>
        {
            for (let [key, value] of state) 
            {
                if (typeof(value) === 'boolean') state.set(key, false);
            } 
            onStateChanged();
        };
        const onStateChanged = () =>
        {
            const curve = state.get('curve');
            let o = {dir:'stop'};
            if (state.get('left-forward'))                         o = {dir:'forward', motor:'left'};
            else if (state.get('left-backward'))                   o = {dir:'backward', motor:'left'};
            else if (state.get('right-forward'))                   o = {dir:'forward', motor:'right'};
            else if (state.get('right-backward'))                  o = {dir:'backward', motor:'right'};
            else if (state.get('forward') && state.get('left'))    o = {dir:'forward', curveLeft:curve};
            else if (state.get('forward') && state.get('right'))   o = {dir:'forward', curveRight:curve};
            else if (state.get('backward') && state.get('left'))   o = {dir:'backward', curveLeft:curve};
            else if (state.get('backward') && state.get('right'))  o = {dir:'backward', curveRight:curve};
            else if (state.get('forward'))                         o = {dir:'forward'};
            else if (state.get('backward'))                        o = {dir:'backward'};
            else if (state.get('left'))                            o = {dir:'left'};
            else if (state.get('right'))                           o = {dir:'right'};
            o.speed = state.get('speed');
            robo.drive(o);
        };
    }
}
