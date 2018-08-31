/**
 *  By Kayhan Dehghani: http://www.kayhandehghani.com/
 * 	May 15 2018
 */

Module.register("dshop-news", {
	defaults: {
		isLoading: true,
		contentIndex: 0,
		lastAction: "",
		forms: []
	},

	start() {
		Log.log(this.name + " is started!");
		let url = this.config.url + "forms";
		this.callUrl(url);
	},
	
	loaded(callback) {
		Log.log(this.name + " is loaded!");
		callback();
	},
	
	getDom() {
		var content = document.createElement("div");
		if (this.config.isLoading) {
			content = this.createSpinner();
		} else {
			let currForm = this.config.forms[this.config.contentIndex];
			content = this.createTemplate(currForm.title, currForm.date, currForm.location, currForm.description, currForm.imagePaths[0]);
		}
		return content;
	},

	createSpinner() {
		var spinner = document.createElement("div");
		spinner.id = "spinner";
		return spinner;
	},

	createTemplate(title, date, location, description, imagePath) {
		// TODO: carousel with multiple images
		let contentDiv = document.createElement("div");
		contentDiv.id = "news-content";
		contentDiv.className = this.config.lastAction;
		contentDiv.innerHTML = `
		<div class="mdl-grid">
			<div class="mdl-cell mdl-cell--1-col">
			</div>
			<div class="mdl-cell mdl-cell--10-col">
				<div id="news-title-div" class="mdl-grid">
					<h2 id="news-title" class="highlight">${title}</h2>
				</div>
				<div id="news-location-div" class="mdl-grid">
					<h5 id="news-location" class="highlight">${location}
				</div>
				<div id="news-date-div" class="mdl-grid">
					<h6 id="news-date" class="highlight">${date}</h6>
				</div>
				<div id="news-image-div" class="mdl-grid">
					<img id="news-image" src=${this.config.url + imagePath}/>
				</div>
				<div id="news-description-div" class="mdl-grid">
					<p id="news-description" >${description}</p>
				</div>
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
				case 'right':
				if (this.config.contentIndex < this.config.forms.length - 1) {
					this.config.contentIndex++;
					this.swipeHelper(payload.action);
				}
				break;
				case 'left':
				if (this.config.contentIndex > 0) {
					this.config.contentIndex--;
					this.swipeHelper(payload.action);
				}
				break;
			}
		}
	},

	swipeHelper(action) {
		this.config.lastAction = action;
		this.updateDom();
	},

	getStyles() {
		return [this.file("/css/main.css"), this.file("/css/material.min.css")];
	},

	callUrl(url) {
		fetch(url)
			.then(response => response.json())
			.then(json => {
				this.config.forms = json;
				this.config.isLoading = false;
				this.updateDom();
			})
			.catch(err => {
				console.log("Fetch Error :-S", err);
			});
	},

});
