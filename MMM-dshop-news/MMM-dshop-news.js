/**
 *  By Kayhan Dehghani: http://www.kayhandehghani.com/ 
 * 	May 15 2018 
 */

Module.register("MMM-dshop-news", {
	defaults: {
		isLoading: true,
		testNum: 0
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

			// simulate API delay
			setTimeout(() => {
				this.config.isLoading = false;
				this.updateDom();
			}, 3000);

		} else {
			if (this.config.testNum === 0) {
				content = this.createStaticContent();
			} else if (this.config.testNum === 1) {
				content = this.showImage("1.jpg");
			} else if (this.config.testNum === 2) {
				content = this.showImage("2.jpg");
				this.config.testNum = -1;
			}

			this.config.testNum++;
			// simulate sensor command
			setTimeout(() => {
				this.updateDom();
			}, 2000);
		}

		return content;
	},

	notificationReceived: function(notification, payload, sender) {
		if (sender) {
			if (sender.name === "MMM-skywriter" && notification === "SENSOR_SWIPED") {
				this.updateDom();
			}
		} 
	},

	createSpinner() {
		var spinner = document.createElement("div");
		spinner.setAttribute("class", "spinner");
		return spinner;
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
	
	createStaticContent() {
		var newsDiv = document.createElement("div");

		var contentText = `
		<h4>
		<span class="highlight"> SAP’s global in-house makerspace</span> that aims to impassion and enable colleagues’ and community members’ interest in technology by bringing the latest technology concepts and devices closer to everyone through workshops, demos, and interactive events.
		</h4>
		<br>
		<p>
		<span class="highlight"> D-shop's Vancouver branch </span> officially launched in May 2016! Monthly workshops are available to anyone interested and will cover various topics related to the Internet of Things (IOT), such as 3D printing, drones, and the Oculus Rift. The d-shop is SAP's pioneer makerspace for developers to meet and collaborate, to explore and learn, and, of course, to invent and build.
		</p>
		<p>
		<br>
		Do you ever get the urge to be a kid again? Here’s your chance to be one - and at work no less! Join us in experiencing and experimenting with exciting, novel technologies.
		</p>
		<br>
		<h5>
		"The mission of d-shop global program is to bring new technologies closer to all  <span class="highlight">SAP employees</span>"
		</h5>
		<br>
		`;

		newsDiv.innerHTML = contentText.trim();
		return newsDiv;
	},

	showImage(fileName) {
		var imageDiv = document.createElement("div");
		var path = this.file("/files/images/") + fileName;

		var contentText = `
		<h4>
		<span class="highlight"> D-shop's Vancouver branch</span>
		</h4>
		<p>May 23, 2018</p>
		<img src="${path}" alt="image preview" />
		`;

		imageDiv.innerHTML = contentText.trim();
		return imageDiv;
	}
    
});
