''' from gpiozero import Robot '''
from time import sleep
import threading

'''
Explorer HAT Motor Channels are default.
+    |   1   | GPIO 19
-    |   1   | GPIO 20
+    |   2   | GPIO 21
-    |   2   | GPIO 26   
'''
'''class Robo(Robot):'''
class Robo:

    # Constructor
    def __init__(self, left=(26, 21), right=(20, 19), pin_factory=None): 
        '''super().__init__(left=left, right=right, pin_factory=pin_factory)'''
        self.speed = 0.5 # 0 - 1 Speed.
        self._thread = threading.Thread()
        self._driving = False

    def drive(self, dir=None, speed=None, curveLeft=0, curveRight=0):
        pass
      
    def motor(self, side=None, dir='forward', speed=1, t=3):
        print({'side': side, 'dir': dir, 'speed': speed, 't': t})

        '''
        if side == 'left':
            if dir == 'forward':
                self.left_motor.forward(speed=speed)
            else:
                self.left_motor.forward(speed=speed)
        elif side == 'right':
            if dir == 'forward':
                self.right_motor.forward(speed=speed)
            else:
                self.right_motor.backward(speed=speed)
        '''

        sleep(t)

    def move(self, dir=None, speed=None, curveLeft=0, curveRight=0, t=0):

        if dir != 'stop':
            if speed is None:
                speed = self.speed

        '''        
        if dir == 'forward': 
            self.forward(speed=speed, curve_left=curveLeft, curve_right=curveLeft)
        elif dir == 'backward':
            self.backward(speed=speed, curve_left=curveLeft, curve_right=curveLeft)
        elif dir == 'left':
            self.left(speed=speed)
        elif dir == 'right':
            self.right(speed=speed)
        else:
            self.stop()
        '''

        print({'dir': dir, 'speed': speed, 'curveLeft': curveLeft, 'curveRight': curveRight, 't': t})

        sleep(t)