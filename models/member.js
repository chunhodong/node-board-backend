const db = require('./common');
//게시물저장
const selectMemberOne = async (member) => {
    try {
        const query = "SELECT id,email,nick,provider,img FROM members WHERE id = ?";
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

const updateMember = async (member) => {
    try {
        const query = "UPDATE members SET email=?,nick=?,img=? WHERE id = ?";
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query, [member.email,member.nick,member.img,member.id]);
        await connection.commit();
        connection.release();
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

const findUserOne = async (user) =>{
    try {
        const query = "SELECT * FROM members WHERE email = ? AND password = ?";
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
        const query = "SELECT * FROM members WHERE email = ?";
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
        const query = "SELECT * FROM members WHERE snsId=? AND provider=?";
        const connection = await db.getConnection(async conn => conn);        
        const [rows] = await connection.query(query,[user.snsId,user.provider]);
        connection.release();

        return rows;
    }catch(error){
        console.error(error);
        return false;
    }
}


//ID로 유저검색
const findUserById = async (user) => {
    try {
        const query = "SELECT * FROM members WHERE id = ?";
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query, [user.id]);
        connection.release();
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    }

}




//유저생성
const createUserOne = async (user) => {
    try {
        const query = "INSERT INTO members(email,nick,password,provider,snsId) VALUES(?,?,?,?,?)";
        const connection = await db.getConnection(async conn => conn);

        const [rows] = await connection.query(query, [user.email, user.nick, user.password,user.provider,user.snsId]);
        await connection.commit();
        connection.release();
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    }

}

module.exports = {
    selectMemberOne,
    updateMember,
    findUserByEmail,
    findUserById,
    findUserBySns,
    createUserOne,
    findUserOne
};