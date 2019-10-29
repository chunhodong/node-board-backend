const db = require('./common');

const createPostOne = async (post) => {
    try {
        const query = "INSERT INTO posts(content,user) VALUES(?,?)";
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query, [post.content, post.user]);
        await connection.commit();
        connection.release();
        console.log('post rows = ', rows);
        return rows;
    } catch (error) {
        console.log("error = ", error);
        return false;
    }
}

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

module.exports.createPostOne = createPostOne;
module.exports.createHashTag = createHashTag;
module.exports.createPostToHashTag = createPostToHashTag;
module.exports.findPostAll = findPostAll;
