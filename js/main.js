(function (){
	var app = angular.module('comic', []);
	var started = false;
	
	app.controller('PanelController', function ($scope, $http) {
		var com = this;
		var scrolling = false;
		
		$http.get('/data.json').
			success(function (data) {
				com.comics = data.panels;
				console.log('load');
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

				window.requestAnimationFrame(step);
			}
		}
//		window.requestAnimationFrame(step);

	});
	
	app.directive('endDirective', function ($sce, $location, $anchorScroll) {
		return function(scope, element, attrs) {
			// render out description with html
			scope.descriptionHtml = $sce.trustAsHtml(scope.comic.description);
			
			if (scope.$last){
				console.log(window.location.hash);
				$location.path(window.location.hash);
				$anchorScroll();
			}
		};
	});
})();