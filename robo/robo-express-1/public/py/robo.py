#import explorerhat as eh

# invert() - Reverses the direction of forwards for this motor
# forwards(speed) - Turns the motor "forwards" at speed ( default 100% )
# backwards(speed) - Turns the motor "backwards" at speed ( default 100% )
# speed(-100 to 100) - Moves the motor at speed, from full backwards to full forwards
# stop() - Stops the motor by setting its speed to 0

class Robo:

    name = 'Robo 1' # class variable shared by all instances.

    def __init__(self): # Constructor
        self.speed = 50 # 0 - 100% instance variable unique to each instance.
        #self.l = eh.motor.one
        #self.r = eh.motor.two

    def move(self, movement='stop', direction=''):
        print('move')
        #self.l.forwards()
        #self.r.backwards()

    def spin(self):
        print('spin')
        #self.l.forwards()
        #self.r.backwards()

    def stop(self):
        print('stop')
        #self.l.stop()
        #self.r.stop()

    def forwards(self):
        print('forwards')
        #self.l.forwards(self.speed)
        #self.r.forwards(self.speed)

    def backwards(self):
        print('backwards')
        #self.l.backwards(self.speed)
        #self.r.backwards(self.speed)

    def left(self):
        print('left')
        #self.l.forwards(self.speed / 2)
        #self.r.forwards(self.speed)

    def right(self):
        print('right')
        #self.l.forwards(self.speed)
        #self.r.forwards(self.speed / 2)

    def faster(self):
        print('faster ', self.speed)
        #self.speed = min(self.speed + 10, 100)

    def slower(self):
        print('slower ', self.speed)
        #self.speed = max(self.speed - 10, 0)