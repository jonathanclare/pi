var express = require('express');
var router = express.Router();

/* GET robo page. */
router.get('/', function(req, res, next) 
{
	res.render('robo', {title: 'ROBO'});
});

module.exports = router;
