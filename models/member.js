const db = require('./common');
//게시물저장
const selectMemberOne = async (member) => {
    try {
        const query = "SELECT email,nick,provider,img FROM member WHERE id = ?";
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query, [member.id]);
        await connection.commit();
        connection.release();
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.selectMemberOne = selectMemberOne;