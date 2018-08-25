var config = {
	address: "localhost", 
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 
	language: "en",
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "MMM-dshop-news",
			position: "middle_center",	
			config: {
				url: "http://localhost:5000/",
				formTypes: ['events']
			}
		},
		{
			module: "MMM-stocks",
			position: "top_right",	
			config: {
			}
		},
		{
			module: "currentweather",
			position: "top_left",	
			config: {
				location: "Vancouver,CA",
				locationID: "6173331", 
				appid: "cd20cc4a9ae79204ea8322411a222bf8" 
			}
		}
	]

};

const newLocal = "undefined";
/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== newLocal) {module.exports = config;}

