'''
from gpiozero import Robot

# Explorer HAT Motor Channels are default.
# +    |   1   | GPIO 19
# -    |   1   | GPIO 20
# +    |   2   | GPIO 21
# -    |   2   | GPIO 26
class Robo(Robot, left=(19, 20), right=(21, 26)):

    # Constructor
    def __init__(self, pin_factory=None):
        super().__init__(left=left, right=right, pin_factory=pin_factory)
        self.speed = 0.5 # 0 - 1 Speed.

    # dir = stop | forward | backward | left | right
    # curveLeft = 0 - 1
    # curveRight = 0 - 1
    # speed = 0 - 1
    def drive(self, dir=None, speed=None, curveLeft=0, curveRight=0):

        if dir != 'stop':
            if speed is None:
                speed = self.speed

        if dir == 'forward' 
            super().forward(speed=speed, curve_left=curveLeft, curve_right=curveLeft)
        elif dir == 'backward':
            super().backward(speed=speed, curve_left=curveLeft, curve_right=curveLeft)
        elif dir == 'left':
            super().left(speed=speed)
        elif dir == 'right':
            super().right(speed=speed)
        else:
            super().stop()

        print({'dir': dir, 'speed': speed, 'curveLeft': curveLeft, 'curveRight': curveRight})

    def stop(self):
        self.drive(dir='stop')

    def forward(self, speed=None, curveLeft=0, curveRight=0):
        self.drive(dir='forward', speed=speed, curveLeft=curveLeft, curveRight=curveRight)

    def backward(self, speed=None, curveLeft=0, curveRight=0):
        self.drive(dir='backward', speed=speed, curveLeft=curveLeft, curveRight=curveRight)

    def left(self, speed=None):
        self.drive(dir='left', speed=speed)

    def right(self, speed=None):
        self.drive(dir='right', speed=speed)
'''

''' from gpiozero import Robot '''

'''
Explorer HAT Motor Channels are default.
+    |   1   | GPIO 19
-    |   1   | GPIO 20
+    |   2   | GPIO 21
-   
'''
'''class Robo(Robot):'''
class Robo:

    # Constructor
    def __init__(self, left=(19, 20), right=(21, 26), pin_factory=None): 
        '''super().__init__(left=left, right=right, pin_factory=pin_factory)'''
        self.speed = 0.5 # 0 - 1 Speed.

    def drive(self, dir=None, speed=None, curveLeft=0, curveRight=0):

        if dir != 'stop':
            if speed is None:
                speed = self.speed

        '''
        if dir == 'forward' 
            super().forward(speed=speed, curve_left=curveLeft, curve_right=curveLeft)
        elif dir == 'backward':
            super().backward(speed=speed, curve_left=curveLeft, curve_right=curveLeft)
        elif dir == 'left':
            super().left(speed=speed)
        elif dir == 'right':
            super().right(speed=speed)
        else:
            super().stop()
        '''

        print({'dir': dir, 'speed': speed, 'curveLeft': curveLeft, 'curveRight': curveRight})

    def stop(self):
        self.drive(dir='stop')

    def forward(self, speed=None, curveLeft=0, curveRight=0):
        self.drive(dir='forward', speed=speed, curveLeft=curveLeft, curveRight=curveRight)

    def backward(self, speed=None, curveLeft=0, curveRight=0):
        self.drive(dir='backward', speed=speed, curveLeft=curveLeft, curveRight=curveRight)

    def left(self, speed=None):
        self.drive(dir='left', speed=speed)

    def right(self, speed=None):
        self.drive(dir='right', speed=speed)