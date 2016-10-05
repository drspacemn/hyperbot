angular.module('App').controller('iPhoneHyperlapseCtrl', ['$scope', '$stateParams','$cordovaCapture', "$localStorage", "Auth", "FURL", '$interval', '$timeout', '$ionicPopup',
function ($scope, $stateParams, $cordovaCapture, $localStorage, Auth, FURL, $interval, $timeout, $ionicPopup) {

	$scope.timeleft;
	$scope.wait = false;

	var refIphone = firebase.database().ref().child('iPhoneHyper');
	
	$scope.sendStats = function(stats){
		var obj = stats;
		obj.uid = $localStorage.uid;
		obj.isDone = false;
		refIphone.push(obj);
		$scope.timeleft = 10;
			var test = $interval(countDown, 1000);
			test;
			var timer = stats.iPhoneTime * 60000;
			waitTime(timer);
		 	var myPopup = $ionicPopup.show({
				template: '<div style="text-align: center;"><h1>{{ timeleft }}<h1></div>',
				title: 'Begin your iPhone TL',
				subTitle: 'Hyperbot will start moving in:',
				scope: $scope
			});

			myPopup.then(function(res) {
				console.log('Tapped!', res);
			});
			refIphone.on('child_changed', function(snap){
				if(snap.val().isDone === true){
					myPopup.close();
				}
			})

			$timeout(function() {
				$interval.cancel(test);
				$scope.timeleft = 'HyperBot is rolling';
			}, 10000);
	}
	
	function waitTime(time){
		$interval(function(){
			$scope.wait = true;
		}, time)
	}
	
	function countDown(){
		$scope.timeleft -= 1;
	}

}])
