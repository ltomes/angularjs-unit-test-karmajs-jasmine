describe("Filter Tests", function () {

	
	var filterInstance;

	beforeEach(angular.mock.module("exampleApp"));

	beforeEach(angular.mock.inject(function ($filter) {
		filterInstance = $filter("labelCase");
	}));

	it("Changes case", function () {
		var result = filterInstance("agosto ftw");
		expect(result).toEqual("Agosto ftw");
	});

	it("Reverses case", function () {
		var result = filterInstance("agosto ftw", true);
		expect(result).toEqual("aGOSTO FTW");
	});

    it("Processes bad data gracefully", function () {
        var result = filterInstance({"Some Date":"Thats not a string"}, true);
        expect(result).toEqual({"Some Date":"Thats not a string"});
	});
});