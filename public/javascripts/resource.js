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
        signup : function(userid,pw,email,nickname,height,weight,age){
            return RESTapi.member(
                {
                    func : "join"
                },
                {
                    userid: userid,
                    pw : pw,
                    email: email,
                    nickname: nickname,
                    height: height,
                    weight: weight,
                    age : age
                }
            )
        },
        getRanks : function(){
            return RESTapi.rank(
                {
                    func : "feed"
                },{

                }
            )
        },
        getContent : function(idx){
            return RESTapi.content(
                {
                    func : "read"
                },
                {
                    idx: idx
                }
            )
        },
        doScore : function(score,idx){
            return RESTapi.content(
                {
                    func : "score"
                },
                {
                    score : score,
                    idx: idx
                }
            )
        },
        writeComment : function(content,idx){
            return RESTapi.content(
                {
                    func : "writeComment"
                },
                {
                    idx : idx,
                    content : content
                }
            )
        },
        logout : function(content,idx){
            return RESTapi.member(
                {
                    func : "logout"
                },
                {
                }
            )
        },
        writeContent : function(writeInfo){
            console.log(writeInfo)
            return RESTapi.content(
                {
                    func : ""
                },
                {
                    title : writeInfo.title,
                    content : writeInfo.content,
                    link : writeInfo.link,
                    cateIdx : writeInfo.cateIdx
                }
            )
        },
        getList : function(page){
            return RESTapi.content(
                {
                    func : "list"
                },
                {
                    page : page
                }
            )
        }
    }
    return Svc;
});

