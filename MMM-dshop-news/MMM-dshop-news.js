/**
 *  By Kayhan Dehghani: http://www.kayhandehghani.com/
 * 	May 15 2018
 */

Module.register("MMM-dshop-news", {
	defaults: {
		isLoading: true,
		contentIndex: 0,
		lastAction: "",
		currentFormType: "",
		forms: {}
	},
	
	start() {
		Log.log(this.name + " is started!");
		// TODO: navigate between types from user's input
		let formType = this.config.formTypes[0];
		let url = this.config.url + "forms" + "/" + formType
		this.callUrl(url, formType);
	},
	
	loaded(callback) {
		Log.log(this.name + " is loaded!");
		callback();
	},
	
	getDom() {
		var content = document.createElement("div");
    if(this.config.isLoading) {
			content = this.createSpinner();
		} else {
			let currForm = this.config.forms[this.config.currentFormType][0];
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
		contentDiv.innerHTML = `
		<div class="mdl-grid">
			<div class="mdl-cell mdl-cell--4-col">
				<div class="mdl-grid">
					<h2 id="news-title" class="highlight">${title}</h2>
					</div>
					<div class="mdl-grid">
					<h5 id="news-location" class="highlight">${location}
					<br/>
					<h6 id="news-date" class="highlight">${date}</h6>
				</div>
			</div>
			<div id="news-image-div" class="mdl-cell mdl-cell--8-col">
				<img id="news-image" src=${this.config.url + imagePath}/>
			</div>
		</div>
		<div class="mdl-grid">
			<p class="description">${description}</p>
		</div>
		`;
		return contentDiv;
	},

	getStyles() {
		return [this.file("/css/main.css"), this.file("/css/material.min.css")];
	},

	callUrl(url, type) {
		fetch(url)
    .then(response => response.json())
    .then(json => { 
			this.config.forms[type] = json;
			this.config.currentFormType = type;
			this.config.isLoading = false;
			this.updateDom(); 
		})
    .catch(err => {
        console.log("Fetch Error :-S", err);
		});
	},

});
