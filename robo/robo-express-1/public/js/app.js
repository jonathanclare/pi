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
        if (btnPressed['forwards'] && btnPressed['left'])           robo.drive('forwards', 'left');
        else if (btnPressed['forwards'] && btnPressed['right'])     robo.drive('forwards', 'right');
        else if (btnPressed['backwards'] && btnPressed['left'])     robo.drive('backwards', 'left');
        else if (btnPressed['backwards'] && btnPressed['right'])    robo.drive('backwards', 'right');
        else if (btnPressed['forwards'])                            robo.drive('forwards', 'straight');
        else if (btnPressed['backwards'])                           robo.drive('backwards', 'straight');
        else if (btnPressed['left'])                                robo.drive('spin', 'left');
        else if (btnPressed['right'])                               robo.drive('spin', 'right');
        else if (btnPressed['stop'])                                robo.stop();
        else robo.stop();
    };
};