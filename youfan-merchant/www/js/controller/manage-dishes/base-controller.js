/**
 * Created by Fzk lwek on 2015/9/11.
 */
angular.module('yf_merchant.manage_dishes_controllers', ['yf_merchant.m_d_qtc_controllers', 'yf_merchant.m_d_xfz_controllers', 'yf_merchant.m_d_nsc_controllers', 'yf_merchant.manage_dishes_service'])

    .controller('ManageDishesCtrl', function ($scope, $ionicPopup, $rootScope, $ionicHistory, $state, $ionicLoading, $timeout, ManageDishesService, $ionicModal,
                                              YF_MERCHANT_LOADING_COMMENT) {
        console.log("ManageDishesCtrl");
        $scope.upSale = function (obj) {
            console.log("upSale");

            $ionicLoading.show({
                template: "正在上架,请稍后..."

            });

            $timeout(function () {
                $ionicLoading.show({
                    template: "上架成功"

                });
                ManageDishesService.conversionSale({
                    id: obj.id,
                    sale: true
                });
            }, 2000);
        };

        $scope.downSale = function (obj) {
            console.log("downsale");

            $ionicLoading.show({

                templateUrl: "正在上架,请稍后..."

            });

            $timeout(function () {
                $ionicLoading.show({
                    template: "已下架"

                });
                ManageDishesService.conversionSale({
                    id: obj.id,
                    sale: false
                });
            }, 2000);

        };

        $ionicModal.fromTemplateUrl('templates/dishPic.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.dishPic = modal;
        });
        $scope.replacePic = function (_index) {

            $scope.imgs.unshift($scope.imgs[_index]);
            $scope.imgs.splice(_index + 1, 1);
            $ionicLoading.show({
                template: "设置成功"
            });
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
            //$scope.imgs.splice(0,1,[$scope.imgs[_index]]);


        };
        $rootScope.sureCanel = function () {
            var myPopup = $ionicPopup.show({
                template: '你确定撤销您的编辑的内容吗？',
                title: '提示',
                buttons: [
                    {
                        text: '<b>返回<b>',
                        type: 'button-light'

                    },
                    {
                        text: '<b>确认</b>',
                        type: 'button-calm',
                        onTap: function () {
                            history.back();
                        }
                    }
                ]
            });

            // 一个确认


        }


    })

    .controller('ManageDishesEditCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, $timeout, KwService, ManageDishesService) {
        console.log("ManageDishesEditCtrl");

        $scope.paramObj = {};
        $scope.kwItems = KwService.all();

        $scope.load = function () {

            $ionicLoading.show({
                template: "<ion-spinner icon='android'></ion-spinner>"
            });

            $timeout(function () {
                ManageDishesService.findOneDishes($scope.paramObj.menuId);
            }, 1000);

        };

        $scope.confirmRemoveDishes = function () {
            $ionicPopup.confirm({
                title: "<b>提示</b>",
                template: "确定删除这个菜吗？",
                cancelText: '取消', // String (default: 'OK'). The text of the OK button.
                cancelType: 'button button-stable', // St
                okText: '删除', // String (default: 'OK'). The text of the OK button.
                okType: 'button button-assertive' // St
            }).then(function (res) {
                if (res) {
                    $scope.doRemoveDishes();
                }
            });
        };

        $scope.doRemoveDishes = function () {

            $ionicLoading.show({
                template: "<ion-spinner icon='android'></ion-spinner>"
            });

            $timeout(function () {
                ManageDishesService.removeDishes($scope.paramObj.menuId);
            }, 1000);
        };

        $scope.sureCanel = function () {
            var myPopup = $ionicPopup.show({
                template: '你确定撤销您的编辑的内容吗？',
                title: '提示',
                buttons: [
                    {
                        text: '<b>返回<b>',
                        type: 'button-light'

                    }, {
                        text: '<b>确认</b>',
                        type: 'button-calm',
                        onTap: function () {
                            history.back();
                        }
                    }
                ]
            });

            // 一个确认

        }

        $scope.$on("yf-merchant-renewal-dishes-success", function () {
            $state.go("m_dishes." + $scope.paramObj.backType);
        });

        $scope.$on("yf-merchant-delete-dishes-success", function () {
            $state.go("m_dishes." + $scope.paramObj.backType);
        });

    })

    //今日余量
    .controller("ManageDishesStockJrCtrl", function ($scope, $timeout, $stateParams, $ionicLoading, ManageDishesService, YF_MERCHANT_INFO) {
        console.log("ManageDishesStockJrCtrl");
        $scope.backType = $stateParams.backType;
        $scope.init = function () {
            $scope.isActive = false;
            $scope.nscItems = [];
            $scope.xfzItems = [];
            $scope.qtcItems = [];
            $scope.nscItemsBase = [];
            $scope.xfzItemsBase = [];
            $scope.qtcItemsBase = [];
        };

        $scope.subStock = function (item) {
            if (item.restNum > 0) {
                item.restNum--;
            }
        };

        $scope.plusStock = function (item) {
            if (item.restNum < 99) {
                item.restNum++;
            }
        };

        $scope.load = function () {

            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });

            $timeout(function () {
                $scope.init();
                ManageDishesService.allSaleDishes(YF_MERCHANT_INFO.mID);
            }, 1000);

        };

        $scope.doCheckStock = function () {
            $scope.isActive = true;
            $scope.changeItem = [];
            for (var i = 0; i < $scope.nscItems.length; i++) {
                if ($scope.nscItems[i].restNum != $scope.nscItemsBase[i].restNum) {
                    $scope.changeItem.push({
                        id: $scope.nscItems[i].id,
                        restNum: $scope.nscItems[i].restNum
                    });
                }
            }
            for (var i = 0; i < $scope.qtcItems.length; i++) {
                if ($scope.qtcItems[i].restNum != $scope.qtcItemsBase[i].restNum) {
                    $scope.changeItem.push({
                        id: $scope.qtcItems[i].id,
                        restNum: $scope.qtcItems[i].restNum
                    });
                }
            }
            for (var i = 0; i < $scope.xfzItems.length; i++) {
                if ($scope.xfzItems[i].restNum != $scope.xfzItemsBase[i].restNum) {
                    $scope.changeItem.push({
                        id: $scope.xfzItems[i].id,
                        restNum: $scope.xfzItems[i].restNum
                    });
                }
            }
            if ($scope.changeItem.length == 0) {
                $scope.$emit("youfan-merchant-show-msg", "库存没有变化");
                $scope.isActive = false;
            } else {
                $scope.doSave();
            }
        };

        $scope.doSave = function () {
            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });
            console.log($scope.changeItem);

            ManageDishesService.changeDishesRestNum($scope.changeItem);
        };

        $scope.$on("yf-merchant-load-dishes-success", function (e, data) {
            angular.forEach(data, function (e) {
                if (e.type == "nsc") {
                    $scope.nscItems.push(e);
                    $scope.nscItemsBase.push(angular.copy(e));
                } else if (e.type == "qtc") {
                    $scope.qtcItems.push(e);
                    $scope.qtcItemsBase.push(angular.copy(e));
                } else if (e.type == "xfz") {
                    $scope.xfzItems.push(e);
                    $scope.xfzItemsBase.push(angular.copy(e));
                } else {
                    console.log("你是啥.....");
                }
            });
            console.log(data);
            //隐藏载入指示器
            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-load-dishes-error", function (e, data) {
            $scope.$emit("youfan-merchant-show-msg", "远程连接出错");
            $scope.isActive = false;
            //隐藏载入指示器
            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-dishes-reload", function (e, data) {
            //隐藏载入指示器
            $ionicLoading.hide();
            $scope.load();
        });


    })

    //每日余量
    .controller("ManageDishesStockMrCtrl", function ($scope, $timeout, $stateParams, $ionicLoading, ManageDishesService, YF_MERCHANT_INFO) {
        console.log("ManageDishesStockMrCtrl");
        $scope.backType = $stateParams.backType;

        $scope.init = function () {
            $scope.isActive = false;
            $scope.nscItems = [];
            $scope.xfzItems = [];
            $scope.qtcItems = [];
            $scope.nscItemsBase = [];
            $scope.xfzItemsBase = [];
            $scope.qtcItemsBase = [];
        };

        $scope.subStock = function (item) {
            if (item.stock > 0) {
                item.stock--;
            }
        };

        $scope.plusStock = function (item) {
            if (item.stock < 99) {
                item.stock++;
            }
        };

        $scope.load = function () {

            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });

            $timeout(function () {
                $scope.init();
                ManageDishesService.allSaleDishes(YF_MERCHANT_INFO.mID);
            }, 1000);

        };

        $scope.doCheckStock = function () {
            $scope.isActive = true;
            $scope.changeItem = [];
            for (var i = 0; i < $scope.nscItems.length; i++) {
                if ($scope.nscItems[i].stock != $scope.nscItemsBase[i].stock) {
                    $scope.changeItem.push({
                        id: $scope.nscItems[i].id,
                        stock: $scope.nscItems[i].stock
                    });
                }
            }
            for (var i = 0; i < $scope.qtcItems.length; i++) {
                if ($scope.qtcItems[i].stock != $scope.qtcItemsBase[i].stock) {
                    $scope.changeItem.push({
                        id: $scope.qtcItems[i].id,
                        stock: $scope.qtcItems[i].stock
                    });
                }
            }
            for (var i = 0; i < $scope.xfzItems.length; i++) {
                if ($scope.xfzItems[i].stock != $scope.xfzItemsBase[i].stock) {
                    $scope.changeItem.push({
                        id: $scope.xfzItems[i].id,
                        stock: $scope.xfzItems[i].stock
                    });
                }
            }
            if ($scope.changeItem.length == 0) {
                $scope.$emit("youfan-merchant-show-msg", "库存没有变化");
                $scope.isActive = false;
            } else {
                $scope.doSave();
            }
        };

        $scope.doSave = function () {
            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });
            console.log($scope.changeItem);

            ManageDishesService.changeDishesStock($scope.changeItem);

        };

        $scope.$on("yf-merchant-load-dishes-success", function (e, data) {
            angular.forEach(data, function (e) {
                if (e.type == "nsc") {
                    $scope.nscItems.push(e);
                    $scope.nscItemsBase.push(angular.copy(e));
                } else if (e.type == "qtc") {
                    $scope.qtcItems.push(e);
                    $scope.qtcItemsBase.push(angular.copy(e));
                } else if (e.type == "xfz") {
                    $scope.xfzItems.push(e);
                    $scope.xfzItemsBase.push(angular.copy(e));
                } else {
                    console.log("你是啥.....");
                }
            });
            //隐藏载入指示器
            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-load-dishes-error", function (e, data) {
            $scope.$emit("youfan-merchant-show-msg", "远程连接出错");
            //隐藏载入指示器
            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-dishes-reload", function (e, data) {
            //隐藏载入指示器
            $ionicLoading.hide();
            $scope.load();
        });


    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // 设置
        $stateProvider
            .state('m_dishes', {
                url: '/manage/dishes',
                abstract: true,
                controller: 'ManageDishesCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-entrance.html'
            })
            .state('m_dishes.nsc', {
                url: '/nsc',
                controller: 'ManageDishesNscCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-nsc.html'
            })
            .state('m_dishes.xfz', {
                url: '/xfz',
                controller: 'ManageDishesXfzCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-xfz.html'
            })
            .state('m_dishes.qtc', {
                url: '/qtc',
                controller: 'ManageDishesQtcCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-qtc.html'
            })
            .state("m_dishes_edit", {
                url: '/manage/dishes',
                abstract: true,
                controller: 'ManageDishesEditCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-edit-entrance.html'
            })
            .state('m_dishes_nsc_add', {
                url: '/manage/dishes/nsc/add',
                controller: 'ManageDishesNscAddCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-nsc-add.html'
            })
            .state('m_dishes_edit.nsc', {
                url: '/nsc/edit/:menuId',
                controller: 'ManageDishesNscEditCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-nsc-edit.html'
            })
            .state('m_dishes_qtc_add', {
                url: '/manage/dishes/qtc/add',
                controller: 'ManageDishesQtcAddCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-qtc-add.html'
            })
            .state('m_dishes_edit.qtc', {
                url: '/qtc/edit/:menuId',
                controller: 'ManageDishesQtcEditCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-qtc-edit.html'
            })
            .state('m_dishes_xfz_add', {
                url: '/manage/dishes/xfz/add/:xfzNum',
                controller: 'ManageDishesXfzAddCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-xfz-add.html'
            })
            .state('m_dishes_edit.xfz', {
                url: '/xfz/edit/:menuId',
                controller: 'ManageDishesXfzEditCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-xfz-edit.html'
            })
            .state('m_dishes_jr_stock', {//今日库存
                url: '/manage/dishes/jr/stock/:backType',
                controller: 'ManageDishesStockJrCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-jr-stock.html'
            })
            .state('m_dishes_mr_stock', {//每日库存
                url: '/manage/dishes/mr/stock/:backType',
                controller: 'ManageDishesStockMrCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-mr-stock.html'
            })
        ;

    })

    .directive('youFanNumber', function () {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ctrl) {

                element.on("keyup", function (e) {

                    element[0].value = element[0].value.replace(/\D/g, '');
                    ctrl.$setViewValue(element[0].value);

                });

                element.on("paste", function (e) {
                    element[0].value = element[0].value.replace(/\D/g, '');
                    ctrl.$setViewValue(element[0].value);
                });
            }
        };
    })

    .directive('youFanSize', function () {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                element.attr({"maxLength": attrs["youFanSize"], "ngMaxLength": attrs["youFanSize"]});
            }
        };
    })

    .directive('youFanMerchantDishesImg', function () {
        return {
            restrict: 'EA',
            replace: true,
            require: '?ngModel',
            templateUrl: 'templates/comment/dishes_img_comment.html',
            link: function (scope, elem, attrs, ctrl) {
            }
        };
    })

    .directive('youFanMerchantDishesInfo', function ($state) {
        return {
            restrict: 'EA',
            replace: true,
            require: '?ngModel',
            templateUrl: 'templates/comment/dishes_info_comment.html',
            link: function (scope, elem, attrs, ctrl) {
                scope.editDishes = function (d_type, d_id) {
                    if ("nsc" == d_type) {
                        $state.go("m_dishes_edit.nsc", {menuId: d_id});
                    } else if ("xfz" == d_type) {
                        $state.go("m_dishes_edit.xfz", {menuId: d_id});
                    } else if ("qtc" == d_type) {
                        $state.go("m_dishes_edit.qtc", {menuId: d_id});
                    } else {

                    }
                };
            }
        };
    })

;
