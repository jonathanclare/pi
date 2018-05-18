import Robo from './Robo.js';
import RoboController from './RoboController.js';

window.onload = () => 
{
    new RoboController(new Robo());


/*
    var video = document.querySelector("#videoElement");
     
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
     
    if (navigator.getUserMedia) 
    {       
        navigator.getUserMedia({video: true}, handleVideo, videoError);
    }
    function handleVideo(stream) 
    {
        console.log("stream");
        video.src = window.URL.createObjectURL(stream);
    }
    function videoError(e) 
    {
        console.log(e);
    }*/
}