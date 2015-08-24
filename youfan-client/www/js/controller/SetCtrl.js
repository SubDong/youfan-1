/**
 * Created by ss on 2015/8/17.
 */
ControllerModule.controller('SetCtrl', function ($scope, $ionicModal, Order, REST_URL, $ionicPopup, $ionicBackdrop, $timeout) {

    $ionicModal.fromTemplateUrl('templates/opinion.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.Cache = function () {
        var myPopup = $ionicPopup.show({
            cssClass: 'zan_popup',
            template: "清除成功",
            scope: $scope
        });
        $ionicBackdrop.release();
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 1000);
    }
});