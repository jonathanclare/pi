export default class Robo 
{
    constructor() 
    {

    }
    forwards()
    { 
        doAction('forwards');
    }
    stop()
    { 
        doAction('stop');
    }
};

const doAction = action =>
{
    var url = [location.protocol, '//', location.host, location.pathname, '/', action].join('');
    console.log(url);
    fetch(url)
    .then(function(response) 
    {
        console.log(response);
    })
};