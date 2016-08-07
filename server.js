"use strict";

var server = require('./app.js');
var async = require('async');

console.log('[APP] Starting server initialization');

// Initialize Modules
async.series([

        function startServer(callback) {
            server(callback);
        }
    ], function (err) {
        if (err) {
            console.log('[APP] initialization failed', err);
        } else {
            console.log('[APP] initialized SUCCESSFULLY');
        }
    }
);
