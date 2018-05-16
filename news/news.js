/**
 *  By Kayhan Dehghani: http://www.kayhandehghani.com/ 
 * 	May 15 2018 
 */

Module.register("news", {
	defaults: {
	},

	start() {
		Log.log(this.name + " is started!");
		this.configJSON = this.sendSocketNotification("GET_API_CONFIG", {path: this.file("/files/private_config.json")});
	},

	loaded(callback) {
		Log.log(this.name + " is loaded!");
		callback();
	},

	getDom() {
        var test = document.createElement("div");
        test.innerHTML = "test";
        return test;
	},

	getStyles() {
		return [this.file("/css/main.css")];
	},

	getNews(url, key) {
		this.sendSocketNotification("GET_NEWS", {url: url, key: key});
	},

	socketNotificationReceived(notification, payload) {
		if (notification === "API_CONFIG_FETCHED") {
			this.getNews(payload.api.url, payload.api.key)
        }
    },
    
});