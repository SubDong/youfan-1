/**
 * Created by perfection on 15-8-24.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('merchant_login', merchant_login);
    function merchant_login($scope, $filter, $state, $rootScope, $http, $location, $ionicPopup, YF_MERCHANT_HOST) {
        $scope.user = {
            phoneNumber: "18328725827",
            verificationCode: ""
        };
        $scope.getVerificationCode = function (user) {
            $scope.verificationCode = "";
            //生成 6 位随机数验证码
            for (var i = 0; i < 6; i++) {
                $scope.verificationCode += parseInt(Math.random() * 9).toString();
            }
            // 向后台发送处理数据
            $scope.url = "http://192.168.1.107:8080/platform/sendSMS/1/" + $scope.verificationCode + "/" + user.phoneNumber;
            $http.get($scope.url).success(function (data) {
                var options;
                if (data.statusCode == "000000") {
                    options = {
                        "title": "验证码发送成功!",
                        "buttons": [{
                            text: "确定",
                            type: "button-positive clam",
                            onTap: function () {
                                $scope.user = {
                                    phoneNumber: user.phoneNumber,
                                    verificationCode: $scope.verificationCode
                                };
                            }
                        }]
                    };
                } else {
                    options = {
                        "title": "验证码发送失败!",
                        "buttons": [{
                            text: "关闭",
                            type: "button-positive clam"
                        }]
                    };
                }
                $ionicPopup.alert(options)
                    .then(function () {

                    });
            });

        };
        $scope.signIn = function (user) {
            //if(user.verificationCode==$scope.verificationCode){
            var merchantUser = {
                userName: user.phoneNumber
            };
            $location.path("overview")
            $http.post(
                YF_MERCHANT_HOST + "/user/login", JSON.stringify(merchantUser), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {

                    if (data == "" || data == null) {
                        var options = {
                            "title": "系统繁忙！",
                            "buttons": [{
                                text: "关闭",
                                type: "button-positive clam"
                            }]
                        };
                        $ionicPopup.alert(options)
                            .then(function () {
                                //这个函数在弹出框关闭时被调用
                            });
                    } else {
                        $scope.user = data;
                        $rootScope.user = $scope.user;
                        $location.path("overview")
                    }

                }, function (error) {
                    var options = {
                        "title": "系统繁忙！",
                        "buttons": [{
                            text: "关闭",
                            type: "button-positive clam"
                        }]
                    };
                    $ionicPopup.alert(options)
                        .then(function () {
                        });
                });

            //}else{
            //    var options = {
            //        "title": "验证码输入不正确！",
            //        "buttons": [{
            //            text: "关闭",
            //            type: "button-positive clam"
            //        }]
            //    };
            //    $ionicPopup.alert(options)
            //        .then(function () {
            //            //这个函数在弹出框关闭时被调用
            //        });
            //}

        };
        $scope.register = function (user) {
            $http.post(
                "http://192.168.1.110:8080/user/register", JSON.stringify(user), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {

                    var options;
                    switch (data.registerStatus) {

                        case "1":
                            options = {
                                "title": "注册成功！",
                                "buttons": [{
                                    text: "确定",
                                    type: "button-positive clam"
                                }]
                            };
                            $ionicPopup.alert(options)
                                .then(function () {
                                    $scope.user = data;
                                    $rootScope.user = $scope.user;
                                    $location.path("overview")
                                });
                            break;
                        case "0":
                            options = {
                                "title": "注册失败！",
                                "buttons": [{
                                    text: "关闭",
                                    type: "button-positive clam"
                                }]
                            };
                            $ionicPopup.alert(options)
                                .then(function () {
                                });
                            break;
                        case "-1":
                            options = {
                                "title": "系统繁忙！",
                                "buttons": [{
                                    text: "关闭",
                                    type: "button-positive clam"
                                }]
                            };
                            $ionicPopup.alert(options)
                                .then(function () {
                                });
                            break;
                    }
                }, function (error) {
                    var options = {
                        "title": "系统繁忙！",
                        "buttons": [{
                            text: "关闭",
                            type: "button-positive clam"
                        }]
                    };
                    $ionicPopup.alert(options)
                        .then(function () {
                        });
                });

        };
    }
})();
