/**
 * Created by Daniel on 2016/5/5.
 */
'use strict';

angular.module('myApp.serviceBase',[])
.service('serviceExecutor',function($http,confirmationDialogService){
    this.urlHeader = 'http://192.168.1.9:7777/';
     this.executeHttpRequest = function(httpOptions){
         return $http({
             url:this.urlHeader + httpOptions.url,
             method: httpOptions.method,
             data:httpOptions.data
         }).success(function(){
             confirmationDialogService.showModal({bodyText:"成功！"});
         }).error(function(res) {
             confirmationDialogService.showModal({bodyText:"失败：" + res.message});
         });;
     }
});