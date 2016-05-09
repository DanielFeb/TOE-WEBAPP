/**
 * Created by Administrator on 2016/3/19.
 */

'use strict';

angular.module('myApp.orderHistory', ['ngRoute','tm.pagination','order.orderDetail'])
.controller('orderHistoryCtrl', ['$scope', '$location', 'userService', 'orderService', 'BASIC_EVENTS','authService',
    function($scope,$location,userService,orderService,BASIC_EVENTS,authService) {
    $scope.pageName = 'orderHistory';
    if(!authService.checkAuthorizationToLoad($scope.pageName)){
        return;
    }

    //配置分页基本参数
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 20,
        totalItems: 0
    };

    $scope.currentOrder = null;

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

    $scope.load = function(){
        $scope.reload();
    };

    $scope.bottomReached = function(){
    };

    $scope.select = function(item){
        $scope.currentOrder = item;
    };

    $scope.$on(BASIC_EVENTS.REQUEST_LOAD_DATA,function(event){
        $scope.$broadcast(BASIC_EVENTS.RESPONSE_LOAD_DATA, $scope.currentOrder)
    });

    $scope.showAddBtn = function(){
        return userService.isUserOwner();
    };
    $scope.load();
}]);
