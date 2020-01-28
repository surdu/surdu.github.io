(function() {
	'use strict';
	var states = [
		"/assets/favicon/favicon-32x32.png",
		"/assets/favicon/favicon-32x32-white.png"
	];
	var currentState = 0;
	var count = 0;

	$(document).ready(function() {
		var favicon = $('link[rel*="icon"]');

		setInterval(function() {
			if (count > 20) {
				return;
			}

			favicon.attr("href", states[currentState]);
			currentState = Math.abs(currentState - 1);
			count++;
		}, 400);
	});

	window.run = function() {
		count = -100;
	}

	console.log("------------------");
	console.log("Hello there! Type run() in here and watch the favicon :D");
	console.log("------------------");
}());
