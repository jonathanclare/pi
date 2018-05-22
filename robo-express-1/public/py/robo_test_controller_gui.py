from guizero import App, Box, PushButton
import sys
import util
from robo import Robo

r = Robo()
t = 1
speed = 1

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
