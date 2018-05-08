# INSTALL FLASK ON WINDOWS
# pip install flask
#
# RUN ON WINDOWS
# https://stackoverflow.com/questions/31080829/python-error-io-unsupportedoperation-fileno
# Open command prompt
# > cd C:\Work\GitHub\pi\robo
# > python app.py
#
#
# INSTALL FLASK ON PI
# > sudo apt-get install python3-flask
#
# RUN ON PI
# > cd C:\Work\GitHub\pi\robo
# > sudo python app.py
#
#
# BROWSER URL
# http://127.0.0.1:5000/robo
#
#
# VIEW ON OTHER DEVICES:
# Open terminal to get Pi’s IP address 
# > hostname -I
# BROWSER URL
# http://192.168.1.3:5000/robo
#
#
# TAKE A PHOTO
#
#

from flask import Flask, render_template
import datetime
from robo import Robo

app = Flask(__name__)

r = Robo()

@app.route("/")
def index():
    return "Hello world!"

@app.route('/robo')
def robot():
    return render_template('robo.html')

@app.route('/robo/<state>')
def robotState(state=None):

    if state == 'forwards':
        r.forwards()
    elif state == 'backwards':
        r.backwards()
    elif state == 'left':
        r.left()
    elif state == 'right':
        r.right()
    elif state == 'stop':
        r.stop()
    elif state == 'faster':
        r.faster()
    elif state == 'slower':
        r.slower()
    else:
        print('None')

    now = datetime.datetime.now()
    time = now.strftime("%Y-%m-%d %H:%M")

    template_data = {
        'state' : state,
        'time': time,
        'speed': r.speed
    }

    return render_template('robo.html', **template_data, debug=True)

if __name__ == "__main__":
    app.run()