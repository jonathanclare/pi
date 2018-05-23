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
const sendRequestWithParams = (route, params) =>
{ 
    const queryString = Object.keys(params).reduce((filtered, key) =>
    {
        if (params[key] !== undefined) filtered.push(key + '=' + params[key]);
        return filtered;
    }, []);
    if (queryString.length > 0) route += '?' + queryString.join('&');
    sendRequest(route);
}

export {sendRequest, sendRequestWithParams};