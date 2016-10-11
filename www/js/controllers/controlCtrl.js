angular.module('App').controller('controlCtrl', ['$scope', '$ionicPlatform', '$stateParams', '$log', '$cordovaDeviceMotion', 'FURL', '$ionicPopup',
function ($scope, $ionicPlatform, $stateParams, $log, $cordovaDeviceMotion, FURL, $ionicPopup) {
   var ref = firebase.database().ref();

    $scope.options = { 
        frequency: 500, 
        deviation : 25  
    };
 
    // Current measurements
    $scope.measurements = {
        x : null,
        y : null,
        z : null,
        timestamp : null
    }
 
    // Previous measurements    
    $scope.previousMeasurements = {
        x : null,
        y : null,
        z : null,
        timestamp : null
    }   
 
    // Watcher object
    $scope.watch = null;
 
 
    $ionicPlatform.ready(function() {
 
        $scope.startWatching = function() {   
        var confirmPopup = $ionicPopup.confirm({
			title: 'Tilt and Party',
			template: 'Tilt your device to landscape and press OK'
		});
		confirmPopup.then(function(res) {
			if(res) {
                 $scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.options);
 
            $scope.watch.then(null, function(error) {
                console.log('Error');
            },function(result) {
 
                ref.child('control').push({x: Math.floor(result.x), y: Math.floor(result.y), z: Math.floor(result.z)})
                ref.child('control').remove();                
                $scope.measurements.x = result.x;
                $scope.measurements.y = result.y;
                $scope.measurements.z = result.z;
                $scope.measurements.timestamp = result.timestamp;                 
 
                // Detecta shake  
                $scope.detectShake(result);  
 
            });  
				
			} else {
				console.log('TL abort');
			}
		});         
        };      
 
        // Stop watching method
        $scope.stopWatching = function() {  
            $scope.watch.clearWatch();            
            ref.child('control').push({x: 'kill engines'})
            ref.child('control').remove();
        }       
 
        // Detect shake method      
        $scope.detectShake = function(result) { 
 
            var measurementsChange = {};
 
            if ($scope.previousMeasurements.x !== null) {
                measurementsChange.x = Math.abs($scope.previousMeasurements.x, result.x);
                measurementsChange.y = Math.abs($scope.previousMeasurements.y, result.y);
                measurementsChange.z = Math.abs($scope.previousMeasurements.z, result.z);
            }
 
            if (measurementsChange.x + measurementsChange.y + measurementsChange.z > $scope.options.deviation) {
                $scope.stopWatching();  
                console.log('Shake detected'); 
                setTimeout($scope.startWatching(), 1000);  
 
                $scope.previousMeasurements = { 
                    x: null, 
                    y: null, 
                    z: null
                }               
 
            } else {
                $scope.previousMeasurements = {
                    x: result.x,
                    y: result.y,
                    z: result.z
                }
            }           
 
        }       
 
    });
 
    $scope.$on('$ionicView.beforeLeave', function(){
        $scope.watch.clearWatch(); 
    }); 
}])
