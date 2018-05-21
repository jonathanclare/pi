import * as http from './http.js' ;

export default class Robo
{
    constructor() 
    {

    }
    stop()
    { 
        this.drive('stop');
    }
    /*
    dir = stop | forward | backward | left | right
    curveLeft = 0 - 1
    curveRight = 0 - 1
    speed = 0 - 1
    */
    drive({dir='stop', curveLeft, curveRight, speed} = {})
    {
        let route = '/robo/drive/' + dir;
        const params =  {speed:speed, curveLeft:curveLeft, curveRight:curveRight}
        const queryString = Object.keys(params).reduce((filtered, key) =>
        {
            if (params[key] !== undefined) filtered.push(key + '=' + params[key]);
            return filtered;
        }, []);
        if (queryString.length > 0) route += '?' + queryString.join('&');
        console.log(route)
        http.sendRequest(route);
    }
}