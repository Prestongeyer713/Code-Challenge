var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ShipmentSchema = new Schema({
	ship_date: { type: String, required: true },
	tracking_number: { type: String, required: true },
	shipping_carrier: String,
	shipping_method: String,
	tracking_url: String,
	created_at: Date,
	updated_at: Date,
});

ShipmentSchema.pre('save', function (next) {
	var currentDate = new Date();
	this.updated_at = currentDate;
	if (!this.created_at) {
		this.created_at = currentDate;
	}

	var dateString = this.ship_date;
	var year = dateString.substring(0, 4);
	var month = dateString.substring(4, 6);
	var day = dateString.substring(6, 8);

	this.ship_date = month + '/' + day + '/' + year;
	next();
});

var Shipment = mongoose.model('Shipment', ShipmentSchema);
module.exports = Shipment;