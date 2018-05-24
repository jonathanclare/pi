import * as http from './http.js' ;

export default class Robo
{
    constructor() 
    {

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
        http.sendRequestWithParams(route, params);
    }
}