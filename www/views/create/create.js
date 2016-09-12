'Use Strict';
angular.module('App').controller('createController', function ($scope,  $firebaseArray, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup,  $timeout, $firebaseObject, $ionicScrollDelegate, Auth, FURL, Utils, Messages) {
	$scope.view = {}
	$scope.view.users = [];
	$scope.view.newGroup = [];
	$scope.view.groupName = '';
	$scope.view.searchInput;
	var usersRef = firebase.database().ref().child('users');

	usersRef.on("value", function(snapshot){
		$scope.view.users = [];
		let data = snapshot.val();
		for(var key in data){
			let obj = {};
			obj.key = key;
			obj.userData = data[key];
			$scope.view.users.push(obj)
		}
	})
	$scope.view.addFriend = function(user){
		$scope.view.searchInput = '';
		$scope.view.newGroup.push(user)
	}
	$scope.view.remove = function(friend){
		// $scope.view.newGroup.splice(index, 1);
		console.log(friend);
	}
	var groupsRef = firebase.database().ref().child('groups');

	$scope.view.sendGroup = function(){
		let group = {};

		//members
		group.members = [];
		$scope.view.newGroup.forEach((val)=>{
			let obj = {};
			obj[val.key] = val.userData;
			console.log(val.userData);
			group.members.push(val.userData);
		})

		group.group_name = $scope.view.groupName;
		//messages
		group.messages = [];

		// var groupsRef = $firebaseArray(firebase.database().ref().child("groups"));
		groupsRef.push(group);

		console.log("Group Saved");
		$location.path('/home');
		$location.replace();
	}

});
