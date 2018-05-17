import sys, json
from Robo import Robo

# JSON string passed in from javascript.
lines = sys.stdin.readlines()  

# Convert to dictionary.
data = json.loads(lines[0])

# Create new robot and pass in dictioary as arguments.
r = Robo()
r.drive(**data) # https://stackoverflow.com/questions/334655/passing-a-dictionary-to-a-function-in-python-as-keyword-parameters