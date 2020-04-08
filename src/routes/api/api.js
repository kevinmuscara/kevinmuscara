const express = require('express');
const router  = new express.Router();

const request = require('request');

router.get('/', async(req, res) => {
    res.json({ "status": "Not found" });
});

router.get('/player/:username', async(req, res) => {
    request.get(`https://api.slothpixel.me/api/players/${req.params.username}`, function(error, response, body) {
        res.json({ body });
    });
});

router.get('/bans', async(req, res) => {
    request.get(`https://api.slothpixel.me/api/bans`, function(error, response, body) {
        res.json({ body });
    });
});

router.get('/health', async(req, res) => {
    String.prototype.toHHMMSS = function() {
        var second_number = parseInt(this, 10);
        var hours = Math.floor(second_number / 3600);
        var minutes = Math.floor((second_number - (hours * 3600)) / 60);
        var seconds = second_number - (hours * 3600) - (minutes * 60);

        if(hours < 10) { hours = "0" + hours; }
        if(minutes < 10) { minutes = "0" + minutes; }
        if(seconds < 10) { seconds = "0" + seconds; }
        const time = `${hours}:${minutes}:${seconds}`;
        return time;
    }

    const time = process.uptime();
    const uptime = (time + "").toHHMMSS();


    res.json({
        "status": "online",
        "uptime": uptime
    });
});

module.exports = router;