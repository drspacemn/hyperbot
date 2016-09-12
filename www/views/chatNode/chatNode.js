'Use Strict';
angular.module('App').controller('chatNodeController', function ($scope,  $firebaseArray, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup,  $timeout, $firebaseObject, $ionicScrollDelegate, Auth, FURL, Utils, Messages) {
	$scope.members = [];
	$scope.user1 = {};
	$scope.user2 = {};
	$scope.user3 = {};
	$scope.user4 = {};

	var userId = $localStorage.uid;
	var email = $localStorage.email

	var groupRef = firebase.database().ref().child('groups').child('-KRVYOVuDAwzIWf2_QvR');
	groupRef.on("value", function(snapshot){
		var snap = snapshot.val().members;
		for (var i = 0; i < snap.length; i++) {
			if(snap[i].id !== userId){
				var j = 1;
				console.log(snap[i]);
				var obj = {};
				obj.userData = snap[i];
				obj.userMessages = [];

			}else {
				console.log("user", snap[i]);
			}
		}
	})
	var usersRef = firebase.database().ref().child('users');
	usersRef.on("value", function(snapshot){
	})
});
