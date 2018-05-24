from guizero import App, Box, PushButton, Slider
from robo import Robo
from time import sleep

r = Robo()

t = 1

def timeChanged(value):
    global t
    t = int(value)

def drive(fnc):
    global t
    fnc()
    sleep(t)

def test():
    app = App(title='Robo', height=300, width=400, layout='grid')
    
    box = Box(app, layout='grid', grid=[0,0])
    PushButton(box, command=drive, args=[r.leftMotorForward], text='Left Motor Forward', grid=[0,0])
    PushButton(box, command=drive, args=[r.rightMotorForward], text='Right Motor Forward', grid=[1,0])

    box = Box(app, layout='grid', grid=[0,1])
    PushButton(box, command=drive, args=[r.forwardLeft], text='Forward Left', grid=[0,0])
    PushButton(box, command=drive, args=[r.forward], text='Forward', grid=[1,0])
    PushButton(box, command=drive, args=[r.forwardRight], text='Forward Right', grid=[2,0])
    PushButton(box, command=drive, args=[r.pivotLeft], text='Pivot Left', grid=[0,1])
    PushButton(box, command=r.stop, text='Stop', grid=[1,1])
    PushButton(box, command=drive, args=[r.pivotRight], text='Pivot Right', grid=[2,1])
    PushButton(box, command=drive, args=[r.backwardLeft], text='Backward Left', grid=[0,2])
    PushButton(box, command=drive, args=[r.backward], text='Backward', grid=[1,2])
    PushButton(box, command=drive, args=[r.backwardRight], text='Backward Right', grid=[2,2])

    box = Box(app, layout='grid', grid=[0,2])
    PushButton(box, command=drive, args=[r.leftMotorBackward], text='Left Motor Backward', grid=[0,0])
    PushButton(box, command=drive, args=[r.rightMotorBackward], text='Right Motor Backward', grid=[1,0])

    slider = Slider(app, command=timeChanged, grid=[0,3], start=0, end=10)

    app.display()

test()