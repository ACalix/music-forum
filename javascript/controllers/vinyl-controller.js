'use strict';

angular.module('MusicForum')
	.controller('VinylController', ['$http', '$scope',
		function($http, $scope){
			var main = this;
			this.threads = {};

			$scope.getThreads = function(){
				$http({method: 'GET', url: '/tendril/board/Vinyl'})
				.then(function successCallback(res){
					main.threads = res.data;
					console.log(res.data);
				}), function errorCallback(res) {
					console.log('Fail!' + res);
				};
				console.log('HI');
			};
		}]);