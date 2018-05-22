import sys, json
from robo import Robo

# JSON string passed in from Node.
lines = sys.stdin.readlines()  

# Convert JSON string to dictionary object.
data = json.loads(lines[0])

# Create new robot and pass in dictionary as arguments.
r = Robo()
r.drive(**data) # https://stackoverflow.com/questions/334655/passing-a-dictionary-to-a-function-in-python-as-keyword-parameters