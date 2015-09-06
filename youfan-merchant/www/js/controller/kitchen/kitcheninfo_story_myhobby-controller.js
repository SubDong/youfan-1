/**
 * Created by perfection on 15-8-21.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('kitcheninfo_story_myhobby', kitchenInfo_story_myHobby)
    ;

    function kitchenInfo_story_myHobby($scope, $filter, $state, $ionicPopup, $location,$rootScope,$http) {
        $scope.text = "";
        $http.post(
            "http://127.0.0.1:8080/user/getMerchantKitchenInfo", JSON.stringify({"id": $rootScope.user.id}), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                if (data.code == "200") {
                    if (data.payload != null) {
                        $scope.text = data.payload.hobby;
                    }
                }
            });
        //文本框限制输入字数300
        $scope.checkText = function (text) {
            if (Number(text.length) > 300) {
                $scope.text = text.substr(0, 300);
            } else {
                $scope.text = text;
            }
        };
        $scope.saveMyStory = function () {
            //保存我的故事到数据库
        };
        $scope.isSaveText = function () {
            if ($scope.text.length > 0) {
                var options = {
                    "title": "是否保存当前修改内容！",
                    "buttons": [{
                        text: "关闭",
                        type: "button-positive clam",
                        onTap: function () {
                            $location.path("overview")
                        }
                    }, {
                        text: "确定",
                        type: "button-positive clam",
                        onTap: function () {
                            $http.post(
                                "http://127.0.0.1:8080/user/saveMyHobby", {"id":$rootScope.user.id,"hobby":$scope.text}, {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                                    var option;
                                    if (data.code == "200") {
                                        if(data.payload == null||data.payload==""){
                                            option = {
                                                "title": "系统繁忙！",
                                                "buttons": [{
                                                    text: "关闭",
                                                    type: "button-positive clam"
                                                }]
                                            };
                                        }else{
                                            option = {
                                                "title": "保存成功！",
                                                "buttons": [{
                                                    text: "确定",
                                                    type: "button-positive clam"
                                                }]
                                            };
                                        }
                                        $ionicPopup.alert(option);
                                    } else {
                                        option = {
                                            "title": "系统繁忙！",
                                            "buttons": [{
                                                text: "关闭",
                                                type: "button-positive clam"
                                            }]
                                        };
                                        $ionicPopup.alert(option);
                                    }
                                });
                        }
                    }
                    ]
                };
                $ionicPopup.confirm(options);
            }


        };
    }
})();
