const express = require('express');
const router = express.Router();
const path = require('path');
const spawn = require('child_process').spawn;

/* GET drive. */
router.get('/:movement', function(req, res, next) 
{
	const filepath = path.join(__dirname, '..', '/public/py/drive.py');
	runScript(filepath, req.params);
});
router.get('/:movement/:direction', function(req, res, next) 
{
	const filepath = path.join(__dirname, '..', '/public/py/drive.py');
	runScript(filepath, req.params);
});

const runScript = (filepath, json) =>
{
	const py = spawn('python', [filepath]);

	py.stdout.on('data', data => res.json(json));
	py.stderr.on('data', data => console.log(data));
	py.stdout.on('end', () => console.log('end'));

	py.stdin.write(JSON.stringify(req.params));
	py.stdin.end();
}

module.exports = router;
