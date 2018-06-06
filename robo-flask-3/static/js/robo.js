import * as http from './http.js' ;

export default class Robo
{
    constructor({url, onChange = json => {}} = {}) 
    {
        this.url = url;
        this.onChange = onChange;
        this.speed = 1;
    }
    stop()
    {
        this.setState('/robo/stop');
    }
    forward()
    {
        this.drive('forward');
    }
    backward()
    {
        this.drive('backward');
    }
    pivotLeft()
    {
        this.drive('left');
    }
    pivotRight()
    {
        this.drive('right');
    }
    forwardLeft()
    {
        this.motor('right', 'forward');
    }
    forwardRight()
    {
        this.motor('left', 'forward');
    }
    backwardLeft()
    {
        this.motor('right', 'backward');
    }
    backwardRight()
    {
        this.motor('left', 'backward');
    }
    /*
    dir = forward | backward | left | right
    */
    drive(dir)
    {
        this.setState('/robo/drive/' + dir, {speed:this.speed});
    }
    /*
    side = left | right
    dir = forward | backward
    */
    motor(side, dir)
    {
        this.setState('/robo/motor' + side, {dir:dir, speed:this.speed});
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