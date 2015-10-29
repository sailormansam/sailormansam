(function(){
	var app = angular.module('comic', []);
	
	app.controller('PanelController', function ($http) {
		var com = this;
		
		$http.get('/data.json').
			success(function(data) {
				com.comics = data.panels;
			}).
			error(function() {
				console.log('error');
			});
	});
})();