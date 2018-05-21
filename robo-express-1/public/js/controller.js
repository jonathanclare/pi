import * as dom from './dom.js' ;

// This shuold be replaced with react in future version.
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
            ['forward', false],
            ['backward', false],
            ['left', false],
            ['right', false],
            ['stop', false],
            ['speed', 0.5],
            ['curve', 0.5],
        ]);

        // Attach events to html controls.
        const btns = document.querySelectorAll('.btn');
        for (let btn of btns)
        {
            dom.on(btn, 'mousedown touchstart', function(evt)
            {
                evt.preventDefault();
                onStateChanged(this.getAttribute('data-action'), true);
            });
            dom.on(btn, 'mouseup touchend', function(evt)
            {
                evt.preventDefault();
                onStateChanged(this.getAttribute('data-action'), false);
            });
        }
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
            if (state.get('forward') && state.get('left'))         this.robo.drive({dir:'forward', curveLeft:state.get('curve'), speed:state.get('speed')});
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