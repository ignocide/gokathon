/**
 * Created by Administrator on 2016-08-06.
 */
var express = require('express');
var router = express.Router();


var async = require('async');
var warp = require('../etc/etc').wrapSuccess;
var dContent = require('../etc/dContent');

const sequelize = require('../etc/db').sequelize;
const Promise = require('bluebird');


router.post('/feed', function (req, res, next) {
    console.log("!!!");
    var data = {};

    var task = {};
    task.dance = dContent.rankDance(data);
    task.sing = dContent.rankSing(data);
    task.act = dContent.rankAct(data);
    task.all = dContent.rankAll(data);

    return Promise.props(task)
    .then(function(result){
            console.log(result);
        res.json(warp(result));
    })
    .catch(function(err){
            console.log(err);
        next(err);
    });
});


router.post('/read', function (req, res, next) {
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
