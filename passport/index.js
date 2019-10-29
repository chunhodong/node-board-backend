const local = require('./localStrategy');
const User = require('../models/user');
//const {User} = require('../models');

module.exports = (passport) => {
    //req.session객체에 user.id를 저장
    passport.serializeUser((user,done)=>{
        done(null,user.email);
    });

    //serializeUser에서 받은 id를 가지고,req객체에 저장
    passport.deserializeUser((email,done)=>{
        //유저검색
        //db.find => done(user)
        
        const user = {email}; 
        User.findUserOne(user)
        .then(exUser => done(null,exUser))
        .catch(err=>done(err));
        
    });

    local(passport);
};