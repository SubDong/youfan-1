/**
 * Created by ss on 2015/8/17.
 */
ControllerModule.controller('DashDetailCtrl', function ($scope, $state, $http, $stateParams, $ionicSlideBoxDelegate, Order, Merchant, REST_URL, $ionicPopup, $timeout) {

    // ========================= guochunyan =========================
    $scope.$root.tabsHidden = "tabs-hide";
    $scope.slideIndex = 0;

    //购物车显示隐藏
    $scope.menuState = {
        show: false
    };
    $scope.toggleMenu = function () {

        if (!$scope.orderCartMap.isEmpty()) {
            if (parseInt($scope.rice.count) == 0) {
                $scope.rice.count = 1;
            }

            if (!$scope.orderCartMap.containsKey($scope.rice.menuId)) {
                $scope.orderCartMap.put($scope.rice.menuId, $scope.rice);
            }

            $scope.items.data = Order.cart = $scope.orderCartMap.values();
            $scope.menuState.show = !$scope.menuState.show;
        }

    };
    $scope.ShopClose = function () {
        $scope.menuState.show = false;
    };
    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
    };
    $scope.activeSlide = function (index) {
        $ionicSlideBoxDelegate.slide(index);
    };

    $scope.ZanPopup = function () {
        $scope.data = {};
        var myPopup = $ionicPopup.show({
            cssClass: 'zan_popup',
            template: '点赞成功',
            scope: $scope
        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 1000);
    };

    $scope.CPopup = function () {
        var myPopup = $ionicPopup.show({
            cssClass: 'zan_popup',
            template: '收藏成功',
            scope: $scope
        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 1000);
    };


    // ========================= dolphineor =========================
    $scope.items = {
        data: []
    };

    // 米饭
    $scope.rice = {
        'menuId': 21354687,
        'name': "米饭",
        'restNum': 100,
        'unitPrice': 1,
        'totalPrice': 0,
        'count': 1
    };

    // 减少份数
    $scope.minusItem = function (menuId) {
        var menu = $scope.menuItemMap.get(menuId);

        if ($scope.orderCartMap.containsKey(menuId)) {
            var item = $scope.orderCartMap.get(menuId);

            if (item.count > 0) {
                item.count -= 1;
                menu.restNum += 1;

                if (item.count == 0) {
                    if (item.name == "米饭") {
                        if ($scope.orderCartMap.size() == 1) {
                            $scope.removeRowFromCart(menuId);
                            $scope.orderCartMap.remove(menuId);
                        }
                    } else {
                        menu.count = item.count;
                        menu.changWidth = false;
                        menu.shopAccount = false;

                        $scope.removeRowFromCart(menuId);
                        $scope.orderCartMap.remove(menuId);

                        if ($scope.orderCartMap.size() == 1 && $scope.orderCartMap.containsKey($scope.rice.menuId)) {
                            $scope.rice.count = 1;
                            $scope.rice.totalPrice = 0;
                            $scope.removeRowFromCart($scope.rice.menuId);
                            $scope.orderCartMap.remove($scope.rice.menuId);
                        }
                    }
                } else {
                    menu.count = item.count;

                    item.totalPrice = (parseFloat(item.totalPrice) - parseFloat(item.unitPrice)).toFixed(2);
                    $scope.orderCartMap.put(menuId, item);
                }

                // 更新菜品信息
                $scope.menuItemArr.forEach(function (item) {
                    if (item.menuId == menuId) {
                        item.count = menu.count;
                        item.restNum = menu.restNum;
                        return false;
                    }
                });
            }

            if ($scope.items.data.length == 0) {
                $scope.orderCartMap.clear();
            }

            $scope.cartPostAction();
        }

    };

    // 添加份数
    $scope.plusItem = function (menuId) {
        var menu = $scope.menuItemMap.get(menuId);

        if (menu.restNum > 0) {
            if ($scope.orderCartMap.containsKey(menuId)) {
                var item = $scope.orderCartMap.get(menuId);
                if (item.name == "米饭" && item.count == 0) {
                    item.count += 1;
                    item.totalPrice = 0;
                    $scope.orderCartMap.put(menuId, item);
                } else {
                    if (item.count > 0) {
                        item.count += 1;
                        item.totalPrice = (parseFloat(item.totalPrice) + parseFloat(item.unitPrice)).toFixed(2);
                        $scope.orderCartMap.put(menuId, item);
                    }
                }

                menu.count = item.count;
            } else {
                $scope.orderCartMap.put(menu.menuId, {
                    'menuId': menu.menuId,
                    'name': menu.name,
                    'unitPrice': menu.price,
                    'totalPrice': menu.price,
                    'count': 1
                });

                menu.count = 1;
            }

            menu.restNum -= 1;
            // 更新菜品信息
            $scope.menuItemArr.forEach(function (item) {
                if (item.menuId == menuId) {
                    item.count = menu.count;
                    item.restNum = menu.restNum;
                    return false;
                }
            });

            $scope.cartPostAction();

            menu.changWidth = true;
            menu.shopAccount = true;
        } else {
            var alertPopup = $ionicPopup.alert({
                cssClass: 'zan_popup',
                template: '此产品已售完',
                scope: $scope,
                buttons: []
            });

            //$ionicBackdrop.release();

            $timeout(function () {
                alertPopup.close();
            }, 1000);
        }

    };

    $scope.cartPostAction = function () {
        $scope.refreshCart();
        $scope.calculateTotalPrice();
        Order.cart = $scope.items.data = $scope.orderCartMap.values();
    };

    // 刷新购物车
    $scope.refreshCart = function () {
        $scope.items.data.forEach(function (item) {
            if ($scope.orderCartMap.containsKey(item.menuId)) {
                $scope.orderCartMap.put(item.menuId, item);
            } else {
                $scope.orderCartMap.remove(item.menuId);
            }
        });

    };

    /**
     * 当购物车中的某一项商品数量减至0, 就移出该行
     *
     * @param menuId
     */
    $scope.removeRowFromCart = function (menuId) {
        var index = -1;
        var itemArr = eval($scope.items.data);
        for (var i = 0, l = itemArr.length; i < l; i++) {
            if (itemArr[i].menuId === menuId) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            console.log("Something wrong happened");
        }
        $scope.items.data.splice(index, 1);
    };

    // 菜品列表Map
    $scope.menuItemMap = new Map();

    $scope.menuItemArr = [];

    // 请求菜品列表信息
    $http.get(REST_URL + '/menu/list/' + Merchant.sellerId).success(function (data) {
        var jsonArr = data.payload;

        for (var i = 0, l = jsonArr.length; i < l; i++) {
            jsonArr[i].count = 0;   // 用来显示购物份数
            jsonArr[i].changWidth = false;
            jsonArr[i].shopAccount = false;
            jsonArr[i].price = parseFloat(jsonArr[i].price).toFixed(2);
            $scope.menuItemMap.put(jsonArr[i].menuId, jsonArr[i]);
        }

        $scope.menuItemMap.put($scope.rice.menuId, $scope.rice);

        $scope.menuItemArr = jsonArr;
    });

    // 计算订单总计
    $scope.calculateTotalPrice = function () {
        var _total = 0, _count = 0;

        $scope.orderCartMap.values().forEach(function (item) {
            _total += parseFloat(item.totalPrice);
            _count += parseInt(item.count);
        });

        $scope.subtotal = _total.toFixed(2);
        $scope.count = _count;
    };

    // 订单信息Map
    $scope.orderCartMap = new Map();

    /**
     * 调至订单确认页面
     */
    $scope.confirmOrder = function () {
        if ($scope.orderCartMap.isEmpty()) {
            $scope.showAlert();
            return;
        }
        $scope.menuState.show = false;
        $state.go('tab.confirm-order');
    };

    // 总计
    $scope.subtotal = 0;

    // 数量
    $scope.count = 0;


    $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
            cssClass: 'zan_popup',
            template: '您还没有选择菜品',
            scope: $scope,
            buttons: []
        });

        $timeout(function () {
            alertPopup.close();
        }, 1000);
    };


    /*====================XiaoWei==================*/
    $scope.merchantObj = {}
    $scope.getMerchant = function () {
        var merchantId = $stateParams.merchantId;
        if (merchantId) {
            $http.get(REST_URL + "/mr/getMrOne/" + merchantId).success(function (result) {
                if (result.data != null) {
                    var _tmpData = result.data;
                    if (!_tmpData.distribution) {
                        _tmpData["distribution"] = "暂无说明";
                    }
                    if (!_tmpData.disRange) {
                        _tmpData["disRange"] = "暂无距离";
                    }
                    if (!_tmpData["kitchenStoryName"]) {
                        _tmpData["kitchenStoryName"] = "暂无故事标题";
                    }
                    if (!_tmpData["kitchenAddress"]) {
                        _tmpData["kitchenAddress"] = "亲，厨房还没地址哦！";
                    }
                    if (_tmpData.canteen) {
                        _tmpData["canteen"] = "支持|可容纳人数：" + _tmpData.galleryFul;
                    } else {
                        _tmpData["canteen"] = "不支持";
                    }
                    $scope.merchantObj = _tmpData;
                }
            });
        }
    }
    $scope.getMerchant();
});