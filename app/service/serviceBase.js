/**
 * Created by Daniel on 2016/5/5.
 */
'use strict';

angular.module('myApp.serviceBase',[])
.service('serviceExecutor',function($http,confirmationDialogService){
    this.urlHeader = 'http://localhost:7777/';
    this.executeHttpRequestBase = function(httpOptions,infoOptions){
        return $http({
            url:this.urlHeader + httpOptions.url,
            method: httpOptions.method,
            data:httpOptions.data
        }).success(function(){
            if(infoOptions.showSuccessInfo){
                if(infoOptions.successInfo){
                    confirmationDialogService.showModal({bodyText:infoOptions.successInfo});
                } else {
                    confirmationDialogService.showModal({bodyText:"成功！"});
                }
            }
        }).error(function(res) {
            if(infoOptions.showFailedInfo) {
                if(infoOptions.errorInfo){
                    confirmationDialogService.showModal({bodyText:infoOptions.errorInfo});
                } else {
                    confirmationDialogService.showModal({bodyText: "失败：" + res.message});
                }
            }
        });
    };
    this.executeHttpRequest = function(httpOptions,successInfo,errorInfo){
        return this.executeHttpRequestBase(
            httpOptions,
            {
                showSuccessInfo:true,
                showFailedInfo:true,
                successInfo:successInfo,
                errorInfo:errorInfo
            }
        );
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