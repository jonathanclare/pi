import sys
import util
from time import sleep
from robo import Robo

r = Robo()

def test(speed=1):
    r.forwardLeft(speed=speed)
    sleep(1)
    r.backwardLeft(speed=speed)
    sleep(1)
    r.forwardRight(speed=speed)
    sleep(1)
    r.backwardRight(speed=speed)
    sleep(1)
    r.forward(speed=speed, curveLeft=0.8)
    sleep(1)
    r.forward(speed=speed, curveRight=0.8)
    sleep(1)
    r.backward(speed=speed, curveLeft=0.8)
    sleep(1)
    r.backward(speed=speed, curveRight=0.8)
    sleep(1)
    r.pivotLeft(speed=speed)
    sleep(1)
    r.pivotRight(speed=speed)
    sleep(1)
    r.stop()

if len(sys.argv) > 1 and util.isNumber(sys.argv[1]):
    test(float(sys.argv[1]))
else:
    test()