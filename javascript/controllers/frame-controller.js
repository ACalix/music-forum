'use strict';

angular.module('MusicForum')
	.controller('FrameController', ['$http', '$scope',
		function($http, $scope){
			$scope.userLoggedIn = false;
			$scope.signInModal = false;
			$scope.signUpModal = false;

			$http({method: 'GET', url: 'tendril/user'})
				.then(function successCallback(res){
					if (res.data.notify.success){
						$scope.userLoggedIn = true;
					} else {
						$scope.userLoggedIn = false;
					}
				}), function errorCallback(res){
					console.log(res);
				};

			this.showRegistration = function(){
				return !($scope.userLoggedIn);
			};

			$scope.toggleSignIn = function(){
				$scope.signInModal = !($scope.signInModal);
			};

			$scope.toggleSignUp = function(){
				$scope.signUpModal = !($scope.signUpModal);
			};

			$scope.logoutAvailable = function(){
				return ($scope.userLoggedIn);
			};

			$scope.logout = function(){
				$http({method: 'GET', url: 'tendril/user/logout'})
					.then(function successCallback(res){
						if (res.data.notify.success){
							$scope.userLoggedIn = false;
						}
					});
			};
		}
	]);