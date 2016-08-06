/**
 * Created by Administrator on 2016-08-06.
 */

exports.insertMember = "INSERT INTO member(userid,pw,email,nickname) values ($userid,$pw,$email,$nickname)";

exports.insertExtra = "INSERT INTO extra(id,height,weight,age) values ($id,$height,$weight,$age)";

exports.login = "SELECT * FROM member WHERE userid = $userid";


///////////////////////////////////////////////////////////////////////////////////

exports.createContent = "INSERT INTO contents(id,cateIdx,writerId,title,content,link,thumbnail) values ($id,$cateIdx,$writerId,$title,$content,$link,$thumbnail)";

exports.incrHitContent = "UPDATE contents set hit = hit+1 WHERE idx = $idx";

exports.readContent = "SELECT contents.*, count(scores.idx) as sum, avg(IFNULL( score, 0)) as avgScore FROM contents JOIN cate ON cate.cateIdx = contents.cateIdx LEFT OUTER JOIN scores ON contents.idx = scores.idx WHERE contents.idx = $idx GROUP BY contents.idx ";

exports.getList = "SELECT contents.*, count(scores.idx) as sum, avg(IFNULL( score, 0)) as avgScore FROM contents JOIN cate ON cate.cateIdx = contents.cateIdx LEFT OUTER JOIN scores ON contents.idx = scores.idx GROUP BY contents.idx ORDER BY time desc LIMIT $offset, 10";

exports.readComments = "SELECT comments.*,member.nickname FROM comments JOIN member ON member.id = comments.id WHERE contentId = $idx";

//exports.insert = "INSERT INTO contents(id,writerId,title,content) values ($id,$writerId,$title,$content)";
exports.scoreContent = "INSERT INTO scores (idx,id,score) values ($idx,$id,$score)";

exports.rankDance = "SELECT contents.*, member.nickname, cate.cate, avg(IFNULL( score, 0)) as avgScore FROM contents  " +
    "JOIN member ON contents.id = member.id JOIN cate ON cate.cateIdx = contents.cateIdx " +
    "LEFT OUTER JOIN scores ON contents.idx = scores.idx " +
    "WHERE contents.cateIdx = 2 " +
    "GROUP BY contents.idx ORDER BY avgScore desc LIMIT 4";

exports.rankSing = "SELECT contents.*,member.nickname, cate.cate, avg(IFNULL( score, 0)) as avgScore FROM contents  " +
    "JOIN member ON contents.id = member.id JOIN cate ON cate.cateIdx = contents.cateIdx " +
    "LEFT OUTER JOIN scores ON contents.idx = scores.idx " +
    "WHERE contents.cateIdx =  1 " +
    "GROUP BY contents.idx ORDER BY avgScore desc LIMIT 4";

exports.rankAct = "SELECT contents.*,member.nickname, cate.cate, avg(IFNULL( score, 0)) as avgScore FROM contents  " +
    "JOIN member ON contents.id = member.id JOIN cate ON cate.cateIdx = contents.cateIdx " +
    "LEFT OUTER JOIN scores ON contents.idx = scores.idx " +
    "WHERE contents.cateIdx = 3 " +
    "GROUP BY contents.idx ORDER BY avgScore desc LIMIT 4";

exports.rankAll = "SELECT contents.*,member.nickname, cate.cate, avg(IFNULL( score, 0)) as avgScore FROM contents  " +
    "JOIN member ON contents.id = member.id JOIN cate ON cate.cateIdx = contents.cateIdx " +
    "LEFT OUTER JOIN scores ON contents.idx = scores.idx " +
    "GROUP BY contents.idx ORDER BY avgScore desc LIMIT 4";

exports.writeComment = "INSERT INTO comments (contentId,id,content) VALUES ($idx,$id,$content)"