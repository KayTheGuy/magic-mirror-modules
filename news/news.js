Module.register("news", {
	defaults: {
		configJSON: null
	},

	start() {
		Log.log(this.name + ' is started!');
		this.config.configJSON = this.sendSocketNotification("GET_API_CONFIG", {path: "./modules/news/files/private_config.json"});
	},

	loaded(callback) {
		Log.log(this.name + ' is loaded!');
		callback();
	},

	getDom() {
        var test = document.createElement('div');
        test.innerHTML = 'test';
        return test;
	},

	getStyles() {
		return ["/modules/news/css/main.css"];
	},

	socketNotificationReceived(notification, payload) {
		if (notification === "API_CONFIG_FETCHED") {
            console.log(payload.api.key);
        }
    },
    
});