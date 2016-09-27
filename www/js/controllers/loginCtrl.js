angular.module('App').controller('loginCtrl', ['$scope', '$stateParams', "$localStorage", "Auth", "$state", "FURL",
function ($scope, $stateParams, $localStorage, Auth, $state, FURL) {
	$scope.loginUser = function(user){
		Auth.login(user).then(function(authData){
			console.log(authData);
			$localStorage.uid = authData.uid;
			$localStorage.email = authData.email;
			$state.go('home');
		},function(err){
			console.log(err);
		})
	}

}])
