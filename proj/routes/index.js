var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('app');
});

router.get('/template/rank', function(req, res, next) {
    res.render('template/rank');
});

module.exports = router;
