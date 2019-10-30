const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Post = require('../models/post');
const fs = require('fs');



const upload = multer({
    storage:multer.diskStorage({
        destination(req,file,cb){
            cb(null,'uploads/');
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname);
            cb(null,path.basename(file.originalname,ext) + new Date().valueOf() + ext);
        },

    }),
    limits:{fileSize:5*1024*1024},
});
router.post('/img',isLoggedIn,upload.single('img'),(req,res)=>{
    console.log(req.file);
    res.json({url:`/img/${req.file.filename}`});
});
const upload2 = multer();
router.post('/', isLoggedIn,upload2.none(),async (req, res, next) => {
    try {
        console.log("file name : ",req.body.url);
        //포스트저장
        const post = await Post.createPostOne({ content: req.body.content, img: req.body.url, user: req.user.id });
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        
        //해쉬태그저장
        if (hashtags) {
            const result = await Promise.all(hashtags.map(tag => Post.createHashTag(tag)));
            await Promise.all(result.map(item => Post.createPostToHashTag(post.insertId, item.insertId)));
        }
        res.redirect('/');
    } catch (error) {
        next(error);
    }
});

router.post('/hashtag', isLoggedIn, async (req, res, next) => {
    try {
        //포스트저장
        const post = await Post.createPostOne({ content: req.body.content, img: req.body.url, user: req.user.id });
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        
        //해쉬태그저장
        if (hashtags) {
            const result = await Promise.all(hashtags.map(tag => Post.createHashTag(tag)));
            await Promise.all(result.map(item => Post.createPostToHashTag(post.insertId, item.insertId)));
        }
        res.redirect('/');
    } catch (error) {
        next(error);
    }
});
module.exports = router;