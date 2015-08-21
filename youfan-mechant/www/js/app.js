// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('yf_merchant', ['ionic', 'ionic-datepicker', 'ngCordova', 'yf_merchant.settings_controllers', 'yf_merchant.manage_dishes_controllers'])
    .run(function ($rootScope, $ionicPlatform, $state) {
        $rootScope.goState = function (state) {
            $state.go(state);
        };
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
    });
/*
 全局firebaseio
 */
//var firebaseio = new Firebase("https://youfan-mechant.firebaseio.com/");
