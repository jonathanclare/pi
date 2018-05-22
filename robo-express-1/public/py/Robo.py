from gpiozero import Robot
from time import sleep
import threading

'''
Explorer HAT Motor Channels are default.
+    |   1   | GPIO 19
-    |   1   | GPIO 20
+    |   2   | GPIO 21
-    |   2   | GPIO 26   
'''
class Robo:

    # Constructor
    def __init__(self, left=(26, 21), right=(20, 19)): 
        self._zeroRobot = Robot(left=left, right=right, pin_factory=None)
        self._thread = threading.Thread()
        self._driving = False

    def drive(self, dir=None, speed=1, curveLeft=0, curveRight=0, t=None):

        if self._thread.isAlive():  
            self._driving = False
            self._thread.join()    

        if dir != 'stop':
            if t != None:
                self._zeroRobot.stop()
                self._driveLogic(dir=dir, speed=speed, curveLeft=curveLeft, curveRight=curveRight, t=t)
            else:    
                self._driving = True
                self._thread = threading.Thread(target=self._driveThread, kwargs={'dir':dir, 'speed':speed, 'curveLeft':curveLeft, 'curveRight':curveRight})
                self._thread.start()

        print({'dir': dir, 'speed': speed, 'curveLeft': curveLeft, 'curveRight': curveRight, 't': t})
      
    def _driveThread(self, **kwargs):
        while self._driving:
            self._driveLogic(**kwargs, t=0.5)
        print('Stop Driving')
        self._zeroRobot.stop()

    def _driveLogic(self, **kwargs):

        dir = kwargs.get('dir')
        speed = kwargs.get('speed')
        curveLeft = kwargs.get('curveLeft')
        curveRight = kwargs.get('curveRight')
        t = kwargs.get('t')

        if dir == 'forward': 
            self._zeroRobot.forward(speed=speed, curve_left=curveLeft, curve_right=curveRight)
        elif dir == 'backward':
            self._zeroRobot.backward(speed=speed, curve_left=curveLeft, curve_right=curveRight)
        elif dir == 'left':
            self._zeroRobot.left(speed=speed)
        elif dir == 'right':
            self._zeroRobot.right(speed=speed)
        else:
            self._zeroRobot.stop()

        print('_driveLogic')
        sleep(t)

    def motor(self, side=None, dir='forward', speed=1, t=None):
        if self._thread.isAlive():  
            self._driving = False
            self._thread.join()    

        if t != None:
            self._zeroRobot.stop()
            self._motorLogic(side=side, dir=dir, speed=speed, t=t)
        else:    
            self._driving = True
            self._thread = threading.Thread(target=self._motorThread, kwargs={'side':side, 'dir':dir, 'speed':speed})
            self._thread.start()

        print({'side': side, 'dir': dir, 'speed': speed, 't': t})
      
    def _motorThread(self, **kwargs):
        while self._driving:
            self._motorLogic(**kwargs, t=0.5)
        print('Stop Motor')
        self._zeroRobot.stop()

    def _motorLogic(self, **kwargs):

        dir = kwargs.get('dir')
        speed = kwargs.get('speed')
        side = kwargs.get('side')
        t = kwargs.get('t')

        if side == 'left':
            if dir == 'forward':
                self._zeroRobot.left_motor.forward(speed=speed)
            else:
                self._zeroRobot.left_motor.backward(speed=speed)
        elif side == 'right':
            if dir == 'forward':
                self._zeroRobot.right_motor.forward(speed=speed)
            else:
                self._zeroRobot.right_motor.backward(speed=speed)

        print('_motorLogic')
        sleep(t)   

    def forwardLeft(self, speed=1, t=None):
        self.drive(dir='forward', curveLeft=0.5, speed=speed, t=t)

    def backwardLeft(self, speed=1, t=None):
        self.drive(dir='backward', curveLeft=0.5, speed=speed, t=t)

    def forwardRight(self, speed=1, t=None):
        self.drive(dir='forward', curveRight=0.5, speed=speed, t=t)

    def backwardRight(self, speed=1, t=None):
        self.drive(dir='backward', curveRight=0.5, speed=speed, t=t)

    def forward(self, speed=1, t=None):
        self.drive(dir='forward', speed=speed, t=t)

    def backward(self, speed=1, t=None):
        self.drive(dir='backward', speed=speed, t=t)

    def pivotLeft(self, speed=1, t=None):
        self.drive(dir='left', speed=speed, t=t)

    def pivotRight(self, speed=1, t=None):
        self.drive(dir='right', speed=speed, t=t)

    def stop(self):
        self.drive(dir='stop')

    def leftMotorForward(self, speed=1, t=None):
        self.motor(side='left', dir='forward', speed=speed, t=t)

    def leftMotorBackward(self, speed=1, t=None):
        self.motor(side='left', dir='backward', speed=speed, t=t)

    def rightMotorForward(self, speed=1, t=None):
        self.motor(side='right', dir='forward', speed=speed, t=t)

    def rightMotorBackward(self, speed=1, t=None):
        self.motor(side='right', dir='backward', speed=speed, t=t)