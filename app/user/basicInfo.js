/**
 * Created by Administrator on 2016/4/10.
 */

'useStrict'

angular.module('myApp.basicInfo', ['ngRoute'])
    .controller('basicInfoCtrl', ['$scope','$http','userService',function($scope,$http,userService) {
        var userInfo = userService.user;
        $scope.selfInfo = {
            calledName:'',
            credit:'',
            money:''
        }
        $scope.selfInfo.calledName = userInfo.username;
        $scope.selfInfo.credit = userInfo.credit;
        $scope.selfInfo.money = userInfo.money;
        $scope.changePassword = function(changInfo){
            userService.changeUserPassword(changInfo);
        }
    }]);