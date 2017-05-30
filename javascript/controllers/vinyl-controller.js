'use strict';

angular.module('MusicForum')
	.controller('VinylController', ['$http', '$scope',
		function($http, $scope){
			var main = this;
			this.threads = {};

			$scope.getThreads = function(){
				if ($scope.userLoggedIn){
					$http({method: 'GET', url: '/tendril/board/Vinyl'})
					.then(function successCallback(res){
						main.threads = res.data;
						console.log('hi');
						console.log($scope.userLoggedIn);
					}), function errorCallback(res) {
						console.log('Fail!' + res);
					};
				} else {
					alert('Please log in');
				}
			};
		}]);