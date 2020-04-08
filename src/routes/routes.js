const express = require('express');
const router  = express.Router();

const discord = require('../discord/index');

router.get('/', async(req, res) => {
    res.render('index');
});

router.get('/discord', async(req, res) => {
    res.json({
        "status": discord.getStatus(),
        "ping": discord.getPing()
    });
});

module.exports = router;