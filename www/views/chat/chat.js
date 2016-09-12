'Use Strict';
angular.module('App').controller('chatController', function ($scope, $rootScope, $timeout, $firebaseArray, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup,  $timeout, $firebaseObject, $ionicScrollDelegate, Auth, FURL, Utils, Messages) {
  $scope.hideTime = true;

	$scope.messages = [];
	$timeout(function(){
				if($location.url() === '/chat'){
				$ionicScrollDelegate.scrollBottom(true);
			}
		})


	var ref = firebase.database().ref();

	ref.child("messages").on("value", function(snapshot) {
	        $scope.messages = [];
	        var snap = snapshot.val();
	        for(var key in snap){
	                $scope.messages.push(snap[key])
	        }

	    $rootScope.$$phase ||  $scope.$apply()
	    $ionicScrollDelegate.scrollBottom(true);

	    });

	// });

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendMessage = function() {
		if($scope.data.message){

    alternate = !alternate;

    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
		var obj = {}
		obj.text = $scope.data.message;
		ref.child("messages").push(obj);

    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);

		}
  };
// 	firebase.child("location/city").on("value", function(snapshot) {
//   alert(snapshot.val());  // Alerts "San Francisco"
// });



  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };

  $scope.data = {};
  $scope.myId = '12345';
})

// All this does is allow the message
// to be sent when you tap return
.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
});
