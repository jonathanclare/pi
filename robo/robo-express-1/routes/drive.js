const express = require('express');
const router = express.Router();
const path = require('path');
const spawn = require('child_process').spawn;

/* GET drive. */
router.get('/:move', function(req, res, next) 
{	
	runScript(req, res, next);
});
router.get('/:move/:direction', function(req, res, next) 
{
	runScript(req, res, next);
});
router.get('/:move/:direction/:speed', function(req, res, next) 
{
	runScript(req, res, next);
});

const runScript = (req, res, next) =>
{
	const filepath = path.join(__dirname, '..', '/public/py/app.py');
	const py = spawn('python', [filepath]);
	py.stdout.on('data', data => 
	{
    	console.log(data.toString())
		res.json(data.toString());
	});
	py.stderr.on('data', data => {});
	py.stdout.on('end', () => {});
	py.stdin.write(JSON.stringify(req.params));
	py.stdin.end();
}

module.exports = router;
