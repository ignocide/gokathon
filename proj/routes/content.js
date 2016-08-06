/**
 * Created by Administrator on 2016-08-06.
 */
var express = require('express');
var router = express.Router();


var async = require('async');
var warp = require('../etc/etc').wrapSuccess;
var dContent = require('../etc/dContent');

const sequelize = require('../etc/db').sequelize;


router.post('', function (req, res, next) {

    var data = {};

    data.id = req.body.id;
    data.cateIdx = req.body.cateIdx;
    data.writerId = req.session.user.id;
    data.title = req.body.title;
    data.content = req.body.content;
    data.link = req.body.link;
    data.thumbnail = null;

    if (data.link) {
        var thumbnail = data.link.split("https://youtu.be/")[1].split("/")[0];
        data.thumbnail = "https://img.youtube.com/vi/" + thumbnail + "/0.jpg";
    }

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


router.post('/read', function (req, res, next) {
    var data = {};

    data.idx = req.body.idx;

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
