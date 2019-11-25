const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } = require('./middlewares');

const router = express.Router();

router.post('/token', async (req, res) => {
    try {
        


        const token = jwt.sign({
            id: req.body.id,
            nick: req.body.nick
        }, process.env.JWT_SECRET, {
            expiresIn: '1m',
            issuer: 'nodebird'
        })

        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다',
            token
        })
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            code:500,
            message:'서버 에러'
        });
    }
});

router.get('/test',verifyToken,(req,res)=>{
    res.json(req.decoded);
});

module.exports = router;