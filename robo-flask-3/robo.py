#from gpiozero import Robot

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
        self.state = {'dir': None, 'speed': 1, 'curveLeft': 0, 'curveRight': 0, 'motor': None}
        #self._zeroRobot = Robot(left=left, right=right, pin_factory=None)

    '''
    dir = stop | forward | backward | left | right
    curveLeft = 0 - 1
    curveRight = 0 - 1
    speed = 0 - 1
    motor = left | right
    '''
    def drive(self, dir=None, speed=1, curveLeft=0, curveRight=0, motor=None):

        speed = float(speed)
        curveLeft = float(curveLeft)
        curveRight = float(curveRight)

        self.state = {'dir': dir, 'speed': speed, 'curveLeft': curveLeft, 'curveRight': curveRight, 'motor': motor}
        print(self.state)

        '''
        self._zeroRobot.stop()
        if motor != None:
            if motor == 'left':
                if dir == 'forward':
                    self._zeroRobot.left_motor.forward(speed=speed)
                elif dir == 'backward':
                    self._zeroRobot.left_motor.backward(speed=speed)
            elif motor == 'right':
                if dir == 'forward':
                    self._zeroRobot.right_motor.forward(speed=speed)
                elif dir == 'backward':
                    self._zeroRobot.right_motor.backward(speed=speed)
        else:  
            if dir == 'forward': 
                self._zeroRobot.forward(speed=speed, curve_left=curveLeft, curve_right=curveRight)
            elif dir == 'backward':
                self._zeroRobot.backward(speed=speed, curve_left=curveLeft, curve_right=curveRight)
            elif dir == 'left':
                self._zeroRobot.left(speed=speed)
            elif dir == 'right':
                self._zeroRobot.right(speed=speed)
        '''
    
    def forward(self, speed=1, curveLeft=0, curveRight=0):
        self.drive(dir='forward', speed=speed, curveLeft=0.8, curveRight=0.8)

    def backward(self, speed=1, curveLeft=0, curveRight=0):
        self.drive(dir='backward', speed=speed)

    def pivotLeft(self, speed=1):
        self.drive(dir='left', speed=speed)

    def pivotRight(self, speed=1):
        self.drive(dir='right', speed=speed)

    def stop(self):
        self.drive(dir='stop')

    def leftMotorForward(self, speed=1):
        self.drive(motor='left', dir='forward', speed=speed)

    def leftMotorBackward(self, speed=1):
        self.drive(motor='left', dir='backward', speed=speed)

    def rightMotorForward(self, speed=1):
        self.drive(motor='right', dir='forward', speed=speed)

    def rightMotorBackward(self, speed=1):
        self.drive(motor='right', dir='backward', speed=speed)


from time import sleep
import threading

class RoboThread:

    # Constructor
    def __init__(self, robo): 
        self._robo = robo
        self._running = False
        self._thread = threading.Thread()

    def start(self, **kwargs2):
        self.stop()
        self._running = True
        self._thread = threading.Thread(target=self._target, kwargs=kwargs2)
        self._thread.daemon = True
        self._thread.start()

    def stop(self):
        if self._thread.isAlive():  
            self._running = False
            self._thread.join()  
        self._robo.stop()  

    def _target(self, **kwargs):
        while self._running:
            self._robo.drive(**kwargs)
            sleep(0.1)
        print('Stop Driving')