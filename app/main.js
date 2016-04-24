var app = angular.module('myApp',[
	'ngRoute',
	'mobile-angular-ui',
	'mobile-angular-ui.gestures',

	'myApp.login',
	'myApp.register',
	'myApp.basicInfo',
	'myApp.order',
	'myApp.orderHistory',
	'myApp.orderNearby',
	'myApp.addressInfo',
	'myApp.userService',
	'myApp.addressService',
	'myApp.orderService',
	'myApp.statusCodeConvertService',

	]);
app.run(function($transform) {
  window.$transform = $transform;
});

app.config(function($routeProvider) {
	$routeProvider.when('/',              {templateUrl: 'home.html', reloadOnSearch: false});
	$routeProvider.
		when('/login', {
			templateUrl: 'login/login.html',
			controller: 'loginCtrl',
			reloadOnSearch: false
		}).
		when('/register', {
			templateUrl: 'register/register.html',
			controller: 'registerCtrl',
			reloadOnSearch: false
		}).
		when('/order', {
			templateUrl: 'order/order.html',
			controller: 'orderCtrl',
			reloadOnSearch: false
		}).
		when('/orderNearby', {
			templateUrl: 'order/orderNearby.html',
			controller: 'orderNearbyCtrl',
			reloadOnSearch: false
		}).
		when('/orderHistory', {
			templateUrl: 'order/orderHistory.html',
			controller: 'orderHistoryCtrl',
			reloadOnSearch: false
		}).
		when('/addressInfo',{
			templateUrl: 'user/addressInfo.html',
			controller: 'addressInfoCtrl',
			reloadOnSearch: false
		}).
		when('/basicInfo',{
			templateUrl: 'user/basicInfo.html',
			controller: 'basicInfoCtrl',
			reloadOnSearch: false
		}).
		otherwise({
			redirectTo: '/'
		});
});

app.constant('urlHeader','http://192.168.1.5:7777/');
app.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
});
app.constant('BASIC_EVENTS', {
	load:'basic-load',
	close:'basic-close'
});

app.controller('MainController', function($rootScope, $scope, AUTH_EVENTS){
	$scope.bottomReached = function() {
    	/* global alert: false; */
    	alert('Congrats you scrolled to the end of the list!');
  	};

	$scope.isUserValid = false;
	$scope.showOwnerMenu = false;
	$scope.showDelivererMenu = false;

	$scope.onUserChangeHandler = function(){
		$scope.isUserValid = userService.isUserValid();
		$scope.showOwnerMenu = $scope.isUserValid && userService.isUserOwner();
		$scope.showDelivererMenu = $scope.isUserValid && userService.isUserDeliverer();
	};

	$scope.$on(AUTH_EVENTS.loginSuccess, function() {
		$scope.onUserChangeHandler();
	});
	$scope.logout = function() {
		userService.logout();
		$location.path('/login').replace();
		$scope.onUserChangeHandler();
	};

});