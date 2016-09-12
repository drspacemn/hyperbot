'Use Strict';
angular.module('App').controller('homeController', function($scope, $rootScope, $state, $cordovaOauth, $localStorage, $log, $location, $http, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {
	var ref = firebase.database().ref();

	var groupsRef = ref.child('groups');
	var userId = $localStorage.uid;

	groupsRef.on("value", function(snapshot) {
		$scope.groups = [];

		let data = snapshot.val();
		for (var key in data) {
      let obj = {};
      obj.delete = function(groupId){
        groupsRef.child(groupId).remove();
      }
      data[key].members.forEach(function(member) {
        if(member.id == userId){
          obj.key = key;
          obj.groupData = data[key];
          $scope.groups.push(obj)
        }
      })
		}
    $rootScope.$$phase || $scope.$apply()
	})

  
	$scope.logOut = function() {
		Auth.logout();
		$location.path("/login");
	}

	$scope.profile = function() {
		$location.path("/profile");
	}
});
