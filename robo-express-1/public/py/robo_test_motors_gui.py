from guizero import App, Box, PushButton
from robo import Robo

r = Robo()

def test():
    app = App(title='Robo', height=300, width=300, layout='grid')
    
    box = Box(app, layout='grid', grid=[0,0])
    PushButton(box, r.leftMotorForward, text='Left Motor Forward', grid=[0,0])
    PushButton(box, r.rightMotorForward, text='Right Motor Forward', grid=[1,0])

    box = Box(app, layout='grid', grid=[0,1])
    PushButton(box, r.forwardLeft, text='Forward Left', grid=[0,0])
    PushButton(box, r.forward, text='Forward', grid=[1,0])
    PushButton(box, r.forwardRight, text='Forward Right', grid=[2,0])
    PushButton(box, r.pivotLeft, text='Pivot Left', grid=[0,1])
    PushButton(box, r.stop, text='Stop', grid=[1,1])
    PushButton(box, r.pivotRight, text='Pivot Right', grid=[2,1])
    PushButton(box, r.backwardLeft, text='Backward Left', grid=[0,2])
    PushButton(box, r.backward, text='Backward', grid=[1,2])
    PushButton(box, r.backwardRight, text='Backward Right', grid=[2,2])

    box = Box(app, layout='grid', grid=[0,2])
    PushButton(box, r.leftMotorBackward, text='Left Motor Backward', grid=[0,0])
    PushButton(box, r.rightMotorBackward, text='Right Motor Backward', grid=[1,0])

    app.display()

test()