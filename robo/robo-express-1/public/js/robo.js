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
    dir = stop | forwards | backwards | spin
    turn = left | right
    speed = 0 - 1
    */
    drive({dir='stop', turn, speed} = {})
    {
        let route = '/robo/drive/' + dir
        if (turn !== undefined) route += '/' + turn; 
        if (speed !== undefined) route += '?speed=' + speed; 
        http.sendRequest(route);
    }
}