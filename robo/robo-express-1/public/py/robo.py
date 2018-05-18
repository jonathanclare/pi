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
        self.speed = 0.5 # 0 - 1 The default speed.
        self.curve = 0.5 # 0 - 1 The default amount to curve left/right whilst turning.

    # dir = stop | forwards | backwards | spin
    # turn = left | right
    # speed = 0 - 1
    def drive(self, dir=None, turn=None, speed=None, curveLeft=None, curveRight=None):

        if dir != 'stop':
            if speed is None:
                speed = self.speed

        if turn != None:
            if curve is None:
                curve = self.curve

        print({'dir': dir, 'turn': turn, 'speed': speed, 'curve': curve})

        if dir == 'forwards'
            if turn == 'left':
                super().forward(speed=speed, curve_left=self.curve)
            elif turn == 'right':
                super().forward(speed=speed, curve_right=self.curve)
            else:
                super().forward(speed=speed)
        elif dir == 'backwards':
            if turn == 'left':
                super().backward(speed=speed, curve_left=self.curve)
            elif turn == 'right':
                super().backward(speed=speed, curve_right=self.curve)
            else:
                super().backward(speed=speed)
        elif dir == 'spin':
            if turn == 'left':
                super().left(speed=speed)
            else:
                super().right(speed=speed)
        else:
            super().stop()

    def stop(self):
        print('stop')
        super().stop()

    def forwards(self, turn=None, speed=None, curveLeft=None, curveRight=None):
        print('forwards')
        self.drive(dir='forwards', turn=turn, speed=speed)

    def backwards(self, turn=None, speed=None, curveLeft=None, curveRight=None):
        print('backwards')
        self.drive(dir='backwards', turn=turn, speed=speed)

    def spin(self, turn=None, speed=None):
        print('spin')
        self.drive(dir='spin', turn=turn, speed=speed)
'''

class Robo:

    # Constructor
    def __init__(self, left=(19, 20), right=(21, 26)): 
        self.speed = 0.5 # 0 - 1 Speed.

    def drive(self, dir=None, speed=None, curveLeft=None, curveRight=None):

        if dir != 'stop':
            if speed is None:
                speed = self.speed

        print({'dir': dir, 'speed': speed, 'curveLeft': curveLeft, 'curveRight': curveRight})

    def stop(self):
        self.drive(dir='stop')

    def forwards(self, speed=None, curveLeft=None, curveRight=None):
        self.drive(dir='forwards', speed=speed, curveLeft=curveLeft, curveRight=curveRight)

    def backwards(self, speed=None, curveLeft=None, curveRight=None):
        self.drive(dir='backwards', speed=speed, curveLeft=curveLeft, curveRight=curveRight)

    def left(self, speed=None):
        self.drive(dir='left', speed=speed)

    def right(self, speed=None):
        self.drive(dir='right', speed=speed)