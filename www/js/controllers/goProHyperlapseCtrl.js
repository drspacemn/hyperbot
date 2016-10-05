angular.module('App').controller('goProHyperlapseCtrl', ['$scope', '$stateParams', '$localStorage', 'FURL', '$ionicPopup', '$timeout', '$interval',
function ($scope, $stateParams, $localStorage, FURL, $ionicPopup, $timeout, $interval) {
	$scope.timeleft;

	var refGo = firebase.database().ref().child('goProHyper');
	
	$scope.sendProStats = function(stats){
		var obj = stats;
		obj.uid = $localStorage.uid;
		obj.isDone = false;
		refGo.push(obj);
	}
	refGo.on('child_changed', function(childSnapshot, prevChildKey){
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
				{ text: 'Exit',
				type: 'button-default',
				onTap: function(e) {
					// e.preventDefault() will stop the popup from closing when tapped.
					if($scope.timeleft !== 'HyperLapse Complete!'){
						e.preventDefault();
						}
					}
				 }
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
