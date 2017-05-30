'use strict';

angular.module('MusicForum')
	.directive('threadChat', function(){
		return {
			restrict: 'E',
			templateUrl: '/javascript/directives/templates/thread-chat.html',
			controller: ['$routeParams', '$http', '$scope',
				function($routeParams, $http, $scope){
					var main = this;
					this.threadId = $routeParams.id;
					this.content = '';
					this.posts = [];
					this.postCount = null;

					this.getThread = function(){
						$http({method: 'GET', url: '/tendril/thread/' + main.threadId})
						.then(function successCallback(res){
							main.posts = res.data;
							main.postCount = res.data.length;
						}), function errorCallback(res) {
							console.log('Fail!' + res);
						};
					};

					this.postMessage = function(){
						var sendData = {Content: main.content};

						if (main.content !== ''){
							if ($scope.userLoggedIn){
								$http({method: 'POST', url: '/tendril/thread/' + main.threadId, data: sendData})
								.then(function successCallback(res){
									sendData['UNIX_TIMESTAMP(PostDate)'] = Math.round((new Date()).getTime() / 1000);
									sendData['user_id'] = res.data.notify.username;
									main.posts.push(sendData);
									main.postCount += 1;
								}), function errorCallback(res) {
									alert(res.data);
								};
							} else {
								main.error ='Gotta log in bub';
							}
						}
					};

				}],
			controllerAs: 'threadCtrl'
		};
	});