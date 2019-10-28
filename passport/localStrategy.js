const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

//const {User} = require('../models');

module.exports = (passport) =>{
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        //done => passport.authenticate의 콜백함수
    }, async(email,password,done) =>{
        try{

           // 유저찾기
           //if(exUser){
           // const exUser = await
           // 존재한다면 비밀번호를 비교
           //결과가 존재한다면 done(null,exUser);
           //아니면 done(null,false,{});
           //}
           //else{
               //유저가 없다.
           //}
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};

