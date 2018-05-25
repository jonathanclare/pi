import * as dom from './dom.js';
import EventHandler from './eventhandler.js';

// This should be replaced with react in future version.
export default class Controller
{
    constructor(robo) 
    {
        this.robo = robo;
        this.init()
    }
    init()
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
            ['right', false]
        ]);

        // Sliders.
        let speed = 0.5;
        const speedSlider = document.querySelector('#slider-speed');
        speedSlider.value = speed;
        dom.on(speedSlider, 'change', function(evt)
        {
            speed = this.value;
            onStateChanged();
        });

        let curve = 0.8;
        const curveSlider = document.querySelector('#slider-curve');
        curveSlider.value = curve;
        dom.on(curveSlider, 'change', function(evt)
        {
            curve = this.value;
            onStateChanged();
        });

        const me = this;

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

        // Called when the controller state changes.
        const setState = (action, newValue) =>
        {
            state.set(action, newValue);
            onStateChanged();
        };
        const onStateChanged = () =>
        {
            if (state.get('left-forward'))                         this.robo.drive({dir:'forward', motor:'left', speed:speed});
            else if (state.get('left-backward'))                   this.robo.drive({dir:'backward', motor:'left', speed:speed});
            else if (state.get('right-forward'))                   this.robo.drive({dir:'forward', motor:'right', speed:speed});
            else if (state.get('right-backward'))                  this.robo.drive({dir:'backward', motor:'right', speed:speed});
            else if (state.get('forward') && state.get('left'))    this.robo.drive({dir:'forward', curveLeft:curve, speed:speed});
            else if (state.get('forward') && state.get('right'))   this.robo.drive({dir:'forward', curveRight:curve, speed:speed});
            else if (state.get('backward') && state.get('left'))   this.robo.drive({dir:'backward', curveLeft:curve, speed:speed});
            else if (state.get('backward') && state.get('right'))  this.robo.drive({dir:'backward', curveRight:curve, speed:speed});
            else if (state.get('forward'))                         this.robo.drive({dir:'forward', speed:speed});
            else if (state.get('backward'))                        this.robo.drive({dir:'backward', speed:speed});
            else if (state.get('left'))                            this.robo.drive({dir:'left', speed:speed});
            else if (state.get('right'))                           this.robo.drive({dir:'right', speed:speed});
            else                                                   this.robo.drive({dir:'stop'}); // All false
        };
        const kill = () =>
        {
            let stopRobo = false;
            for (let [key, value] of state) 
            {
                if (value === true) stopRobo = true;
                state.set(key, false);
            } 
            if (stopRobo) this.robo.drive({dir:'stop'});
        }
    }
}