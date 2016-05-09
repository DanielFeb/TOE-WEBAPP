/**
 * Created by Administrator on 2016/4/10.
 */

'use Strict'

angular.module('myApp.basicInfo', ['ngRoute'])
.controller('basicInfoCtrl', ['$scope','$http','userService','authService',function($scope,$http,userService,authService) {
    $scope.pageName = 'basicInfo';
    if(!authService.checkAuthorizationToLoad($scope.pageName)){
        return;
    }
    var userInfo = userService.user;
    $scope.selfInfo = {
        calledName:'',
        credit:'',
        money:''
    };
    $scope.selfInfo.calledName = userInfo.username;
    $scope.selfInfo.credit = userInfo.credit;
    $scope.selfInfo.money = userInfo.money;
    $scope.changePassword = function(changInfo){
        userService.changeUserPassword(changInfo);
    }
}]);