'use strict';

angular.module('MusicForum')
	.directive('signinModal', function(){
		return {
			restrict: 'E',
			templateUrl: '/javascript/directives/templates/signin-modal.html',
			scope: false,
			controller: ['$http', '$scope', '$window', '$cookies', function($http, $scope, $window, $cookies){
				var main = this;
				this.userName = '';
				this.password = '';
				this.invalidForm = false;
				this.error = '';

				this.createUser = function(){
					var uinfo = JSON.stringify({username: main.userName, password: main.password});
					$http({method: 'POST', url: '/tendril/user/login', data: uinfo})
						.then(function successCallback(res){
							if (res.data.notify.success){
								$cookies.credentials = res.data.notify.userid;
								$window.location.href = '/#!/home';
							} else {
								main.password = '';
								main.userName = '';
								main.invalidForm = true;
								main.error = 'That username/password is not recognized';
							}
						}), function errorCallback(res){
							console.log(res.data);
						};
				};

				this.closeModal = function(){
					main.invalidForm = false;
					main.error = '';
					main.userName = '';
					main.password = '';
					$scope.showSignIn = false;
				};
			}],
			controllerAs: 'signInCtrl'
		};
	});