import * as http from './http.js' ;

export default class Robo
{
    constructor() 
    {

    }
    /*
    dir = forward | backward
    side = left | right
    speed = 0 - 1
    */
    motor({dir='stop', side, speed} = {})
    {
        const route = '/robo/motor/' + side + '/' + dir;
        const params =  {speed:speed}
        http.sendRequestWithParams(route, params);
    }
    /*
    dir = stop | forward | backward | left | right
    curveLeft = 0 - 1
    curveRight = 0 - 1
    speed = 0 - 1
    */
    drive({dir='stop', curveLeft, curveRight, speed} = {})
    {
        const route = '/robo/drive/' + dir;
        const params = {speed:speed, curveLeft:curveLeft, curveRight:curveRight};
        http.sendRequestWithParams(route, params);
    }
}