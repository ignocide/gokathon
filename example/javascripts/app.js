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

        .when('/main', {
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
            redirectTo: '/dashboard'
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

app.controller('approveCtrl',function($scope,$window,approveSvc){
    $scope.user = null;
    $scope.image_path = null;
    $scope.selected = null;
    $scope.cert = {
        photo : null,
        state : false
    }
    $scope.photos = [];


    $scope.init = function(){
        $scope.cert = {
            photo : null,
            state : false
        }

        $scope.photos = [];
        approveSvc.getInvalildUser(function(res){
            if(res.success){
                $scope.user = res.result.user;
                $scope.cert.photo = res.result.user.cert;
                $scope.cert.state = false;
                res.result.user.photos.forEach(function(photo){
                    photo.state = false;
                    $scope.photos.push(photo);
                });
                console.log($scope.photos);
                $scope.showProfile = true;
            }
            else if(res.error.errno == 9000){
                alert("이제 없음");
            }
        });
    }


    $scope.toggle = function(obj){
        obj.state = !obj.state;
    }
    $scope.approveUser = function(){
        if($scope.user){
            var idxs = [];
            $scope.photos.forEach(function(photo){
                if(photo.state == true){
                    idxs.push(photo.idx);
                }
            })


            var cert = $scope.cert.state;
            console.log(idxs,cert);
            approveSvc.approveUser($scope.user.id,idxs,cert,function(result){
                if(result.success){
                    $scope.init();
                }
                else{
                    alert("처리 실패");
                    $window.location.reload();
                }
            })
        }
    }


});




app.controller('usersCtrl',function($scope,basicInfoSvc,adminSvc){
    $scope.userList = [];
    $scope.saved = {};
    // $scope.page = 0;
    $scope.page = 1;

    // $scope.$watch(function () {
    //     return $scope.shownPage;
    // }, function (newVal, oldVal) {
    //     if ( newVal !== oldVal ) {
    //       $scope.page = $scope.shownPage-1;
    //     }
    // });


    $scope.init = function(){
        if($scope.userList.length == 0){
            $scope.searchUser();
        }
    }

    $scope.basicInfo = basicInfoSvc;
    $scope.searchInfo = {
        id : null,
        nickName : null,
        universityCode : null,
        majorCode : null,
        locationCode : null,
        heightLevel : null,
        drinkLevel : null,
        enterYear : null,
        gender : null,
        birth : null
    }

    $scope.searchUser = function(){
        console.log($scope.searchInfo);
        adminSvc.searchUser($scope.searchInfo,0).$promise
            .then(function(res){
                if(res.success){
                    $scope.saved = $scope.searchInfo;
                    $scope.page = 1;
                    $scope.count = res.result.count;
                    $scope.userList = res.result.list;
                    console.log($scope.userList);
                }
                else{
                    alert("결과가 없음");
                }
            })
    }
    $scope.toPage = function(){
        console.log($scope.page);
        adminSvc.searchUser($scope.saved,$scope.page-1).$promise
            .then(function(res){
                if(res.success){
                    $scope.count = res.result.count;
                    $scope.userList = res.result.list;
                }
                else{
                    alert("결과가 없음");
                }
            })
    }

    //
    // $scope.searchUser = function(){
    //   adminSvc.searchUser($scope.searchInfo).$promise
    //   .then(function(res){
    //     if(res.success){
    //       $scope.userList = res.result.list;
    //       console.log($scope.userList);
    //     }
    //     else{
    //       alert("결과가 없음");
    //     }
    //   })
    // }

})

app.controller('reqUniversityCtrl',function($scope,adminSvc,basicInfoSvc){
    $scope.universityList = [];
    $scope.userList = [];
    $scope.basicInfo = basicInfoSvc;
    $scope.init = function(){
        console.log("init!!");
        if($scope.universityList.length == 0){
            adminSvc.getReqUniversityList().$promise
                .then(function(res){
                    console.log(res);
                    if(res.success){
                        $scope.universityList = res.result.list;
                    }
                    else{
                        alert("결과가 없음");
                    }
                })
        }
    }

    $scope.approveUniversity = function(univ){
        adminSvc.approveUniversity(univ.code).$promise
            .then(function(res){
                if(res.success){
                    $scope.universityList.splice($scope.universityList.indexOf(univ),1);
                    console.log('변경완료');
                }
                else{
                    alert("처리 실패")
                }
            })
    }

    $scope.denyUniversity = function(univ){
        adminSvc.denyUniversity(univ.code).$promise
            .then(function(res){
                if(res.success){}
                else{
                    alert("처리 실패")
                }
            })
    }


    $scope.getUnivUser = function(univ){
        adminSvc.getUnivUser(univ.code).$promise
            .then(function(res){
                console.log(res);
                if(res.success){
                    $scope.userList = res.result.list;
                }
                else{
                    alert("처리 실패")
                }
            })
    }

    $scope.modifyUserUniversity = function(user){
        adminSvc.modifyUserUniversity(user.id,user.universityCode).$promise
            .then(function(res){
                if(res.success){
                    $scope.userList.splice($scope.userList.indexOf(user),1);
                    console.log('변경완료');
                }
                else{
                    alert("처리 실패")
                }
            })
    }
})


app.controller('dashboardCtrl',function($scope,$window,adminSvc){


    $scope.todayJoinOptions = {
        chart: {
            type: 'discreteBarChart',
            height: 300,
            margin: {
                top: 20,
                right: 20,
                bottom: 50,
                left: 55
            },
            x: function (d) {
                return d.label;
            },
            y: function (d) {
                return d.value;
            },
            showValues: true,
            valueFormat: function (d) {
                return d3.format(',.4f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: '가입자'
            },
            yAxis: {
                axisLabel: '',
                axisLabelDistance: -10
            }
        }
    };

    $scope.userAgeOptions = {
        chart: {
            type: 'multiBarChart',
            height: 300,
            margin : {
                top: 20,
                right: 20,
                bottom: 45,
                left: 45
            },
            x: function(d){
                return d.label;
            },
            y: function(d){
                return d.value;
            },
            clipEdge: true,
            duration: 500,
            stacked: true,
            xAxis: {
                showMaxMin: false
            },
            yAxis: {
                axisLabel: 'Values'
//                ,
//                tickFormat: function(d){
//                    return d3.format(',.0d')(d);
//                }
            },
            reduceXTicks: false
        }
    }


    $scope.init = function(){
        adminSvc.dashboard(function(res){
            console.log(res);
            if(res.success) {
                {
                    $scope.logs = res.result.logs;
                    $scope.device = res.result.device;
                    $scope.countJoinToday = res.result.countJoinToday;

                    $scope.todayJoinData = [
                        {
//                        key: "Cumulative Return",
                            values: [
                                {
                                    "label": "남",
                                    color: "#1f77b4",
                                    "value": res.result.countJoinToday.male
                                } ,
                                {
                                    "label": "여",
                                    color: "#d62728",
                                    "value": res.result.countJoinToday.female
                                }
                            ]
                        }
                    ]
                }// today join

                {
                    $scope.countKockToday = res.result.countKockToday;

                    $scope.todayKockData = [
                        {
//                        key: "Cumulative Return",
                            values: [
                                {
                                    "label": "남",
                                    color: "#1f77b4",
                                    "value": res.result.countKockToday.male
                                } ,
                                {
                                    "label": "여",
                                    color: "#d62728",
                                    "value": res.result.countKockToday.female
                                }
                            ]
                        }
                    ]
                }// today join

                {
                    $scope.userAge = {};
                    $scope.userAge.male = res.result.ageMale;
                    $scope.userAge.female = res.result.ageFemale;



                    $scope.userGrade = {};
                    $scope.userGrade.male = res.result.gradeMale;
                    $scope.userGrade.female = res.result.gradeFemale;


                    $scope.userAgeData = [
                        {
                            key : '남',
                            color: "#1f77b4",
                            values : $scope.userAge.male
                        },
                        {
                            key: '여',
                            color: "#d62728",
                            values: $scope.userAge.female
                        }
                    ];


                    $scope.userGradeData = [
                        {
                            key : '남',
                            color: "#1f77b4",
                            values : $scope.userGrade.male
                        },
                        {
                            key: '여',
                            color: "#d62728",
                            values: $scope.userGrade.female
                        }
                    ];


                }
            }
            else {
                alert("성민에게 문의 주세요");
            }
        });
    }

});




var key= "2591a84f1009d7b7cc0e5e1b425859f60ddcfbad";



app.factory('sendbirdAdminSvc', function (RESTapi,adminSendbird) {

    var Svc = {
        getMessages : function(url,msgId,callback){
            adminSendbird.admin(
                {
                    func : "read_messages"
                },
                {
                    auth : key,
                    channel_url : url,
                    limit : 100,
                    message_id : msgId
                }
                ,function(res){
                    console.log("res",res);
                    callback(res);
                }
                ,function(err){
                    alert('server check');
                })
        }
    }

    return Svc;
});



app.factory('chatSvc',function(adminSvc){
    var chat = {};
    chat.messages = [];
    chat.channel_url = null;
    chat.message_id = 0;


    var ing = true;
    var SVC = {};
    SVC.chat = chat;
    SVC.getMessages = function(info){
        if(ing){
            ing = false;
            adminSvc.readMessages(chat.channel_url,info.message_id)
                .$promise
                .then(function(res){
                    ing = true;
                    console.log(chat.messages);
                    if(chat.messages.length == 0 || res.result.messages[0].message_id != chat.messages[0].message_id){
                        chat.messages = res.result.messages.concat(chat.messages);;
                    }
                    else{
                        alert('내용이 더이상 없습니다');
                    }
                })
                .catch(function(err){
                    ing = true;
                    alert(err);
                })
        }



    }

    SVC.getClassByUserType = function(message){
        var gender = message.gender;
        var ret = 'unknown';
        if(gender == 'male'){
            ret = 'male';
        }
        else if(gender == 'female'){
            ret = 'female';
        }


        return ret;
    };
    SVC.setRoom = function(info){
        // if(chat.channel_url != info.channel_url){
        chat.messages = [];
        // }
        chat.channel_url = info.channel_url;
        chat.message_id = info.message_id;
        SVC.init();
    }

    SVC.init = function(){
        SVC.getMessages(chat.message_id||0)
    }
    return SVC;

})

app.factory('photoSvc',function($rootScope){
    var SVC = {};
    SVC.open = false;
    SVC.photo = null;
    SVC.thumbnails = [];
    $rootScope.viewPhoto = function(photo){
        console.log(photo);
        if(Array.isArray(photo)){
            SVC.thumbnails = photo.map(function(obj){
                return obj.photo;
            });
            SVC.photo = SVC.thumbnails[0];
            console.log(SVC.thumbnails)
        }
        else{
            SVC.photo = photo;

        }
        SVC.open = true;
    }

    $rootScope.setPhoto = function(photo){
        SVC.photo = photo;
    }

    $rootScope.closePhoto = function(){
        // SVC.photo = null;
        SVC.open = false;
        SVC.thumbnails = [];
    }

    return SVC;
})
//chat controller
app.controller('chatCtrl',function($scope,$window,adminSvc,chatSvc){
    $scope.chat = chatSvc.chat;


    $scope.getMoreMessage = function(report){
        chatSvc.readMessages(chatSvc.messages[0].message_id||0);
    }
    $scope.getClassByUserType = chatSvc.getClassByUserType;

})


//screen controller
app.controller('screenCtrl',function($rootScope,$scope,$window,adminSvc){

    $scope.page = 0;
    //리스트 가져오기
    $scope.screenPhoto = {};
    $scope.init = function(){
        $scope.getScreenPhoto();
    }
    $scope.getScreenPhoto = function(){
        $scope.screenPhoto = {};

        adminSvc.getScreenPhoto()
            .$promise
            .then(function(res){
                $scope.screenPhoto = res.result;
                console.log($scope.screenPhoto)
            })
            .catch(function(err){
                alert("server err");
            })
    }

    $scope.approvePhoto = function(){
        adminSvc.approvePhoto($scope.screenPhoto).$promise
            .then(function(res){
                $scope.getScreenPhoto();
            })
    }


    $scope.denyPhoto = function(){
        adminSvc.denyPhoto($scope.screenPhoto).$promise
            .then(function(res){
                $scope.getScreenPhoto();
            })
    }
});

app.controller('photoCtrl',function($scope,photoSvc){
    $scope.svc = photoSvc;
})
app.controller('reportCtrl',function($scope,$window,adminSvc,chatSvc){

    $scope.showDone = false;
    $scope.reportPage = 0;
    $scope.doneReportPage = 0;



    //report리스트
    $scope.reportList = [];
    $scope.doneReportList = [];

    //리스트 가져오기
    $scope.init = function(){
        if(!$scope.reportList.length){
            $scope.getReportList();
        }
        if(!$scope.doneReportList.length){
            $scope.getDoneReportList();
        }

        $scope.report = {
            idx : null,
            id : null,
            message : null,
            formOpen : false
        };
    }


    $scope.getReportList = function(){
        adminSvc.getReportList($scope.reportPage).$promise
            .then(function(res){
                if(!res.error){
                    if(res.result.reportList.length > 0){
                        $scope.reportList = $scope.reportList.concat(res.result.reportList);
                        $scope.reportPage++;
                    }
                    else{
                        // alert('더 이상 없음');
                    }
                    $scope.reportCount = res.result.reportCount;
                    console.log("report",$scope.reportList);
                }
                else{
                    alert('server error');
                }

            })
    }


    $scope.getDoneReportList = function(){
        adminSvc.getDoneReportList($scope.doneReportPage).$promise
            .then(function(res){
                if(!res.error){
                    if(res.result.doneReportList.length > 0){
                        $scope.doneReportList = $scope.doneReportList.concat(res.result.doneReportList);
                        $scope.doneReportPage++;
                    }
                    else{
                        // alert('더 이상 없음');
                    }
                    $scope.doneReportCount = res.result.doneReportCount;
                    console.log("report",$scope.doneReportList);
                }
                else{
                    alert('server error');
                }
            })
    }

    $scope.setRoom = chatSvc.setRoom;







    //신고할 사람
    $scope.report = {
        idx : null,
        id : null,
        message : null,
        formOpen : false
    };


    $scope.openReportForm = function(reportInfo){
        $scope.report.idx = reportInfo.idx;
        $scope.report.formOpen = true;
        $scope.report.message = null;
        $scope.report.id = reportInfo.id;
    }
    $scope.closeReportForm = function(){
        //신고할 사람
        $scope.report = {
            idx : null,
            id : null,
            message : null,
            formOpen : false
        };
    }

    $scope.doReport = function(){
        adminSvc.doReport($scope.report).$promise
            .then(function(res){
                if(res && res.success){
                    $scope.closeReportForm();
                    $scope.doneReportList.unshift($scope.reportList.shift());
                }
                else{
                    alert('server err');
                }
            })
    }


    $scope.setDoneReport = function(report){
        adminSvc.setDoneReport(report).$promise
            .then(function(res){
                if(res && res.success){
                    $scope.reportList.splice($scope.reportList.indexOf(report),1);
                    $scope.doneReportList.unshift(report);
                }
                else{
                    alert('server err');
                }
            })
    }

    $scope.setReqReport = function(report){
        adminSvc.setReqReport(report).$promise
            .then(function(res){
                if(res && res.success){
                    $scope.doneReportList.splice($scope.doneReportList.indexOf(report),1);
                    $scope.reportList.unshift(report);
                }
                else{
                    alert('server err');
                }
            })
    }
});
