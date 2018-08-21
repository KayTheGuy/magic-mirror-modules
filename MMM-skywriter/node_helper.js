/**
 *	@Description:
 *  	this files handles all send/recieve socket notifications
 *	@Author:
 *  	Kai Sackville-Hii
 * 	@Date:
 * 		May, 2018
 */

var NodeHelper = require("node_helper");
var sensor = require('./sensor.js');

module.exports = NodeHelper.create({
    socketNotificationReceived(notification, payload) {
        if (notification === "START_PY") {
          sensor.listen(payload.os, this);
        }
        return;
    }
});
