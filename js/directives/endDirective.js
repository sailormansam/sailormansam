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