const express = require('express');
const router = express.Router();
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');
router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('profile',{title:'내정보',user:null});
});

router.get('/join',isNotLoggedIn,(req,res)=>{
    res.render('join',{title:'회원가입',user:null,joinError:req.flash('joinError')});
});

router.get('/',(req,res)=>{
    res.render('main',{title:'NodeBird',twits:[],user:req.user,loginError:req.flash('loginError')});
});

module.exports = router;