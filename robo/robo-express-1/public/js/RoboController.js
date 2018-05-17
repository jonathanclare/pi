import * as dom from './dom.js' ;

export default class RoboController
{
    constructor(robo) 
    {
        this.robo = robo;
        this.init()
    }
    init()
    {
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

        // Robot.
        const speed = 0.7;

        // Store button state.
        const btnPressed = 
        {
            'forwards':false,
            'backwards':false,
            'left':false,
            'right':false,
            'stop':false
        }
        const onButtonChanged = (action, btnDown=true) =>
        {
            btnPressed[action] = btnDown;
            if (btnPressed['forwards'] && btnPressed['left'])           this.robo.drive({dir:'forwards', turn:'left', speed:speed});
            else if (btnPressed['forwards'] && btnPressed['right'])     this.robo.drive({dir:'forwards', turn:'right', speed:speed});
            else if (btnPressed['backwards'] && btnPressed['left'])     this.robo.drive({dir:'backwards', turn:'left', speed:speed});
            else if (btnPressed['backwards'] && btnPressed['right'])    this.robo.drive({dir:'backwards', turn:'right', speed:speed});
            else if (btnPressed['forwards'])                            this.robo.drive({dir:'forwards', speed:speed});
            else if (btnPressed['backwards'])                           this.robo.drive({dir:'backwards', speed:speed});
            else if (btnPressed['left'])                                this.robo.drive({dir:'spin', turn:'left', speed:speed});
            else if (btnPressed['right'])                               this.robo.drive({dir:'spin', turn:'right', speed:speed});
            else if (btnPressed['stop'])                                this.robo.stop();
            else this.robo.stop();
        };
    }
}