/**
 * 短信验证码控制器
 * Created by icepros on 15-9-2.
 */
ControllerModule.controller('SmsCaptchaCtrl', function($scope, $ionicPopup, $interval, $ionicPopup, $timeout, $http){

    $scope.validCode = "获取验证码";
    $scope.isClick = false;
    $scope.Count = function () {
        if($scope.totalTime > 0){
            $scope.totalTime--;
            $scope.second = $scope.totalTime % 60;
            $scope.second = $scope.second < 10 ? "0" + $scope.second : $scope.second;
            $scope.validCode ="再次发送"+"("+ $scope.second + ")";
        }else{
            $scope.isClick = false;
            $scope.validCode = "获取验证码";
            $interval.cancel ( $scope.Countdown )
        }
    };

    /**
     * obj == 0 : 注册
     * obj == 1 : 忘记密码
     */

    /**
     * 发送短信验证码
     */
    $scope.sendMessage = function(obj){

        var tel = $scope.user.tel;
        var re= /(^1[3|5|8][0-9]{9}$)/;
        var codeLength = 6;             //验证码长度
        var code = "";               //验证码

        if(tel.trim() != ""){
            if(!re.test(tel.trim())){
                var telVerify = $ionicPopup.show({
                    title: '请输入正确的手机号',
                    scope: $scope
                });
                $timeout(function() {
                    telVerify.close(); //由于某种原因2秒后关闭弹出
                }, 2000);
            } else {
                /*倒计时效果初始化*/
                $scope.isClick = true;
                $scope.second = "60";
                $scope.totalTime = 60;
                $scope.Countdown = $interval($scope.Count,1000);

                //生成 6 位随机数验证码
                for ( var i = 0; i < codeLength; i++) {
                    code += parseInt(Math.random() * 9).toString();
                }

                //客户端 注册
                var clientRegModel = {
                    "captchaKey": "client_reg" + tel,
                    "captcha": code
                };

                //客户端 重置密码
                var clientForgetPwdModel = {
                    "captchaKey": "client_forgetpwd" + tel,
                    "captcha": code
                };

                //发送短信 url
                var smsUrl = "http://07zhywjh.6655.la:19982/platform/sendSMS/1/" + code + "/" + tel;
                //验证码发送
                $http.get(smsUrl).success(function(data) {
                    if(data.statusCode == 000000){
                        //注册
                        if(0 == obj){
                            //存储 redis
                            $http.post("http://localhost:8080/captcha/add",JSON.stringify(clientRegModel))
                                    .success(function(data){
                                        if(data.code == 0){
                                            //设置验证码时效
                                            $http.post("http://localhost:8080/captcha/alive",JSON.stringify(clientRegModel))
                                                    .success(function(data){
                                                        //console.log(data);
                                                    })
                                                    .error(function(){

                                                    });
                                        }
                                    })
                                    .error(function(){

                                    });
                        };
                        //忘记密码
                        if(1 == obj){
                            //存储 redis
                            $http.post("http://localhost:8080/captcha/add",JSON.stringify(clientForgetPwdModel))
                                    .success(function(data){
                                        if(data.code == 0){
                                            //设置验证码时效
                                            $http.post("http://localhost:8080/captcha/alive",JSON.stringify(clientForgetPwdModel))
                                                    .success(function(data){
                                                        //console.log(data);
                                                    })
                                                    .error(function(){

                                                    });
                                        }
                                    })
                                    .error(function(){

                                    });
                        }
                    } else {
                        var smsError = $ionicPopup.show({
                            title: '短信发送失败',
                            scope: $scope
                        });
                        $timeout(function() {
                            smsError.close(); //由于某种原因2秒后关闭弹出
                        }, 2000);
                    }

                }).error(function(data){

                });
            }
        } else {
            var telNull = $ionicPopup.show({
                title: '请输入手机号',
                scope: $scope
            });
            $timeout(function() {
                telNull.close(); //由于某种原因2秒后关闭弹出
            }, 2000);
        }
    };
});