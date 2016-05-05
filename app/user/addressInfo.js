/**
 * Created by Daniel on 2016/4/9.
 */

'use strict';

angular.module('myApp.addressInfo', ['ngRoute','address.addressDetail'])
.controller('addressInfoCtrl', ['$scope','$location','BASIC_EVENTS','addressService','authService',
    function($scope,$location,BASIC_EVENTS,addressService,authService) {
    $scope.pageName = 'addressInfo';
    if(!authService.checkAuthorizationToLoad($scope.pageName)){
        return;
    }
    $scope.currentAddress = null;

    $scope.orgAddresses = [];

    $scope.$on(BASIC_EVENTS.REQUEST_LOAD_DATA,function(event){
        $scope.$broadcast(BASIC_EVENTS.RESPONSE_LOAD_DATA, $scope.currentAddress)
    });

    $scope.select = function(address){
        $scope.currentAddress = address;
    };

    //pageload
    $scope.reLoad = function(){
        addressService.fetchOrgAddresses()
            .success(
                function(){
                    $scope.orgAddresses = addressService.orgAddresses;
                    $scope.showAddBtn  = !addressService.isOrgAddressesFull();
                }
            );
    };
    $scope.reLoad();

}]);