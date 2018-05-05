/**
 *  By Kayhan Dehghani: http://www.kayhandehghani.com/ 
 * 	May 6 2018 
 */

var fs = require('fs');
var imageFormats = ['jpg', 'png', 'JPG', 'jpg2000'];

var getPics = function(path) {
    return fs.readdirSync(path).filter(hasValidImageType);
};

var hasValidImageType = function(filename) {
    var result = false;
    imageFormats.forEach( function(format) {
        if (filename.endsWith(format)) {
            result = true;
            return;
        }
    });
    return result;
};

module.exports = {
    getPics,
};