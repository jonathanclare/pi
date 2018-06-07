from flask import Flask, request, render_template, Response
import json
import datetime
from time import time, sleep
import sys
import signal
from robo import Robo
from infinite_thread import InfiniteThread
from picamera import PiCamera

app = Flask(__name__)

def driveFnc(**kwargs):
    while driveThread.isRunning:
        robo.drive(**kwargs)
        sleep(0.1)
    print('--------Stop Drive Thread--------')

robo = Robo()
driveThread = InfiniteThread(driveFnc)

@app.route("/")
def index():
    return "Hello Robo!"

@app.route('/robo')
def robot():
    now = datetime.datetime.now()
    date = now.strftime('%H-%M-%S')
    template_data = {
        'title' : 'ROBO',
        'date': date
    }
    return render_template('robo.html', **template_data)

@app.route('/robo/state')
def state():
    return json.dumps(robo.state)

@app.route('/robo/stop')
def stop():
    driveThread.stop()
    sleep(0.1)
    robo.stop()
    return json.dumps(robo.state)

'''
dir = forward | backward | left | right
curveLeft = 0 - 1
curveRight = 0 - 1
speed = 0 - 1
'''
@app.route('/robo/drive/<dir>')
def drive(dir=None):

    data = {'dir':dir};

    # Query string params.
    if request.args.get('speed') != None:      
        data['speed'] = request.args.get('speed')
    if request.args.get('curveLeft') != None:  
        data['curveLeft'] = request.args.get('curveLeft')
    if request.args.get('curveRight') != None: 
        data['curveRight'] = request.args.get('curveRight')

    driveThread.start(**data)

    return json.dumps(robo.state)


'''
Multipart response

HTTP/1.1 200 OK
Content-Type: multipart/x-mixed-replace; boundary=frame

--frame
Content-Type: image/jpeg

<jpeg data here>

--frame
Content-Type: image/jpeg

<jpeg data here>

...

'''
picam = PiCamera()
picam.rotation = 180
picam.start_preview()
sleep(2) 

#frames = [open(f + '.jpg', 'rb').read() for f in ['1', '2', '3']]
def getFrame():
    #f = frames[int(time()) % 3]
    picam.capture('./image.jpg')
    sleep(0.1) 
    f = open('./image.jpg', 'rb').read()
    return f

def gen():
    while True:
        yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + getFrame() + b'\r\n')
        sleep(0.1)

@app.route('/robo/camera')
def camera(cmd=None):
    return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')

# Handler for a clean shutdown when pressing Ctrl-C
def signalHandler(signal, frame):
    print("----exiting----")
    picam.stop_preview()
    driveThread.stop()
    robo.stop()
    sys.exit(0)

def main():
    signal.signal(signal.SIGINT, signalHandler)
    app.run(threaded=True, host='0.0.0.0')

if __name__ == "__main__":
    main()