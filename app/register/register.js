'use strict';

angular.module('myApp.register', ['ngRoute'])
.controller('registerCtrl', ['$scope','$location','AUTH_EVENTS','userService',function($scope,$location,AUTH_EVENTS,userService) {
    $scope.roleList=[
    {
      "roleName":"ROLE_OWNER"
    },{
      "roleName":"ROLE_DELIVERER"
    }
    ];
    $scope.register = function(registerInfo){
        userService.register(registerInfo.username,registerInfo.password,registerInfo.currentRole.roleName)
        .success(function(){
            alert('注册成功！');
            userService.fetchUserInfo(registerInfo.username, registerInfo.password)
                .success(function() {
                    if (userService.isUserValid()) {
                        if (userService.user.role === 'ROLE_OWNER') {
                            $location.path('/order').replace();
                            //if($scope.$$phase) $scope.$apply();
                        } else if (userService.user.role === 'ROLE_DELIVERER') {
                            $location.path('/deliveryOrder').replace();
                        }
                        $scope.$emit(AUTH_EVENTS.loginSuccess);
                    }
                }).error(function(res){
                    alert("登录失败！" + res.message);
                });
        }).error(function(res){
            alert('注册失败：'+ res.message);
        })
    }
}]);