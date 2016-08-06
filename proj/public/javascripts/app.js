/**
 * Created by Administrator on 2016-08-06.
 */
"use strict";
var app = angular.module('project'
    , [ 'ui.bootstrap', 'ngRoute', 'ngResource', 'RestfulSvc' ]);


var host = null;

app.run(function ($rootScope, $location) {


    $rootScope.toDetail = function (idx) {
        $location.path('/detail/' + idx);
    }

    $rootScope.toMain = function () {
        $location.path('/');
    }


    $rootScope.path = function (lo) {
        $location.path(lo);
    }
    console.log("app 실행됨")
});

app.config(function ($routeProvider) {

    $routeProvider

        // route for the home page
        .when('/', {
            // templateUrl : './templates/home.html',
            // controller  : 'homeCtrl'
            redirectTo: '/rank'
        })

        .when('/rank', {
            templateUrl: '/template/rank',
            controller: 'rankCtrl'
        })

        .when('/detail/:idx', {
            templateUrl: '/template/detail',
            controller: 'detailCtrl'
        })

        .when('/write', {
            templateUrl: '/template/write',
            controller: 'writeCtrl'
        })

        .when('/list', {
            templateUrl: '/template/list',
            controller: 'listCtrl'
        })

        .otherwise({
            // templateUrl : './templates/home.html',
            // controller  : 'homeCtrl'
            redirectTo: '/rank'
        });
});


// app.config(function($rootScope,$window){
// });




app.controller('writeCtrl', function ($scope, $window, $location, restSvc) {
    $scope.writeInfo = {
        title : "",
        link : "",
        cateIdx : 1,
        content : ""
    }

    $scope.yLink = function(){
        return $scope.writeInfo.link.split("https://youtu.be/")[1].split("/")[0];

    }

    $scope.writeContent = function () {
        console.log($scope.writeInfo)
        restSvc.writeContent($scope.writeInfo).$promise
            .then(function (res) {
                if (res.success) {
                    $location.path('/');
                }
                else {
                }
            })
    }

});
app.controller('listCtrl', function ($scope, $window, $location, restSvc) {
    $scope.page = 1;
    $scope.list = [];
    $scope.max = 5;

    $scope.init = function(){
        $scope.getList();
    }
    $scope.getList = function () {
        restSvc.getList($scope.page).$promise
            .then(function (res) {
                if (res.success) {
                    var result = res.result;
                    $scope.list = $scope.list.concat(result);
                    $scope.page += 1;
                }
                else {
                }
            })
    }

});

app.controller('loginCtrl', function ($scope, $window, restSvc) {
    $scope.userid = "";
    $scope.pw = "";

    $scope.loginProc = function () {
        console.log($scope.userid);
        console.log($scope.pw);
        restSvc.login($scope.userid, $scope.pw).$promise
            .then(function (res) {
                if (res.success) {
                    $window.location.reload();
                }
                else {
                }
            })
    }

});


