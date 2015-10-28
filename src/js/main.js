(function(){
	var app = angular.module('comic', []);
	
	app.controller('ComicController', function () {
		this.comics = comics;
	});
	
	var comics = [
		{
			id: "test1",
			image: "images/test.jpg",
			description: "test 1"
		},
		{
			id: "test2",
			image: "images/test.jpg",
			description: "test 2"
		}
	];
})();