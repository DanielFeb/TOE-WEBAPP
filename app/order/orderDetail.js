/**
 * Created by Daniel on 2016/4/18.
 */
'use strict';

angular.module('order.orderDetail', [])
.controller('orderDetailCtrl',['$scope','BASIC_EVENTS',function($scope,BASIC_EVENTS){
    $scope.readOnly = true;
    $scope.orderDetail = {
        orderId:0,
        createTime:'',
        status:'',
        description:'初始描述',
        payment:0,
        orgAddress:{
            addressId:0,
            calledName:'',
            phoneNo:'',
            addressDesc:'',
            longitude:0,
            latitude:0
        },
        destAddress:{
            addressId:0,
            calledName:'',
            phoneNo:'',
            addressDesc:'',
            longitude:0,
            latitude:0
        }
    };
    $scope.$on(BASIC_EVENTS.load,function(event,initData){
        $scope.orderDetail = initData;
    });
}]);
