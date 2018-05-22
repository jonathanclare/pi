from guizero import App, Box, PushButton
import sys
import util
from robo import Robo

r = Robo()
t = 1
speed = 1

def leftMotorForward():
    r.motor(side='left', dir='forward', speed=speed, t=t)

def leftMotorBackward():
    r.motor(side='left', dir='backward', speed=speed, t=t)

def rightMotorForward():
    r.motor(side='right', dir='forward', speed=speed, t=t)

def rightMotorBackward():
    r.motor(side='right', dir='backward', speed=speed, t=t)

def forwardLeft():
    r.move(dir='forward', curveLeft=0.5, speed=speed, t=t)

def backwardLeft():
    r.move(dir='backward', curveLeft=0.5, speed=speed, t=t)

def forwardRight():
    r.move(dir='forward', curveRight=0.5, speed=speed, t=t)

def backwardRight():
    r.move(dir='backward', curveRight=0.5, speed=speed, t=t)

def forward():
    r.move(dir='forward', speed=speed, t=t)

def backward():
    r.move(dir='backward', speed=speed, t=t)

def pivotLeft():
    r.move(dir='left', speed=speed, t=t)

def pivotRight():
    r.move(dir='right', speed=speed, t=t)

def stop():
    r.move(dir='stop')

def test():
    app = App(title='Robo', height=300, width=300, layout='grid')
    
    box = Box(app, layout='grid', grid=[0,0])
    btnLeftMotorForward = PushButton(box, leftMotorForward, text='Left Motor Forward', grid=[0,0])
    btnRightMotorForward = PushButton(box, rightMotorForward, text='Right Motor Forward', grid=[1,0])

    box = Box(app, layout='grid', grid=[0,1])
    btnForwardLeft = PushButton(box, forwardLeft, text='Forward Left', grid=[0,0])
    btnForward = PushButton(box, forward, text='Forward', grid=[1,0])
    btnForwardRight = PushButton(box, forwardRight, text='Forward Right', grid=[2,0])
    btnPivotLeft = PushButton(box, pivotLeft, text='Pivot Left', grid=[0,1])
    btnStop = PushButton(box, stop, text='Stop', grid=[1,1])
    btnPivotRight = PushButton(box, pivotRight, text='Pivot Right', grid=[2,1])
    btnBackwardLeft = PushButton(box, backwardLeft, text='Backward Left', grid=[0,2])
    btnBackward = PushButton(box, backward, text='Backward', grid=[1,2])
    btnBackwardRight = PushButton(box, backwardRight, text='Backward Right', grid=[2,2])

    box = Box(app, layout='grid', grid=[0,2])
    btnLeftMotorBackward = PushButton(box, leftMotorBackward, text='Left Motor Backward', grid=[0,0])
    btnRightMotorBackward = PushButton(box, rightMotorBackward, text='Right Motor Backward', grid=[1,0])

    app.display()

if len(sys.argv) > 1 and util.isNumber(sys.argv[1]):
    t = float(sys.argv[1])

test()