import * as http from './http.js' ;

export default class Robo
{
    constructor({url, onChange = json => {}} = {}) 
    {
        this.url = url;
        this.onChange = onChange;
    }
    /*
    dir = stop | forward | backward | left | right
    speed = 0 - 1
    */
    drive({dir='stop', speed} = {})
    {
        this.setState('/robo/drive/' + dir, {speed:speed});
    }
    /*
    dir = forward | backward
    speed = 0 - 1
    side = left | right
    */
    motor({dir, speed, side} = {})
    {
        this.setState('/robo/motor' + side, {speed:speed, dir:dir});
    }
    stop()
    {
        this.setState('/robo/stop');
    }
    setState(route, params)
    {
        http.sendRequest(this.url, route, params).then(response => response.json()).then(json =>
        {
            this.onChange.call(null, json);
        });
    }
    getState()
    {
        return http.sendRequest('/robo/state').then(response => response.json());
    }
}