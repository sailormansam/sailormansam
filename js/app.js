var app = angular.module('comicApp', []);

app.config(function($locationProvider){
	$locationProvider.html5Mode(true).hashPrefix('#');
});