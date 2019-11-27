const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Post = require('../models/post');
const {verifyToken} = require('./middlewares');



const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },

    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
});
const upload2 = multer();

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