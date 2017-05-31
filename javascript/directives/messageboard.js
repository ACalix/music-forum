'use strict';

angular.module('MusicForum')
	.directive('messageBoard', function(){
		return {
			restrict: 'E',
			scope: false,
			templateUrl: '/javascript/directives/templates/message-board.html',
			controller: ['$http', '$routeParams', '$scope', '$location',
				function($http, $routeParams, $scope, $location){
					var main = this;
					$scope.boardName = $routeParams.board;
					this.threads = '';
					this.newTitle = '';
					this.newMessage = '';
					this.error = '';
					this.newTopicModal = false;
					this.threadCount = 0;
					this.boardIndex = 0;

					this.getThreads = function(){
						$http({method: 'GET', url: '/tendril/board/' + $scope.boardName})
						.then(function successCallback(res){
							main.threads = res.data;
							main.threadCount = res.data.length;
							main.newTitle = '';
						}), function errorCallback(res) {
							console.log('Fail!' + res);
						};
					};

					this.createTopic = function(){
						var sendData = {Title: main.newTitle, Content: main.newMessage};

						if (main.newTitle !== '' && main.newMessage !== ''){
							if ($scope.userLoggedIn){
								$http({method: 'POST', url: '/tendril/board/' + $routeParams.board, data: sendData})
								.then(function successCallback(res){
									$location.url('/' + $scope.boardName +'/thread/' + res.data.notify.thread_id);
								}), function errorCallback(res) {
									alert(res.data);
								};
							} else {
								main.error ='Gotta log in bub';
							}
						} else {
							main.error = 'Please do not leave a field blank';
						}
					};

					this.pageNumbers = function(){
						var pageList = [1];
						var pages = Math.floor(main.threadCount/10);
						if (main.threadCount%10 === 0){
							pages -= 1;	
						}
						
						for (var i = 0; i < pages; i++){
							pageList.push(pageList[i]+1);
						}
						return pageList;
					};

					this.seePage = function(pageNum){
						pageNum--;
						main.boardIndex = pageNum * 10;
					};

					this.toggleModal = function(){
						main.newTopicModal = !(main.newTopicModal);
						main.error = '';
						main.newTitle = '';
						main.newMessage = '';
					};
				}],
			controllerAs: 'messageBoardCtrl'
		};
	});