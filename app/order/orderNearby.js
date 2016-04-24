/**
 * Created by Administrator on 2016/3/25.
 */
'use strict';
//.constant("requestUrl","mockdata/tickeHistory.json")
angular.module('myApp.orderNearby', ['ngRoute'])
.controller('orderNearbyCtrl',
    ['$scope',
        '$location',
        'orderService',
        'statusCodeConvertService',
        'BASIC_EVENTS',
        function($scope,$location,orderService,statusCodeConvertService,BASIC_EVENTS) {
    $scope.orderInfo ={
        description:''
    };
    $scope.getOrderNearByPage = function () {

        var postData = {
            pageNo: $scope.paginationConf.currentPage,
            countPerPage: $scope.paginationConf.itemsPerPage
        };

        orderService.getOrderNearby(postData).success(function (response) {
            $scope.paginationConf.totalItems = response.ordersCount;
            $scope.orders = response.orders;
        });
    };
    $scope.reload = function(){
        $scope.getOrderNearByPage();
    };

    //配置分页基本参数
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5
    };
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage',  $scope.getOrderNearByPage);


    $scope.checkOrder = function(item){
        $scope.$broadcast(BASIC_EVENTS.load,item);
    };

    $scope.assignOrder = function (item){
        orderService.assignOrder(item)
            .success(function(){
                $scope.reload();
                alert("接单成功");
            })
    };
    $scope.status = function(item){
        return statusCodeConvertService.codeConvert(item.status);
    };

    $scope.initialDestination = function(item){
        return item.orgAddress.addressDesc;
    };

    $scope.aimDestination = function(item){
        return item.destAddress.addressDesc;
    };

    $scope.startTime = function(item){
        var newDate = new Date();
        newDate.setTime(item.createTime );
        return  newDate.toLocaleString();
    };
}]);