const db = require('./common');

//게시물저장
const createPostOne = async (post) => {
    try {
        const query = "INSERT INTO posts(title,content,img,userid) VALUES(?,?,?,?)";
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query, [post.title,post.content, post.img, post.user]);
        await connection.commit();
        console.log('afkwldkdiawl');

        connection.release();
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const selectPostAll = async()=>{
    try{
        const query = "SELECT posts.*,member.nick as nick FROM posts,member WHERE posts.userid = member.id ORDER BY regdate desc";
        const connection = await db.getConnection(async conn=>conn);
        console.log('fkalekfkfee');
        const [rows] = await connection.query(query);
        connection.release();
        return rows;

    }
    catch(error){
        console.error(error);
        throw error;
    }
}

const selectPostOne = async(article) =>{
    try{

        const query = `SELECT posts.*,member.nick as nick FROM posts,member WHERE posts.id = ? AND posts.userid = member.id`;
        const connection = await db.getConnection(async conn=>conn);
        const [rows] = await connection.query(query,[article.articleId])
        connection.release();
        return rows;
    }
    catch(error){
        console.error(error);
        throw error;

    }

}





module.exports.createPostOne = createPostOne;
module.exports.selectPostAll = selectPostAll;
module.exports.selectPostOne = selectPostOne;