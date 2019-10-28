const express = require('express');
const router = express.Router();

router.get('/profile',(req,res)=>{
    res.render('profile',{title:'내정보',user:null});
});

router.get('/join',(req,res)=>{
    res.render('join',{title:'회원가입',user:null,joinError:req.flash('joinError')});
});

router.get('/',(req,res)=>{
    res.render('main',{title:'NodeBird',twits:[],user:null,loginError:req.flash('loginError')});
});

module.exports = router;