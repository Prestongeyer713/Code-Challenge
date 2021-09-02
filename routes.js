let request = require('request');

module.exports = (app) => {
	// home route - serves angular application
	app.get("/", (req, res) => {
		res.sendFile("app.html", { root: __dirname + "/public/html" });
	});
};