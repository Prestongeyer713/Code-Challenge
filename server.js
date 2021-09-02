// require dependencies
let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let Routes = require('./routes.js');

// define port (feel free to change this) and express app
let port = process.env.PORT || 3000;
let app = express();

// connect to database (feel free to change the connection info or name of the database)
mongoose.connect("mongodb://localhost/challengeapp", (err) => {
	if (err) {
		console.log("Error connecting to database:", err);
	} else {
		console.log("Successfully connected to database!");
	}
});

// mount middleware
app.use(logger('common'));
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// app routes
Routes(app);

// listen for connections
app.server = app.listen(port, (err) => {
	if (err) {
		console.log("Error starting server:", err);
	} else {
		console.log("Server started on port:", port);
	}
});