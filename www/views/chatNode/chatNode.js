'Use Strict';
angular.module('App').controller('chatNodeController', function ($scope,  $firebaseArray, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup,  $timeout, $firebaseObject, $ionicScrollDelegate, Auth, FURL, Utils, Messages) {
	$scope.members = [];
	$scope.users = [];
	$scope.initials = [];
	$scope.top =[];
	$scope.bottom = [];

	var userId = $localStorage.uid;
	var email = $localStorage.email

	var groupRef = firebase.database().ref().child('groups').child('-KRVYOVuDAwzIWf2_QvR');
	groupRef.on("value", function(snapshot){
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
				$scope.top.push($scope.users[i])
			}else {
				$scope.bottom.push($scope.users[i])
			}
		}
		console.log($scope.top);
		console.log($scope.bottom);
	})


	var usersRef = firebase.database().ref().child('users');
	usersRef.on("value", function(snapshot){
	})
});
