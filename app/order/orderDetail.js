/**
 * Created by Daniel on 2016/4/18.
 */
'use strict';

angular.module('order.orderDetail', [])
.controller('orderDetailCtrl',function($scope,BASIC_EVENTS,orderService,userService,confirmationDialogService,SharedState){
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
        var modalOptions = {
            closeButtonText: '取消',
            actionButtonText: '确定',
            headerText: '删除订单？',
            bodyText: '是否要删除订单：'+  $scope.orderDetail.orderId + '-' + $scope.orderDetail.description +'？',
            modalType:confirmationDialogService.modalTypes.CONFIRM_MODAL
        };

        confirmationDialogService.showModal(modalOptions).then(function (result) {
            orderService.deleteOrder($scope.orderDetail)
                .success(function(){
                    SharedState.turnOff('orderDetailModal');
                }).then(function(){
                    $scope.reload();
                });
        });
    };

    $scope.finishOrder = function(){
        orderService.closeOrder($scope.orderDetail)
            .success(function(){
                SharedState.turnOff('orderDetailModal');
            }).then(function(){
                $scope.reload();
            });
    };

    $scope.assignOrder = function (){
        orderService.assignOrder($scope.orderDetail)
            .success(function(){
                SharedState.turnOff('orderDetailModal');
            }).then(function(){
                $scope.reload();
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
});
