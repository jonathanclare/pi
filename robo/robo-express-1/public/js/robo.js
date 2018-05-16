window.onload = function () 
{
    init(); 
};

const init = () =>
{
    const robo = new Robo();
    const ctrls = document.querySelectorAll('.control');

    const btnPressed = 
    {
        'forwards':false,
        'backwards':false,
        'left':false,
        'right':false,
        'stop':false
    }
    let leftDown = false, rightDown = false, forwardsDown = false, backwardsDown = false; 

    for (let ctrl of ctrls)
    {
        on(ctrl, 'mousedown touchstart', function(evt)
        {
            evt.preventDefault();
            onButtonPressed(this.getAttribute('data-action'));
        });
        on(ctrl, 'mouseup touchend', function(evt)
        {
            evt.preventDefault();
            onButtonReleased(this.getAttribute('data-action'));
        });
    }

    const onButtonPressed = (action) =>
    {
        btnPressed[action] = true;
        onButtonChanged();
    }
    const onButtonReleased = (action) =>
    {
        btnPressed[action] = false;
        onButtonChanged();
    }
    const onButtonChanged = () =>
    {
        if (btnPressed['forwards'] && btnPressed['left']) robo.move('forwards', 'left');
        else if (btnPressed['forwards'] && btnPressed['right']) robo.move('forwards', 'right');
        else if (btnPressed['backwards'] && btnPressed['left']) robo.move('backwards', 'left');
        else if (btnPressed['backwards'] && btnPressed['right']) robo.move('backwards', 'right');
        else if (btnPressed['forwards']) robo.move('forwards', 'straight');
        else if (btnPressed['backwards']) robo.move('backwards', 'straight');
        else if (btnPressed['left']) robo.move('spin', 'left');
        else if (btnPressed['right']) robo.move('spin', 'right');
        else if (btnPressed['stop']) robo.stop();
        else robo.stop();
    };
};

class Robo
{
    constructor() 
    {

    }
    forwards()
    { 
        this.execute('/robo/drive/forwards');
    }
    stop()
    { 
        this.execute('/robo/drive/stop');
    }
    move(movement, direction)
    {
        let action = '/robo/drive/' + movement + '/' + direction;
        this.execute(action);
    }
    execute(action)
    { 
        const url = [location.protocol, '//', location.host, action].join('');
        console.log('request: ' + url);
        fetch(url)
        .then(function(response) 
        {
            return response.json();
        })
        .then(function(json) 
        {
            console.log('response: ');
            console.log(json);
        });
    }
}

const on = (element, types, listener, useCapture) =>
{
    useCapture = useCapture === undefined ? true : false;
    for (var type of types.split(' ')) element.addEventListener(type, listener);
};