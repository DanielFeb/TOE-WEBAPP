/**
 * Created by Daniel on 2016/4/9.
 */

'use strict';

angular.module('myApp.addressInfo', ['ngRoute','address.addressDetail'])
    .controller('addressInfoCtrl', ['$scope','$location','BASIC_EVENTS','addressService',function($scope,$location,BASIC_EVENTS,addressService) {
        //main window
        $scope.addressInfo = [];
        $scope.showAddRow = true;

        $scope.modifyAddress = function(address){
            $scope.$broadcast(BASIC_EVENTS.load,{
                address:address,
                saveFunc: function(address){
                    addressService.modifyAddress(address)
                        .success(function(){
                            $scope.reLoad();
                            alert('修改成功！')
                        }).error(function(res){
                            $scope.reLoad();
                            alert('修改失败:'+ res.message);
                        });
                }
            });
        };
        $scope.addAddress = function(address){
            $scope.$broadcast(BASIC_EVENTS.load,{
                address:address,
                saveFunc: function(address){
                    addressService.addAddress(address)
                        .success(function(){
                            $scope.reLoad();
                            alert('新增成功！')
                        }).error(function(res){
                            $scope.reLoad();
                            alert('新增失败:'+ res.message);
                        });
                }
            });
        };
        $scope.deleteAddress = function(address){
            addressService.deleteAddress(address)
                .success(function(){
                    $scope.reLoad();
                    alert('删除成功！')
                }).error(function(res){
                    $scope.reLoad();
                    alert('删除失败:'+ res.message);
                });
        };

        //pageload
        $scope.reLoad = function(){
            addressService.fetchOrgAddresses()
                .success(
                    function(){
                        $scope.addressInfo = addressService.orgAddresses;
                        $scope.showAddRow  = !addressService.isOrgAddressesFull();
                    }
                ).error(function(res){
                    alert("获取源地址失败：" + res.message);
                })
        };
        $scope.reLoad();

    }]);