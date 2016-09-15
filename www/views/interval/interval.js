'Use Strict';

angular.module('App').controller('intervalController', function ($scope, $stateParams ,$cordovaOauth, $localStorage, $location,$http,$ionicPopup,$firebaseAuth, $firebaseObject,$log, Auth, FURL, Utils) {
  var ref = firebase.database().ref();
  var userId = $localStorage.uid;
  var chatid = $stateParams.chatId;
  var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

	ref.child("groups").child(chatid).on("value", function(snapshot){
		var snap = snapshot.val();
		$scope.groupNameOnChat = snap.group_name;
	})

  getUserName = function (user_id) {
    var concat;
    ref.child('users').once('value').then(function(users) {
      let firstSlice;
      let lastSlice;

      var usersPlus = users.val();
      for (var user in usersPlus) {
        if(usersPlus[user].id == user_id){
          firstSlice = usersPlus[user].first_name.slice(0,1);
          lastSlice = usersPlus[user].last_name.slice(0,1);
          concat = `${firstSlice}${lastSlice}`
          console.log(concat);
          return concat
        }
      }
    })
  }

$scope.intervalObject = {};
  makeIntervalArray = function() {
    let scopeQuad = [];
    ref.child('groups').child(chatid).child('messages').once('value', function(messages){
      var readableObject = messages.val();
      for (var message in readableObject) {
        // console.log(readableObject[message]);
        let timeStamp = readableObject[message].sent
        let dateThat = new Date(timeStamp*1000);
        console.log(dateThat);
        let hour = dateThat.getHours();
        scopeQuad.push([hour,timeStamp,readableObject[message].text,readableObject[message].user_id]);
      }
      // console.log($scope.intervalObject);

    })
  }

makeIntervalArray();


});
