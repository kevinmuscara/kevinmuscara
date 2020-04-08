const express = require('express');
const router  = new express.Router();

const data = require('covidtracker');
const request = require('request');

router.get('/', async(req, res) => {
    const message = JSON.stringify({ "status": "online" });
    res.render('message', {
        msg: message
    });
})

router.get('/player/:username', async(req, res) => {
    request.get(`https://api.slothpixel.me/api/players/${req.params.username}`, function(error, response, body) {
        res.render('message', {
            msg: JSON.stringify(body)
        });
    });
});

router.get('/bans', async(req, res) => {
    request.get(`https://api.slothpixel.me/api/bans`, function(error, response, body) {
        res.render('message', {
            msg: JSON.stringify(body)
        });
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


    const message = JSON.stringify({ "status": "online", "uptime": uptime });

    res.render('message', {
        msg: message
    });
});

router.get('/corona', async(req, res) => {
    let world = await data.getAll();
    const message = JSON.stringify({ "deaths": world.deaths, "confirmedCases": world.cases, "totalRecovered": world.recovered});
    res.render('message', {
        msg: message
    });
});

router.get('/corona/:country', async(req, res) => {
    let country = await data.getCountry({ country: req.params.country });
    const message = JSON.stringify({ "deaths": country.deaths, "confirmedCases": country.cases, "totalRecovered": country.recovered});
    res.render('message', {
        msg: message
    });
});

router.get('/corona/:country/deaths', async(req, res) => {
    let country = await data.getCountry({ country: req.params.country });
    const message = JSON.stringify({ "deaths": country.deaths });
    res.render('message', {
        msg: message
    });
});

router.get('/corona/:country/confirmedCases', async(req, res) => {
    let country = await data.getCountry({ country: req.params.country });
    const message = JSON.stringify({ "confirmedCases": country.cases });
    res.render('message', {
        msg: message
    });
});

router.get('/corona/:country/totalRecovered', async(req, res) => {
    let country = await data.getCountry({ country: req.params.country });
    const message = JSON.stringify({ "totalRecovered": country.recovered });
    res.render('message', {
        msg: message
    });
});

router.get('/corona/:country/:state', async(req, res) => {
    let state = await data.getState({ state: req.params.state });
    const message = JSON.stringify({ "deaths": state.deaths, "confirmedCases": state.cases, "totalRecovered": state.recovered });
    res.render('message', {
        msg: message
    });
});

router.get('/corona/:country/:state/deaths', async(req, res) => {
    let state = await data.getState({ state: req.params.state });
    const message = JSON.stringify({ "deaths": state.deaths });
    res.render('message', {
        msg: message
    });
});

router.get('/corona/:country/:state/confirmedCases', async(req, res) => {
    let state = await data.getState({ state: req.params.state });
    const message = JSON.stringify({ "confirmedCases": state.cases });
    res.render('message', {
        msg: message
    });
});

router.get('/corona/:country/:state/totalRecovered', async(req, res) => {
    let state = await data.getState({ state: req.params.state });
    const message = JSON.stringify({ "totalRecovered": state.recovered });
    res.render('message', {
        msg: message
    });
});

module.exports = router;