const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Post = require('../models/post');
const {verifyToken,isLoggedIn,isNotLoggedIn} = require('./middlewares');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

AWS.config.update({
    accessKeyId:process.env.S3_ACCESS_KEY_ID,
    secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,
    region:'ap-northeast-2',
});

const upload = multer({
    storage:multerS3({
        s3:new AWS.S3(),
        bucket:'node-board',
        key(req,file,cb){
            console.log('file....',file);
            cb(null,`original/${+new Date()}_${path.basename(file.originalname)}`);
        },
    }),
    limits:{fileSize:5*1024*1024},
})

router.post('/img', upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
});

router.post('/create',verifyToken,async (req, res, next) => {
    try {
        console.log('user post : ',req.body);
        console.log('user post : ',req);
        
        await Post.createPostOne({title:req.body.article_title ,content: req.body.article_content, img:  req.body.article_img, user: req.decoded.id});
     
        return res.status(200).json({
            code:200,
            message:'게시물이 등록되었습니다.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code:500,
            message:'서버 에러'
        });

    }
});

router.post('/delete',verifyToken,async (req, res, next) => {
    try {
        
        await Post.deletePostOne(req.body.id);
        return res.status(200).json({
            code:200,
            message:'게시물이 삭제되었습니다.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code:500,
            message:'서버 에러'
        });

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

router.get('/hashtag', isLoggedIn, async (req, res, next) => {
    try {
        //포스트저장
        console.log('keyworkd = ', req.query.hashtag);
        console.log('userid = ', req.user);
        //해쉬태그 아이디찾기
        const posts = await Post.findPostAllByHashTag(req.user, req.query.hashtag);
        console.log('search result = ', posts);
        res.render('main', { title: 'NodeBird', twits: posts, user: req.user, loginError: req.flash('loginError') });

        //해쉬태그 아이디와연결된 게시물찾기
        //게시물리턴

    } catch (error) {
        next(error);
    }
});
module.exports = router;