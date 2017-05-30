'use strict';

angular.module('MusicForum')
	.directive('signupModal', function(){
		return {
			restrict: 'E',
			templateUrl: '/javascript/directives/templates/signup-modal.html',
			scope: false,
			controller: ['$http', '$scope', '$window', '$cookies', function($http, $scope, $window, $cookies){
				var main = this;
				this.userName = '';
				this.password = '';
				this.error = '';
				this.invalidUsername = false;
				this.invalidPass = false;

				this.createUser = function(){
					if ((main.userName === '') || (main.userName.length < 5)) {
						main.error = 'Please input a valid username.';
						main.invalidEmail = true;
					} else if ((main.password === '') || (main.password.length < 5)) {
						main.error = 'Please input a valid password.';
						main.invalidPass = true;
					} else {	
						var uinfo = JSON.stringify({username: main.userName, password: main.password});
						$http({method: 'POST', url: '/tendril/user/new', data: uinfo})
							.then(function successCallback(res){
								if (res.data.notify.success){
									$cookies.credentials = res.data.notify.userid;
									main.closeModal();
									$scope.userLoggedIn = true;
								} else {
									main.password = '';
									main.userName = '';
									main.invalidUsername = true;
									main.invalidPass = true;
									main.error = 'That username is already taken!';
								}
							}), function errorCallback(res){
								console.log(res.data);
							};
					}
				};

				this.closeModal = function(){
					main.error = '';
					main.invalidUsername = false;
					main.invalidPass = false;
					main.userName = '';
					main.password = '';
					$scope.toggleSignUp();
				};
			}],
			controllerAs: 'signUpCtrl'
		};
	});