const express = require('express');
const router = express.Router();
const path = require('path');
const spawn = require('child_process').spawn;

/*
dir = forward | backward
side = left | right
speed = 0 - 1
*/
let py;
router.get('/:side/:dir', function(req, res, next) 
{	
	if (py != undefined) py.kill();

	const json = JSON.parse(JSON.stringify(req.params));

	// Query string params.
	if (req.query.speed !== undefined) json.speed = req.query.speed;

	// Run python script.
	const filepath = path.join(__dirname, '..', '/public/py/motor.py');

	py = spawn('python', [filepath]);
	let out = ''
	py.stdout.on('data', data => 
	{
		console.log(data.toString());
    	out += data.toString()
	});
	py.stderr.on('data', err => 
	{
		console.log(err);
	});
	py.stdout.on('end', () => 
	{
		//console.log(out);
		res.json(JSON.stringify(json));
	});
	py.stdin.write(JSON.stringify(json));
	py.stdin.end();
});

module.exports = router;