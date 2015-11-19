(function (){
	var app = angular.module('comic', []);
	
	app.controller('PanelController', function ($http) {
		var com = this;
		
		$http.get('/data.json').
			success(function (data) {
				com.comics = data.panels;
			}).
			error(function () {
				console.log('error');
			});
	});
	
	app.directive('endDirective', function ($location, $anchorScroll, $sce) {
		return function(scope, element, attrs) {
			// render out description with html
			scope.descriptionHtml = $sce.trustAsHtml(scope.comic.description);
			if (scope.$last){
				var hash = window.location.hash;
				$location.hash(hash.substr(2, hash.length));
				$anchorScroll();
			}
		};
	});
})();

(function(){
	window.onscroll = function () {
		var comics = document.getElementsByTagName('article');

		// get elements that we have scrolled past but only take the most
		// recent one we passed and set that id as the hash
		// make sure this code doesn't affect going to a url with a hash already

		var hashId = "";
		var comic;

		for( var i = 0, len = comics.length; i < len; i++) {
			if(document.body.scrollTop >= comics[i].offsetTop) {
				comic = comics[i];
				hashId = comics[i].id;
			}
		}

		// make sure this works on most devices
		history.replaceState(null, null, "#" + hashId);
	}
})();