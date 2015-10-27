(function(){
	var app = angular.module('comic', []);
	
	app.controller('ComicController', function () {
		this.comics = comics;
	});
	
	var comics = [
		{
			image: "images/test.jpg",
			description: "test 1"
		},
		{
			image: "images/test.jpg",
			description: "test 2"
		}
	];
})();