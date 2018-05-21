import Robo from './robo.js';
import Controller from './controller.js';

window.onload = () => 
{
    new Controller(new Robo());


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