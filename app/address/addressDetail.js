/**
 * Created by Daniel on 2016/4/18.
 */
'use strict';

angular.module("address.addressDetail",[])
.controller("addressDetailCtrl",function($scope,BASIC_EVENTS,addressService,confirmationDialogService,SharedState){
    $scope.addressDetail = {
        addressId:0,
        calledName:'',
        phoneNo:'',
        addressDesc:'',
        longitude:0,
        latitude:0
    };
    $scope.isOldAddress =  false;

    $scope.localSearchResults = [];

    $scope.currentMapPoint = null;

    // Baidu map functions
    $scope.map = new BMap.Map("map");
    $scope.map.centerAndZoom("上海",18);
    $scope.map.disableDragging();   // disable the dragging
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
        $scope.local.search($scope.addressDetail.addressDesc);
    };

    $scope.selectResult = function(mapPoint){
        $scope.currentMapPoint = mapPoint;
        $scope.addressDetail.addressDesc = mapPoint.title;
        $scope.addressDetail.latitude = mapPoint.point.lat;
        $scope.addressDetail.longitude = mapPoint.point.lng;

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

    $scope.$on(BASIC_EVENTS.RESPONSE_LOAD_DATA,function(event,initData){
        $scope.addressDetail = initData;
        if($scope.addressDetail != undefined && $scope.addressDetail.addressId != undefined && $scope.addressDetail.addressId > 0){
            $scope.isOldAddress = true;
            setTimeout(function(){
                $scope.markPoint(new BMap.Point($scope.addressDetail.longitude,$scope.addressDetail.latitude));
            },500);

        } else {
            $scope.isOldAddress = false;
        }
    });
    $scope.$emit(BASIC_EVENTS.REQUEST_LOAD_DATA);


    $scope.modifyAddress = function(){
        addressService.modifyAddress($scope.addressDetail)
            .success(function(){
                SharedState.turnOff('addressDetailModal');
            }).then(function(){
                $scope.reLoad();
            });
    };
    $scope.addAddress = function(){
        addressService.addAddress($scope.addressDetail)
            .success(function(){
                SharedState.turnOff('addressDetailModal');
            }).then(function(){
                $scope.reLoad();
            });
    };
    $scope.deleteAddress = function(){
        var modalOptions = {
            closeButtonText: '取消',
            actionButtonText: '删除',
            headerText: '删除地址？',
            bodyText: '是否要删除地址：'+  $scope.addressDetail.addressDesc  +'？',
            modalType:confirmationDialogService.modalTypes.CONFIRM_MODAL
        };
        confirmationDialogService.showModal(modalOptions).then(function (result) {
            addressService.deleteAddress($scope.addressDetail)
                .success(function(){
                    SharedState.turnOff('addressDetailModal');
                }).then(function(){
                    $scope.reLoad();
                });
        });
    };
});