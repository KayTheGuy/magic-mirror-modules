const NodeHelper = require("node_helper");
const util = require("./util.js");

module.exports = NodeHelper.create({

    socketNotificationReceived(notification, payload) {
        if (notification === "GET_API_CONFIG") {
            util.readConfig(payload.path)
                .then(raw => this.sendSocketNotification("API_CONFIG_FETCHED", JSON.parse(raw)))
                .catch(err => console.log(err));
        }
    }

});
