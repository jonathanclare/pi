import * as http from './http.js' ;

export default class Robo
{
    constructor() 
    {

    }
    forwards()
    { 
        this.drive('forwards');
    }
    stop()
    { 
        this.drive('stop');
    }
    /*
    move = stop | forwards | backwards | spin
    direction = straight | left | right
    speed = 0 - 1
    */
    drive(move, direction, speed)
    {
        let route = '/robo/drive/' + move
        if (direction !== undefined) route += '/' + direction; 
        if (speed !== undefined) route += '/' + speed; 
        http.sendRequest(route);
    }
}