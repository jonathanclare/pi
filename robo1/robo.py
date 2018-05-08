#import explorerhat as eh

# invert() - Reverses the direction of forwards for this motor
# forwards(speed) - Turns the motor "forwards" at speed ( default 100% )
# backwards(speed) - Turns the motor "backwards" at speed ( default 100% )
# speed(-100 to 100) - Moves the motor at speed, from full backwards to full forwards
# stop() - Stops the motor by setting its speed to 0

print("Robo1 Online!")

class Robo:

    name = 'Robo 1' # class variable shared by all instances.

    def __init__(self): # Constructor
        self.speed = 50 # 0 - 100% instance variable unique to each instance.
        #self.l = eh.motor.one
        #self.r = eh.motor.two
        print('New robot instance created')

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
        #self.l.forwards(speed)
        #self.r.forwards(speed)

    def backwards(self):
        print('backwards')
        #self.l.backwards(speed)
        #self.r.backwards(speed)

    def left(self):
        print('left')
        #self.l.forwards(speed / 2)
        #self.r.forwards(speed)

    def right(self):
        print('right')
        #self.l.forwards(speed)
        #self.r.forwards(speed / 2)

    def faster(self):
        self.speed = min(self.speed + 10, 100)
        print('faster ', self.speed)

    def slower(self):
        self.speed = max(self.speed - 10, 0)
        print('slower ', self.speed)

    def alarm(self):
        print('alarm')