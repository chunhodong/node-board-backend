const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Member = require('../models/member');
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

router.get('/readOne', verifyToken, async (req, res, next) => {
    try {
        const member_id = req.decoded.id;

        const member = await Member.selectMemberOne({id :member_id});

        return res.status(200).json({
            code: 200,
            message: '성공',
            data:member[0]
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러'
        });

    }
});

router.post('/modify', verifyToken, upload.single('img'), async (req, res, next) => {
    try {
        const member_img = req.file === undefined ? req.body.member_img : req.file.location;

        await Member.updateMember({ email: req.body.member_email, nick: req.body.member_nick, img: member_img, id: req.body.member_id });

        return res.status(200).json({
            code: 200,
            message: '성공',
            
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러'
        });

    }
});

module.exports = router;