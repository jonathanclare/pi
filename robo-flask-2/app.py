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
# CLONE CODE FROM GITHUB
# Open terminal
# > git clone https://github.com/jonathanclare/pi.git
#
# OVERWRITE CODE FROM GITHUB
# Open terminal
# > git fetch --all
# > git reset --hard origin/master
#
# INSTALL FLASK ON PI 
# Open terminal
# > sudo apt-get install python3-flask
#
# RUN ON PI
# Open terminal
# > cd <This directory>
# > sudo python3 app.py
#
#
# BROWSER URL
# 127.0.0.1 is considered localhost for IPv4
# http://127.0.0.1:5000/robo
#
#
# VIEW ON OTHER DEVICES:
# Open terminal to get Pi’s IP address (eg 192.168.1.3) 
# > hostname -I
# BROWSER URL
# http://192.168.0.22:5000/robo
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
    return "Hello Robo!"

@app.route('/robo')
def robot():
    return render_template('robo.html')

@app.route('/robo/drive/<state>')
def drive(state=None):

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
        'title' : 'ROBO',
        'state' : state,
        'time': time,
        'speed': r.speed
    }

    return render_template('robo.html', **template_data)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
