/**
 * Created by Administrator on 2015/8/14.
 */

//ע�ᣬϵͳ���� Ӧ���ò���
//angular.module('app.Authority', []).controller('regCtrl', function ($scope) {
//    console.log("regCtrl")
//});
//
////�޸���Ϣ
//angular.module('app.Authority', []).controller('editCtrl', function ($scope) {
//    console.log("regCtrl")
//});
//��¼
angular.module('app.Authority', []).controller('loginCtrl', function ($scope) {
    console.log("loginCtrl")
    $scope.count = "admin"

    //��¼
    $scope.login = function () {
        console.log("login")
        //$state.go("index.html");
    }
})

//�˳�
//angular.module('app.Authority', []).controller('logoutCtrl', function ($scope) {
//    console.log("logoutCtrl")
//});