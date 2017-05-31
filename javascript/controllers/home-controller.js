'use strict';

angular.module('MusicForum')
	.controller('HomeController', ['$scope', '$location', 
		function($scope, $location){
			this.selectBoard = function(board){
				$location.url('/general/' + board);
			};
		}]);