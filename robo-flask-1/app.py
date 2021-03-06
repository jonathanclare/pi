# INSTALL FLASK ON WINDOWS
# Open command prompt
# > pip install flask
#
# RUN ON WINDOWS
# https://stackoverflow.com/questions/31080829/python-error-io-unsupportedoperation-fileno
# Open command prompt
# > cd <This directory>
# > python app.py
#
#
# INSTALL FLASK ON PI
# Open terminal
# > sudo apt-get install python3-flask
#
# RUN ON PI
# Open terminal
# > cd <This directory>
# > sudo python app.py
#
#
# BROWSER URL
# http://127.0.0.1:5000/robo
#
#
# VIEW ON OTHER DEVICES:
# Open terminal to get Pi’s IP address (eg 192.168.1.3) 
# > hostname -I
# BROWSER URL
# http://192.168.1.3:5000/robo
#
#
# TAKE A PHOTO
# https://github.com/bennuttall/bett-bot
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
    elif state == 'spin':
        r.spin()
    elif state == 'alarm':
        r.alarm()
    elif state == 'photo':
        r.photo()
    else:
        print('None')

    now = datetime.datetime.now()
    time = now.strftime("%Y-%m-%d %H:%M")

    template_data = {
        'state' : state,
        'time': time,
        'speed': r.speed
    }

    return render_template('robo.html', **template_data)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')