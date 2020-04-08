const express = require('express');
const router  = express.Router();

const api = require('./api/api');
const docs = require('./docs');

const discord = require('../discord/index');

router.use('/api', api);
router.use('/doc', docs);

router.get('/', async (req, res) => {
    res.render('index');
});

router.get('/api/discord', async (req, res) => {
    const message = JSON.stringify({ "status": discord.getStatus(), "ping": discord.getPing() });

    res.render('message', {
        msg: message
    });
});

module.exports = router;
