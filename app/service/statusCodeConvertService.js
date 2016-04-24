/**
 * Created by Administrator on 2016/4/9.
 */

'use strict';

/* userService */

var services = angular.module('myApp.statusCodeConvertService', []).
    value('version', '1.0');

services.service('statusCodeConvertService', [function () {
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
    }

}]);