const sendRequest = (url, route, params) =>
{ 
    if (route !== undefined) url += route;
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