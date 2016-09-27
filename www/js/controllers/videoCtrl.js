angular.module('App').controller('videoCtrl', ['$scope', '$stateParams', '$cordovaCapture',
function ($scope, $stateParams, $cordovaCapture) {
	$scope.captureVideo = function() {
     var options = { limit: 3, duration: 15 };

     $cordovaCapture.captureVideo(options).then(function(videoData) {
       // Success! Video data is here
     }, function(err) {
       // An error occurred. Show a message to the user
     });
   }
}])
