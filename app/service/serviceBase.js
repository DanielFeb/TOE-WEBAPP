/**
 * Created by Daniel on 2016/5/5.
 */
'use strict';

angular.module('myApp.serviceBase',[])
.service('serviceExecutor',function($http,confirmationDialogService){
    this.urlHeader = 'http://192.168.1.11:7777/';
    this.executeHttpRequestBase = function(httpOptions,infoOptions){
        return $http({
            url:this.urlHeader + httpOptions.url,
            method: httpOptions.method,
            data:httpOptions.data
        }).success(function(){
            if(infoOptions.showSuccessInfo){
                confirmationDialogService.showModal({bodyText:"成功！"});
            }
        }).error(function(res) {
            if(infoOptions.showFailedInfo) {
                confirmationDialogService.showModal({bodyText: "失败：" + res.message});
            }
        });
    };
    this.executeHttpRequest = function(httpOptions){
        return this.executeHttpRequestBase(httpOptions,{showSuccessInfo:true,showFailedInfo:true});
    };
    this.executeHttpRequestNoSuccessInfo = function(httpOptions){
        return this.executeHttpRequestBase(httpOptions,{showSuccessInfo:false,showFailedInfo:true});
    };
    this.executeHttpRequestNoFailedInfo = function(httpOptions){
        return this.executeHttpRequestBase(httpOptions,{showSuccessInfo:true,showFailedInfo:false});
    };
    this.executeHttpRequestNoInfo = function(httpOptions){
        return this.executeHttpRequestBase(httpOptions,{showSuccessInfo:false,showFailedInfo:false});
    };
});