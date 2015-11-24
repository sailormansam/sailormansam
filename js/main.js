(function (){
	var app = angular.module('comic', []);
	
	app.controller('PanelController', function ($scope, $http, $location) {
		var com = this;
		
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
			var hashId = "";

			for( var i = 0, len = comics.length; i < len; i++) {
				if(document.body.scrollTop >= comics[i].offsetTop) {
					hashId = comics[i].id;
				}
			}

			// make sure this works on most devices
//			console.log(hashId);
//			$location.hash(hashId);
			var hash = window.location.hash;
			var hashCompare = hash.substr(1, hash.length);
			if (hashId != hashCompare) {
				history.replaceState(null, null, "#" + hashId);
			}

			window.requestAnimationFrame(step);
		}

		window.requestAnimationFrame(step);
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
})();