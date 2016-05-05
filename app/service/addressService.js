/**
 * Created by Daniel on 2016/4/9.
 */
'use strict';

/* addressService */

angular.module('myApp.addressService', [])
.service('addressService', function (serviceExecutor,confirmationDialogService){
    this.maxAddressCount = 5;

    this.orgAddresses = [];
    this.destAddresses = [];

    this.deleteAddress = function(address){
        return serviceExecutor.executeHttpRequest({
            url:'user/address/' + address.addressId,
            method:'DELETE'
        });
    };

    this.modifyAddress = function(address){
        return serviceExecutor.executeHttpRequest({
            url:'user/address',
            method:'PUT',
            data:address
        });
    };
    this.addAddress = function(address){
        if(this.maxAddressCount > this.orgAddresses.length){
            return  serviceExecutor.executeHttpRequest({
                url:'user/address',
                method:'POST',
                data:address
            });
        }else{
            confirmationDialogService.showModal({bodyText: "默认地址最多有" + maxAddressCount+"个！" });
        }
    };
    this.fetchOrgAddresses = function(){
        var localThis = this;
        return serviceExecutor.executeHttpRequestNoSuccessInfo({
            url:'user/addresses/org',
            method:'GET'
        }).success(function(res){
            localThis.orgAddresses = res;
        });
    };
    this.fetchDestAddresses = function(){
        var localThis = this;
        return serviceExecutor.executeHttpRequestNoSuccessInfo({
            url: 'user/addresses/dest',
            method:'GET'
        }).success(function(res){
            localThis.destAddresses = res;
        });
    };
    this.isOrgAddressesFull = function(){
        return this.orgAddresses.length >= this.maxAddressCount;
    }
});