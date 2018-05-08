import explorerhat as eh
from time import sleep
import math
from guizero import App, Box, PushButton

# invert() - Reverses the direction of forwards for this motor
# forwards( speed ) - Turns the motor "forwards" at speed ( default 100% )
# backwards( speed ) - Turns the motor "backwards" at speed ( default 100% )
# speed(-100 to 100) - Moves the motor at speed, from full backwards to full forwards
# stop() - Stops the motor by setting its speed to 0

print("Robo1 Online!")

speed = 50 # 0 - 100%
l = eh.motor.one
r = eh.motor.two

def circle():
    l.forwards()
    r.backwards()

def stop():
    l.stop()
    r.stop()

def forwards():
    l.forwards(speed)
    r.forwards(speed)

def backwards():
    l.backwards(speed)
    r.backwards(speed)

def left():
    l.forwards(speed / 2)
    r.forwards(speed)

def right():
    l.forwards(speed)
    r.forwards(speed / 2)

def faster():
    speed = math.min(speed + 10, 100)

def slower():
    speed = math.max(speed - 10, 0)

# GUI
app = App(title="Robo1 Controller", height=300, width=300, layout="grid")
box = Box(app, layout="grid", grid=[1,1])
btnForward = PushButton(box, forwards, text="Forwards", grid=[1,0])
btnLeft = PushButton(box, left, text="Left", grid=[0,1])
btnStop = PushButton(box, stop, text="Stop", grid=[1,1])
btnRight = PushButton(box, right, text="Right", grid=[2,1])
btnReverse = PushButton(box, backwards, text="Reverse", grid=[1,2])

app.display()

# Explore!
'''
circle()
while True:
    stop()
    time.sleep(3)
    circle()
    time.sleep(1)
    moveForward()
    time.sleep(2)
'''