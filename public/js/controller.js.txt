angular.module("Challenge", [])
	.controller("ChallengeController", ChallengeCtrl);

ChallengeCtrl.$inject = ["$http"];

function ChallengeCtrl($http) {
	var cCtrl = this;

	console.log("Controller loaded!");
	cCtrl.welcomeMessage = "Welcome to the challenge!";
}