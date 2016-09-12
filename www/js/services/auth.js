angular.module('App').factory('Auth', function(FURL, $log, $firebaseAuth, $firebaseArray, $firebaseObject, $translate, Utils, $localStorage) {

	//var ref = new Firebase(FURL);

  firebase.initializeApp(FURL);
	//var auth = $firebaseAuth(ref);
  var ref = firebase.database().ref();
  //var auth = $firebaseObject(ref);
  var auth = $firebaseAuth();

	var Auth = {
		user: {},
    login: function(user) {


      // usersRef.child().update({
      //   'last_login': new Date().toString()
      // });
      return auth.$signInWithEmailAndPassword(
        user.email, user.password
      );
    },

    createProfile: function(uid, user) {
      var profile = {
				id: uid,
        email: user.email,
				registered_in: Date(),
        first_name: user.fName,
        last_name: user.lName,
        last_login: Date()
      };

      // If you want insert more data should modify register.html and modify your object.

      /*
      var profile = {
				id: uid,
        name: user.name,
        lastname: user.lastname,
        address: user.address,
        email: user.email,
				registered_in: Date()
      };
      */

      var messagesRef = $firebaseArray(firebase.database().ref().child("users"));
      messagesRef.$add(profile);
      $log.log("User Saved");
    },

    getUID: function() {
      console.log(auth);

    },

    register: function(user) {
      return auth.$createUserWithEmailAndPassword(user.email, user.password)
        .then(function(firebaseUser) {
          $log.log("User created with uid: " + firebaseUser.uid);
          Auth.createProfile(firebaseUser.uid,user);
        })
        .catch(function(error) {
          $log.log(error);
        });
    },

    logout: function() {
      // var newLogin = Date().toString();
      // var usersRef = firebase.database().ref().child('users');
      // usersRef.on("value", function(snapshot){
      //   var userTable = snapshot.val();
      //   for (var key in userTable) {
      //     if (userTable[key].id == $localStorage.profile) {
      //         usersRef.child(key).update({'last_login' : newLogin})
      //
      //       }
      //     }
      // })
      $localStorage.uid = '';
      auth.$signOut();
			$log.log("Usuario Sale.");
    },

		resetpassword: function(email) {
			return auth.$sendPasswordResetEmail(
				  email
				).then(function() {
					Utils.alertshow($translate.instant('MESSAGES.title_1'),$translate.instant('MESSAGES.success_message'));
				  //console.log("Password reset email sent successfully!");
				}).catch(function(error) {
					Utils.errMessage(error);
				  //console.error("Error: ", error.message);
				});
    },

		changePassword: function(user) {
			return auth.$changePassword({email: user.email, oldPassword: user.oldPass, newPassword: user.newPass});
		},

    signInWithProvider: function(provider) {
      return Auth.signInWithPopup('google');
    }
	};
	return Auth;

});
