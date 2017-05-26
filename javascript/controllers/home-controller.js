'use strict';

angular.module('MusicForum')
	.controller('HomeController', ['$scope', '$window', 
		function($scope, $window){
			this.selectBoard = function(board){
				switch (board){
				case 'vinyl':
					$window.location.href ='/#!/home/general/vinyl';
					break;
				case 'cassette':
					$window.location.href ='/#!/home/general/cassette';
					break;
				case 'sales':
					$window.location.href ='/#!/home/general/sales';
					break;
				case 'equipment':
					$window.location.href ='/#!/home/general/equipment';
					break;
				case 'random':
					$window.location.href ='/#!/home/general/random';
					break;
				}
			};
		}]);