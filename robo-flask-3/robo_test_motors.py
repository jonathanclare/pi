import sys
import util
from robo import Robo

r = Robo()

def test(t=1, speed=1):
    r.leftMotorForward(speed=speed, t=t)
    r.leftMotorBackward(speed=speed, t=t)
    r.rightMotorForward(speed=speed, t=t)
    r.rightMotorBackward(speed=speed, t=t)
    r.forwardLeft(speed=speed, t=t)
    r.forwardRight(speed=speed, t=t)
    r.backwardLeft(speed=speed, t=t)
    r.backwardRight(speed=speed, t=t)
    r.pivotLeft(speed=speed, t=t)
    r.pivotRight(speed=speed, t=t)
    r.stop()

if len(sys.argv) > 1 and util.isNumber(sys.argv[1]):
    test(float(sys.argv[1]))
else:
    test()