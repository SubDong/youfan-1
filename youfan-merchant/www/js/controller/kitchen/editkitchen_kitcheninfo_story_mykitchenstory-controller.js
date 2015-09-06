/**
 * Created by perfection on 15-8-21.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('kitcheninfo_story_mykitchenstory', kitchenInfo_story_myKitchenStory)
    ;


    function kitchenInfo_story_myKitchenStory($scope, $filter, $state, $http, $rootScope,$ionicPopup) {
        $scope.story = {
            title: "",
            content: ""
        };
        $http.post(
            "http://127.0.0.1:8080/user/getMerchantKitchenInfo", JSON.stringify({"id": $rootScope.user.id}), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                if (data.code == "200") {
                    if (data.payload != null) {
                        $scope.story = {
                            title:data.payload.kitchenStoryName,
                            content:data.payload.kitchenStoryContent
                        };
                    }
                }
            });
        //文本框限制输入字数50-1000
        $scope.checkText = function (content) {
            if (Number(content.length) > 1000) {
                $scope.story.content = content.substr(0, 1000);
            } else {
                $scope.story.content = content;
            }
        };
        $scope.saveStory = function () {
            var story_template = {
                id: $rootScope.user.id,
                kitchenStoryName:$scope.story.title,
                kitchenStoryContent:$scope.story.content
            };
            $http.post(
                "http://127.0.0.1:8080/user/saveMerchantKitchenStoryInfo", JSON.stringify(story_template), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                    var options;
                    if (data.code == "200") {
                        if(data.payload == null||data.payload==""){
                            options = {
                                "title": "系统繁忙！",
                                "buttons": [{
                                    text: "关闭",
                                    type: "button-positive clam"
                                }]
                            };
                        }else{
                            options = {
                                "title": "保存成功！",
                                "buttons": [{
                                    text: "确定",
                                    type: "button-positive clam"
                                }]
                            };
                        }
                        $ionicPopup.alert(options);
                    } else {
                        options = {
                            "title": "系统繁忙！",
                            "buttons": [{
                                text: "关闭",
                                type: "button-positive clam"
                            }]
                        };
                        $ionicPopup.alert(options);
                    }
                });
        }
    }
})();
