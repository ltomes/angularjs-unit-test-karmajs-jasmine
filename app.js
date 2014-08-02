var app = angular.module("exampleApp", []);

app.controller("defaultCtrl", function ($scope, $http, $interval, $timeout, $log) {
	
	$scope.counter = 0;

	$scope.intervalCounter = 0;
	$scope.timerCounter = 0;

	$interval(function () {
		$scope.intervalCounter++;
	}, 5, 10);

	$timeout(function () {
		$scope.timerCounter++;
	}, 5);

	$http.get("productData.json").success(function (data) {
		$scope.products = data;
		$log.log("There are " + data.length + " items!");
	});

	$scope.incrementCounter = function () {
		$scope.counter++;
	}
});


app.filter("labelCase", function () {
	return function (value, reverse) {
		
		if (angular.isString(value)) {
			
			var intermediate = reverse ? value.toUpperCase() : value.toLowerCase();
	
			return (reverse ? 
						intermediate[0].toLowerCase() :
						intermediate[0].toUpperCase())
					+ intermediate.substr(1);
		} else {
			return value;
		}
	};
});


app.directive("unorderedList", function () {
	return {
		link: function (scope, element, attrs) {
			var data = scope[attrs["unorderedList"]];
			if (angular.isArray(data)) {
				var listElement = angular.element("<ul>");
				element.append(listElement);
				for (var i = 0; i < data.length; i++) {
					listElement.append(angular.element("<li>").text(data[i].name));
				}
			}
		}
	}
});

app.factory("counterService", function () {

	var counter = 0;

	return {
		incrementCounter: function () {
			counter++;
		},

		getCounter: function () {
			return counter;
		}
	}
});






