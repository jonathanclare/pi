import Robo from './Robo.js';
import RoboController from './RoboController.js';

window.onload = () => 
{
    new RoboController(new Robo());
}