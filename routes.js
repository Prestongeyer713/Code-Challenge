let request = require('request');
const express = require('express'),
	Shipment = require('./models/schema');

module.exports = (app) => {
	// home route - serves angular application
	app.get('/', (req, res) => {
		res.sendFile('app.html', { root: __dirname + '/public/html' });
	});

	app.get('/shipments', async (req, res) => {
		try {
			const shipments = await Shipment.find();
			res.json(shipments);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	});

	app.post('/', async (req, res) => {
		const {
			ship_date,
			tracking_number,
			shipping_carrier,
			shipping_method,
			tracking_url,
		} = req.body;

		const shipmentFields = {};
		shipmentFields.ship_date = ship_date;
		shipmentFields.tracking_number = tracking_number;
		if (shipping_carrier) shipmentFields.shipping_carrier = shipping_carrier;
		if (shipping_method) shipmentFields.shipping_method = shipping_method;
		if (tracking_url) shipmentFields.tracking_url = tracking_url;

		try {

			let shipment = await Shipment.findOneAndUpdate(
				{ tracking_number: req.body.tracking_number },
				{ $set: shipmentFields },
				{ new: true, upsert: true }
			);
			await shipment.save();
			res.json(shipment);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	});
};