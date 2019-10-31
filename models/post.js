const db = require('./common');

//게시물저장
const createPostOne = async (post) => {
    try {
        const query = "INSERT INTO posts(content,img,userid) VALUES(?,?,?)";
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query, [post.content, post.img, post.user]);
        await connection.commit();
        connection.release();
        console.log('post rows = ', rows);

        return rows;

    } catch (error) {
        console.log("error = ", error);
        return false;
    }
}

//해시태그 저장
const createHashTag = async (tag) => {
    try {
        const query = "INSERT INTO hashtag(title) VALUES(?)";
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query, [tag]);
        await connection.commit();
        connection.release();
        return rows;
    } catch (error) {
        console.log("error = ", error);

        return false;
    }
};

const checkDupTag = async (tag) => {
    try {
        const query = "SELECT *,count(*) as cnt FROM hashtag WHERE title = ?";
        const connection = await db.getConnection(async conn => conn);
        const [result] = await connection.query(query, [tag]);
        console.log("check result = ",result[0]);
        console.log("check result = ",result[0].cnt);

        return result[0].cnt == 0 ? tag : result[0].id;

    } catch (error) {
        return '';
    }
}

//게시물-해시태그 관계저장
const createPostToHashTag = async (postid, tagid) => {
    try {
        const query = "INSERT INTO posthashtag(postid,hashtagid) VALUES(?,?)";
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query, [postid, tagid]);
        await connection.commit();
        connection.release();
        return rows;
    } catch (error) {
        console.log("error = ", error);

        return false;
    }
};

//모든 게시물검색
const findPostAll = async (user) => {
    try {
        const query = "SELECT users.*,posts.* FROM users,posts WHERE users.id = posts.userid AND users.id = ?";
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query, [user.id]);
        connection.release();
        return rows;
    } catch (error) {
        return [];
    }
};

const findPostAllByHashTag = async (user, hashtag) => {
    try {
        const query = 'SELECT users.*,posts.* FROM hashtag,posthashtag,posts,users WHERE hashtag.title = ?' +
            'AND hashtag.id = posthashtag.hashtagid AND posthashtag.postid = posts.id AND users.id = ?';
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query, ['#' + hashtag, user.id]);
        connection.release();
        return rows;
    } catch (error) {
        return [];
    }
};

module.exports.createPostOne = createPostOne;
module.exports.createHashTag = createHashTag;
module.exports.createPostToHashTag = createPostToHashTag;
module.exports.findPostAll = findPostAll;
module.exports.findPostAllByHashTag = findPostAllByHashTag;
module.exports.checkDupTag = checkDupTag;