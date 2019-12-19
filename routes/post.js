const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Post = require('../models/post');
const { verifyToken} = require('./middlewares');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

AWS.config.update({
    accessKeyId: 'AKIAIRUQOL3S5XQQQBZA',
    secretAccessKey: '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',
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


router.get('/readOne',async (req, res, next) => {
    try {
        const articleId = req.query.articleId;
        
        const article = await Post.selectPostOne({articleId});
        return res.status(200).json({
            code:200,
            message:'success',
            data:article[0]

        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: error.message
        });

    }
});
module.exports = router;