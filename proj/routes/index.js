var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session);

    if(req.session && req.session.user && req.session.user.id){
        res.render('app');
    }
    else{
        res.render('app_login');
    }
});

//router.get('/login', function(req, res, next) {
//    res.render('app_login');
//});

router.get('/template/rank', function(req, res, next) {
    res.render('template/rank');
});


router.get('/template/detail', function(req, res, next) {
    res.render('template/detail');
});


router.get('/template/write', function(req, res, next) {
    res.render('template/write');
});

router.get('/template/list', function(req, res, next) {
    res.render('template/list');
});

module.exports = router;
