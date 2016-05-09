'use strict';

angular.module('myApp.order', ['ngRoute'])
.controller('orderCtrl',function($scope,$location,addressService,orderService,authService,confirmationDialogService ) {

    $scope.pageName = 'order';
    if(!authService.checkAuthorizationToLoad($scope.pageName)){
        return;
    }

    $scope.orgAddresses = null;
    addressService.fetchOrgAddresses()
        .success(function(res){
            $scope.orgAddresses = addressService.orgAddresses;
            if($scope.orgAddresses.length == 0){
                confirmationDialogService.showModal({bodyText: "您需要先完善个人地址，帮您跳转到地址管理界面！" });
                $location.path("/addressInfo").replace();
            }
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
    $scope.addOrder = function(){
        orderService.addOrder($scope.orderInfo)
            .success(function(){
                $location.path('/orderHistory').replace();
            });
    };
    $scope.clear = function(){
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
    };
});