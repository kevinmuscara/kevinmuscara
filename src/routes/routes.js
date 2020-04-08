const express = require('express');
const router  = express.Router();

const request = require('request');
const discord = require('../discord/index');

router.get('/', async (req, res) => {
    res.render('index');
});

router.get('/discord', async (req, res) => {
    res.json({
        "status": discord.getStatus(), 
        "ping": discord.getPing()
    });
});

router.get('/corona', async (req, res) => {
    request.get(`http://coronavirusapi.com/getTimeSeriesJson/KY/`, function(error, response, body) {
        const data = JSON.parse(body);

        const deaths   = data[data.length - 1].deaths;
        const positive = data[data.length - 1].positive;
        const tested   = data[data.length - 1].tested;

        res.render('corona', {
            deaths: deaths,
            positive: positive,
            tested: tested
        });
    });
});

module.exports = router;
