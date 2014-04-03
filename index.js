'use strict';

var through = require('through2');

module.exports = function() {
    return through.obj(function(file, enc, cb) {
        cb(null, file.clone());
    });
};
