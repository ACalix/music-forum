'use strict';

angular.module('MusicForum')
	.directive('messageBoard', function(){
		return {
			restrict: 'E',
			scope: false,
			templateUrl: '/javascript/directives/templates/message-board.html',
			controller: ['$http', '$routeParams', '$scope',
				function($http, $routeParams, $scope){
					var main = this;
					this.boardName = $routeParams.board;
					this.threads = '';
					this.newTitle = '';
					this.error = '';
					this.newTopicModal = false;
					this.threadCount = 0;
					this.boardIndex = 0;

					this.getThreads = function(){
						$http({method: 'GET', url: '/tendril/board/' + main.boardName})
						.then(function successCallback(res){
							main.threads = res.data;
							main.threadCount = res.data.length;
							main.newTitle = '';
						}), function errorCallback(res) {
							console.log('Fail!' + res);
						};
					};

					this.createTopic = function(){
						var sendData = {Title: main.newTitle};

						if (main.newTitle !== ''){
							if ($scope.userLoggedIn){
								$http({method: 'POST', url: '/tendril/board/' + $routeParams.board, data: sendData})
								.then(function successCallback(res){
									sendData['UNIX_TIMESTAMP(Date)'] = Math.round((new Date()).getTime() / 1000);
									sendData['UserId'] = res.data.notify.username;
									main.threads.push(sendData);
									main.threadCount += 1;
								}), function errorCallback(res) {
									alert(res.data);
								};
							} else {
								main.error ='Gotta log in bub';
							}
						}
					};

					this.pageNumbers = function(){
						var pageList = [1];
						var pages = Math.floor(main.threadCount/5);
						if (main.threadCount%5 === 0){
							pages -= 1;	
						}
						
						for (var i = 0; i < pages; i++){
							pageList.push(pageList[i]+1);
						}
						return pageList;
					};

					this.seePage = function(pageNum){
						pageNum--;
						main.boardIndex = pageNum * 5;
					};

					this.toggleModal = function(){
						main.newTopicModal = !(main.newTopicModal);
					};
				}],
			controllerAs: 'vinylCtrl'
		};
	});