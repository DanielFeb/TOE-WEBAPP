/**
 * Created by Daniel on 2016/4/10.
 */
'use strict';

/* orderService */

angular.module('myApp.orderService', [])
.service('orderService', function (serviceExecutor){
    this.statusCode = {
        NEW:0,
        ASSIGNED:1,
        FINISHED:2,
        DELETED:10
    };
    this.codeConvert = function(statusCode){
        switch(statusCode){
            case 0:
                return '新订单';
            case 1:
                return '已接单';
            case 2:
                return '已完成';
            default:
                return '已取消';
        }
    };
    this.assignOrder = function(order){
        return serviceExecutor.executeHttpRequest({
            url:'order/assignment',
            data:order,
            method:'POST'
        });
    };
    this.closeOrder = function(order){
        return serviceExecutor.executeHttpRequest({
            url:'order/achievement',
            data:order,
            method:'POST'
        });
    };
    this.deleteOrder = function(order){
        return serviceExecutor.executeHttpRequest({
            url:'order/'+order.orderId,
            method:'DELETE'
        });
    };
    this.getOrderNearby = function(postData){
        return serviceExecutor.executeHttpRequestNoSuccessInfo({
            url:'order/nearby',
            method:'POST',
            data:postData
        });
    };
    this.getOrderHistory = function (postData) {
        return serviceExecutor.executeHttpRequestNoSuccessInfo({
            url:'order/history',
            method:'POST',
            data:postData
        });
    };
    this.addOrder = function(order){
        return serviceExecutor.executeHttpRequest({
            url:'order',
            method:'POST',
            data:{
                "description":order.description,
                "orgAddressId":order.orgAddress.addressId,
                "newDestAddress":order.newDestAddress,
                "destAddressId":order.destAddress.addressId,
                "destAddress":order.destAddress
            }
        })
    };
});
