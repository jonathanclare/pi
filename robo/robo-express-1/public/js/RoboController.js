import * as dom from './dom.js' ;

// This shuold be replaced with react in future version.
export default class RoboController
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
            ['forwards', false],
            ['backwards', false],
            ['left', false],
            ['right', false],
            ['stop', false],
            ['speed', 0.7],
            ['curve', 0.5],
        ]);

        // Attach events to html controls.
        const ctrls = document.querySelectorAll('.control');
        for (let ctrl of ctrls)
        {
            dom.on(ctrl, 'mousedown touchstart', function(evt)
            {
                evt.preventDefault();
                onButtonChanged(this.getAttribute('data-action'));
            });
            dom.on(ctrl, 'mouseup touchend', function(evt)
            {
                evt.preventDefault();
                onButtonChanged(this.getAttribute('data-action'), false);
            });
        }

        // Called on button pressed/released.
        const onButtonChanged = (action, btnDown=true) =>
        {
            state.set(action, btnDown);
            if (state.get('forwards') && state.get('left'))         this.robo.drive({dir:'forwards', curveLeft:state.get('curve'), speed:state.get('speed')});
            else if (state.get('forwards') && state.get('right'))   this.robo.drive({dir:'forwards', curveRight:state.get('curve'), speed:state.get('speed')});
            else if (state.get('backwards') && state.get('left'))   this.robo.drive({dir:'backwards', curveLeft:state.get('curve'), speed:state.get('speed')});
            else if (state.get('backwards') && state.get('right'))  this.robo.drive({dir:'backwards', curveRight:state.get('curve'), speed:state.get('speed')});
            else if (state.get('forwards'))                         this.robo.drive({dir:'forwards', speed:state.get('speed')});
            else if (state.get('backwards'))                        this.robo.drive({dir:'backwards', speed:state.get('speed')});
            else if (state.get('left'))                             this.robo.drive({dir:'left', speed:state.get('speed')});
            else if (state.get('right'))                            this.robo.drive({dir:'right', speed:state.get('speed')});
            else if (state.get('stop'))                             this.robo.stop();
            else this.robo.stop();
        };
    }
}