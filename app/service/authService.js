/**
 * Created by Daniel on 2016/4/29.
 */

'use strict';

angular.module("myApp.authService",[])
.service('authService',function ($location,userService,confirmationDialogService) {
    this.ROLES = [
        {
            role: 'ROLE_OWNER',
            roleName: '商铺'
        },
        {
            role: 'ROLE_DELIVERER',
            roleName: '送货员'
        }
    ];
    this.checkAuthorizationToLoad = function(pageName){
        var result = false;
        if(pageName == 'orderHistory' && userService.isUserValid()){
            result = true;
        }
        if(pageName == 'basicInfo' && userService.isUserValid()){
            result = true;
        }
        if(pageName == 'orderNearby' && userService.isUserValid()){
            result = userService.user.role === 'ROLE_DELIVERER'
        }
        if(pageName == 'order' && userService.isUserValid()){
            result = userService.user.role === 'ROLE_OWNER';
        }
        if(pageName == 'addressInfo' && userService.isUserValid()){
            result =  userService.user.role === 'ROLE_OWNER'
        }
        if(result == false){
            confirmationDialogService.showModal({bodyText: "您没有权限浏览该页面,帮您跳转到主页！" });
            $location.path("#/").replace();
        }
        return result;
    }
});