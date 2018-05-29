from flask import Flask, request, render_template, Response
import json
import os
from robo import Robo, RoboThread
import datetime
from time import sleep

app = Flask(__name__)

r = Robo()
rt = RoboThread(r)

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

'''
dir = stop | forward | backward | left | right
curveLeft = 0 - 1
curveRight = 0 - 1
speed = 0 - 1
motor = left | right
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
    if request.args.get('motor') != None:      
        data['motor'] = request.args.get('motor')

    if dir != 'stop':
        rt.drive(**data)
    else:  
        sleep(0.1)
        rt.kill()
        r.stop()

    return json.dumps(data)

from camera import Camera, CameraThread

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

c = Camera()
ct = CameraThread(c)
ct.start()

def gen():
    while True:
        yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + ct.getFrame() + b'\r\n')

@app.route('/robo/video_feed')
def video_feed():
    return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(threaded=True, host='0.0.0.0')