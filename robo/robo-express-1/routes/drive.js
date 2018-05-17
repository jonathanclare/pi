const express = require('express');
const router = express.Router();
const path = require('path');
const spawn = require('child_process').spawn;

// Drive in given direction.
router.get('/:dir', function(req, res, next) 
{	
	runScript(req, res, next);
});
// Make a turn.
router.get('/:dir/:turn', function(req, res, next) 
{
	runScript(req, res, next);
});
// Get the speed.
router.get('/speed', function(req, res, next) 
{
	runScript(req, res, next);
});

const runScript = (req, res, next) =>
{
	const json = JSON.parse(JSON.stringify(req.params));
	if (req.query.speed !== undefined) json.speed = req.query.speed; // ?speed=0.5

	const filepath = path.join(__dirname, '..', '/public/py/app.py');
	const py = spawn('python', [filepath]);
	py.stdout.on('data', data => 
	{
    	console.log(data.toString())
		res.json(data.toString());
	});
	py.stderr.on('data', data => {});
	py.stdout.on('end', () => {});
	py.stdin.write(JSON.stringify(json));
	py.stdin.end();
}

module.exports = router;
