const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const user = {email,password};
            const exUser = await User.findUserByEmail(user);
            
            //존재하지 않는 유저
            if(exUser.length == 0){
                done(null,false,{message:'존재하지 않는 유저입니다.'});
            }
            
            //비밀번호 비교
            const result = await bcrypt.compare(user.password,exUser[0].password);
            if(result){
                done(null,exUser[0]);
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

