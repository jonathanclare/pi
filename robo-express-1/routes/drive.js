const express = require('express');
const router = express.Router();
const path = require('path');
const spawn = require('child_process').spawn;

/*
dir = stop | forward | backward | left | right
curveLeft = 0 - 1
curveRight = 0 - 1
speed = 0 - 1
motor = left | right
*/
let py;
router.get('/:dir', function(req, res, next) 
{	
	if (py != undefined) py.kill();

	const json = JSON.parse(JSON.stringify(req.params));

	// Query string params.
	if (req.query.speed !== undefined) 		json.speed = req.query.speed;
	if (req.query.curveLeft !== undefined) 	json.curveLeft = req.query.curveLeft;
	if (req.query.curveRight !== undefined) json.curveRight = req.query.curveRight;
	if (req.query.motor !== undefined) 		json.motor = req.query.motor;

	// Run python script.
	let filepath
	if (json.dir === 'stop')
		filepath = path.join(__dirname, '..', '/public/py/stop.py');
	else
		filepath = path.join(__dirname, '..', '/public/py/drive.py');

	py = spawn('python', [filepath]);
	let out = ''
	py.stdout.on('data', data => 
	{
		console.log(data.toString());
    	out += data.toString()
	});
	py.stderr.on('data', err => 
	{
		console.log(err.toString());
	});
	py.stdout.on('end', () => 
	{
		res.json(json);
	});
	py.stdin.write(JSON.stringify(json));
	py.stdin.end();
});

module.exports = router;