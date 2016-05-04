var app = angular.module('myApp',[
	'ngRoute',
	'ui.bootstrap',
	'mobile-angular-ui',
	'mobile-angular-ui.gestures',

	'myApp.login',
	'myApp.register',
	'myApp.basicInfo',
	'myApp.order',
	'myApp.orderHistory',
	'myApp.orderNearby',
	'myApp.addressInfo',
	'myApp.map',
	'myApp.userService',
	'myApp.addressService',
	'myApp.orderService',
	'myApp.authService',
	'myApp.confirmationDialogService'
	]);
app.run(function($transform) {
  window.$transform = $transform;
});

app.config(function($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'utilViews/home.html',
			reloadOnSearch: false
		}).
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
		when('/route',{
			templateUrl: 'address/route.html',
			controller: 'mapCtrl',
			reloadOnSearch: false
		}).
		otherwise({
			redirectTo: '/'
		});
});

app.constant('urlHeader','http://192.168.1.9:7777/');
app.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
});
app.constant('BASIC_EVENTS', {
	REQUEST_LOAD_DATA:'basic-request-load-data',
	RESPONSE_LOAD_DATA:'basic-response-load-data'
});

app.controller('MainController', function($rootScope, $scope, $location, AUTH_EVENTS, userService,confirmationDialogService){
	$scope.isUserValid = false;
	$scope.showOwnerMenu = false;
	$scope.showDelivererMenu = false;
	$scope.username = '';

	$scope.directToLoginPage = function(){
		//direct to login page
		$location.path('/login').replace();
	};

	$scope.onUserChangeHandler = function(){
		$scope.isUserValid = userService.isUserValid();
		$scope.username = userService.user.username;
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

	$scope.confirmationPop = function(){
		var custName = "lalalal";
		var modalOptions = {
			closeButtonText: 'Cancel',
			actionButtonText: 'Delete Customer',
			headerText: 'Delete ' + custName + '?',
			bodyText: 'Are you sure you want to delete this customer?'
		};

		confirmationDialogService.show({}, modalOptions).then(function (result) {
			alert("Deleted!");
			// dataService.deleteCustomer($scope.customer.id).then(function () {
			// 	$location.path('/customers');
			// }, processError);
		});
	};

});