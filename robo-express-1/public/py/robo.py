#from gpiozero import Robot
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
        pass
        #self._zeroRobot = Robot(left=left, right=right, pin_factory=None)

    def drive(self, dir=None, speed=1, curveLeft=0, curveRight=0, t=0.1):
        print({'dir': dir, 'speed': speed, 'curveLeft': curveLeft, 'curveRight': curveRight, 't': t})

        '''
        self._zeroRobot.stop()
        if dir == 'forward': 
            self._zeroRobot.forward(speed=speed, curve_left=curveLeft, curve_right=curveRight)
        elif dir == 'backward':
            self._zeroRobot.backward(speed=speed, curve_left=curveLeft, curve_right=curveRight)
        elif dir == 'left':
            self._zeroRobot.left(speed=speed)
        elif dir == 'right':
            self._zeroRobot.right(speed=speed)
        '''

        sleep(t)

    def motor(self, side=None, dir='forward', speed=1, t=0.1):
        print({'side': side, 'dir': dir, 'speed': speed, 't': t})
      
        '''
        self._zeroRobot.stop()
        if side == 'left':
            if dir == 'forward':
                self._zeroRobot.left_motor.forward(speed=speed)
            elif dir == 'backward':
                self._zeroRobot.left_motor.backward(speed=speed)
        elif side == 'right':
            if dir == 'forward':
                self._zeroRobot.right_motor.forward(speed=speed)
            elif dir == 'backward':
                self._zeroRobot.right_motor.backward(speed=speed)
        '''

        sleep(t)   

    def forwardLeft(self, curveLeft=0.8, speed=1, t=0.1):
        self.drive(dir='forward', curveLeft=curveLeft, speed=speed, t=t)

    def backwardLeft(self, curveLeft=0.8, speed=1, t=0.1):
        self.drive(dir='backward', curveLeft=curveLeft, speed=speed, t=t)

    def forwardRight(self, curveRight=0.8, speed=1, t=0.1):
        self.drive(dir='forward', curveRight=curveRight, speed=speed, t=t)

    def backwardRight(self, curveRight=0.8, speed=1, t=0.1):
        self.drive(dir='backward', curveRight=curveRight, speed=speed, t=t)

    def forward(self, speed=1, t=0.1):
        self.drive(dir='forward', speed=speed, t=t)

    def backward(self, speed=1, t=0.1):
        self.drive(dir='backward', speed=speed, t=t)

    def pivotLeft(self, speed=1, t=0.1):
        self.drive(dir='left', speed=speed, t=t)

    def pivotRight(self, speed=1, t=None):
        self.drive(dir='right', speed=speed, t=t)

    def stop(self):
        self.drive(dir='stop')

    def leftMotorForward(self, speed=1, t=0.1):
        self.motor(side='left', dir='forward', speed=speed, t=t)

    def leftMotorBackward(self, speed=1, t=0.1):
        self.motor(side='left', dir='backward', speed=speed, t=t)

    def rightMotorForward(self, speed=1, t=0.1):
        self.motor(side='right', dir='forward', speed=speed, t=t)

    def rightMotorBackward(self, speed=1, t=0.1):
        self.motor(side='right', dir='backward', speed=speed, t=t)