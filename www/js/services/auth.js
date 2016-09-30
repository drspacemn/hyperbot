angular.module('App').factory('Auth', function(FURL, $log, $firebaseAuth, $firebaseArray, $cordovaOauth, $ionicPopup, $firebaseObject, $state, $translate, Utils, $localStorage) {
	firebase.initializeApp(FURL);

	var ref = firebase.database().ref();

	var auth = $firebaseAuth();

	var Auth = {
		user: {},


		register: function(user){
			return auth.$createUserWithEmailAndPassword(user.email, user.password);

		},
		login: function(user){
			return auth.$signInWithEmailAndPassword(user.email, user.password);
		},
		logout: function(){
			$localStorage.uid = '';
			$localStorage.email = '';
			auth.$signOut()
			$state.go("login");
		}
	}
	return Auth;

});
