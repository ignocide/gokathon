/**
 * Created by Administrator on 2016-08-06.
 */

exports.insertMember = "INSERT INTO member(userid,pw,email,nickname) values ($userid,$pw,$email,$nickname)";

exports.insertExtra = "INSERT INTO extra(id,height,weight) values ($id,$height,$weight)";

exports.login = "SELECT * FROM member WHERE userid = $userid";


///////////////////////////////////////////////////////////////////////////////////

exports.createContent = "INSERT INTO contents(id,writerId,title,content,link,thumbnail) values ($id,$writerId,$title,$content,$link,$thumbnail)";

exports.incrHitContent = "UPDATE contents set hit = hit+1 WHERE idx = $idx";

exports.readContent = "SELECT * FROM contents JOIN cate ON cate.cateIdx = contents.cateIdx WHERE idx = $idx";
//exports.insert = "INSERT INTO contents(id,writerId,title,content) values ($id,$writerId,$title,$content)";
exports.scoreContent = "INSERT INTO scores (idx,id,score) values ($idx,$id,$score)";

exports.rankDance = "SELECT contents.*, FROM contents " +
    "JOIN cate ON cate.cateIdx = contents.cateIdx " +
    "JOIN scores ON contents.idx = scores.idx " +
    "GROUP BY contents.idx ORDER BY LIMIT 5";

