const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Post = require('../models/post');
const { verifyToken, isLoggedIn, isNotLoggedIn } = require('./middlewares');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

AWS.config.update({
    accessKeyId: "AKIAI6MGHF62OBBLFJGA",
    secretAccessKey: "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",
    region: 'ap-northeast-2',
});
const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'node-board',
        acl: 'public-read',
        key(req, file, cb) {
            req.file = file;
            cb(null, `original/${+new Date()}_${path.basename(file.originalname)}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
})

router.post('/create', verifyToken, upload.single('img'), async (req, res, next) => {
    try {
        const article_img = req.file === undefined ? '' : req.file.location;

        await Post.createPostOne({ title: req.body.article_title, content: req.body.article_content, img: article_img, user: req.decoded.id });

        return res.status(200).json({
            code: 200,
            message: '성공'
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러'
        });

    }
});


router.get('/readAll',async (req, res, next) => {
    try {
        
        const posts = await Post.selectPostAll();
        return res.status(200).json({
            code:200,
            message:'success',
            data:posts

        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: error.message
        });

    }
});

router.get('/sample', (req, res, next) => {
    try {
        return res.status(200).json({
            code: 200,
            message: '게시물이 삭제되었습니다.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러'
        });

    }
});

router.post('/delete', verifyToken, async (req, res, next) => {
    try {

        await Post.deletePostOne(req.body.id);
        return res.status(200).json({
            code: 200,
            message: '게시물이 삭제되었습니다.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러'
        });

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