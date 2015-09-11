/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('merchantInfoCtrl', function ($scope, $rootScope, $q, $state, $http, $location, ngDialog) {
        //筛选条件
        $scope.userName = "";
        $scope.realName = "";
        $scope.status = null;
        $scope.statusDesc = {
            "-1":"删除",
            "0":"待审核",
            "1":"正常",
            "2":"冻结",
        }
        $rootScope.gridTitleArray = [
            {name: '账户名称', field: "userName"},
            {name: '姓名', field: "realName"},
            {name: '性别', field: "sex"},
            {name: '住址', field: "address"},
            {name: '年龄', field: "ageRange"},
            {name: '联系方式', field: "phone"},
            {
                name: "头像",
                displayName: "头像",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.showSinglePic(row.entity.headPortraitPicUrl)' >查看头像</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
            {
                name: "身份证",
                displayName: "身份证",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.showSinglePic(row.entity.idCardPicUrl)' >查看身份证</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
            {
                name: "健康证",
                displayName: "健康证",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.showSinglePic(row.entity.healthCertificatePicUrl)' >查看健康证</a></div>",
                maxWidth: 80,
                enableSorting: false
            },

            {name: '状态', field: "status"},
            {
                name: "操作",
                displayName: "操作",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.ckeckMerchant(row.entity)' >审核</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
        ];
        $scope.ckeckMerchant = function (entity) {
            //$scope.statusRadio = [false,false,false]
            //$scope.statusRadio[entity.status] = true;
            $scope.choosedStatus = entity.status;
            var dialog = ngDialog.open({
                template: './merchant/dialog/checkmerchantdialog.html',
                className: 'ngdialog-theme-default admin_ngdialog',
                scope: $scope
            });
            $scope.radioChoosed = function (status) {
                $scope.choosedStatus = status;
            }
            $scope.submitCheck = function () {
                $http({
                    method: 'GET',
                    url: 'merchant/checkStatus?id=' + entity.id + '&status=' + $scope.choosedStatus
                }).success(function (data, status) {
                })
                dialog.close();
            }
        }

        //指定数据查询方法
        $rootScope.searchData = function () {
            $scope.search();
        }
        $rootScope.initSearchData = function () {
            $rootScope.pageNo = 1;
            $scope.search();
        }
        $scope.clareSearchConditon = function () {
            $scope.port = null;
            $scope.timeLine = null;
            $scope.status = null;
        }
        $scope.search = function () {
            var condition = "";
            if ($scope.userName.trim() != "")
                condition += "&userName=" + $scope.userName
            if ($scope.realName.trim() != "")
                condition += "&realName=" + $scope.realName
            //if ($scope.status != null)
            //    condition += "&status=" + $scope.status
            $http({
                method: 'GET',
                url: 'merchant/getPagerByParams?pageNo=' + $scope.pageNo + '&pageSize=' + $scope.pageSize + "&" + condition
            }).success(function (result, status) {
                if(result.payload.list!=undefined){
                    $rootScope.gridOptions.data = result.payload.list;
                    $rootScope.gridOptions.data.forEach(function(item){
                        item.status =$scope.statusDesc[item.status+""]
                    })
                }
                $rootScope.pageCount = result.payload.pageCnt;
                $rootScope.recordCount = result.payload.recordCnt;
                //设置分页样式
                $rootScope.setPagerBar();
            })
        }
    })
});
