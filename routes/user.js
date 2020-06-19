const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
 
        return res.status(200).json({
            code: 200,
            message: 'server ok'
        });

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