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
            ['right', false],
            ['stop', false],
            ['speed', 0.5],
            ['curve', 0.8],
        ]);

        const handler = new EventHandler(document, 
        {
            always : (evt, evtType, type) => {if (type === 'touch') evt.preventDefault()},
            touchstart : evt => onDown(evt.target.getAttribute('data-action')),
            touchend : evt => {if (evt.touches.length < 1) onUp(evt.target.getAttribute('data-action'))},
            mousedown : evt => onDown(evt.target.getAttribute('data-action')),
            mouseup : evt => onUp(evt.target.getAttribute('data-action'))
        });

        const onDown = action =>
        {
            if (action !== null) onStateChanged(action, true);
        }
        const onUp = action =>
        {
            if (action !== 'stop' && action !== 'speed' && action !== 'curve' &&action !== null)
            {
                for (let [key, value] of state) 
                {
                    if (typeof(value) === 'boolean') state.set(key, false);
                } 
                this.robo.drive({dir:'stop'});
            }
        }

        // Sliders.
        const sliders = document.querySelectorAll('.slider');
        for (let slider of sliders)
        {
            dom.on(slider, 'change', function(evt)
            {
                onStateChanged(this.getAttribute('data-action'), this.value);
            });
        }

        // Called when the controller state changes.
        const onStateChanged = (action, newValue) =>
        {
            state.set(action, newValue);
            if (state.get('left-forward'))                         this.robo.drive({dir:'forward', motor:'left', speed:state.get('speed')});
            else if (state.get('left-backward'))                   this.robo.drive({dir:'backward', motor:'left', speed:state.get('speed')});
            else if (state.get('right-forward'))                   this.robo.drive({dir:'forward', motor:'right', speed:state.get('speed')});
            else if (state.get('right-backward'))                  this.robo.drive({dir:'backward', motor:'right', speed:state.get('speed')});
            else if (state.get('forward') && state.get('left'))    this.robo.drive({dir:'forward', curveLeft:state.get('curve'), speed:state.get('speed')});
            else if (state.get('forward') && state.get('right'))   this.robo.drive({dir:'forward', curveRight:state.get('curve'), speed:state.get('speed')});
            else if (state.get('backward') && state.get('left'))   this.robo.drive({dir:'backward', curveLeft:state.get('curve'), speed:state.get('speed')});
            else if (state.get('backward') && state.get('right'))  this.robo.drive({dir:'backward', curveRight:state.get('curve'), speed:state.get('speed')});
            else if (state.get('forward'))                         this.robo.drive({dir:'forward', speed:state.get('speed')});
            else if (state.get('backward'))                        this.robo.drive({dir:'backward', speed:state.get('speed')});
            else if (state.get('left'))                            this.robo.drive({dir:'left', speed:state.get('speed')});
            else if (state.get('right'))                           this.robo.drive({dir:'right', speed:state.get('speed')});
            else if (state.get('stop'))                            this.robo.drive({dir:'stop'});
            else if (action =='speed' || action =='curve')         {}
            else                                                   this.robo.drive({dir:'stop'});
        };
    }
}