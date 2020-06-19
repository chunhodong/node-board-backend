const express = require('express');

const router = express.Router();

router.get('/user', async (req, res, next) => {
    try {
 


    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: 'server error'
        });

    }
});


module.exports = router;