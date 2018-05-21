window.onload = function () 
{
    init(); 
};

const init = () =>
{
    const robo = new Robo();
    const ctrls = document.querySelectorAll('.control')
    for (let ctrl of ctrls)
    {
        on(ctrl, 'mousedown touchstart', function()
        {
            var action = this.getAttribute('data-action');
            robo.execute(action);
        });
        on(ctrl, 'mouseup touchend', function()
        {
            robo.stop();
        });
    }
};

function Robo ()
{

}
Robo.prototype.stop = function ()
{
    execute('stop');
};
Robo.prototype.forwards = function ()
{
    execute('forwards');
};
Robo.prototype.execute = function (action)
{
    var url = [location.protocol, '//', location.host, action].join('');

    console.log(location.host)
    console.log(location.pathname);
    console.log(action);
    console.log(url);

    fetch(url)
    .then(function(response) 
    {
        console.log(response);
    })
    
};

const on = (element, types, listener, useCapture) =>
{
    useCapture = useCapture === undefined ? true : false;
    for (var type of types.split(' ')) element.addEventListener(type, listener);
};

const execute = action =>
{
    var url = [location.protocol, '//', location.host, location.pathname, '/', action].join('');
    console.log(url);
    fetch(url)
    .then(function(response) 
    {
        console.log(response);
    })
};