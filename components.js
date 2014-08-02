var app = angular.module("exampleApp", []);

app.config(function ($provide) {
	$provide.decorator("$log", function ($delegate) {
		$delegate.originalLog = $delegate.log;
		$delegate.log = function (message) {
			$delegate.originalLog("Decorated: " + message);
		}
		return $delegate;
	});
});

app.controller("defaultCtrl", function ($scope, $injector) {
	
	/*
	$scope.handleClick = function () {
		$log.log("Button Clicked");
	};
	*/

	var counter = 0;

	var logClick = function ($log, $exceptionHandler, message) {

		if (counter == 0) {
			$log.log(message);
			counter++;
		} else {
			$exceptionHandler("Already clicked");
		}
	}

	$scope.handleClick = function () {
		var deps = $injector.annotate(logClick);
		var args = [];
		for (var i = 0; i < deps.length; i++) {
			if ($injector.has(deps[i])) {
				args.push($injector.get(deps[i]));
			} else if (deps[i] == "message") {
				args.push("Button Clicked");
			}
		}
		logClick.apply(null, args);
	};
});