import sys
from robo import Robo

action = sys.argv[1]
r = Robo()

#print(action)
#sys.stdout.flush()

def drive(state=None):
    if state == 'forwards':
        r.forwards()
    elif state == 'backwards':
        r.backwards()
    elif state == 'left':
        r.left()
    elif state == 'right':
        r.right()
    elif state == 'stop':
        r.stop()
    elif state == 'faster':
        r.faster()
    elif state == 'slower':
        r.slower()
    elif state == 'spin':
        r.spin()
    elif state == 'alarm':
        r.alarm()
    elif state == 'photo':
        r.photo()
    else:
        print('None')

drive(action)