/**
 * Created by Administrator on 2016/3/19.
 */

'use strict';
//.constant("requestUrl","mockdata/tickeHistory.json")
angular.module('myApp.orderHistory', ['ngRoute','tm.pagination','order.orderDetail'])
.controller('orderHistoryCtrl', [
    '$scope',
    '$location',
    'userService',
    'statusCodeConvertService',
    'orderService',
    'BASIC_EVENTS',
    function($scope,$location,userService,statusCodeConvertService,orderService,BASIC_EVENTS) {
    $scope.getOrderHistoryPage = function () {
        var postData = {
            pageNo: $scope.paginationConf.currentPage,
            countPerPage: $scope.paginationConf.itemsPerPage
        };
        orderService.getOrderHistory(postData).success(function (response) {
            $scope.paginationConf.totalItems = response.ordersCount;
            $scope.history = response.orders;
        });
    };
    $scope.reload = function(){
        $scope.getOrderHistoryPage();
    };

    //配置分页基本参数
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5
    };
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.getOrderHistoryPage);

    $scope.checkOrder = function(item){
        $scope.$broadcast(BASIC_EVENTS.load,item);
    };

    $scope.deleteOrder = function (item){
        orderService.deleteOrder(item)
            .success(function(){
                $scope.reload();
                alert("取消成功！");
            }).error(function(res) {
                alert("操作失败："+res.message);
            });
    };

    $scope.destination = function(item){
        return item.destAddress.addressDesc;
    };

    $scope.startTime = function(item){
        var newDate = new Date();
        newDate.setTime(item.createTime );
        return  newDate.toLocaleString();
   };

    $scope.finishOrder = function(item){
        orderService.closeOrder(item)
            .success(function(){
                $scope.reload();
                alert("订单完成！");
            }).error(function(res) {
                alert("操作失败："+res.message);
            });
    };

    $scope.status = function(item){
        return  statusCodeConvertService.codeConvert(item.status);
    };

    $scope.address =function(item){
        return item.orgAddress.addressDesc;
    };
    $scope.showFinishBtn = function(item){
        return userService.isUserDeliverer() && item.status == 1;
    }
}]);
