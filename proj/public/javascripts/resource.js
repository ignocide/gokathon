/**
 * Created by Administrator on 2016-08-06.
 */
'use strict';
// 모듈 명칭 정의
var RestfulSvc = angular.module('RestfulSvc', []);

RestfulSvc.factory('RESTapi', ['$resource', function ($resource) {
//    var prefixUrl = "http://172.24.2.183:8080/";
    var prefixUrl = "";
    /**
     * @domain : biz object ex) person
     * @key : biz object id ex) persion id is 123
     * @action : server action name. if it exist, you can define or not.
     * ex) http://www.bennadel.com/blog/2433-Using-RESTful-Controllers-In-An-AngularJS-Resource.htm
     *
     * add a update action for method of PUT
     */
    return $resource(
        // 호출하는 url 형식
            prefixUrl + "/:svc/:func",
        // 호출 url 형식의 :domain :key :action 에 동적으로 받게 되는 파라미터
        {
            svc: "@svc",
            func: "@func"
        }
        ,
        // 추가 action들 one, all, update
        {
            member : {
                method: 'POST',
                params : {
                    svc : "member"
                }
                ,withCredentials :true
            },
            // one: { method: 'post', isArray: false },
            // all: { method: 'post', isArray: true },
            // update: {method:'post'}
            content : {
                method: 'POST',
                params : {
                    svc : "content"
                }
                ,withCredentials :true
            },
            rank : {
                method: 'POST',
                params : {
                    svc : "rank"
                }
                ,withCredentials :true
            }
        }
    );
}]);



RestfulSvc.factory('restSvc', function (RESTapi) {

    var Svc = {
        login : function(userid,pw){
            return RESTapi.member(
                {
                    func : "login"
                },
                {
                    userid : userid,
                    pw : pw
                }
            )

            // return new RESTapi({svc : "users", func : "signupFormInfo"})
        },
        getRanks : function(){
            return RESTapi.rank(
                {
                    func : "feed"
                },{

                }
            )
        },
        getDoneReportList : function(page){
            return RESTapi.admin(
                {
                    func : "getDoneReportList"
                },
                {
                    page : page
                }
            )
        },
        getReportList : function(page){
            return RESTapi.admin(
                {
                    func : "getReportList"
                },
                {
                    page : page
                }
            )
        }
        ,dashboard : function(callback){
            RESTapi.admin(
                {
                    func : "dashboard"
                },
                {
                }
                ,function(res){
                    callback(res);
                }
                ,function(err){
                    alert('server check');
                })
        }
        ,getScreenPhoto : function(callback){
            return RESTapi.admin(
                {
                    func : "getScreenPhoto"
                },
                {
                }
            )
        }
        ,readMessages : function(channel_url,message_id,callback){
            return RESTapi.admin(
                {
                    func : "readMessages"
                },
                {
                    channel_url : channel_url,
                    message_id : message_id
                }
            )
        }
        ,getUserInfo : function(targetId){
            return RESTapi.admin(
                {
                    func : "getUserInfo"
                },
                {
                    targetId : targetId
                }
            )
        }
        ,doReport : function(reportInfo){
            return RESTapi.admin(
                {
                    func : "doReport"
                },
                {
                    idx : reportInfo.idx,
                    reportId : reportInfo.id,
                    message : reportInfo.message
                }
            )
        }
        ,setDoneReport : function(reportInfo){
            return RESTapi.admin(
                {
                    func : "setDoneReport"
                },
                {
                    idx : reportInfo.idx
                }
            )
        }
        ,setReqReport : function(reportInfo){
            return RESTapi.admin(
                {
                    func : "setReqReport"
                },
                {
                    idx : reportInfo.idx
                }
            )
        }

        ,approvePhoto : function(screenPhoto){
            return RESTapi.admin(
                {
                    func : "approvePhoto"
                },
                {
                    idx : screenPhoto.idx,
                    id : screenPhoto.id
                }
            )
        }
        ,denyPhoto : function(screenPhoto){
            return RESTapi.admin(
                {
                    func : "denyPhoto"
                },
                {
                    idx : screenPhoto.idx,
                    id : screenPhoto.id
                }
            )
        }
        ,changeNick : function(id,nick){
            return RESTapi.admin(
                {
                    func : "changeNick"
                },
                {
                    id : id,
                    nickName : nick
                }
            )
        }
        ,getReqUniversityList : function(){
            return RESTapi.admin(
                {
                    func : "getReqUniversityList"
                },
                {
                }
            )
        }
        ,approveUniversity : function(code){
            return RESTapi.admin(
                {
                    func : "approveUniversity"
                },
                {
                    code : code
                }
            )
        }
        ,denyUniversity : function(code){
            return RESTapi.admin(
                {
                    func : "denyUniversity"
                },
                {
                    code : code
                }
            )
        }
        ,getUnivUser : function(code){
            return RESTapi.admin(
                {
                    func : "getUnivUser"
                },
                {
                    code : code
                }
            )
        }
        ,modifyUserUniversity : function(id,universityCode){
            return RESTapi.admin(
                {
                    func : "modifyUserUniversity"
                },
                {
                    id : id,
                    universityCode : universityCode
                }
            )
        }
        ,searchUser : function(users,page){
            return RESTapi.admin(
                {
                    func : "searchUser"
                },
                {
                    id : users.id,
                    nickName : users.nickName,
                    universityCode : users.universityCode,
                    majorCode : users.majorCode,
                    locationCode : users.locationCode,
                    heightLevel : users.heightLevel,
                    drinkLevel : users.drinkLevel,
                    enterYear : users.enterYear,
                    gender : users.gender,
                    birth : users.birth,
                    joinDate : users.joinDate,
                    confirm : users.confirm,
                    page : page || 0
                }
            )
        }

    }
    return Svc;
});

