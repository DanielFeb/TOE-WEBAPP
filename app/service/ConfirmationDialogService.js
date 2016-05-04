/**
 * Created by Daniel on 2016/5/3.
 */
'use strict';

angular.module('myApp.confirmationDialogService',['ui.bootstrap'])
.service('confirmationDialogService', ['$modal', function ($modal) {
    this.modalTypes={
        INFO_MODAL:1,
        WANNING_MODAL:2,
        ERROR_MODAL:3,
        CONFIRM_MODAL:4,
    };

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: 'utilViews/confirmationDialog.html'
    };

    var modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Proceed?',
        bodyText: 'Perform this action?',
        modalType: this.modalTypes.CONFIRM_MODAL
    };

    this.showModal = function (customModalOptions) {
        var customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {};
        var tempModalOptions = {};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $modalInstance,confirmationDialogService) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.showActionBtn = $scope.modalOptions.modalType == confirmationDialogService.modalTypes.CONFIRM_MODAL;        
                $scope.modalOptions.ok = function (result) {
                    $modalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss('cancel');
                };
            }
        }

        return $modal.open(tempModalDefaults).result;
    };

}]);