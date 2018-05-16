const express = require('express');
const router = express.Router();
const path = require('path');
const spawn = require('child_process').spawn;

/*
MOVEMENT
stop
forwards
backwards
spin

DIRECTION
straight
left
right
*/

/* GET drive. */
router.get('/:movement', function(req, res, next) 
{	
	runScript(req, res, next);
});
router.get('/:movement/:direction', function(req, res, next) 
{
	runScript(req, res, next);
});

const runScript = (req, res, next) =>
{
	const filepath = path.join(__dirname, '..', '/public/py/drive.py');

	const json = JSON.parse(JSON.stringify(req.params));
	if (json.movement === undefined) json.movement = 'stop';
	if (json.direction === undefined) json.direction = '';

    console.log(json);

	const py = spawn('python', [filepath]);
	py.stdout.on('data', data => 
	{
    	console.log(data.toString())
		res.json(json)
	});
	py.stderr.on('data', data => {});
	py.stdout.on('end', () => {});
	py.stdin.write(JSON.stringify(json));
	py.stdin.end();
}

module.exports = router;
