const db = require('./common');

const findUserOne = async (user) =>{
    try {
        const query = "SELECT * FROM member WHERE email = ? AND password = ?";
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query, [user.email,user.password]);
        connection.release();
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    }

}

//이메일로 유저검색
const findUserByEmail = async (user) => {
    try {
        const query = "SELECT * FROM member WHERE email = ?";
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query, [user.email]);
        connection.release();
        return rows;
    } catch (error) {
        return false;
    }

}

//SNS로 유저검색
const findUserBySns = async (user)=>{

    try{
        const query = "SELECT * FROM member WHERE snsId=? AND provider=?";
        const connection = await db.getConnection(async conn => conn);
        console.log("find sns id : ",user.snsId);
        console.log("find provider id : ",user.provider);
        
        const [rows] = await connection.query(query,[user.snsId,user.provider]);
        connection.release();

        return rows;
    }catch(error){
        console.error('find sns error : ',error);
        return false;
    }
}


//ID로 유저검색
const findUserById = async (user) => {
    try {
        const query = "SELECT * FROM member WHERE id = ?";
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query, [user.id]);
        connection.release();
        return rows;
    } catch (error) {
        return false;
    }

}




//유저생성
const createUserOne = async (user) => {
    try {
        const query = "INSERT INTO member(email,nick,password,provider,snsId) VALUES(?,?,?,?,?)";
        const connection = await db.getConnection(async conn => conn);

        const [rows] = await connection.query(query, [user.email, user.nick, user.password,user.provider,user.snsId]);
        await connection.commit();
        connection.release();
        return rows;
    } catch (error) {
        console.log('createUsererror : ',error);
        return false;
    }

}

module.exports.findUserByEmail = findUserByEmail;
module.exports.findUserById = findUserById;
module.exports.findUserBySns = findUserBySns;
module.exports.createUserOne = createUserOne;
module.exports.findUserOne = findUserOne;
