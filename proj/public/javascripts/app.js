/**
 * Created by Administrator on 2016-08-06.
 */
"use strict";
var app = angular.module('project'
    , [ 'ui.bootstrap','ngRoute','ngResource','RestfulSvc' ]);


var host = null;

app.run(function(){

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

        .when('/users', {
            templateUrl: '/admin/users',
            controller: 'usersCtrl'
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
                    alert("로그인 실패");
                }
            })
        console.log("눌림");
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


app.controller('mainCtrl',function($scope,$window,restSvc) {

})
