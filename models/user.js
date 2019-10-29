const db = require('./common');

//존재하는 유저 찾기
const findUserOne = async (user) => {
    try {
        const query = "SELECT * FROM users WHERE email = ?";
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query, [user.email]);
        connection.release();
        return rows;
    } catch (error) {
        return false;
    }

}

//유저생성
const createUserOne = async (user) => {
    try {
        const query = "INSERT INTO users(email,nick,password) VALUES(?,?,?)";
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query, [user.email, user.nick, user.password]);
        await connection.commit();
        connection.release();
        return rows;
    } catch (error) {
        return false;
    }

}

module.exports.findUserOne = findUserOne;
module.exports.createUserOne = createUserOne;

