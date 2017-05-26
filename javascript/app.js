'use strict';

angular.module('MusicForum', ['ngRoute', 'ngCookies'])
	.config(function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: '/views/non-member/index.html'
			})
			.when('/home', { 
				templateUrl: '/views/member/index.html'
			})
			.when('/home/general/vinyl', {
				templateUrl: '/views/member/general/vinyl/index.html'
			})
			.when('/home/general/cassette', {
				templateUrl: '/views/member/general/cassette/index.html'
			})
			.when('/home/general/sales', {
				templateUrl: '/views/member/general/sales/index.html'
			})
			.when('/home/general/equipment', {
				templateUrl: '/views/member/general/equipment/index.html'
			})
			.when('/home/general/random', {
				templateUrl: '/views/member/general/random/index.html'
			})
			.otherwise({ redirectTo: '/' });
	});