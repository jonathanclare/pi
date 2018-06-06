import * as http from './http.js' ;

export default class Robo
{
    constructor({url, onChange = json => {}, speed=1} = {}) 
    {
        this.url = url;
        this.onChange = onChange;
        this.speed = speed;
    }
    stop()
    {
        this.setState('/robo/stop');
    }
    forward()
    {
        this.drive({dir:'forward'});
    }
    backward()
    {
        this.drive({dir:'backward'});
    }
    pivotLeft()
    {
        this.drive({dir:'left'});
    }
    pivotRight()
    {
        this.drive({dir:'right'});
    }
    forwardLeft()
    {
        this.drive({dir:'forward', curveLeft:1});
    }
    forwardRight()
    {
        this.drive({dir:'forward', curveRight:1});
    }
    backwardLeft()
    {
        this.drive({dir:'backward', curveLeft:1});
    }
    backwardRight()
    {
        this.drive({dir:'backward', curveRight:1});
    }
    /*
    dir = forward | backward | left | right
    */
    drive({dir, curveLeft=0, curveRight=0} = {})
    {
        this.setState('/robo/drive/' + dir, {speed:this.speed, curveLeft:curveLeft, curveRight:curveRight});
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