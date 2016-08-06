/**
 * Created by Administrator on 2016-08-06.
 */
"use strict";

const sql = require('./sql');
const sequelize = require('./db').sequelize;


exports.createContent = function (data, t) {
    t = t || null;
    let id = data.id;
    let writerId = data.writerId;
    let title = data.title;
    let content = data.content;
    let link = data.link;
    let thumbnail = data.thumbnail;
    console.log(data);
    return sequelize.query(
        sql.createContent,
        {
            bind: {
                id: id,
                writerId: writerId,
                title: title,
                content: content,
                link: link,
                thumbnail: thumbnail
            },
            type: sequelize.QueryTypes.INSERT,
            transaction: t
        })
};


exports.readContent = function (data, t) {
    t = t || null;
    let idx = data.idx;

    return sequelize.query(
        sql.incrHitContent,
        {
            bind: {
                idx: idx
            },
            type: sequelize.QueryTypes.UPDATE,
            transaction: t
        })
        .then(function(){
            return sequelize.query(
                sql.readContent,
                {
                    bind: {
                        idx: idx
                    },
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t
                });
        })
};


exports.scoreContent = function (data, t) {
    t = t || null;
    let idx = data.idx;
    let id = data.id;
    let score = data.score;
    let comment = data.comment;
    return sequelize.query(
        sql.readContent,
        {
            bind: {
                idx: idx,
                id: id,
                score: score
            },
            type: sequelize.QueryTypes.INSERT,
            transaction: t
        });
};


exports.rankDance = function (data, t) {
    t = t || null;

    return sequelize.query(
        sql.readContent,
        {
            bind: {
                idx: idx,
                id: id,
                score: score
            },
            type: sequelize.QueryTypes.INSERT,
            transaction: t
        });
};
