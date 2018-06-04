import * as http from './http.js' ;

export default class Robo
{
    constructor({onChange = json => {}} = {}) 
    {
        this.onChange = onChange;
    }
    /*
    dir = stop | forward | backward | left | right
    curveLeft = 0 - 1
    curveRight = 0 - 1
    speed = 0 - 1
    motor = left | right
    */
    drive({dir='stop', curveLeft, curveRight, speed, motor} = {})
    {
        const route = '/robo/drive/' + dir;
        const params = {speed:speed, curveLeft:curveLeft, curveRight:curveRight};
        http.sendRequest(route, params).then(response => response.json()).then(json =>
        {
            this.onChange.call(null, json);
        });
    }
    getState()
    {
        return http.sendRequest('/robo/state').then(response => response.json());
    }
}