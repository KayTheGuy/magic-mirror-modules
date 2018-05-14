"use strict";

const fs = require('fs');

var readConfig = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
};

module.exports = {
    readConfig
};