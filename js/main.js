(function (){
	var app = angular.module('comic', []);
	var started = false;
	
	app.config(function($locationProvider){
		$locationProvider.html5Mode(true).hashPrefix('#');
		
	});
	
	app.controller('PanelController', function ($scope, $http, $location) {
		var com = this;
		var scrolling = false;
		
		$http.get('/data.json').
			success(function (data) {
				com.comics = data.panels;
			}).
			error(function () {
				console.log('error');
			});
		
		
		// get comics
		var comics = document.getElementsByTagName('article');

		// frame loop
		function step() {
			if(started) {
				
				var hashId = "";

				for( var i = 0, len = comics.length; i < len; i++) {
					if(document.body.scrollTop >= comics[i].offsetTop) {
						hashId = comics[i].id;
					}
				}

				// make sure this works on most devices
				var hash = window.location.hash;
				var hashCompare = hash.substr(1, hash.length);
				if (hashId != hashCompare) {
					history.replaceState(null, null, "#" + hashId);
				}

			}
			
			window.requestAnimationFrame(step);
		}
		
		window.requestAnimationFrame(step);

	});
	
	app.directive('endDirective', function ($sce, $location, $anchorScroll) {
		return function(scope, element, attrs) {
			// render out description with html
			scope.descriptionHtml = $sce.trustAsHtml(scope.comic.description);
			
			// take hash in url and jump to desired comic url is still a little wonky looking
			if (scope.$last){
				var hash = window.location.hash;
				$location.replace();
				$location.hash('');
				$location.hash(hash.substr(1, hash.length));
				$anchorScroll();
				started = true;
			}
		};
	});
})();