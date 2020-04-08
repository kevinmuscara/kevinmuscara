const express = require('express');
const router  = express.Router();

const api = require('./api/api');
const docs = require('./docs');

const data = require('covidtracker');

const discord = require('../discord/index');

router.use('/api', api);
router.use('/doc', docs);

router.get('/', async (req, res) => {
    res.render('index');
});

router.get('/covid', async(req, res) => {
    let state = await data.getState({ state: 'Kentucky' });
    JSON.stringify(state);
    
    let cases = state.cases;
    let todayCases = state.todayCases;
    let deaths = state.deaths;
    let todayDeaths = state.todayDeaths;
    let active = state.active;
    let tests = state.tests;

    res.render('covid',{
        cases: cases,
        todayCases: todayCases,
        deaths: deaths,
        todayDeaths: todayDeaths,
        active: active,
        tests: tests
    });
});

router.get('/api/discord', async (req, res) => {
    const message = JSON.stringify({ "status": discord.getStatus(), "ping": discord.getPing() });

    res.render('message', {
        msg: message
    });
});

module.exports = router;
