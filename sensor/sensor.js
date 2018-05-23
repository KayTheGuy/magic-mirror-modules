/**
 * Module that handles I/O from gesture sensor
 *  By Kai Sackville-Hii
 * 	May 23 2018
 */

Module.register("sensor", {

	start() {
		Log.log('sensor started!');
		this.sendSocketNotification("START_PY", {});
	},

	socketNotificationReceived(notification, payload) {
		if (notification === "SENSOR_SWIPED") {
			Log.log(payload.command)
		}
	}

});
