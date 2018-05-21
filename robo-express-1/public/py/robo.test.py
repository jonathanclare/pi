from robo import Robo
from guizero import App, Box, PushButton
from time import sleep
from multiprocessing import Pool 
from threading import Thread

r = Robo()

def leftMotorForward():
    print('left motor forward')
    #r.left_motor.forward()

def leftMotorBackward():
    print('left motor backward')
    #r.left_motor.forward()

def rightMotorForward():
    print('right motor forward')
    #r.right_motor.forward()

def rightMotorBackward():
    print('right motor backward')
    #r.right_motor.backward()

def forwardLeft():
    print('forward left')
    #r.drive({dir:'forward', curveLeft:0.5, speed:1});

def backwardLeft():
    print('backward left')
    #r.drive({dir:'backward', curveLeft:0.5, speed:1});

def forwardRight():
    print('forward right')
    #r.drive({dir:'forward', curveRight:0.5, speed:1});

def backwardRight():
    print('backward right')
    #r.drive({dir:'backward', curveRight:0.5, speed:1});

def forward():
    print('forward')
    #r.drive({dir:'forward', speed:1});

def backward():
    print('backward')
    #r.drive({dir:'backward', speed:1});

def pivotLeft():
    print('pivot left')
    #r.drive({dir:'left', speed:1});

def pivotRight():
    print('pivot right')
    #r.drive({dir:'right', speed:1});

def stop():
    print('stop')
    #r.drive({dir:'stop'});


from threading import Timer,Thread,Event

class MyThread(Thread):
    def __init__(self, event):
        Thread.__init__(self)
        self.stopped = event

    def run(self):
        while not self.stopped.wait(0.5):
            print("my thread")
            # call a function

stopFlag = Event()
thread = MyThread(stopFlag)


def startThread(dir):
    stopFlag = Event()
    thread = MyThread(stopFlag)
    thread.start()

def stopThread(dir):
    stopFlag.set()


def testButtonPress():

    app = App(title='Robo', height=300, width=300, layout='grid')
    
    box = Box(app, layout='grid', grid=[0,1])
    btnForwardLeft = PushButton(box, command=startThread, args=['forward'], text='Forward Left', grid=[0,0])
    btnForward = PushButton(box, command=stopThread, args=['forward'], text='Forward', grid=[1,0])
    btnForwardRight = PushButton(box, command=stopThread, args=['forward'], text='Forward Right', grid=[2,0])
    btnPivotLeft = PushButton(box, command=stopThread, args=['left'], text='Pivot Left', grid=[0,1])
    btnStop = PushButton(box, command=stopThread, args=['stop'], text='Stop', grid=[1,1])
    btnPivotRight = PushButton(box, command=stopThread, args=['right'], text='Pivot Right', grid=[2,1])
    btnBackwardLeft = PushButton(box, command=stopThread, args=['backward'], text='Backward Left', grid=[0,2])
    btnBackward = PushButton(box, command=stopThread, args=['backward'], text='Backward', grid=[1,2])
    btnBackwardRight = PushButton(box, command=stopThread, args=['backward'], text='Backward Right', grid=[2,2])

    app.display()

testButtonPress()

def testMotors(t=3):
    leftMotorBackward()
    sleep(t)
    leftMotorBackward()
    sleep(t)
    rightMotorForward()
    sleep(t)
    rightMotorBackward()
    sleep(t)
    forwardLeft()
    sleep(t)
    backwardLeft()
    sleep(t)
    forwardRight()
    sleep(t)
    backwardRight()
    sleep(t)
    forward()
    sleep(t)
    backward()
    sleep(t)
    pivotLeft()
    sleep(t)
    pivotRight()
    sleep(t)
    pivotLeft()
    sleep(t)
    stop()
    sleep(t)

def testMotorsGui():
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