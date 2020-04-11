const express = require('express');
const router  = express.Router();

const api = require('./api/api');
const docs = require('./docs');

const data = require('covidtracker');

const discord = require('../discord/index');

router.use('/api', api);
router.use('/doc', docs);

router.get('/', async (req, res) => {
    const head = req.headers.host;
    // console.log(head);
    if(head === 'kevinmuscara.com')
        res.render('index');
    else if(head === 'api.kevinmuscara.com')
        res.render('doc');

    // res.render('index');
});

router.get('/covid', async(req, res) => {
    let state = await data.getState({ state: 'Kentucky' });
    JSON.stringify(state);
    
    let name = state.state;
    let cases = state.cases;
    let todayCases = state.todayCases;
    let deaths = state.deaths;
    let todayDeaths = state.todayDeaths;
    let pactive = state.active / state.cases;
    let pdeaths = state.deaths / state.cases;

    res.render('covid',{
        state: name,
        cases: cases,
        todayCases: todayCases,
        deaths: deaths,
        todayDeaths: todayDeaths,
        dead: Math.round(pdeaths * 100),
        infected: Math.round(pactive * 100)
    });
});

router.get('/api/discord', async (req, res) => {
    const message = JSON.stringify({ "status": discord.getStatus(), "ping": discord.getPing() });

    res.render('message', {
        msg: message
    });
});

module.exports = router;
