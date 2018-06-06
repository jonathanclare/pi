import * as http from './http.js' ;

export default class Robo
{
    constructor({url, onResponse = json => {}, speed=1, curve=1} = {}) 
    {
        this.url = url;
        this.onResponse = onResponse;
        this.speed = speed;
        this.curve = curve;
    }
    stop()
    {
        this.sendRequest('/robo/stop');
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
        this.drive({dir:'forward', curveLeft:this.curve});
    }
    forwardRight()
    {
        this.drive({dir:'forward', curveRight:this.curve});
    }
    backwardLeft()
    {
        this.drive({dir:'backward', curveLeft:this.curve});
    }
    backwardRight()
    {
        this.drive({dir:'backward', curveRight:this.curve});
    }
    /*
    dir = forward | backward | left | right
    */
    drive({dir, curveLeft=0, curveRight=0} = {})
    {
        this.sendRequest('/robo/drive/' + dir, {speed:this.speed, curveLeft:curveLeft, curveRight:curveRight});
    }
    sendRequest(route, params)
    {
        http.sendRequest(this.url, route, params).then(response => response.json()).then(json =>
        {
            this.onResponse.call(null, json);
        });
    }
    getState()
    {
        return http.sendRequest('/robo/state').then(response => response.json());
    }
}