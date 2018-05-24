from flask import Flask, request, render_template
import json
from robo import Robo, RoboThread
from time import sleep

app = Flask(__name__)

r = Robo()
rt = RoboThread(r)

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
        rt.kill()
        r.stop()
        sleep(0.1) 

    return json.dumps(data)

if __name__ == "__main__":
    app.run(host='0.0.0.0')