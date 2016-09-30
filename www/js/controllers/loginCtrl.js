angular.module('App').controller('loginCtrl', ['$scope', '$stateParams', "$localStorage", "Auth", "$state", "FURL",
function ($scope, $stateParams, $localStorage, Auth, $state, FURL) {
	if($localStorage.uid !== ''){
		$state.go('home');
	}

	$scope.loginUser = function(user){
		Auth.login(user).then(function(authData){
			$localStorage.uid = authData.uid;
			$localStorage.email = authData.email;
			$state.go('home');
		},function(err){
		})
	}

}])