app.controller('rankCtrl', function ($scope, $window, restSvc) {
    $scope.select = "all";

    $scope.dance = [];
    $scope.sing = [];
    $scope.act = [];
    $scope.all = [];

    $scope.ranks = [];
    $scope.init = function () {
        restSvc.getRanks().$promise
            .then(function (res) {
                console.log(res);
                if (res.success) {
                    var result = res.result;
                    $scope.dance = result.dance;
                    $scope.sing = result.sing;
                    $scope.act = result.act;
                    $scope.all = result.all;


                    $scope.selection("all");
                    console.log($scope);
                }
                else {

                }
            })
    }

    $scope.selection = function (selection) {
        $scope.ranks = $scope[selection];
//        $scope.$apply();
    }


//    $scope.rate = 5;
    $scope.max = 5;
    $scope.isReadonly = true;
//
//
//    $scope.gradeDown = function() {
//        if($scope.rate >1){
//            $scope.rate -= 1;
//        }else{$scope.rate = 0;}
//    }
//
//    $scope.gradeUp = function() {
//        if($scope.rate<5){$scope.rate += 1;}
//        else{
//            $scope.rate = 5;
//        }
//    }
//
//    $scope.hoveringOver = function(value) {
//        $scope.overStar = value;
//    };
//
    $scope.ratingStates = [
        {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
        {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
        {stateOn: 'glyphicon-heart'},
        {stateOff: 'glyphicon-off'}
    ];


});


app.controller('navCtrl', function ($scope, $window, restSvc) {
    $scope.userid = "";
    $scope.pw = "";

    $scope.loginProc = function () {
        console.log($scope.userid);
        console.log($scope.pw);
        restSvc.login($scope.userid, $scope.pw).$promise
            .then(function (res) {
                if (res.success) {
                    $window.location.reload();
                }
                else {
                    alert("로그인 실패");
                }
            })
        console.log("눌림");
    }

    $scope.open = function(){
        $( ".sidePanel" ).animate({ "right": "+=100%" }, "slow" );
    }

    $scope.close = function(){
        $( ".sidePanel" ).animate({ "right": "-=100%" }, "slow" );
    }

    $scope.logout = function(){
        restSvc.logout().$promise.then(function(res){
            if(res.success){
                $window.location.reload();
            }
        })
    }
});

app.controller('detailCtrl', function ($scope, $window, restSvc, $route) {
    var idx = $route.current.params.idx;
    $scope.showContent = false;
    $scope.showCommentForm = false;
    $scope.content = {};
    console.log(idx);
    $scope.init = function () {
        restSvc.getContent(idx).$promise
            .then(function (res) {
                console.log(res);
                if (res.success) {

                    var result = res.result;
                    var url = result.link;
                    var yId = url.split("https://youtu.be/")[1].split("/")[0];


                    $scope.content = result;

                    $scope.content.yId = yId;
                    $scope.content.avgScore = result.avgScore;

                    $scope.comments = result.comments;
                }
            })
    }


    $scope.max = 5;
    $scope.isReadonly = true;

    $scope.ratingStates = [
        {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
        {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
        {stateOn: 'glyphicon-heart'},
        {stateOff: 'glyphicon-off'}
    ];


    $scope.toggle = function () {
        $scope.showContent = !$scope.showContent;
    }

    $scope.toggleForm = function () {
        $scope.showCommentForm = !$scope.showCommentForm;
    }


    $scope.scores = {};

    $scope.scores.score = 0;


    $scope.gradeDown = function () {
        if ($scope.scores.score > 1) {
            $scope.scores.score -= 1;
        } else {
            $scope.scores.score = 0;
        }
    }

    $scope.gradeUp = function () {
        if ($scope.scores.score < 5) {
            $scope.scores.score += 1;
        }
        else {
            $scope.scores.score = 5;
        }
    }


    $scope.doScore = function () {
        console.log($scope.content)
        restSvc.doScore($scope.scores.score, $scope.content.idx)
            .$promise
            .then(function (res) {
                if (res.success) {
                    $window.location.reload();
                }
            })
    }


    $scope.comment_content = "";

    $scope.writeComment = function () {
        restSvc.writeComment($scope.comment_content, $scope.content.idx)
            .$promise
            .then(function (res) {
                console.log(res);
                if (res.success) {
                    $window.location.reload();
                }
            })
    }

});


app.directive('youtube', function ($sce) {
    return {
        restrict: 'EA',
        scope: { code: '=' },
        replace: true,
//        template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
        template: '<div style="height:200px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
//        <iframe width="420" height="315" src="https://www.youtube.com/embed/A6XUVjK9W4o"

        link: function (scope) {
            scope.$watch('code', function (newVal) {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
                }
            });
        }
    };
});


app.controller('logoutCtrl', function ($scope, $window, Auth, restSvc) {
    $scope.logout = function () {
        Auth.logout(function (result) {
            $window.location.reload();
        });
    }
});

app.controller('signupCtrl', function ($scope, $window, restSvc) {
    $scope.loginInfo = {
        userid: "",
        pw: ""
    };

    $scope.signup = {
        userid : "",
        pw : "",
        email : "",
        nickname : "",
        height : "",
        weight : ""
    }
    $scope.signupProc = function () {

        restSvc.signup($scope.signup.userid, $scope.signup.pw,
            $scope.signup.email, $scope.signup.nickname, $scope.signup.height, $scope.signup.weight,$scope.signup.age
        ).$promise.then(function (res) {
                if (res.success) {
                    $window.location.reload();
                } else {
                    {
                        alert("항목을 확인해주세요")
                    }
                }
            })
    }

    $scope.login = function () {
        restSvc.login($scope.loginInfo.userid, $scope.loginInfo.pw).$promise
            .then(function (res) {
                console.log(res);
                if (res.success) {
                    $window.location.reload();
                }
                else {
                    alert("아이디와 비밀번호를 확인해 주세요");
                }
            })
    }


    $scope.formInfo = {
        title: "로그인",
        foot: "회원가입하기",
        isLogin: true
    }

    $scope.toggleForm = function () {
        if ($scope.formInfo.isLogin) {
            $scope.formInfo.title = "회원가입";
            $scope.formInfo.foot = "로그인하기";
            $scope.formInfo.isLogin = false
        }
        else {
            $scope.formInfo.title = "로그인";
            $scope.formInfo.foot = "회원가입하기";
            $scope.formInfo.isLogin = true
        }
    }
});