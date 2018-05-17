class Robo:

    name = 'Robo 1' # class variable shared by all instances.

    # Constructor
    def __init__(self): 
        self.speed = 0.5 # 0 - 1 instance variable unique to each instance.
        #self.l = eh.motor.one
        #self.r = eh.motor.two

    '''
    move = stop | forwards | backwards | spin
    direction = straight | left | right
    speed = 0 - 1
    '''
    def drive(self, move=None, direction='', speed=''):
        print({'move': move, 'direction': direction, 'speed': speed})
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

    def spin(self, direction='left'):
        print(spin)
        #self.speed = min(self.speed + 10, 100)