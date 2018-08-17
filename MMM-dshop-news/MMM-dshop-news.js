/**
 *  By Kayhan Dehghani: http://www.kayhandehghani.com/
 * 		 Kai Sackville-Hii
 * 	May 15 2018
 */

Module.register("MMM-dshop-news", {
	defaults: {
		isLoading: false,
		contentIndex: 0,
		lastAction: "",
		forms: {
			title: "Kayhans suprise Birthday",
			date: "August 10, 2018",
			location: "East Van",
			description: "hello there everyone, kayhan is turning 500 years old and we need to celibrate"+
										"please come join use at east van for some red bulls, blue bulls and vitamin water"
		}
	},

	// ~@~@~@~@~@~ MAGIC MIRROR FUNCTIONS ~@~@~@~@~@~ //

	socketNotificationReceived(notification, payload) {
		if (notification === "API_CONFIG_FETCHED") {
			this.getNews(payload.api.url, payload.api.key)
				}
	},

	notificationReceived(notification, payload, sender) {
		if (notification === "SENSOR_SWIPED") {
			if (payload.action === "right") {
				this.config.lastAction = "right";
				this.config.contentIndex++;
				if (this.config.contentIndex > 4) {
					this.config.contentIndex = 0;
				}
			} else if (payload.action === "left") {
				this.config.lastAction = "left";
				this.config.contentIndex--;
				if (this.config.contentIndex < 0) {
					this.config.contentIndex = 2;
				}
			}
			this.updateDom();
		}
	},

	start() {
		Log.log(this.name + " is started!");
		// this.configJSON = this.sendSocketNotification("GET_API_CONFIG", {path: this.file("/files/private_config.json")});
	},

	loaded(callback) {
		Log.log(this.name + " is loaded!");
		callback();
	},

	getDom() {
		var content = document.createElement("div");

    if(this.config.isLoading) {
			content = this.createSpinner();
		}

		content = this.createTemplate();
		return content;
	},

	// ~@~@~@~@~@~ CUSTOM FUNCTIONS ~@~@~@~@~@~ //

	createSpinner() {
		var spinner = document.createElement("div");
		spinner.setAttribute("class", "spinner");
		return spinner;
	},

	createTemplate() {
		var templateDiv = document.createElement("div");

		// instantiate to empty
		let title = "";
		let date = "";
		let location= "";
		let image = "";
		let description = "";

		// map vars to local
		title = this.config.forms.title;
		date = this.config.forms.date;
		location = this.config.forms.location;
		description = this.config.forms.description;

		var path = this.file("/files/images/") + "download.jpg";

		// var imageDiv = "<span></span>";
		// var flag = true;
		// if ( flag === true;) {
		// 	imageDiv = `<div>This is an image</div>`;
		// }
		templateDiv.innerHTML = `
			<div class="template-div">
					<div class="title"><span class="header">${title ? title : ''}</span></div>
					<div class="subtitle">
						<div class="datestamp">${date ? date : ''}</div>
						-
						<div class="location">${location ? location : ''}</div>
					</div>
					<div class="image">${image ? image : `<image src=${path} />`}</div>
					<div class="description">${description ? description : ''}</div>
			</div>
			 `
		return templateDiv;
	},

	getStyles() {
		return [this.file("/css/main.css")];
	},

	getNews(url, key) {
		// this.sendSocketNotification("GET_NEWS", {url: url, key: key});

		// simulate API delay
		setTimeout(() => {
			this.config.isLoading = false;
			this.updateDom();
		}, 3000);
	},

});
