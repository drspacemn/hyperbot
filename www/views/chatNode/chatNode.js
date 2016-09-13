'Use Strict';
angular.module('App').controller('chatNodeController', function ($scope, $stateParams, $interval, $rootScope, $timeout, $firebaseArray, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $timeout, $firebaseObject, $ionicScrollDelegate, Auth, FURL, Utils, Messages) {
	$scope.members = [];
	$scope.users = [];
	$scope.initials = [];
	$scope.top =[];
	$scope.topInit =[];
	$scope.bottom = [];
	$scope.bottomInit = [];
	$scope.replayState = true;
	$scope.replayArr = [];

	var ref = firebase.database().ref();
	var chatid = '-KRVYOVuDAwzIWf2_QvR';

	var userId = $localStorage.uid;
	var email = $localStorage.email

	var groupRef = firebase.database().ref().child('groups').child(chatid);
	groupRef.on("value", function(snapshot){

		$scope.users = [];
		$scope.top = [];
		$scope.bottom = [];
		var snap = snapshot.val();
		for (var i = 0; i < snap.members.length; i++) {
			if(snap.members[i].id === userId){
				var obj = {};
				obj.userData = snap.members[i];
				obj.userMessages = [];
				$scope.users.push(obj);
				var first = snap.members[i].first_name[0];
				var second = snap.members[i].last_name[0];
				$scope.initials.push(`${first} ${second}`)
			}
		}
		for (var i = 0; i < snap.members.length; i++) {
			if(snap.members[i].id !== userId){
				var obj = {};
				obj.userData = snap.members[i];
				obj.userMessages = [];
				$scope.users.push(obj);
				var first = snap.members[i].first_name[0];
				var second = snap.members[i].last_name[0];
				$scope.initials.push(`${first} ${second}`)
			}
		}
		for(var key in snap.messages){
			for (var i = 0; i < $scope.users.length; i++) {
				if($scope.users[i].userData.id === snap.messages[key].user_id){
					$scope.users[i].userMessages.push(snap.messages[key]);
				}
			}
		}
		for (var i = 0; i < $scope.users.length; i++) {
			if(i < 2){
				$scope.topInit.push($scope.initials[i])
				$scope.top.push($scope.users[i])
			}else {
				$scope.bottomInit.push($scope.initials[i])
				$scope.bottom.push($scope.users[i])
			}
		}
		console.log($scope.top);
		console.log($scope.bottom);
	})

	var alternate,
		isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

	$scope.sendMessage = function() {
		if ($scope.data.message) {

			alternate = !alternate;

			var d = new Date();
			d = d.toUTCString();
			var obj = {}
			obj.text = $scope.data.message;
			obj.sent = d;
			obj.user_id = userId;
			obj.email = email;
			ref.child("groups").child(chatid).child('messages').push(obj);

			delete $scope.data.message;
			$ionicScrollDelegate.scrollBottom(true);

		}
	};
	$scope.replay = function(){
		$scope.replayState = !$scope.replayState
		$scope.count = 0;


		var promise = $interval(function(){

			console.log($scope.initials[$scope.count]);
			$scope.count++

		}, 1000)
		$interval.cancel(promise)

	}

$scope.stop= function(){
	$interval.cancel(promise)
}


//not working for chatNodes
	$scope.inputUp = function() {
		if (isIOS) $scope.data.keyboardHeight = 216;
		$timeout(function() {
			$ionicScrollDelegate.scrollBottom(true);
		}, 300);

	};

	$scope.inputDown = function() {
		if (isIOS) $scope.data.keyboardHeight = 0;
		$ionicScrollDelegate.resize();
	};

	$scope.closeKeyboard = function() {
		// cordova.plugins.Keyboard.close();
	};

	$scope.data = {};
	$scope.myId = '12345';

});
