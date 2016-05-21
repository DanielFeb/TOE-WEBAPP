/**
 * Created by Daniel on 2016/4/30.
 */
angular.module("myApp.map",[])
.controller("mapCtrl",['$scope','BASIC_EVENTS','confirmationDialogService',function($scope,BASIC_EVENTS,confirmationDialogService) {
        $scope.map = new BMap.Map("map");
        $scope.map.centerAndZoom("上海",18);
        $scope.map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));
}]);