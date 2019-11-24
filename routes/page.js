const express = require('express');
const router = express.Router();
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');
const Post = require('../models/post');

router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('profile',{title:'내정보',user:req.user});
});

router.get('/join',isNotLoggedIn,(req,res)=>{
    res.render('join',{title:'회원가입',user:null,joinError:req.flash('joinError')});
});

router.get('/',async(req,res)=>{
    const posts = await Post.findPostAll(req.user);
    res.render('main',{title:'NodeBird',twits:posts,user:req.user,loginError:req.flash('loginError')});
});

module.exports = router;