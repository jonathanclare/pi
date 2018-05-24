from flask import Flask, render_template
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

    template_data = {
        'title' : 'ROBO'
    }

    return render_template('robo.html', **template_data)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
