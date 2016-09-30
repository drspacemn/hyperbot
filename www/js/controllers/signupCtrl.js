angular.module('App').controller('signupCtrl', ['$scope', '$stateParams', "Auth", "$state", "FURL",
function ($scope, $stateParams, Auth, $state, FURL) {
	$scope.registerUser = function(user){
		Auth.register(user).then(function(){
			$localStorage.uid = authData.uid;
			$localStorage.email = authData.email;
			$state.go('home');
		}, function(err){
		})
	}
}])
