import sys
import util
from robo import Robo

r = Robo()

def test(t=3, speed=1):
    r.motor(side='left', dir='forward', speed=speed, t=t)
    r.motor(side='left', dir='backward', speed=speed, t=t)
    r.motor(side='right', dir='forward', speed=speed, t=t)
    r.motor(side='right', dir='backward', speed=speed, t=t)
    r.move(dir='forward', curveLeft=0.5, speed=speed, t=t)
    r.move(dir='backward', curveLeft=0.5, speed=speed, t=t)
    r.move(dir='forward', curveRight=0.5, speed=speed, t=t)
    r.move(dir='backward', curveRight=0.5, speed=speed, t=t)
    r.move(dir='forward', speed=speed, t=t)
    r.move(dir='backward', speed=speed, t=t)
    r.move(dir='left', speed=speed, t=t)
    r.move(dir='right', speed=speed, t=t)
    r.move(dir='right', speed=speed, t=t)

if len(sys.argv) > 1 and util.isNumber(sys.argv[1]):
    test(float(sys.argv[1]))
else:
    test()