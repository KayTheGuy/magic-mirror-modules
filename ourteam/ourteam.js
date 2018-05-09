/**
 *  A module that briefly introduces our team.
 *  By Kayhan Dehghani: http://www.kayhandehghani.com/ 
 * 	May 6 2018 
 */

Module.register("ourteam", {
	defaults: {
		relPath: '/modules/ourteam/pics/',
		images: [],
		loopIndex: 0,
		startedInterval: false,
		bios: null
	},

	start() {
		Log.log(this.name + ' is started!');
		if (!this.config.bios) {
			this.setUpBios();
		}
		if (this.config.images.length == 0) {
			this.sendSocketNotification("GET_TEAM_IMAGES", {
				"path": ('.' + this.config.relPath)
			});
		}
	},

	setUpBios() {
		this.config.bios = new Map([
			["Kayhan", "<br/> Kayhan: <br/> Hates chocolate!"],
			["Nader", "<br/> Nader: <br/> Early bird!"],
			["Kai", "<br/> Kai: <br/> Eats chocolate and rice all the time!"],
			["Wongi", "<br/> Wongi: <br/> Hates avocado!"],
			["Bing", "<br/> Bing: <br/> Doesn't follow the news at all!"]
		]);
	},

	loaded(callback) {
		Log.log(this.name + ' is loaded!');
		callback();
	},

	getDom() {
		if (this.config.images.length == 0) {
			return this.showEntryMessage();
		} else {
			return this.showImages();
		}
	},

	getStyles() {
		return ["/modules/ourteam/css/main.css"];
	},

	socketNotificationReceived(notification, payload) {
		if (notification === "TEAM_IMAGES_FETCHED") {
			this.config.images = payload;
			setTimeout(() => this.updateDom(), 5000);
		}
	},

	showEntryMessage() {
		var div = document.createElement('div');
		div.setAttribute('id', 'team-welcome-message');
		div.innerHTML = `
		Hi Folks! <br/><br/> 
		Welocme to SAP\'s first Magic Mirror! <br/><br/>
		Here's a quick intro about our team ...
		`;
		return div;
	},

	showImages() {
		if (!this.config.startedInterval) {
			this.config.startedInterval = true;
			var intervalId = setInterval(() => {
				if (this.config.loopIndex < this.config.images.length) {
					this.updateDom();
				} else {
					clearInterval(intervalId);
				}
			}, 6000);
		}
		var imageName = this.config.images[this.config.loopIndex].split('.')[0];
		var path = this.config.relPath + this.config.images[this.config.loopIndex++];
		return this.createImageElement(path, imageName);
	},

	createImageElement(imagePath, imageName) {
		var bioTxt = this.config.bios.get(imageName);

		if (!bioTxt) {
			bioTxt = 'Oops!<br/>Unable to get the bio for ' + imageName;
		}

		var div = document.createElement('div');
		var imgBioElementString = `
		<div id="team-member-intro-whole">
			<div id="team-member-img-wrapper">
				<img id="team-member" src="${imagePath}" alt="Team Member"/>
			</div>
			<div id="team-member-bio">${bioTxt}</div>
		</div>
		`;
		div.innerHTML = imgBioElementString.trim();
		return div.firstChild;
	}
});