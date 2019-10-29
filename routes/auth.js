const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

//회원가입
router.post('/join', isNotLoggedIn, async (req, res) => {
    const user = req.body;
    try {

        //유저찾기
        const exUser = await User.findUserOne(user);
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
        await User.createUserOne(user);
        return res.redirect('/');

    }
    catch (error) {
        console.error(error);
        return next(error);
    }

});

//로그인
router.post('/login', isNotLoggedIn, (req, res,next) => {

    passport.authenticate('local', (authError, user, info) => {
    
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            req.flash('loginError', info.message);
            return res.redirect('/');
        }
        return req.logIn(user, (loginError) => {
            if (loginError) {
                return next(loginError);
            }
            return res.redirect('/');
        });

    })(req, res,next);

});

//로그아웃
router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.session.destory();
    res.redirect('/');
});

module.exports = router;