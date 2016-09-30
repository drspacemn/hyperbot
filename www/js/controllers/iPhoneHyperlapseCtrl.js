angular.module('App').controller('iPhoneHyperlapseCtrl', ['$scope', '$stateParams','$cordovaCapture', "$localStorage", "Auth", "FURL",
function ($scope, $stateParams, $cordovaCapture, Auth, FURL) {
	var ref = firebase.database().ref();
	ref.child('items').on("value", function(snap){

	})
	$scope.sendStats = function(stats){
	}
}])
