'use strict';

angular.module('myApp.order', ['ngRoute'])
.controller('orderCtrl',function($scope,$location,addressService,orderService,authService,confirmationDialogService,SharedState) {

    $scope.pageName = 'order';
    if(!authService.checkAuthorizationToLoad($scope.pageName)){
        return;
    }

    $scope.orgAddresses = null;
    addressService.fetchOrgAddresses()
        .success(function(res){
            $scope.orgAddresses = res;
            if($scope.orgAddresses.length == 0){
                confirmationDialogService.showModal({bodyText: "您需要先完善个人地址，帮您跳转到地址管理界面！" });
                $location.path("/addressInfo").replace();
            }
        });
    $scope.itemTypes = null;
    orderService.getItemTypes()
        .success(function(res){
            $scope.itemTypes = res;
        });
    $scope.orderInfo = null;
    $scope.addOrder = function(){
        orderService.addOrder($scope.orderInfo)
            .success(function(){
                $location.path('/orderHistory').replace();
            });
    };
    $scope.clear = function(){
        $scope.orderInfo = null;
    };
    $scope.localSearchResults = [];

    // Baidu map functions
    $scope.map = new BMap.Map("map");
    $scope.map.centerAndZoom("上海",18);
    $scope.map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));

    $scope.localSearchOptions = {
        onSearchComplete: function(results){
            // 判断状态是否正确
            if ($scope.local.getStatus() == BMAP_STATUS_SUCCESS){
                $scope.localSearchResults = [];
                for (var i = 0; i < results.getCurrentNumPois(); i ++){
                    $scope.localSearchResults.push(results.getPoi(i));
                }
                SharedState.turnOn("addressSearchDropDown");
            }
        }
    };
    $scope.local = new BMap.LocalSearch($scope.map, $scope.localSearchOptions);

    $scope.searchAddress = function(){
        $scope.local.search($scope.orderInfo.destAddress.addressDesc);
    };

    $scope.selectResult = function(mapPoint){
        $scope.orderInfo.destAddress.addressDesc = mapPoint.title;
        $scope.orderInfo.destAddress.latitude = mapPoint.point.lat;
        $scope.orderInfo.destAddress.longitude = mapPoint.point.lng;

        $scope.markPoint(mapPoint.point);
    };

    $scope.markPoint = function(point){
        if($scope.marker){
            $scope.map.removeOverlay($scope.marker);
        }
        $scope.marker = new BMap.Marker(point);
        $scope.map.addOverlay($scope.marker);
        $scope.map.setCenter(point);
        $scope.map.setZoom(16);
    };
});