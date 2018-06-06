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
        self.state = {'dir': None, 'speed': 1, 'curveLeft': 0, 'curveRight': 0}
        #self._zeroRobot = Robot(left=left, right=right, pin_factory=None)

    '''
    dir = forward | backward | left | right
    curveLeft = 0 - 1
    curveRight = 0 - 1
    speed = 0 - 1
    '''
    def drive(self, dir=None, speed=1, curveLeft=0, curveRight=0):

        speed = float(speed)
        curveLeft = float(curveLeft)
        curveRight = float(curveRight)

        self.state = {'dir': dir, 'speed': speed, 'curveLeft': curveLeft, 'curveRight': curveRight}
        print(self.state)
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

    def stop(self):
        self.state = {'dir': 'stop', 'speed': 0, 'curveLeft': 0, 'curveRight': 0}
        print(self.state)
        '''self._zeroRobot.stop()'''

    def forward(self, speed=1, curveLeft=0, curveRight=0):
        self.drive(dir='forward', speed=speed)

    def backward(self, speed=1, curveLeft=0, curveRight=0):
        self.drive(dir='backward', speed=speed)

    def pivotLeft(self, speed=1):
        self.drive(dir='left', speed=speed)

    def pivotRight(self, speed=1):
        self.drive(dir='right', speed=speed)

    def forwardLeft(self, speed=1, curve=1):
        self.drive(dir='forward', speed=speed, curveLeft=curve)

    def backwardLeft(self, speed=1, curve=1):
        self.drive(dir='backward', speed=speed, curveLeft=curve)

    def forwardRight(self, speed=1, curve=1):
        self.drive(dir='forward', speed=speed, curveRight=curve)

    def backwardRight(self, speed=1, curve=1):
        self.drive(dir='backward', speed=speed, curveRight=curve)


from time import sleep
import threading

class RoboThread:

    # Constructor
    def __init__(self, robo): 
        self._robo = robo
        self._running = False
        self._thread = threading.Thread()

    def drive(self, **kwargs2):
        self.stop()
        self._running = True
        self._thread = threading.Thread(target=self._drive, kwargs=kwargs2)
        self._thread.daemon = True
        self._thread.start()

    def stop(self):
        if self._thread.isAlive():  
            self._running = False
            self._thread.join()  
        self._robo.stop()  

    def _drive(self, **kwargs):
        while self._running:
            self._robo.drive(**kwargs)
            sleep(0.1)
        print('Stop Driving')