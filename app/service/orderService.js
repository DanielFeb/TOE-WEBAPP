/**
 * Created by Daniel on 2016/4/10.
 */
'use strict';

/* orderService */

var services = angular.module('myApp.orderService', []).
    value('version', '1.0');

services.service('orderService', ['$http','urlHeader',function ($http, urlHeader) {
    this.assignOrder = function(order){
        return $http({
            url:urlHeader+'order/assignment',
            data:order,
            method:'POST'
        });
    };
    this.closeOrder = function(order){
        return $http({
            url:urlHeader+'order/achievement',
            data:order,
            method:'POST',
        });
    };
    this.deleteOrder = function(order){
        return $http({
            url:urlHeader+'order/'+order.orderId,
            method:'DELETE',
        });
    };
    this.getOrderNearby = function(postData){
        return $http({
            url:urlHeader+'order/nearby',
            method:'POST',
            data:postData
        });
    };
    this.getOrderHistory = function (postData) {
        return $http({
            url:urlHeader+'order/history',
            method:'POST',
            data:postData
        });
    };
    this.addOrder = function(order){
        return $http({
            url:urlHeader+'order',
            method:'POST',
            data:{
                "description":order.description,
                "orgAddressId":order.orgAddress.addressId,
                "newDestAddress":order.newDestAddress,
                "destAddressId":order.destAddress.addressId,
                "destAddress":order.destAddress
            }
        })
    }
}]);
