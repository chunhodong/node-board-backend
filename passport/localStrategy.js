const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        //done => passport.authenticate의 콜백함수
    }, async (email, password, done) => {
        try {
            const user = {email,password};
            const exUser = await User.findUserOne(user);
            console.log('login strategy exUser : ',exUser);
            
            if(exUser.length == 0){
                done(null,false,{message:'존재하지 않는 유저입니다.'});
            }
            //존재하는 유저
            const result = await bcrypt.compare(use.password,exUser.password);
            if(result){
                done(null,exUser);
            }
            else{
                done(null,false,{message:'비밀번호가 일치하지 않습니다.'})

            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};

