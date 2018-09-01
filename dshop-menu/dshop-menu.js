/**
 *  By Kayhan Dehghani: http://www.kayhandehghani.com/
 * 	August 31 2018
 */

Module.register("dshop-menu", {
	defaults: {
	},

	start() {
		Log.log(this.name + " is started!");
	},
	
	loaded(callback) {
		Log.log(this.name + " is loaded!");
		callback();
	},
	
	getDom() {
		var content = document.createElement("div");
		content = this.createTemplate();
		return content;
	},

	createTemplate() {
		// TODO: carousel with multiple images
		let contentDiv = document.createElement("div");
		contentDiv.id = "menu-content";
		contentDiv.innerHTML = `
		<div class="mdl-grid">
			<div class="mdl-cell mdl-cell--1-col">
			</div>
			<div class="mdl-cell mdl-cell--10-col">
				MENU MENU
			</div>
			<div class="mdl-cell mdl-cell--1-col">
			</div>
		</div>
		`;
		return contentDiv;
	},

	notificationReceived(notification, payload, sender) {
		if (sender && sender.name === "MMM-Flick" && notification === "SENSOR_SWIPED") {
			switch (payload.action) {
				case 'airwheel':
					this.show();
					setTimeout(() => {
						this.sendNotification("NEWS_SELECT");
					}, 2000);
					break;
				default:
					this.hide();
					break;
			}
		}
	},

	getStyles() {
		return [this.file("/css/main.css"), this.file("/css/material.min.css")];
	}

});
