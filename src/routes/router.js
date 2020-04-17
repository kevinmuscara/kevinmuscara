const express = require('express');
const router  = express.Router();

router.use('/api', require('./api'));

router.get('/', async (req, res) => {
    const header = req.headers.host;

    if(header.includes('api.')) {
        res.redirect('/api');
    } else {
        res.render('index');
    }
});

module.exports = router;
