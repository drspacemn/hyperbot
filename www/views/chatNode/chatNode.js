'Use Strict';
angular.module('App').controller('chatNodeController', function ($scope,  $firebaseArray, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup,  $timeout, $firebaseObject, $ionicScrollDelegate, Auth, FURL, Utils, Messages) {
	var groupsRef = firebase.database().ref().child('groups');
	groupsRef.on("value", function(snapshot){
		console.log(snapshot.val());
	})
	var usersRef = firebase.database().ref().child('users');
	usersRef.on("value", function(snapshot){
		console.log(snapshot.val());
	})

	$scope.sendGroups = function(){
		let group = {};

		//members
		group.members = [];

		let member = {}
		member.last_login = "Fri Sep 09 2016 16:07:08 GMT-0600 (MDT)";
		member.user_id = "7fE8ByW0c6hIttmZcU08W6C0OXB2";
		member.first_name = 'Mit';
		member.last_name = 'Rednep';
		group.members.push(member);
		member = {}
		member.last_login = "Fri Sep 09 2016 16:08:26 GMT-0600 (MDT)";
		member.user_id = "rDm6JTqu8fecXA6SN7PDfSIYXPe2";
		member.first_name = 'Jim';
		member.last_name = 'Watkins';
		group.members.push(member);
		//groupname
		group.group_name = 'testies'

		//messages
		group.messages = [];

		let message = {}
		message.text = 'hahahahaha lololol';
		message.user_id = 'string';
		message.timestamp = new Date();

		group.messages.push(message);
		// var groupsRef = $firebaseArray(firebase.database().ref().child("groups"));
		groupsRef.push(group);
		console.log("Group Saved");

	}
});
