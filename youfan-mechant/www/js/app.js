// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.settings_controllers', 'starter.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // 设置
        $stateProvider
            .state('settings', {
                url: '/settings',
                abstract: true,
                templateUrl: 'templates/settings/settings.html'
            })
            .state('settings.index', {
                url: '/index',
                views: {
                    'weims': {
                        templateUrl: 'templates/settings/index.html',
                        controller: 'SettingsIndexCtrl'
                    }
                }
            })
            .state('settings.help', {
                url: '/help',
                views: {
                    'weims': {
                        templateUrl: 'templates/settings/help.html',
                        controller: 'SettingsHelpCtrl'
                    }
                }
            })
            .state('settings.disclaimer', {
                url: '/disclaimer',
                views: {
                    'weims': {
                        templateUrl: 'templates/settings/disclaimer.html',
                        controller: 'SettingsDisclaimerCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/settings/index');

});
//angular.module('starter', ['ionic'])
//
//    .run(function ($ionicPlatform) {
//        $ionicPlatform.ready(function () {
//            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//            // for form inputs)
//            if (window.cordova && window.cordova.plugins.Keyboard) {
//                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//            }
//            if (window.StatusBar) {
//                StatusBar.styleDefault();
//            }
//        });
//    });


//angular.module('login', ['ionic'])
//
//    .controller('login', function ($scope, $http) {
//        $scope.signIn = function (user) {
//            //var login_url = "youfan-server/login?user={'userName':\'" + user.username + "\','passWord':\'" + user.password + "\'}";
//            //$http(login_url).success(function (data) {
//                $scope.isSuccess = user.username;
//            //});
//        }
//    });
//
//    //.factory('loginService', function ($http) {
//    //    return {
//    //        GetUser: function () {
//    //            return $http.get("some url here").then(function (response) {
//    //                //Process Stuff Here
//    //                return response;
//    //            });
//    //        },
//    //    }
//    //})
//angular.module('editKitchener', ['ionic'])
//
//    .controller('editKitchener', function ($scope, $http) {
//
//    });
//    //
//    //.factory('editKitchenerService', function ($http) {
//    //    return {
//    //        GetUser: function () {
//    //            return $http.get("some url here").then(function (response) {
//    //                //Process Stuff Here
//    //                return response;
//    //            });
//    //        },
//    //    }
//    //})
angular.module('editKitchenInfo', ['ionic'])
    .controller('editKitchenInfo', function ($scope) {
        //$scope.test = function(){
        //    editKitchenInfoerService.saveKitchenInfo($scope.kitchenInfo).then(function (response) {
        //        $scope.kitchenInfo = response;
        //    });
        //}
        $scope.name = "tutyutuytyu";
        //$scope.testfun = function(){
        //    $scope.test = 2;
        //    //$http.get("http://www.baidu.com").success(function(data){
        //    //    $scope.test = 1;
        //    //});
        //};
        //$scope.testfun();
    });
