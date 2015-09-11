/**
 * Created by subdong on 15-8-21.
 */
ControllerModule.controller('ChangeAddressCtrl', function ($scope, $ionicModal, $state, Merchant, $rootScope, $ionicPopup, $timeout) {
    /**--------------------------------------------地图获取-----------------------------**/
        //地图加载
    $scope.mapObj = new AMap.Map("mapContainer", {
        resizeEnable: true
    });

    //基本参数
    $scope.inputText = {value: ""};
    $scope.mapPrompt;
    /**
     *
     */
    $scope.keydown = function () {
        if ($scope.inputText.value == "") {
            $scope.items = [];
            $scope.showhi = false;
            return
        }
        var auto;
        //加载输入提示插件
        $scope.mapObj.plugin(["AMap.Autocomplete"], function () {
            var autoOptions = {
                city: $rootScope.mapCity == undefined ? "" : $rootScope.mapCity //城市，默认全国
            };
            auto = new AMap.Autocomplete(autoOptions);
            //查询成功时返回查询结果
            if ($scope.inputText.value.length > 0) {
                $scope.showhi = true;
                AMap.event.addListener(auto, "complete", function (data) {
                    $scope.autoData = data.tips;
                    $scope.items = [];
                    var resultStr = "";
                    var tipArr = data.tips;
                    if (tipArr && tipArr.length > 0) {
                        for (var i = 0; i < tipArr.length; i++) {
                            if ($scope.inputText.value != "") {
                                $scope.items.push({
                                    index: i,
                                    name: tipArr[i].name,
                                    value: tipArr[i].district
                                });
                            }
                        }
                        $scope.mapPrompt = 0;
                    } else {
                        $scope.items = [];
                        $scope.mapPrompt = 1;
                    }
                    $scope.$apply(function () {
                        $scope.items
                    });
                });
                auto.search($scope.inputText.value);
            }
            else {
                $scope.items = [];
            }
        });

    };
    //选择输入提示关键字
    $scope.selectResult = function (index) {
        //截取输入提示的关键字部分
        var text = document.getElementById("divid" + (index + 1)).innerHTML.replace(/<[^>]+>/g, "");
        if (text.indexOf("成都") == -1) {
            $scope.showAlert();
            return
        }
        Merchant.localRange=$scope.autoData[index].location.lng + "," + $scope.autoData[index].location.lat;
        $rootScope.mapCity = $scope.autoData[index].district;
        $state.go('tab.dash');
        $scope.inputText.value = (document.getElementById("divid" + (index + 1)).innerHTML.replace(/<[^>].*?>.*<\/[^>].*?>/g, "")).trim();
        $scope.items = [];
        $scope.showhi = false;
    };
    /**
     * 获取用户地理位置
     */
    $rootScope.mapAddr = "我的就餐地址";
    $scope.maplnglat = "";
    $scope.getMapCity = function () {
        mapTools.cityLocationAddr($scope, $rootScope, $scope.mapObj,function(data){
            $rootScope.mapAddr = data.addr;
            $rootScope.mapCity = data.addr;
            $scope.maplnglat = data.lngLat;
        });

    };


    $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
            cssClass: 'zan_popup',
            template: '亲!暂时不对成都之外的城市开放.敬请期待哦!!',
            scope: $scope,
            buttons: []
        });

        $timeout(function () {
            alertPopup.close();
        }, 1000);
    };


    $scope.goAddr = function(){
        console.log($scope.maplnglat)
        if($scope.maplnglat != ""){
            Merchant.localRange=$scope.maplnglat;
            $state.go('tab.dash');
        }
    }
    /**-------------------------------------------------------------------------**/
});

