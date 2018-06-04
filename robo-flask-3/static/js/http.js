const sendRequest = (route, params) =>
{ 
    let url = [location.protocol, '//', location.host, route].join('');
    if (params !== undefined)
    {
        const queryString = Object.keys(params).reduce((filtered, key) =>
        {
            if (params[key] !== undefined) filtered.push(key + '=' + params[key]);
            return filtered;
        }, []);
        if (queryString.length > 0) url += '?' + queryString.join('&');
    }
    return fetch(url).then(response => response);
}

export {sendRequest};