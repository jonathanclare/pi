from flask import Flask, request, render_template, Response
import json
import datetime
import sys
import signal
from robo import Robo
from camera import Camera

app = Flask(__name__)

robo = Robo()

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

'''
Play
'''
@app.route('/robo/play')
def play():
    template_data = {
        'title' : 'ROBO PLAY',
    }
    return render_template('play.html', **template_data)


'''
Drive
'''

@app.route('/robo/stop')
def stop():
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

    data = {'dir':dir, 'indefinite':True};

    # Query string params.
    if request.args.get('speed') != None:      
        data['speed'] = request.args.get('speed')
    if request.args.get('curveLeft') != None:  
        data['curveLeft'] = request.args.get('curveLeft')
    if request.args.get('curveRight') != None: 
        data['curveRight'] = request.args.get('curveRight')

    robo.drive(**data)

    return json.dumps(robo.state)


'''
Camera

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

cam = Camera()

@app.route('/robo/camera')
def camera(cmd=None):
    return Response(cam.generateFrames(), mimetype='multipart/x-mixed-replace; boundary=frame')

'''
Start/Stop
'''

# Exit
def onExit(signal, frame):
    print("----exiting----")
    #picam.stop_preview()
    robo.stop()
    sys.exit(0)

# Strtup
def main():
    signal.signal(signal.SIGINT, onExit)
    app.run(threaded=True, host='0.0.0.0')

if __name__ == "__main__":
    main()