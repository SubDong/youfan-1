/**
 * Created by Administrator on 2015/8/20.
 * 控制所有的表格 使用UI-GRID
 */
define(["./module"], function (ctrs) {
    ctrs.controller('tableCtrl', function ($scope, $rootScope) {
        console.log("tableCtrl")

        //表格标题
        //$rootScope.gridOptions.data =[] ;


        $rootScope.gridOptions = {
            enableSorting: false,
            enableCellEditOnFocus: false,
            paginationPageSize: 20,
            paginationPageSizes: [20, 50, 100],
            expandableRowHeight: 360,
            enableColumnMenus: false,
            enablePaginationControls: false,
            enableSorting: true,
            enableGridMenu: false,
            enableHorizontalScrollbar: 0,
            columnDefs:$rootScope.gridTitleArray
        };
        $rootScope.gridOptions.data = [
            //{name: "小李", address: "四川", phone: "1234567890", status: "正常"},
            //{name: "小李", address: "四川", phone: "1234567890", status: "正常"},
            //{name: "小李", address: "四川", phone: "1234567890", status: "正常"},
            //{name: "小李", address: "四川", phone: "1234567890", status: "正常"},
            //{name: "小李", address: "四川", phone: "1234567890", status: "正常"}
        ]
    })
});