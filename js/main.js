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
			// this checks if the page has jumped to a hash location yet
			var hash = window.location.hash;
			hash = hash.substr(1, hash.length);
			var target = document.getElementById(hash);
			
			// check to see if the scroll of the page equals where we want to scroll to yet
			// if not we can't update the hash based on where we are on the page or we will
			// overwrite what's there
			var check = -1;
			if(target && window.location.hash) {
				check = target.offsetTop;
			}
			else if (!window.location.hash) {
				check = 0;
			}
			
			if( started || document.body.scrollTop == check) {
				started = true;
				var hashId = "";

				for( var i = 0, len = comics.length; i < len; i++) {
					if(document.body.scrollTop >= comics[i].offsetTop) {
						hashId = comics[i].id;
					}
				}

				// make sure this works on most devices
				var hash = window.location.hash;
				var hashCompare = hash.substr(1, hash.length);
				
				// this will occasionaly cause jank
				if (hashId != hashCompare) {
					history.replaceState(null, null, "#" + hashId);
				}

			}
			
			window.requestAnimationFrame(step);
		}
		
		window.requestAnimationFrame(step);

	});
	
	app.directive('endDirective', function ($sce, $location, $anchorScroll, $timeout) {
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
			}
		};
	});
})();