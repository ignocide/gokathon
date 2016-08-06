/**
 * Created by Administrator on 2016-08-06.
 */
"use strict";
var app = angular.module('project'
    , [ 'ui.bootstrap','ngRoute','ngResource','RestfulSvc' ]);


var host = null;

app.run(function($rootScope,$location){


    $rootScope.toDetail = function(idx){
        $location.path('/detail/'+idx);
    }
    console.log("app 실행됨")
});

app.config(function($routeProvider) {

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

        // route for the about page
        .when('/approve', {
            templateUrl: '/admin/approve',
            controller: 'approveCtrl'
        })

        // route for the contact page
        .when('/report', {
            templateUrl: '/admin/report',
            controller: 'reportCtrl'
        })

        .when('/suggest', {
            templateUrl: '/admin/suggest',
            controller: 'suggestCtrl'
        })

        .when('/screen', {
            templateUrl: '/admin/screen',
            controller: 'screenCtrl'
        })

        .when('/reqUniversity', {
            templateUrl: '/admin/reqUniversity',
            controller: 'reqUniversityCtrl'
        })


        .otherwise({
            // templateUrl : './templates/home.html',
            // controller  : 'homeCtrl'
            redirectTo: '/rank'
        });
});


// app.config(function($rootScope,$window){
// });


app.factory('approveSvc', function (RESTapi) {

    var Svc = {
        getInvalildUser : function(callback){
            RESTapi.admin(
                {
                    func : "getInvaildUser"
                },
                {
                }
                ,function(res){
                    callback(res);
                }
                ,function(err){
                    alert('server check');
                })
        },
        approveUser : function(userid,idxs,cert,callback){
            RESTapi.admin(
                {
                    func : "approveUser"
                },
                {
                    userid : userid,
                    photos : idxs,
                    cert : cert
                }
                ,function(res){
                    callback(res);
                }
                ,function(err){
                    alert('server check');
                })
        },
//        getSession : function(){
//            resource.ad(
//                {
//                    func : "getSession"
//                },
//                {
//                }
//                ,function(res){
//                    if(res.isSuccess){
//                        Svc.profile.name = res.profile.name;
//                    }
//                    else{
//                    }
//                }
//                ,function(err){
//                    alert('server check');
//                });
//        },
        profile : {
            user : null
        }
    }

    return Svc;
});


app.controller('loginCtrl',function($scope,$window,restSvc){
    $scope.userid = "";
    $scope.pw = "";

    $scope.loginProc = function(){
        console.log($scope.userid);
        console.log($scope.pw);
        restSvc.login($scope.userid,$scope.pw).$promise
            .then(function(res){
                if(res.success){
                    $window.location.reload();
                }
                else{
                }
            })
    }

});


app.controller('rankCtrl',function($scope,$window,restSvc){
    $scope.select = "all";

    $scope.dance = [];
    $scope.sing = [];
    $scope.act = [];
    $scope.all = [];

    $scope.ranks = [];
    console.log("!!!");
    $scope.init = function(){
        console.log("!!");
        restSvc.getRanks().$promise
            .then(function(res){
                console.log(res);
                if(res.success){
                    var result = res.result;
                    $scope.dance = result.dance;
                    $scope.sing = result.sing;
                    $scope.act = result.act;
                    $scope.all = result.all;


                    $scope.selection("all");
                        console.log($scope);
                }
                else{

                }
            })
    }

    $scope.selection = function(selection){
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


app.controller('navCtrl',function($scope,$window,restSvc){
    $scope.userid = "";
    $scope.pw = "";

    $scope.loginProc = function(){
        console.log($scope.userid);
        console.log($scope.pw);
        restSvc.login($scope.userid,$scope.pw).$promise
            .then(function(res){
                if(res.success){
                    $window.location.reload();
                }
                else{
                    alert("로그인 실패");
                }
            })
        console.log("눌림");
    }

});

app.controller('detailCtrl',function($scope,$window,restSvc,$route) {
    var idx = $route.current.params.idx;
    $scope.showContent = false;
    $scope.showCommentForm = false;
    $scope.content = {};
    console.log(idx);
    $scope.init  = function(){
        restSvc.getContent(idx).$promise
        .then(function(res){
                console.log(res);
            if(res.success){

                var result = res.result;
                var url = result.link;
                var yId = url.split("https://youtu.be/")[1].split("/")[0];


                $scope.content = result;

                $scope.content.yId = yId;
                $scope.content.avgScore = 3;

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


    $scope.toggle = function(){
        $scope.showContent = !$scope.showContent;
    }

    $scope.toggleForm = function(){
        $scope.showCommentForm = !$scope.showCommentForm;
    }



    $scope.scores = {};

    $scope.scores.score  = 0;



    $scope.gradeDown = function() {
        if($scope.scores.score >1){
            $scope.scores.score -= 1;
        }else{$scope.scores.score = 0;}
    }

    $scope.gradeUp = function() {
        if($scope.scores.score<5){$scope.scores.score += 1;}
        else{
            $scope.scores.score = 5;
        }
    }

});


app.directive('youtube', function($sce) {
    return {
        restrict: 'EA',
        scope: { code:'=' },
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