'use strict';

angular.module('myApp.register', ['ngRoute'])
.controller('registerCtrl', ['$scope','$location','AUTH_EVENTS','userService','authService',
        function($scope,$location,AUTH_EVENTS,userService,authService) {
    $scope.roleList=authService.ROLES;
    $scope.register = function(registerInfo){
        userService.register(registerInfo.username,registerInfo.password,registerInfo.currentRole.role)
        .success(function(){
            userService.fetchUserInfo(registerInfo.username, registerInfo.password)
                .success(function() {
                    if (userService.isUserValid()) {
                        if (userService.user.role === 'ROLE_OWNER') {
                            $location.path('/addressInfo').replace();
                            //if($scope.$$phase) $scope.$apply();
                        } else if (userService.user.role === 'ROLE_DELIVERER') {
                            $location.path('/deliveryOrder').replace();
                        }
                        $scope.$emit(AUTH_EVENTS.loginSuccess);
                    }
                });
        });
    }
}]);