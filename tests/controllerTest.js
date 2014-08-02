describe("Controller Test", function () {

	//Arrange
	var mockScope = {};
	var controller, backend, mockInterval, mockTimeout, mockLog;

	beforeEach(angular.mock.module("exampleApp"));

	beforeEach(angular.mock.inject(function ($httpBackend) {
		backend = $httpBackend;
		backend.expect("GET", "productData.json").respond([
				{ "name": "Apples", "category": "Fruit", "price": 1.20 },
				{ "name": "Bananas", "category": "Fruit", "price": 2.42 },
				{ "name": "Pears", "category": "Fruit", "price": 2.02}
			]);
	}));

	beforeEach(angular.mock.inject(function ($controller, $rootScope,
		 	$http, $interval, $timeout, $log) {
		
		mockScope = $rootScope.$new();
		mockInterval = $interval;
		mockTimeout = $timeout;
		mockLog = $log;
		controller = $controller("defaultCtrl", {
			$scope: mockScope,
			$http: $http,
			$interval: mockInterval,
			$timeout: mockTimeout,
			$log: mockLog
		});
		
		// send the canned responses to our requests
		// Calling the flush method resolves the promise returned by the $http service and 
		// executes the success function defined by the controller.
		backend.flush();  
	}));

	// Act and Assess

	it("Creates variable", function () {
		expect(mockScope.counter).toEqual(0);
	});

	it("Increments counter", function () {
		mockScope.incrementCounter();
		expect(mockScope.counter).toEqual(1);
	});

	it("Makes an Ajax request", function () {
		backend.verifyNoOutstandingExpectation();  // check that all of the expected requests were made
	});

	it("Processes the data", function () {
		expect(mockScope.products).toBeDefined();
		expect(mockScope.products.length).toEqual(3);
	});

	it("Preserves the data order", function () {
		expect(mockScope.products[0].name).toEqual("Apples");
		expect(mockScope.products[1].name).toEqual("Bananas");
		expect(mockScope.products[2].name).toEqual("Pears");
	});

	it("Limits interval to 10 updates", function () {
		for (var i = 0; i < 11; i++) {
			mockInterval.flush(5000);
		}
		expect(mockScope.intervalCounter).toEqual(10);
	});

	it("Increments timer counter", function () {
		mockTimeout.flush(5000);
		expect(mockScope.timerCounter).toEqual(1);
	});

	it("Writes log messages", function () {
		expect(mockLog.log.logs.length).toEqual(1);
	});


});