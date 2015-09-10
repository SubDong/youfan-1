angular.module('yf_merchant.m_d_qtc_controllers', [])

    .controller('ManageDishesQtcCtrl', function ($scope, $state, $ionicLoading, $timeout, ManageDishesService, YF_MERCHANT_INFO, $ionicModal) {

        console.log("ManageDishesQtcCtrl");

        $scope.items = [];

        $scope.addQtc = function () {
            $state.go("m_dishes_qtc_add");
        };

        $scope.load = function () {
            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });

            $timeout(function () {
                $scope.$broadcast("scroll.refreshComplete");
                ManageDishesService.allDishes(YF_MERCHANT_INFO.mID, "qtc");
            }, 800);

        };

        $scope.load();

        $scope.$on("yf-merchant-load-dishes-success", function (e, data) {
            $scope.items = data;
            //隐藏载入指示器
            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-load-dishes-error", function (e, data) {
            $scope.$emit("youfan-merchant-show-msg", "远程连接出错");
            //隐藏载入指示器
            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-dishes-reload", function (e, data) {
            $scope.load();
            //隐藏载入指示器
            $ionicLoading.hide();
        });
        $ionicModal.fromTemplateUrl('templates/dishPic.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.dishPic = modal;
        });
        $scope.replacePic = function (_index) {

            $scope.imgs.unshift($scope.imgs[_index]);
            $scope.imgs.splice(_index+1,1);
            $ionicLoading.show({
                template:"设置成功"
            });
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
            //$scope.imgs.splice(0,1,[$scope.imgs[_index]]);


        };

    })

    .controller('ManageDishesQtcAddCtrl', function ($scope, $state, $ionicActionSheet, $ionicLoading, $timeout, KwService, PhotoService, ManageDishesService, $cordovaCamera, $cordovaImagePicker, YF_MERCHANT_INFO, $ionicModal) {

        console.log("ManageDishesQtcAddCtrl");

        $scope.kwItems = KwService.all();

        $scope.dishes = {
            staple: false,
            picUrls: [],
            type: "qtc",
            name: "红烧北极熊",
            price: 888,
            stock: 8,
            description: "好吃，不上火",
            taste: 3,
            staple: true,
            features: ["保护动物", "开心果", "刘德华", "自行车"],
            sellerId: YF_MERCHANT_INFO.mID
        };
        $scope.imgs = [];
        $scope.isActive = false;

        $scope.removePic = function (_index) {
            $scope.imgs.splice(_index, 1);
        };

        $scope.addQtcPic = function () {
            console.log("addQtcPic");
            if (!navigator.camera) {
                $scope.$emit("youfan-merchant-show-msg", "请在真机环境中使用相册功能。现在只是模拟一张图片");
                $scope.imgs.push({
                    index: $scope.imgs.length,
                    url: PhotoService.randomPhoto()
                });
            } else {
                createActionSheet("weims", $ionicActionSheet, $scope, $cordovaCamera, $cordovaImagePicker);
            }

        };

        $scope.getImg = function (buttonId, url) {
            uploadImg(buttonId, url, $ionicLoading, $scope);
        };

        $scope.saveImagePath = function (buttonId, url) {
            $scope.imgs.push({
                index: $scope.imgs.length,
                url: url
            });
        };

        $scope.doCheckDishes = function () {
            $scope.isActive = true;

            if ($scope.imgs.length == 0) {
                $scope.$emit("youfan-merchant-show-msg", "请添加菜品图片");
                $scope.isActive = false;
                return;
            }

            if (!$scope.dishes.name || $scope.dishes.name == "") {
                $scope.$emit("youfan-merchant-show-msg", "请输入菜品名称");
                $scope.isActive = false;
                return;
            }

            if (!$scope.dishes.price || $scope.dishes.price == "") {
                $scope.$emit("youfan-merchant-show-msg", "请输入菜品价格");
                $scope.isActive = false;
                return;
            }

            if (!$scope.dishes.stock || $scope.dishes.stock == "") {
                $scope.$emit("youfan-merchant-show-msg", "请输入菜品库存");
                $scope.isActive = false;
                return;
            }

            $scope.doSave();
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
                ManageDishesService.saveDishes($scope.dishes);
            }, 1000);

        };

        $scope.$on("yf-merchant-save-dishes-success", function () {
            $state.go("m_dishes.qtc");
        });

        $scope.$on("yf-merchant-save-dishes-error", function (e, msg) {
            $scope.$emit("youfan-merchant-show-msg", msg);
            $ionicLoading.hide();
            $scope.isActive = false;
        });
        $ionicModal.fromTemplateUrl('templates/dishPic.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.dishPic = modal;
        });
        $scope.replacePic = function (_index) {

            $scope.imgs.unshift($scope.imgs[_index]);
            $scope.imgs.splice(_index+1,1);
            $ionicLoading.show({
                template:"设置成功"
            });
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
            //$scope.imgs.splice(0,1,[$scope.imgs[_index]]);


        };


    })

    .controller('ManageDishesQtcEditCtrl', function ($scope, $state, $stateParams, $ionicPopup, $ionicActionSheet, $ionicLoading, $timeout, KwService, PhotoService, ManageDishesService, $cordovaCamera, $cordovaImagePicker,$ionicModal) {

        console.log("ManageDishesQtcEditCtrl");
        // 初始化参数
        $scope.paramObj.backType = "qtc";
        $scope.paramObj.menuId = $stateParams.menuId;
        $scope.dishes = {sale: true};
        $scope.imgs = [];
        $scope.isActive = false;

        $scope.removePic = function (_index) {
            $scope.imgs.splice(_index, 1);
        };

        $scope.addQtcPic = function () {
            console.log("addQtcPic");
            if (!navigator.camera) {
                $scope.$emit("youfan-merchant-show-msg", "请在真机环境中使用相册功能。现在只是模拟一张图片");
                $scope.imgs.push({
                    index: $scope.imgs.length,
                    url: PhotoService.randomPhoto()
                });
            } else {
                createActionSheet("weims", $ionicActionSheet, $scope, $cordovaCamera, $cordovaImagePicker);
            }

        };

        $scope.getImg = function (buttonId, url) {
            uploadImg(buttonId, url, $ionicLoading, $scope);
        };

        $scope.saveImagePath = function (buttonId, url) {
            $scope.imgs.push({
                index: $scope.imgs.length,
                url: url
            });
        };

        $scope.doCheckDishes = function () {
            $scope.isActive = true;

            if ($scope.imgs.length == 0) {
                $scope.$emit("youfan-merchant-show-msg", "请添加菜品图片");
                $scope.isActive = false;
                return;
            }

            if (!$scope.dishes.name || $scope.dishes.name == "") {
                $scope.$emit("youfan-merchant-show-msg", "请输入菜品名称");
                $scope.isActive = false;
                return;
            }

            if (!$scope.dishes.price || $scope.dishes.price == "") {
                $scope.$emit("youfan-merchant-show-msg", "请输入菜品价格");
                $scope.isActive = false;
                return;
            }

            if (!$scope.dishes.stock || $scope.dishes.stock == "") {
                $scope.$emit("youfan-merchant-show-msg", "请输入菜品库存");
                $scope.isActive = false;
                return;
            }

            $scope.doSave();
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
                template: "是否要设置为拿手菜",
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
                template: "<ion-spinner icon='android'></ion-spinner>"
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
            $scope.$emit("youfan-merchant-show-msg", "远程连接出错");
            $ionicLoading.hide();
            $scope.isActive = false;
        });

        $ionicModal.fromTemplateUrl('templates/dishPic.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.dishPic = modal;
        });
        $scope.replacePic = function (_index) {

            $scope.imgs.unshift($scope.imgs[_index]);
            $scope.imgs.splice(_index+1,1);
            $ionicLoading.show({
                template:"设置成功"
            });
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
            //$scope.imgs.splice(0,1,[$scope.imgs[_index]]);


        };
    })
;
