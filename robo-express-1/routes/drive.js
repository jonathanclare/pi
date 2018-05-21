const express = require('express');
const router = express.Router();
const path = require('path');
const spawn = require('child_process').spawn;

/*
dir = stop | forward | backward | left | right
curveLeft = 0 - 1
curveRight = 0 - 1
speed = 0 - 1
*/
router.get('/:dir', function(req, res, next) 
{	
	const json = JSON.parse(JSON.stringify(req.params));

	// Query string params.
	if (req.query.speed !== undefined) json.speed = req.query.speed;
	if (req.query.curveLeft !== undefined) json.curveLeft = req.query.curveLeft;
	if (req.query.curveRight !== undefined) json.curveRight = req.query.curveRight;

	// Run python script.
	const filepath = path.join(__dirname, '..', '/public/py/drive.py');
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
});

module.exports = router;