var app = angular.module('WebAppDemo',[
	'ngRoute',
	'mobile-angular-ui',
	'mobile-angular-ui.gestures'
	]);
app.run(function($transform) {
  window.$transform = $transform;
});

app.config(function($routeProvider) {
	$routeProvider.when('/',              {templateUrl: 'home.html', reloadOnSearch: false});
	$routeProvider.when('/scroll',        {templateUrl: 'scroll.html', reloadOnSearch: false}); 
	$routeProvider.when('/toggle',        {templateUrl: 'toggle.html', reloadOnSearch: false}); 
	$routeProvider.when('/tabs',          {templateUrl: 'tabs.html', reloadOnSearch: false}); 
	$routeProvider.when('/accordion',     {templateUrl: 'accordion.html', reloadOnSearch: false}); 
	$routeProvider.when('/overlay',       {templateUrl: 'overlay.html', reloadOnSearch: false}); 
	$routeProvider.when('/forms',         {templateUrl: 'forms.html', reloadOnSearch: false});
	$routeProvider.when('/dropdown',      {templateUrl: 'dropdown.html', reloadOnSearch: false});
	$routeProvider.when('/touch',         {templateUrl: 'touch.html', reloadOnSearch: false});
	$routeProvider.when('/swipe',         {templateUrl: 'swipe.html', reloadOnSearch: false});
	$routeProvider.when('/drag',          {templateUrl: 'drag.html', reloadOnSearch: false});
	$routeProvider.when('/drag2',         {templateUrl: 'drag2.html', reloadOnSearch: false});
	$routeProvider.when('/carousel',      {templateUrl: 'carousel.html', reloadOnSearch: false});
});

//
// For this trivial demo we have just a unique MainController 
// for everything
//
app.controller('MainController', function($rootScope, $scope){

	var scrollItems = [];

	for (var i=1; i<=100; i++) {
	scrollItems.push('Item ' + i);
	}
	$scope.scrollItems = scrollItems;
});