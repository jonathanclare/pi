from gpiozero import Robot

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
        #pass
        self._zeroRobot = Robot(left=left, right=right, pin_factory=None)

    '''
    dir = stop | forward | backward | left | right
    curveLeft = 0 - 1
    curveRight = 0 - 1
    speed = 0 - 1
    motor = left | right
    '''
    def drive(self, dir=None, speed=1, curveLeft=0, curveRight=0, motor=None):
        print({'dir': dir, 'speed': speed, 'curveLeft': curveLeft, 'curveRight': curveRight, 'motor': motor})

        speed = float(speed)
        curveLeft = float(curveLeft)
        curveRight = float(curveRight)

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

    def forwardLeft(self, curveLeft=0.8, speed=1):
        self.drive(dir='forward', curveLeft=curveLeft, speed=speed)

    def backwardLeft(self, curveLeft=0.8, speed=1):
        self.drive(dir='backward', curveLeft=curveLeft, speed=speed)

    def forwardRight(self, curveRight=0.8, speed=1):
        self.drive(dir='forward', curveRight=curveRight, speed=speed)

    def backwardRight(self, curveRight=0.8, speed=1):
        self.drive(dir='backward', curveRight=curveRight, speed=speed)

    def forward(self, speed=1):
        self.drive(dir='forward', speed=speed)

    def backward(self, speed=1):
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
        self.driving = False
        self.robo = robo
        self.driveThread = threading.Thread()

    def drive(self, **kwargs2):
        self.kill()
        self.driving = True
        self.driveThread = threading.Thread(target=self._driveLoop, kwargs=kwargs2)
        self.driveThread.daemon = True
        self.driveThread.start()

    def kill(self):
        if self.driveThread.isAlive():  
            self.driving = False
            self.driveThread.join()    

    def _driveLoop(self, **kwargs):
        while self.driving:
            self.robo.drive(**kwargs)
            sleep(0.1)
        print('Stop Driving')