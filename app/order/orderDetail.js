/**
 * Created by Daniel on 2016/4/18.
 */
'use strict';

angular.module('order.orderDetail', [])
.controller('orderDetailCtrl',['$scope','BASIC_EVENTS','orderService','userService',
    function($scope,BASIC_EVENTS,orderService,userService){
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
    $scope.deleteOrder = function (){
        orderService.deleteOrder($scope.orderDetail)
            .success(function(){
                $scope.reload();
                alert("取消成功！");
            }).error(function(res) {
                alert("操作失败："+res.message);
            });
    };

    $scope.finishOrder = function(){
        orderService.closeOrder($scope.orderDetail)
            .success(function(){
                $scope.reload();
                alert("订单完成！");
            }).error(function(res) {
                alert("操作失败："+res.message);
            });
    };

    $scope.assignOrder = function (){
        orderService.assignOrder($scope.orderDetail)
            .success(function(){
                $scope.reload();
                alert("接单成功");
            }).error(function(res) {
                alert("操作失败："+res.message);
            });
    };

    $scope.showFinishBtn = function(){
        return userService.isUserDeliverer() && $scope.orderDetail.status == orderService.statusCode.ASSIGNED;
    };

    $scope.showCancelBtn = function(){
        return userService.isUserOwner() && $scope.orderDetail.status == orderService.statusCode.NEW;
    };

    $scope.showAssignBtn = function(){
        return userService.isUserDeliverer() && $scope.orderDetail.status == orderService.statusCode.NEW;
    };

    $scope.destination = function(item){
        return item.destAddress.addressDesc;
    };

    $scope.startTime = function(item){
        var newDate = new Date();
        newDate.setTime(item.createTime );
        return  newDate.toLocaleString();
    };

    $scope.status = function(item){
        return  orderService.codeConvert(item.status);
    };

    $scope.address =function(item){
        return item.orgAddress.addressDesc;
    };

    $scope.$on(BASIC_EVENTS.RESPONSE_LOAD_DATA,function(event,initData){
        $scope.orderDetail = initData;
    });
    $scope.$emit(BASIC_EVENTS.REQUEST_LOAD_DATA);
}]);
