'''
from gpiozero import Robot

# Explorer HAT Motor Channels are default.
# +    |   1   | GPIO 19
# -    |   1   | GPIO 20
# +    |   2   | GPIO 21
# -    |   2   | GPIO 26
class Robo(Robot, left=(19, 20), right=(21, 26)):

    name = 'Robo 1' # class variable shared by all instances.

    # Constructor
    def __init__(self, pin_factory=None):
        #super(Robo, self).__init__((19, 20), (21, 26), pin_factory=pin_factory) # Python 2
        super().__init__(left, right, pin_factory=pin_factory)
        self.speed = 0.5 # 0 - 1 Speed.
        self.curve = 0.5 # 0 - 1 The amount to curve left while moving forwards.

    # dir = stop | forwards | backwards | spin
    # turn = straight | left | right
    # speed = 0 - 1
    def drive(self, dir=None, turn=None, speed=None):
        print({'dir': dir, 'turn': turn, 'speed': speed})

        if speed is None:
            speed = self.speed

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

    def forwards(self, turn=None, speed=None):
        print('forwards')
        self.drive(dir='forwards', turn=turn, speed=speed)

    def backwards(self, turn=None, speed=None):
        print('backwards')
        self.drive(dir='backwards', turn=turn, speed=speed)

    def spin(self, turn=None, speed=None):
        print('spin')
        self.drive(dir='spin', turn=turn, speed=speed)
'''

class Robo:

    name = 'Robo 1' # class variable shared by all instances.

    # Constructor
    def __init__(self, left=(19, 20), right=(21, 26)): 
        self.speed = 0.5 # 0 - 1 instance variable unique to each instance.
        #self.l = eh.motor.one
        #self.r = eh.motor.two

    # dir = stop | forwards | backwards | spin
    # turn = straight | left | right
    # speed = 0 - 1
    def drive(self, dir=None, turn=None, speed=None):

        if speed is None:
            speed = self.speed
            
        print({'dir': dir, 'turn': turn, 'speed': speed})
        #self.l.forwards()
        #self.r.backwards()

    def stop(self):
        print('stop')
        #self.l.stop()
        #self.r.stop()

    def forwards(self, turn=None, speed=None):
        print('forwards')
        #self.l.forwards(self.speed)
        #self.r.forwards(self.speed)

    def backwards(self, turn=None, speed=None):
        print('backwards')
        #self.l.backwards(self.speed)
        #self.r.backwards(self.speed)

    def spin(self, turn=None, speed=None):
        print('spin')
        #self.speed = min(self.speed + 10, 100)