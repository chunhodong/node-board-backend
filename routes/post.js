const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Post = require('../models/post');

router.post('/', isLoggedIn, async (req, res, next) => {
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