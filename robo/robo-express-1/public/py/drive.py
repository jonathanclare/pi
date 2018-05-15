import sys, json
from robo import Robo

lines = sys.stdin.readlines()
data = json.loads(lines[0])
r = Robo()
r.move(data['movement'], data['direction'])