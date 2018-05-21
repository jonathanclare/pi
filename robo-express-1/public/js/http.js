const sendRequest = route =>
{ 
    const url = [location.protocol, '//', location.host, route].join('');
    console.log('request: ' + url);
    fetch(url)
    .then(function(response) 
    {
        return response.json();
    })
    .then(function(json) 
    {
        console.log('response: ' + json);
    });
}

export {sendRequest};