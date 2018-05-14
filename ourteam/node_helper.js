/**
 *  By Kayhan Dehghani: http://www.kayhandehghani.com/ 
 * 	May 6 2018 
 */

var NodeHelper = require("node_helper");
var utils = require("./utils.js");

module.exports = NodeHelper.create({

    socketNotificationReceived(notification, payload) {
        if (notification === "GET_TEAM_IMAGES") {
            var images = utils.getPics(payload.path);
            this.sendSocketNotification("TEAM_IMAGES_FETCHED", images);
        }
    }

});
