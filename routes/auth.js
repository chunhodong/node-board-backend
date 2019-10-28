const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');
//회원가입
router.post('./join',isNotLoggedIn,(req,res)=>{
    const {email,nick,password} = req.body;
    try{
    //유저찾기
    //const exUser = db.find

    //존재하는 유저라면 res
    //if(exUser){}

    //const hash = await bcrypt.hash(password,12);
    
    //유저추가
    return res.redirect('/');
    
    }
    catch(error){
        console.error(error);
        return next(error);
    }
    
});

//로그인
router.post('./login',isNotLoggedIn,(req,res)=>{
    
    passport.authenticate('local',(authError,user,info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            req.flash('loginError',info.message);
            return res.redirect('/');
        }
        return req.logIn(user,(loginError)=>{
            if(loginError){
                return next(loginError);
            }
            return res.redirect('/');
        });

    })(req,res,next);

});

//로그아웃
router.post('./logout',isLoggedIn,(req,res)=>{
    req.logout();
    res.session.destory();
    res.redirect('/');
});

module.exports = router;