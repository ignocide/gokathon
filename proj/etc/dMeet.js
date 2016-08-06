/**
 * Created by Administrator on 2016-08-06.
 */
"use strict";

const sql = require('./sql');
const sequelize = require('./db').sequelize;



exports.insertMember = function(data,t){
    t = t || null;
    let userid = data.userid;
    let email = data.email;
    let pw = data.pw;
    let nickname = data.nickname;

    return sequelize.query(
        sql.insertMember,
        {
            bind : {
                userid : userid,
                pw : pw,
                email : email,
                nickname : nickname
            },
            type : sequelize.QueryTypes.INSERT,
            transaction : t
        });
};

exports.insertExtra = function(data,t){
    t = t || null;
    let id = data.id;
    let weight = data.weight;
    let height = data.height;
    return sequelize.query(
        sql.insertExtra,
        {
            bind : {
                id : id,
                weight : weight,
                height : height
            },
            type : sequelize.QueryTypes.INSERT,
            transaction : t
        });
};

exports.login = function(data,t){
    t = t || null;
    let userid = data.userid;

    return sequelize.query(
        sql.login,
        {
            bind : {
                userid : userid
            },
            type : sequelize.QueryTypes.SELECT,
            transaction : t
        });
};