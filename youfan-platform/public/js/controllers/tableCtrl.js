/**
 * Created by Administrator on 2015/8/20.
 * 控制所有的表格 使用UI-GRID
 */
define(["./module"], function (ctrs) {
    ctrs.controller('tableCtrl', function ($scope, $rootScope, ngDialog) {
        //表格标题
        $rootScope.gridOptions = {
            enableSorting: false,
            enableCellEditOnFocus: false,
            paginationPageSize: 10,
            paginationPageSizes: [20, 50, 100],
            expandableRowHeight: 360,
            enableColumnMenus: false,
            enablePaginationControls: false,
            enableSorting: true,
            enableGridMenu: false,
            enableHorizontalScrollbar: 0,
            columnDefs: $rootScope.gridTitleArray
        };
        //表格数据
        $rootScope.gridOptions.data = []

        /**
         * 表格中 单张图片展示
         */
        $rootScope.showSinglePic = function (picUrl) {
            //var showPicUrl = entity[field];
            console.log("查看图片URL：" + picUrl)
            if (picUrl == undefined || picUrl == "") {
                picUrl = "/img/no_pic.jpg"
            }
            var html = "<div class='container-fluid'><div class='row-fluid'><div class='span12'>"
                + "<img alt='300x300' src='" + picUrl + "'class='img-rounded'/>"
                + "</div></div> </div>"
            ngDialog.open({
                template: html,
                className: 'ngdialog-theme-default admin_ngdialog',
                plain: true,
                scope: $scope
            });
        }

        /**
         * 表格中 多张图片展示
         */
        $rootScope.showMultiPics = function (picUrls) {
            ngDialog.open({
                template: "merchant/dialog/showpicsdialog.html",
                className: 'ngdialog-theme-default admin_ngdialog',
                scope: $scope
            });
        }

        //分页控制

        $rootScope.headPage = function () {
            if ($rootScope.pageNo != 1) {
                $rootScope.pageNo = 1;
                $rootScope.searchData();
            }
        }
        $rootScope.prePage = function () {
            if ($rootScope.pageNo > 1) {
                $rootScope.pageNo--;
                $rootScope.searchData();
            }
        }
        $rootScope. jumpPage = function(index){
            if ($rootScope.pageNo != (index+1) ){
                $rootScope.pageNo = index+1;
                $rootScope.searchData();
            }
        }
        $rootScope.nextPage = function () {
            if ($rootScope.pageNo < $rootScope.pageCount) {
                $rootScope.pageNo++;
                $rootScope.searchData();
            }

        }
        $rootScope.tailPage = function () {

            if ($rootScope.pageNo != $scope.pageCount) {
                $rootScope.pageNo = $scope.pageCount;
                $rootScope.searchData();
            }
        }

        $rootScope.setPagerBar = function () {
            //console.log("当前PageNo"+$rootScope.pageNo)
            if ($rootScope.pages.length != $rootScope.pageCount) {
                $rootScope.pages = [];
                for (var index = 0; index < $rootScope.pageCount; index++) {
                    $rootScope.pages.push(index + 1)
                }
            }
            if ($rootScope.pageNo == 1) {//首页时
                document.getElementById("head").className = "disabled";
                document.getElementById("prev").className = "prev disabled";
            } else {
                document.getElementById("head").className = "";
                document.getElementById("prev").className = "prev";
            }

            if ($rootScope.pageNo == $rootScope.pageCount) {//尾页时
                document.getElementById("tail").className = "disabled";
                document.getElementById("next").className = "next disabled";
            } else {
                document.getElementById("tail").className = "";
                document.getElementById("next").className = "next";
            }
        }





        $rootScope.searchData();
        //$rootScope.setPagerBar();

        Date.prototype.format = function (format) {
            var o = {
                "M+": this.getMonth() + 1, //month
                "d+": this.getDate(), //day
                "h+": this.getHours(), //hour
                "m+": this.getMinutes(), //minute
                "s+": this.getSeconds(), //second
                "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                "S": this.getMilliseconds() //millisecond
            }

            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        }
        $rootScope.closeDialog = function (dialog){
            console.log(dialog)
        }

    })
});