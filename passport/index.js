const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = (passport) => {
    //req.session객체에 user.id를 저장
    passport.serializeUser((user,done)=>{
        done(null,user.email);
    });

    //serializeUser에서 받은 id를 가지고,req객체에 저장
    passport.deserializeUser(async (email,done)=>{
        //유저검색
        //db.find => done(user)
        const exUser = await User.findUserByEmail({email});
        done(null,exUser[0]);


    });

    local(passport);
    kakao(passport);
};