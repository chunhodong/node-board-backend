const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn,verifyToken} = require('./middlewares');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//회원가입
router.post('/join', isNotLoggedIn, async (req, res) => {
    const user = req.body;
    try {

        //유저찾기
        const exUser = await User.findUserByEmail(user);
        console.log('result = ',exUser);
        if (!exUser) {
            req.flash('joinError', '시스템 에러발생');
            return res.redirect('/join');
        }
        if (exUser.length > 0) {
            req.flash('joinError', '이미 가입된 메일입니다.');
            return res.redirect('/join');
        }

        const hash = await bcrypt.hash(user.password, 12);
        user.password = hash;
        user.provider = 'local';
        await User.createUserOne(user);
        return res.redirect('/');

    }
    catch (error) {
        console.error(error);
        return next(error);
    }

});

//로그인
router.post('/login', async (req, res,next) => {
    try {
        const user = await User.findUserOne(req.body);

        if(!user){
            return res.json({
                code:401,
                message:'등록되지 않은 사용자입니다.'
            })
        }
        const token = jwt.sign({
            id :user[0].id,
            email: user[0].email,
            nick: user[0].nick
        }, process.env.JWT_SECRET, {
            expiresIn: '60m',
            issuer: 'nodebird'
        })

        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다',
            token
        })
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            code:500,
            message:'서버 에러'
        });
    }
 
});


router.post('/token',verifyToken,async(req,res,next)=>{
    return res.status(200).json({
        code:200,
        message:'유효한 토큰입니다.'
    });
});


//로그아웃
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/');
});


//카카오톡 로그인창을 띄워줌
router.get('/kakao',passport.authenticate('kakao'));

//로그인결과를 callback으로 받음
router.get('/kakao/callback',passport.authenticate('kakao',{
    failureRedirect:'/',
}),(req,res)=>{
    res.redirect('/');
})

module.exports = router;