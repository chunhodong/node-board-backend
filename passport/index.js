const local = require('./localStrategy');
//const {User} = require('../models');

module.exports = (passport) => {
    //req.session객체에 user.id를 저장
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    //serializeUser에서 받은 id를 가지고,req객체에 저장
    passport.deserializeUser((id,done)=>{
        //유저검색
        //db.find => done(user) 
    });

    local(passport);
};