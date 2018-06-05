from flask import Flask, request, render_template, Response
import json
import os
from robo import Robo, RoboThread
import datetime
from time import sleep
import sys, traceback
import signal

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

@app.route('/robo/state')
def state():
    return json.dumps(r.state)

@app.route('/robo/stop')
def stop():
    sleep(0.1)
    rt.stop()
    return json.dumps(r.state)

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

    rt.drive(**data)

    return json.dumps(r.state)

'''
side = left | right
dir = forward | backward
speed = 0 - 1
'''
@app.route('/robo/motor/<side>')
def motor(side=None):

    data = {'side':side};

    # Query string params.
    if request.args.get('dir') != None:      
        data['dir'] = request.args.get('dir')
    if request.args.get('speed') != None:      
        data['speed'] = request.args.get('speed')

    rt.motor(**data)

    return json.dumps(r.state)

from camera import Camera

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
c.start()

def gen():
    while True:
        yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + c.getFrame() + b'\r\n')
        sleep(0.01)

@app.route('/robo/camera/<cmd>')
def cam(cmd=None):
    if cmd == 'feed':
        return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')
    elif cmd == 'start': 
        c.start()
    elif cmd == 'stop': 
        c.stop()


# Handler for a clean shutdown when pressing Ctrl-C
def signalHandler(signal, frame):
    print("----exiting----")
    c.stop()
    rt.stop()
    sys.exit(0)

def main():
    signal.signal(signal.SIGINT, signalHandler)
    app.run(threaded=True, host='0.0.0.0')

    '''
    try:
        #app.jinja_env.cache = {}
        app.run(threaded=True, host='0.0.0.0')
    except KeyboardInterrupt:
        print('----------Shutdown requested...exiting----------')
    except Exception:
        traceback.print_exc(file=sys.stdout)
    c.stop()
    rt.stop()
    sys.exit(0)
    '''

if __name__ == "__main__":
    main()