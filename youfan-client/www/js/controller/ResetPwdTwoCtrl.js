/**
 * Created by ss on 2015/9/6.
 */
ControllerModule.controller('ResetPwdTwoCtrl', function ($scope, $ionicPopup, $interval, $ionicPopup, $timeout, $http, $state, $window, UserService) {

    $scope.user = {
        pwd: "",
        confirmPwd: ""
    };

    $scope.resetPwd = function (password) {
        var pwd = $scope.user.pwd;
        var confirmPwd = $scope.user.confirmPwd;
        var re = /[0-9 | A-Z | a-z]{6,16}/;

        if (pwd.trim() != "") {
            if (re.test(pwd)) {
                if (confirmPwd.trim() != "") {
                    if (pwd.trim() == confirmPwd.trim()) {
                        UserService.resetPassword(password).success(function (data) {
                            console.log(data);
                            if (data.code == 0) {
                                $state.go('tab.chats');
                            } else {
                                var updateErr = $ionicPopup.show({
                                    title: '网络异常,请重设密码',
                                    scope: $scope
                                });
                                $timeout(function () {
                                    updateErr.close();
                                }, 2000);
                            }

                        })
                        .error(function (data) {
                            console.log(status);
                            console.log(data);

                            var serverError = $ionicPopup.show({
                                title: '网络连接失败',
                                scope: $scope
                            });
                            $timeout(function () {
                                serverError.close(); //由于某种原因2秒后关闭弹出
                            }, 2000);
                        });
                    } else {
                        var pwdMatch = $ionicPopup.show({
                            title: '两次输入的密码不一致',
                            scope: $scope
                        });
                        $timeout(function () {
                            pwdMatch.close();
                        }, 2000);
                    }
                } else {
                    var confirmPwdNull = $ionicPopup.show({
                        title: '请确认密码',
                        scope: $scope
                    });
                    $timeout(function () {
                        confirmPwdNull.close();
                    }, 2000);
                }
            } else {
                var pwdFormat = $ionicPopup.show({
                    title: '请按格式输入密码',
                    scope: $scope
                });
                $timeout(function () {
                    pwdFormat.close();
                }, 2000);
            }
        } else {
            var pwdNull = $ionicPopup.show({
                title: '请输入密码',
                scope: $scope
            });
            $timeout(function () {
                pwdNull.close();
            }, 2000);
        }
    }
});