/**
 * Created by Daniel on 2016/4/18.
 */
'use strict';

angular.module("address.addressDetail",[])
.controller("addressDetailCtrl",['$scope','BASIC_EVENTS',function($scope,BASIC_EVENTS){
    $scope.addressDetail = {
        addressId:0,
        calledName:'',
        phoneNo:'',
        addressDesc:'',
        longitude:0,
        latitude:0
    };
    $scope.save = function(){
        saveCallback(addressDetail);
    };
    $scope.$on(BASIC_EVENTS.load,function(event,initData){
        $scope.addressDetail = initData.address;
        $scope.saveCallback = initData.saveFunc;
    });
    $scope.loadMap = function() {
        function G(id) {
            return document.getElementById(id);
        }

        var map = new BMap.Map("map");
        map.centerAndZoom("上海", 12);                   // 初始化地图,设置城市和地图级别。

        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
            {
                "input": "searchKeyInput"
                , "location": map
            });
        ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
            var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            G("searchResultPanel").innerHTML = str;
        });

        var myValue;
        ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
            G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
            setPlace();
        });

        function setPlace() {
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun() {
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                map.centerAndZoom(pp, 18);
                map.addOverlay(new BMap.Marker(pp));    //添加标注
            }

            var local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
            });
            local.search(myValue);
        }
    };
}]);