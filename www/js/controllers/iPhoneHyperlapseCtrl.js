angular.module('App').controller('iPhoneHyperlapseCtrl', ['$scope', '$stateParams','$cordovaCapture', "$localStorage", "$cordovaActionSheet", "Auth", "FURL",
function ($scope, $stateParams, $cordovaCapture, $cordovaActionSheet, Auth, FURL) {
	var ref = firebase.database().ref();
	ref.child('items').on("value", function(snap){

	})


}])
