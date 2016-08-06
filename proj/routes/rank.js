/**
 * Created by Administrator on 2016-08-06.
 */
var express = require('express');
var router = express.Router();


var async = require('async');
var warp = require('../etc/etc').wrapSuccess;
var dContent = require('../etc/dContent');

const sequelize = require('../etc/db').sequelize;


router.get('feed', function (req, res, next) {

    var data = {};

    dContent.createContent(data)
        .then(function (result) {
            console.log(result);
            res.json(warp({}))
        })
        .catch(function (err) {
            console.log(err);
            next(err);
        })
});


router.get('/:idx', function (req, res, next) {
    var data = {};

    data.idx = req.params.idx;

    dContent.readContent(data)
        .then(function (result) {
            if (result && result.length == 1) {
                res.json(warp(result[0]))
            }
            else {
                next(new Error());
            }
        })
        .catch(function (err) {
            next(err);
        })
});


router.post('/score', function (req, res, next) {
    var data = {};

    data.idx = req.body.idx;
    data.id = req.session.user.id;
    data.score = req.body.score;
    data.comment = req.body.comment;

    dContent.scoreContent(data)
        .then(function (result) {
            res.json(warp({}))
        })
        .catch(function () {
            next();
        })
});

module.exports = router;
