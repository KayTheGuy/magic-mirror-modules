"use strict";

/**
 *  By Kayhan Dehghani: http://www.kayhandehghani.com/ 
 * 	May 15 2018 
 */

const fs = require("fs");
const fetch = require('node-fetch');

var readConfig = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
};

var getNews = (url, key) => {
    let nasa_url = url + key;
    
    fetch(nasa_url)
        .then(response => response.json())
        .then(json => { console.log(json);})
        .catch(err => {
            console.log("Fetch Error :-S", err);
        });
};

module.exports = {
    readConfig, 
    getNews
};
