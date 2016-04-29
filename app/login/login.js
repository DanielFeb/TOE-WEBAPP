'use strict';

angular.module('myApp.login', ['ngRoute'])
.controller('loginCtrl', ['$scope','$location','userService','AUTH_EVENTS',function($scope,$location,userService,AUTH_EVENTS) {
    $scope.directToRegisterPage = function(){
        $location.path('/register').replace();
    };
    $scope.login = function(loginInfo) {
        var username = loginInfo.username;
        var password = loginInfo.password;

        userService.fetchUserInfo(username, password)
            .success(function() {
                if (userService.isUserValid()) {
                    if (userService.user.username === username && userService.user.role === 'ROLE_OWNER') {
                        $location.path('/order').replace()
                    } else if (userService.user.username === username && userService.user.role === 'ROLE_DELIVERER') {
                        $location.path('/orderNearby').replace();
                    }
                    $scope.$emit(AUTH_EVENTS.loginSuccess);
                }
            }).error(function(res){
                alert("登录失败！" + res.message);
            });
    };
}]);
