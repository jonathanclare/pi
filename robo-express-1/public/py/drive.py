import sys, json
from robo import Robo
from time import sleep

# JSON string passed in from Node.
lines = sys.stdin.readlines()  

# Convert JSON string to dictionary object.
data = json.loads(lines[0])

# Create new robot and pass in dictionary as arguments.
r = Robo()

while True:
	r.drive(**data)
	sleep(0.1)
	sys.stdout.flush()