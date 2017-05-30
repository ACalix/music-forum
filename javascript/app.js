'use strict';

angular.module('MusicForum', ['ngRoute', 'ngCookies'])
	.config(function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: '/views/member/index.html'
			})
			.when('/general/:board', {
				templateUrl: '/views/member/general/board/index.html'
			})
			.when('/:board/thread/:id*', {
				templateUrl: '/views/member/general/board/thread/index.html'
			})
			.otherwise({ redirectTo: '/' });
	})
	.config(function($cookiesProvider) {
		$cookiesProvider.defaults.domain = 'test.localhost.com';
	});