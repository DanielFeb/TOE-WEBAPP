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

    $scope.$on(BASIC_EVENTS.RESPONSE_LOAD_DATA,function(event,initData){
        $scope.addressDetail = initData;
        if($scope.addressDetail != undefined && $scope.addressDetail.addressId != undefined && $scope.addressDetail.addressId > 0){
            $scope.isOldAddress = true;
        } else {
            $scope.isOldAddress = false;
        }
    });
    $scope.$emit(BASIC_EVENTS.REQUEST_LOAD_DATA);


    $scope.modifyAddress = function(){
        addressService.modifyAddress($scope.addressDetail)
            .success(function(){
                $scope.reLoad();
                alert('修改成功！')
            }).error(function(res){
                $scope.reLoad();
                alert('修改失败:'+ res.message);
            });
    };
    $scope.addAddress = function(){
        addressService.addAddress($scope.addressDetail).then(function(){
            $scope.reLoad();
        });
            //.success(function(){
            //    $scope.reLoad();
            //    alert('新增成功！')
            //}).error(function(res){
            //    $scope.reLoad();
            //    alert('新增失败:'+ res.message);
            //});
    };
    $scope.deleteAddress = function(){
        var custName = "lalalal";
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
                    $scope.reLoad();
                    alert('删除成功！')
                }).error(function(res){
                    $scope.reLoad();
                    alert('删除失败:'+ res.message);
                });
            SharedState.turnOff('addressDetailModal');
        });
    };
});