'use strict';

angular.module('MusicForum')
	.directive('threadChat', function(){
		return {
			restrict: 'E',
			templateUrl: '/javascript/directives/templates/thread-chat.html',
			controller: ['$routeParams', '$http', '$scope',
				function($routeParams, $http, $scope){
					var main = this;
					this.error = '';
					this.threadName = '';
					this.boardName = $routeParams.board;
					this.threadId = $routeParams.id;
					this.content = '';
					this.posts = [];
					this.postCount = null;
					this.newPost = false;

					this.getThread = function(){
						$http({method: 'GET', url: '/tendril/thread/' + main.threadId})
						.then(function successCallback(res){
							main.threadName = res.data.notify.title;
							main.posts = res.data.notify.threads;
							main.postCount = res.data.notify.threads.length;
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
									main.newPost = false;
									main.error = '';
									main.content = '';
								}), function errorCallback(res) {
									alert(res.data);
								};
							} else {
								main.error ='Gotta log in bub';
							}
						} else {
							main.error = 'Please enter a message.';
						}
					};

					this.pageNumbers = function(){
						var pageList = [1];
						var pages = Math.floor(main.postCount/25);
						if (main.postCount%25 === 0){
							pages -= 1;	
						}
						
						for (var i = 0; i < pages; i++){
							pageList.push(pageList[i]+1);
						}
						return pageList;
					};

					this.seePage = function(pageNum){
						pageNum--;
						main.boardIndex = pageNum * 25;
					};

					this.toggleModal = function(){
						main.newPost = !(main.newPost);
						main.error = '';
						main.content = '';
					};
				}],
			controllerAs: 'threadCtrl'
		};
	});