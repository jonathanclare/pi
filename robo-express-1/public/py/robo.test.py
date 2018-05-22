from robo import Robo
from guizero import App, Box, PushButton
import time
import threading

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

#def stop():
    print('stop')
    #r.drive({dir:'stop'});

#def startThread(dir):
    #stopFlag = Event()
    #thread = MyThread(stopFlag)
    #thread.start()

class MyThread:

    # Constructor
    def __init__(self, left=(26, 21), right=(20, 19), pin_factory=None): 
        self.t = threading.Thread()
        self.driving = False

    def start(self, dir=None, speed=None, curveLeft=0, curveRight=0):
        self.stop()
        self.driving = True
        self.t = threading.Thread(target=self.startThread, args=(dir, speed, curveLeft, curveRight))
        self.t.start()

    def stop(self):     
        if self.t.isAlive():  
            self.driving = False
            self.t.join()     

    def startThread(self, dir=None, speed=None, curveLeft=0, curveRight=0):
        while self.driving:
            r.drive(dir, speed, curveLeft, curveRight)
            time.sleep(0.1)
        print("Stopping as you wish.")

#if __name__ == "__main__":
 #   main()

def testButtonPress():
    
    t = MyThread()

    def move(dir):
        if dir == 'stop':
            t.stop()
        else:
            t.start(dir)

    app = App(title='Robo', height=300, width=300, layout='grid')
    
    box = Box(app, layout='grid', grid=[0,1])
    btnForwardLeft = PushButton(box, command=move, args=['forward'], text='Forward Left', grid=[0,0])
    btnForward = PushButton(box, command=move, args=['forward'], text='Forward', grid=[1,0])
    btnForwardRight = PushButton(box, command=move, args=['forward'], text='Forward Right', grid=[2,0])
    btnPivotLeft = PushButton(box, command=move, args=['left'], text='Pivot Left', grid=[0,1])
    btnStop = PushButton(box, command=move, text='Stop', args=['stop'], grid=[1,1])
    btnPivotRight = PushButton(box, command=move, args=['right'], text='Pivot Right', grid=[2,1])
    btnBackwardLeft = PushButton(box, command=move, args=['backward'], text='Backward Left', grid=[0,2])
    btnBackward = PushButton(box, command=move, args=['backward'], text='Backward', grid=[1,2])
    btnBackwardRight = PushButton(box, command=move, args=['backward'], text='Backward Right', grid=[2,2])

    app.display()

testButtonPress()

def testMotors(t=3):
    leftMotorBackward()
    time.sleep(t)
    leftMotorBackward()
    time.sleep(t)
    rightMotorForward()
    time.sleep(t)
    rightMotorBackward()
    time.sleep(t)
    forwardLeft()
    time.sleep(t)
    backwardLeft()
    time.sleep(t)
    forwardRight()
    time.sleep(t)
    backwardRight()
    time.sleep(t)
    forward()
    time.sleep(t)
    backward()
    time.sleep(t)
    pivotLeft()
    time.sleep(t)
    pivotRight()
    time.sleep(t)
    pivotLeft()
    time.sleep(t)
    stop()
    time.sleep(t)

def testMotorsUsingGui():
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