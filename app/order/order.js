'use strict';

angular.module('myApp.order', ['ngRoute'])
.controller('orderCtrl', ["$scope","$location","addressService","orderService",function($scope,$location,addressService,orderService) {
    $scope.orgAddresses = null;
    addressService.fetchOrgAddresses()
        .success(function(res){
            $scope.orgAddresses = addressService.orgAddresses;
            if($scope.orgAddresses.length == 0){
                alert("请先创建一个起始地址");
                $location.path("/addressInfo").replace();
            }
        }).error(function(res){
            alert("获取源地址失败：" + res.message);
        });

    $scope.orderInfo = {
        description:'',
        payment:'',
        orgAddress:null,
        newDestAddress:true,
        destAddress:{
            addressId:0,
            calledName:'',
            phoneNo:'',
            addressDesc:'',
            longitude:0,
            latitude:0
        }
    };
    $scope.addOrder = function(order){
        orderService.addOrder(order)
            .success(function(){
                $location.path('/orderHistory').replace();
            }).error(function(res){
                alert("创建失败：" + res.message);
            });
    };
}]);