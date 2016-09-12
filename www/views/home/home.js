'Use Strict';
angular.module('App').controller('homeController', function($scope, $state, $cordovaOauth, $localStorage, $log, $location, $http, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {
	var ref = firebase.database().ref();
	var groupsRef = ref.child('groups');
	var userId = $localStorage.uid;

  $scope.groups = [];

	groupsRef.on("value", function(snapshot) {
		let data = snapshot.val();
		for (var key in data) {
      let obj = {};
      data[key].members.forEach(function(member) {
        console.log('####################################################');
        console.log(member);
        if(member.id == userId){
          obj.key = key;
          obj.groupData = data[key];
          $scope.groups.push(obj)
        }
      })
		}
	})

	$scope.logOut = function() {
		Auth.logout();
		$location.path("/login");
	}

	$scope.profile = function() {
		$location.path("/profile");
	}
});
