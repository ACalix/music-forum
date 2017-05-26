'use strict';

angular.module('MusicForum')
	.directive('signupModal', function(){
		return {
			restrict: 'E',
			templateUrl: '/javascript/directives/templates/signup-modal.html',
			scope: false,
			controller: ['$http', '$scope', function($http, $scope){
				var main = this;
				this.userName = '';
				this.password = '';
				this.error = '';

				this.createUser = function(){
					var uinfo = JSON.stringify({username: main.userName, password: main.password});
					$http({method: 'POST', url: '/tendril/newuser', data: uinfo})
						.then(function successCallback(res){
							if (res.data.success){
								main.userName = '';
								main.password = '';
								$scope.showSignUp = false;
							} else {
								main.password = '';
								main.userName = '';
								main.error = 'That username is already taken!';
							}
						}), function errorCallback(res){
							console.log(res.data);
						};
				};

				this.closeModal = function(){
					$scope.showSignUp = false;
				};
			}],
			controllerAs: 'signUpCtrl'
		};
	});