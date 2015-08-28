(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('overview', Overview);

    function Overview($scope, $filter,$state, $ionicPopup) {

        $scope.callPhone=function(){
            $window.location.href="http://my.oschina.net/u/1416844/blog/tel:10085";
        };



        $scope.goToDishes = function (path) {
            $state.go('dishes',{ 'path':path});
        }

        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: ' <ion-list> <ion-item  href="#/add_tables" ng-click=" myPopupclose()">三人小饭桌</ion-item> <ion-item href="#/add_table" ng-click=" myPopupclose()">五人小饭桌</ion-item></ion-list>',
                title: '<p class="calm">添加小饭桌</p>',
                subTitle: '',
                scope: $scope,
                buttons: []


            });
            $scope.myPopupclose=function(){
                myPopup.close();
            }

        }
    }
})();