/**
 * Created by Administrator on 2016-08-06.
 */
var express = require('express');
var router = express.Router();


var async = require('async');
var warp = require('../etc/etc').wrapSuccess;
var dMeet = require('../etc/dMeet');

const sequelize = require('../etc/db').sequelize;


router.post('/join', function (req, res, next) {
    var data = {};

    data.email = req.body.email;
    data.pw = req.body.pw;
    data.userid = req.body.userid;
    data.nickname = req.body.nickname;
    data.height = req.body.height;
    data.weight = req.body.weight;

    sequelize.transaction(function (t) {
        return dMeet.insertMember(data, t)
            .then(function (result) {
                data.id = result;
                return dMeet.insertExtra(data, t);
            })
    })
        .then(function (result) {
            res.json(warp({}))
        })
        .catch(function (err) {
            console.log(err);
            next();
        })
});


router.post('/login', function (req, res, next) {
    var data = {};

    data.userid = req.body.userid;
    data.pw = req.body.pw;

    dMeet.login(data)
        .then(function (result) {
            return new Promise(function (resolve, reject) {
                console.log(result);
                if (result && result.length == 1) {
                    if (result[0].pw == data.pw) {
                        req.session.user = result[0];
                        resolve();
                    }
                    else{
                        reject();
                    }
                }
                else {
                    reject();
                }
            })
        })
        .then(function (result) {
            res.json(warp({}))
        })
        .catch(function () {
            next();
        })
});

module.exports = router;
