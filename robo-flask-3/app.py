from flask import Flask, request, render_template
import json
from robo import Robo
from time import sleep
import threading

app = Flask(__name__)

r = Robo()

@app.route("/")
def index():
    return "Hello Robo!"

@app.route('/robo')
def robot():
    return render_template('robo.html')

'''
dir = stop | forward | backward | left | right
curveLeft = 0 - 1
curveRight = 0 - 1
speed = 0 - 1
motor = left | right
'''

driveThread = threading.Thread()
driving = False

def driveLoop(**kwargs):
    while driving:
        r.drive(**kwargs)
        sleep(0.1)
    print('Stop Driving')

@app.route('/robo/drive/<dir>')
def drive(dir=None):

    global driveThread
    global driving

    if driveThread.isAlive():  
        driving = False
        driveThread.join()    

    data = {'dir':dir};

    # Query string params.
    if request.args.get('speed') != None:      
        data['speed'] = request.args.get('speed')
    if request.args.get('curveLeft') != None:  
        data['curveLeft'] = request.args.get('curveLeft')
    if request.args.get('curveRight') != None: 
        data['curveRight'] = request.args.get('curveRight')
    if request.args.get('motor') != None:      
        data['motor'] = request.args.get('motor')

    #r.drive(**data)
    #sleep(0.1)

    if dir != 'stop':
        driving = True
        driveThread = threading.Thread(target=driveLoop, kwargs=data)
        driveThread.start()
    else:   
        r.stop()
        sleep(0.1) 

    return json.dumps(data)

if __name__ == "__main__":
    app.run(host='0.0.0.0')