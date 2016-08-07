/**
 * Created by Administrator on 2016-08-06.
 */
var Sequelize = require("sequelize");
var path = require("path");
var fs = require("fs");
var sequelize = new Sequelize(
    "gokathon",
    "gokathon",
    "1234",
    {
        dialect: 'mysql',
        pool: {
            "max": "1000",
            "min": "0",
            "idle": "10000"
        },
//        logging : sequelizeData.logging,
        define: {
            timestamps: false
        }
    }
);


var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;