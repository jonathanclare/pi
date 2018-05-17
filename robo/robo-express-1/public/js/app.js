import * as dom from './dom.js' ;
import Robo from './Robo.js';

window.onload = () => init();

const init = () =>
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
    const robo = new Robo();
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
        if (btnPressed['forwards'] && btnPressed['left'])           robo.drive({dir:'forwards', turn:'left', speed:speed});
        else if (btnPressed['forwards'] && btnPressed['right'])     robo.drive({dir:'forwards', turn:'right', speed:speed});
        else if (btnPressed['backwards'] && btnPressed['left'])     robo.drive({dir:'backwards', turn:'left', speed:speed});
        else if (btnPressed['backwards'] && btnPressed['right'])    robo.drive({dir:'backwards', turn:'right', speed:speed});
        else if (btnPressed['forwards'])                            robo.drive({dir:'forwards', speed:speed});
        else if (btnPressed['backwards'])                           robo.drive({dir:'backwards', speed:speed});
        else if (btnPressed['left'])                                robo.drive({dir:'spin', turn:'left', speed:speed});
        else if (btnPressed['right'])                               robo.drive({dir:'spin', turn:'right', speed:speed});
        else if (btnPressed['stop'])                                robo.stop();
        else robo.stop();
    };
};