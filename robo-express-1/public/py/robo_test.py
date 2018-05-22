from robo import Robo
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
    #r.drive({dir:'right', speed:1});