'use strict';

angular.module('MusicForum')
	.controller('HomeController', ['$scope', '$window', 
		function($scope, $window){
			this.selectBoard = function(board){
				switch (board){
				case 'vinyl':
					$window.location.href ='/#!/general/vinyl';
					break;
				case 'cassette':
					$window.location.href ='/#!/general/cassette';
					break;
				case 'sales':
					$window.location.href ='/#!/general/sales';
					break;
				case 'equipment':
					$window.location.href ='/#!/general/equipment';
					break;
				case 'random':
					$window.location.href ='/#!/general/random';
					break;
				}
			};
		}]);