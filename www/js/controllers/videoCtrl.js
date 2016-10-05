angular.module('App').controller('videoCtrl', ['$scope', '$stateParams', '$cordovaCapture', '$cordovaInAppBrowser', 'FURL', '$interval',
function ($scope, $stateParams, $cordovaCapture, $cordovaInAppBrowser, FURL, $interval) {
    
    $scope.openInAppBrowser = function()
    {
    window.open('http://10.5.5.9:8080/live/amba.m3u8','_blank'); 
    };
}])
