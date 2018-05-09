/**
 *  By Kayhan Dehghani: http://www.kayhandehghani.com/ 
 * 	May 6 2018 
 */

var fs = require('fs');
var imageFormats = ['jpg', 'png', 'JPG', 'jpg2000'];

var getPics = path => {
    return fs.readdirSync(path).filter(hasValidImageType);
};

var hasValidImageType = filename => {
    var result = false;
    imageFormats.forEach(format => {
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