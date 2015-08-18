// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('youfan.client', ['ionic', 'ConfigModule', 'ControllerModule', 'ServiceModule', 'ngCordova'])
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

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');

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
                        templateUrl: 'templates/homepage/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            //详情页
            .state('tab.dash-detail', {
                url: '/dash/:dashId',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/homepage/dash-detail.html',
                        controller: 'DashDetailCtr'
                    }
                }
            })
            .state('tab.detail', {
                url: "/detail",
                views: {
                    'tab-dash': {
                        templateUrl: "templates/homepage/shop-detail.html",
                        controller: 'shopDetailCtrl'
                    }
                }
            })
            //菜品详情
            .state('tab.food-detail', {
                url: "/food-detail",
                views: {
                    'tab-dash': {
                        templateUrl: "templates/homepage/food-detail.html",
                        controller: 'foodDetailCtrl'
                    }
                }
            })
            //商家详情
            .state('tab.seller-detail', {
                url: "/seller-detail",
                views: {
                    'tab-dash': {
                        templateUrl: "templates/homepage/seller-detail.html",
                        controller: 'sellerDetailCtrl'
                    }
                }
            })

            //评论详情
            .state('tab.comment-detail', {
                url: "/comment-detail",
                views: {
                    'tab-dash': {
                        templateUrl: "templates/homepage/commentlist.html",
                        controller: 'commentDetailCtrl'
                    }
                }
            })
            //个人中心
            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/personalcenter/tab-chats.html',
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
            //个人中心-我的关注
            .state('tab.care', {
                url: "/care",
                views: {
                    'tab-chats': {
                        templateUrl: "templates/personalcenter/care.html",
                        controller: 'careCtrl'
                    }
                }
            })
            //个人中心-我的消息
            .state('tab.message', {
                url: "/message",
                views: {
                    'tab-chats': {
                        templateUrl: "templates/personalcenter/message.html",
                        controller: 'messageCtrl'
                    }
                }
            })
            //个人中心-送餐地址
            .state('tab.address', {
                url: "/address",
                views: {
                    'tab-chats': {
                        templateUrl: "templates/personalcenter/address.html",
                        controller: 'addressCtrl'
                    }
                }
            })
            .state('tab.login', {
                url: '/login',
                views: {
                    'tab-login': {
                        templateUrl: 'templates/tab-login.html'
//                        controller: 'ChatsCtrl'
                    }
                }
            })

            .state('tab.confirm-order', {
                url: '/confirm-order/:orderId',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/confirm-order.html'
//                        controller: 'DashDetailCtr'
                    }
                }
            })
            .state('tab.pay-page', {
                url: '/pay-page/:payId',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/pay-page.html'
//                        controller: 'DashDetailCtr'
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

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

    })
    .directive('hideTabs', function($rootScope) {
        return {
            restrict: 'A',
            link: function($scope, $el) {
                $rootScope.hideTabs = true;
                $scope.$on('$destroy', function() {
                    $rootScope.hideTabs = false;
                });
            }
        };
    });
