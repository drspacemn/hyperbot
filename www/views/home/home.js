'Use Strict';
angular.module('App').controller('homeController', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  var userRef = firebase.database().ref().child('users');
  var groupsRef = firebase.database().ref().child('groups');
  var Auth = Auth;

  groupsRef.on("value", function(snapshot){
      console.log(snapshot.val());
  })
  userRef.on("value", function(snapshot){
      console.log(snapshot.val());
  })

  var local = $localStorage.get();
  console.log(local);
  $scope.logOut = function () {
      Auth.logout();
      $location.path("/login");
  }

  $scope.profile = function () {
      $location.path("/profile");
  }
}
);
