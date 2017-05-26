'use strict';

angular.module('MusicForum')
	.directive('messageBoard', function(){
		return {
			restrict: 'E',
			scope: false,
			templateUrl: '/javascript/directives/templates/message-board.html',
			controller: ['$http',
				function($http){
					var main = this;
					this.threads = '';
					this.newTitle = '';
					this.threadCount = 0;

					this.getThreads = function(){
						$http({method: 'GET', url: '/tendril/board/Vinyl'})
						.then(function successCallback(res){
							main.threads = res.data;
							main.threadCount = res.data.length;
							main.newTitle = '';
						}), function errorCallback(res) {
							console.log('Fail!' + res);
						};
					};

					this.createTopic = function(){
						var sendData = {Title: main.newTitle, UserId: 1};

						if (main.newTitle !== ''){
							$http({method: 'POST', url: 'tendril/board/Vinyl', data: sendData})
							.then(function successCallback(){
								sendData['UNIX_TIMESTAMP(Date)'] = Math.round((new Date()).getTime() / 1000);
								main.threads.push(sendData);
								main.threadCount += 1;
							}), function errorCallback(res) {
								alert(res.data);
							};
						}
					};
				}],
			controllerAs: 'vinylCtrl'
		};
	});