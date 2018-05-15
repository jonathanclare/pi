window.onload = function () 
{
    init(); 
};

const init = () =>
{
    const robo = new Robo();
    const ctrls = document.querySelectorAll('.control');
    let movement = 'stop', direction = 'straight';

    for (let ctrl of ctrls)
    {
        on(ctrl, 'mousedown touchstart', function(evt)
        {
            evt.preventDefault();
            const action = this.getAttribute('data-action');
            if (action === 'forwards' || action === 'backwards' || action === 'stop') movement = action;
            if (action === 'left' || action === 'right') direction = action;
            robo.move(movement, direction);
        });
        on(ctrl, 'mouseup touchend', function(evt)
        {
            evt.preventDefault();
            const action = this.getAttribute('data-action');
            if (action === 'forwards' || action === 'backwards' || action === 'stop') movement = 'stop';
            if (action === 'left' || action === 'right') direction = 'straight';
            robo.move(movement, direction);
        });
    }
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
        if (movement === 'stop') this.stop();
        else
        {
            let endpoint = '/robo/drive/' + movement + '/' + direction;
            this.execute(endpoint);
        }
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