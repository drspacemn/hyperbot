angular.module('App').controller('iPhoneHyperlapseCtrl', ['$scope', '$stateParams','$cordovaCapture', "$localStorage", "Auth", "FURL",
function ($scope, $stateParams, $cordovaCapture, $localStorage, Auth, FURL) {

	$scope.timeleft;

	var refIphone = firebase.database().ref().child('iPhoneHyper');
	
	$scope.sendProStats = function(stats){
		var obj = stats;
		obj.uid = $localStorage.uid;
		obj.isDone = false;
		refIphone.push(obj);
	}
	refIphone.on('child_changed', function(childSnapshot, prevChildKey){
		if(childSnapshot.val().isDone === 'inProgress'){
		$scope.timeleft = childSnapshot.val().time * 60;
			var test = $interval(countDown, 1000);
			test;
		 var myPopup = $ionicPopup.show({
				template: '<div style="text-align: center;"><h1>{{ timeleft }}<h1></div>',
				title: 'Gettin Hyper',
				subTitle: 'seconds left in HyperLapse',
				scope: $scope,
				buttons: [
				{ text: 'Exit' }
				]
			});

			myPopup.then(function(res) {
				console.log('Tapped!', res);
			});

			$timeout(function() {
				$interval.cancel(test);
				$scope.timeleft = 'HyperLapse Complete!';
			}, (childSnapshot.val().time * 60000));
			};
	})
	function countDown(){
		$scope.timeleft -= 1;
	}

}])
