/**
 * Created by Administrator on 2016/3/25.
 */
'use strict';
//.constant("requestUrl","mockdata/tickeHistory.json")
angular.module('myApp.orderNearby', ['ngRoute'])
.controller('orderNearbyCtrl', ['$scope', '$location', 'orderService', 'BASIC_EVENTS','authService',
    function($scope,$location,orderService,BASIC_EVENTS,authService) {
    $scope.pageName = 'orderNearby';
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

    $scope.getOrderNearByPage = function () {
        var postData = {
            pageNo: $scope.paginationConf.currentPage,
            countPerPage: $scope.paginationConf.itemsPerPage,
            centerPoint:{
                longitude:0.0,
                latitude:0.0
            }
        };
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                postData.centerPoint.longitude = r.point.lng;
                postData.centerPoint.latitude = r.point.lat;
                alert('您的位置：'+r.point.lng+','+r.point.lat);
                orderService.getOrderNearby(postData).success(function (response) {
                    $scope.paginationConf.totalItems = response.ordersCount;
                    $scope.orders = response.orders;
                });
            }
            else {
                alert('failed'+this.getStatus());
            }
        },{enableHighAccuracy: true})
    };
    $scope.reload = function(){
        $scope.getOrderNearByPage();
    };

    $scope.load = function(){
        $scope.reload();
    };

    $scope.bottomReached = function(){;
    };

    $scope.select = function(item){
        $scope.currentOrder = item;
    };

    $scope.$on(BASIC_EVENTS.REQUEST_LOAD_DATA,function(event){
        $scope.$broadcast(BASIC_EVENTS.RESPONSE_LOAD_DATA, $scope.currentOrder)
    });

    $scope.showAddBtn = function(item){
        return userService.isUserOwner();
    };

    $scope.load();

}]);