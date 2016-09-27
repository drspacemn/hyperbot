'Use Strict';
angular.module('App', ['ionic', 'ngStorage', 'ngCordova', 'firebase', 'pascalprecht.translate', 'ngMessages'])
	.config(function($stateProvider, $urlRouterProvider, $translateProvider, $translateStaticFilesLoaderProvider) {


		$stateProvider
		.state('home', {
			url: '/page1',
			templateUrl: 'templates/home.html',
			controller: 'homeCtrl'
		})

		.state('menu.iPhoneHyperlapse', {
			url: '/iphonehl',
			views: {
				'side-menu21': {
					templateUrl: 'templates/iPhoneHyperlapse.html',
					controller: 'iPhoneHyperlapseCtrl'
				}
			}
		})

		.state('menu.goProHyperlapse', {
			url: '/goprohl',
			views: {
				'side-menu21': {
					templateUrl: 'templates/goProHyperlapse.html',
					controller: 'goProHyperlapseCtrl'
				}
			}
		})

		.state('menu.video', {
			url: '/video',
			views: {
				'side-menu21': {
					templateUrl: 'templates/video.html',
					controller: 'videoCtrl'
				}
			}
		})

		.state('menu.control', {
			url: '/control',
			views: {
				'side-menu21': {
					templateUrl: 'templates/control.html',
					controller: 'controlCtrl'
				}
			}
		})

		.state('menu', {
			url: '/side-menu21',
			templateUrl: 'templates/menu.html',
			controller: 'menuCtrl'
		})

		.state('login', {
			url: '/login',
			templateUrl: 'templates/login.html',
			controller: 'loginCtrl'
		})

		.state('signup', {
			url: '/signup',
			templateUrl: 'templates/signup.html',
			controller: 'signupCtrl'
		})

		$urlRouterProvider.otherwise('/login')

		})


.constant('FURL', {
		apiKey: "AIzaSyCbHiDYAmwbrQSfSYGU62_L7jt55o4RDvI",
		authDomain: "hyperbot-d6494.firebaseapp.com",
		databaseURL: "https://hyperbot-d6494.firebaseio.com",
		storageBucket: "hyperbot-d6494.appspot.com",
	})
	.run(function($ionicPlatform) {
		$ionicPlatform.ready(function(FURL) {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	});
