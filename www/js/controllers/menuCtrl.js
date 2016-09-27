angular.module('App').controller('menuCtrl', ['$scope', '$stateParams', 'Auth',
function ($scope, $stateParams, Auth) {
	$scope.logout = function(){
		Auth.logout();
	}

}])
