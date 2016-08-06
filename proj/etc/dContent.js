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
    let cateIdx = data.cateIdx;

    return sequelize.query(
        sql.createContent,
        {
            bind: {
                id: id,
                cateIdx: cateIdx,
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



exports.getList = function (data, t) {
    t = t || null;
    let page = data.page;
    let offset = (page-1) * 10;
    return sequelize.query(
        sql.getList,
        {
            bind: {
                offset : offset
            },
            type: sequelize.QueryTypes.SELECT,
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
        .then(function () {
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


exports.getComments = function (data, t) {
    t = t || null;
    let idx = data.idx;

    return sequelize.query(
        sql.readComments,
        {
            bind: {
                idx: idx
            },
            type: sequelize.QueryTypes.SELECT,
            transaction: t
        });
};


exports.scoreContent = function (data, t) {
    t = t || null;
    let idx = data.idx;
    let id = data.id;
    let score = data.score;

    return sequelize.query(
        sql.scoreContent,
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


exports.commentWrite = function (data, t) {
    t = t || null;

    let idx = data.idx;
    let id = data.id;
    let content = data.content;

    return sequelize.query(
        sql.writeComment,
        {
            bind: {
                idx: idx,
                id: id,
                content: content
            },
            type: sequelize.QueryTypes.INSERT,
            transaction: t
        });
};


exports.rankDance = function (data, t) {
    t = t || null;

    return sequelize.query(
        sql.rankDance,
        {
            bind: {

            },
            type: sequelize.QueryTypes.SELECT,
            transaction: t
        });
};


exports.rankSing = function (data, t) {
    t = t || null;

    return sequelize.query(
        sql.rankSing,
        {
            bind: {
            },
            type: sequelize.QueryTypes.SELECT,
            transaction: t
        });
};

exports.rankAct = function (data, t) {
    t = t || null;

    return sequelize.query(
        sql.rankAct,
        {
            bind: {
            },
            type: sequelize.QueryTypes.SELECT,
            transaction: t
        });
};

exports.rankAll = function (data, t) {
    t = t || null;

    return sequelize.query(
        sql.rankAll,
        {
            bind: {
            },
            type: sequelize.QueryTypes.SELECT,
            transaction: t
        });
};
