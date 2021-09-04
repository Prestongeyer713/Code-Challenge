angular
	.module('Challenge', [])
	.controller('ChallengeController', ChallengeCtrl)
	.filter('DateFilter', dateFilter);

ChallengeCtrl.$inject = ['$http', '$scope'];

function ChallengeCtrl($http, $scope) {
	var cCtrl = this;
	console.log('Controller loaded!');
	cCtrl.welcomeMessage = 'Get The Most Updated Tracking Information!';

	getShipmentData();

	$http.get('/shipments').then(function (res) {
		$scope.shipments = res.data;
	});
}

function dateFilter() {
	items = [];
	return function (items) {
		var result = [];
		var today = new Date().getTime();


		for (var i = 0; i < items; i++) {
			var timeFound = new Date(items[i].created_at);
			var dayDifference = (today - timeFound.getTime()) / (1000 * 3600 * 24);
			if (dayDifference < 3) {
				result.push(items[i]);
			}
		}
		return result;
	};
}

function getShipmentData() {
	$.getJSON(
		'https://automation.bigdaddyunlimited.com/tracking_data.json',
		function (data) {
			for (var i = 0; i < data.length; i++) {
				var obj = data[i];

				$.ajax({
					mehtod: 'GET',
					type: 'POST',
					url: 'https://calm-shelf-58861.herokuapp.com/',
					data: JSON.stringify(obj),
					contentType: 'application/json',
					dataType: 'json',
					success: console.log('Updating Shipment Data'),
				});
			}
		}
	);
}