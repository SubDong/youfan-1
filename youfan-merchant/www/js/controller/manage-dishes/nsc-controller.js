angular.module('yf_merchant.m_d_nsc_controllers', [])

    .controller('ManageDishesNscCtrl', function ($scope, $state, $ionicLoading, $timeout, ManageDishesService) {

        console.log("ManageDishesNscCtrl");

        $scope.items = [];

        $scope.addNsc = function () {
            $state.go("m_dishes_nsc_add");
        };

        $scope.load = function () {
            $ionicLoading.show({
                templateUrl: "templates/comment/loading_comment.html"
            });

            $timeout(function () {
                $scope.$broadcast("scroll.refreshComplete");
                ManageDishesService.allDishes("888888888", "nsc");
            }, 500);

        };

        $scope.load();

        $scope.$on("yf-merchant-load-dishes-success", function (e, data) {
            $scope.items = data;
            //隐藏载入指示器
            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-load-dishes-error", function (e, data) {
            alert("系统错误");
            //隐藏载入指示器
            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-dishes-reload", function (e, data) {
            $scope.load();
            //隐藏载入指示器
            $ionicLoading.hide();
        });

    })


    .controller('ManageDishesNscAddCtrl', function ($scope, $state, $ionicActionSheet, $ionicLoading, $timeout, KwService, ManageDishesService, $cordovaCamera, $cordovaImagePicker) {

        console.log("ManageDishesNscAddCtrl");

        $scope.kwItems = KwService.all();

        $scope.dishes = {
            staple: false,
            picUrls: [],
            type: "nsc",
            name: "红烧北极熊",
            price: 666,
            stock: 3,
            description: "好吃，不上火",
            taste: 3,
            staple: true,
            features: ["保护动物", "开心果", "刘德华", "自行车"],
            sellerId: "888888888"
        };
        $scope.imgs = [{
            index: 0,
            url: "http://a3.att.hudong.com/84/07/01300001369290132072076178920.jpg"
        }, {
            index: 1,
            url: "http://preview.quanjing.com/chineseview069/tpgrf-bgs20110532.jpg"
        }];
        $scope.isActive = false;

        $scope.addNscPic = function () {
            console.log("addNscPic");
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: "<p class='text-center calm'>打开相机</p>"},
                    {text: "<p class='text-center calm'>打开相册</p>"}
                ],
                buttonClicked: function (index) {

                    if (!navigator.camera) {
                        alert('请在真机环境中使用相册功能。现在只是模拟一张图片')
                    } else {
                        if (index == 0) {
                            $scope.cameraImage();
                        }
                        if (index == 1) {
                            $scope.photoImage();
                        }
                    }
                    return true;
                },
                cancelText: "<p class='calm'>取消</p>",
                cancel: function () {
                    // add cancel code..
                }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function () {
                //	hideSheet();
            }, 2000);

        };

        $scope.cameraImage = function () {
            var options = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA
            };

            $cordovaCamera.getPicture(options).then(function (imageURI) {
                $scope.imgs.push({
                    index: $scope.imgs.length,
                    url: imageURI
                });
            }, function (err) {
                // error
            });
        };

        $scope.photoImage = function () {
            var options = {
                maximumImagesCount: 1,
                width: 800,
                height: 800,
                quality: 80
            };

            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    $scope.imgs.push({
                        index: $scope.imgs.length,
                        url: results[0]
                    });
                }, function (error) {
                    // error
                });
        };

        $scope.doCheckDishes = function () {
            $scope.isActive = true;
            if ($scope.imgs.length == 0) {
                alert("请添加菜品图片");
                $scope.isActive = false;
            } else {
                $scope.doSave();
            }
        };

        $scope.doSave = function () {
            $ionicLoading.show({
                template: "保存菜品中，请稍后..."
            });
            $scope.dishes.picUrls = [];// 清空
            angular.forEach($scope.imgs, function (e) {
                $scope.dishes.picUrls.push(e.url);
            });
            console.log($scope.dishes);
            $timeout(function () {
                ManageDishesService.saveDishes($scope.dishes);
            }, 1000);

        };

        $scope.$on("yf-merchant-save-dishes-success", function () {
            $state.go("m_dishes.nsc");
        });

        $scope.$on("yf-merchant-save-dishes-error", function () {
            alert("系统错误");
            $ionicLoading.hide();
            $scope.isActive = false;
        });

    })

    .controller('ManageDishesNscEditCtrl', function ($scope, $state, $stateParams, $ionicPopup, $ionicActionSheet, $ionicLoading, $timeout, KwService, ManageDishesService) {

        console.log("ManageDishesNscEditCtrl");
        // 初始化参数
        $scope.paramObj.backType = "nsc";
        $scope.paramObj.menuId = $stateParams.menuId;
        $scope.dishes = {sale: true};
        $scope.imgs = [];
        $scope.isActive = false;

        $scope.addQtcPic = function () {
            console.log("addQtcPic");
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: "<p class='text-center calm'>打开相机</p>"},
                    {text: "<p class='text-center calm'>打开相册</p>"}
                ],
                buttonClicked: function (index) {
                    if (!navigator.camera) {
                        alert('请在真机环境中使用相册功能。现在只是模拟一张图片')
                    }
                    $scope.imgs.push({
                        index: $scope.imgs.length,
                        url: "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"
                    });
                    return true;
                },
                cancelText: "<p class='calm'>取消</p>",
                cancel: function () {
                    // add cancel code..
                }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function () {
                //	hideSheet();
            }, 2000);

        };

        $scope.doCheckDishes = function () {
            $scope.isActive = true;
            if ($scope.imgs.length == 0) {
                alert("请添加菜品图片");
                $scope.isActive = false;
            } else {
                $scope.doSave();
            }
        };

        $scope.doSave = function () {
            $ionicLoading.show({
                template: "保存菜品中，请稍后..."
            });
            $scope.dishes.picUrls = [];// 清空
            angular.forEach($scope.imgs, function (e) {
                $scope.dishes.picUrls.push(e.url);
            });
            $timeout(function () {
                ManageDishesService.updateDishes($scope.dishes);
            }, 1000);

        };

        $scope.confirmChangeDishes = function () {
            $ionicPopup.confirm({
                title: "<b>提示</b>",
                template: "是否要设置为其他菜",
                cancelText: '否', // String (default: 'OK'). The text of the OK button.
                cancelType: 'button button-stable', // St
                okText: '是', // String (default: 'OK'). The text of the OK button.
                okType: 'button button-assertive' // St
            }).then(function (res) {
                if (res) {
                    $scope.doChangeDishes();
                }
            });
        };

        $scope.doChangeDishes = function () {
            $ionicLoading.show({
                templateUrl: "templates/comment/loading_comment.html"
            });

            $timeout(function () {
                ManageDishesService.conversionDishesType($scope.dishes);
            }, 1000);
        };

        $scope.$on("yf-merchant-load-dishes-success", function (e, msg) {
            $scope.dishes = msg;
            $scope.imgs = [];

            for (var i = 0; i < $scope.dishes.picUrls.length; i++) {
                $scope.imgs.push({
                    index: i,
                    url: $scope.dishes.picUrls[i]
                });
            }

            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-save-dishes-error", function () {
            alert("系统错误");
            $ionicLoading.hide();
            $scope.isActive = false;
        });


    })

;
