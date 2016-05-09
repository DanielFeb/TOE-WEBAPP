/**
 * Created by Administrator on 2016/3/5.
 */
'use strict';

/* userService */
angular.module('myApp.userService', [])
.service('userService', function ($http,serviceExecutor){
    this.user = {
        userId:0,
        username:'',
        password:'',
        money:0,
        credit:0,
        role:''
    };
    this.clear = function(){
        this.user.userId = 0;
        this.user.username = '';
        this.user.password = '';
        this.user.money = 0;
        this.user.credit = 0;
        this.user.role = '';
    };

    this.assignUserBasicInfo = function(data){
        this.user.userId = data.userId;
        this.user.username = data.username;
        this.user.password = data.password;
        this.user.money = data.money;
        this.user.credit = data.credit;
        this.user.role = data.role;
    };
    this.register = function(username,password,role){
        return serviceExecutor.executeHttpRequest({
            url:'signup',
            method:'POST',
            data:{
                "username":username,
                "password":password,
                "role":role
            }
        });
    };
    this.fetchUserInfo = function(username,password){
        var localThis = this;
        $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa(username + ':' + password);
        return serviceExecutor.executeHttpRequestNoSuccessInfo({
            url: 'user',
            method: 'GET'
        }).success(function (res){
            localThis.assignUserBasicInfo(res);
        }).error(function(){
            $http.defaults.headers.common['Authorization'] = '';
        });
    };

    this.changeUserPassword = function(changInfo){
        return serviceExecutor.executeHttpRequest({
            url:'user/password',
            data:{
                oldPassword:changInfo.oldPassword,
                newPassword:changInfo.newPassword
            },
            method:'PUT'
        });
    };

    this.isUserValid = function(){
       return this.user.userId != 0;
    };

    this.logout = function(){
        $http.defaults.headers.common['Authorization'] = '';
        this.clear();
    };
    this.isUserOwner = function(){
        return this.user.role == 'ROLE_OWNER';
    };
    this.isUserDeliverer = function(){
        return this.user.role == 'ROLE_DELIVERER';
    };
});