const express = require('express');
const router  = express.Router();

const data    = require('covidtracker');
const request = require('request');

const discord = require('../discord/index');

router.get('/doc', async(req, res) => {
    res.render('doc');
});

router.get('/', async (req, res) => {    
    const head = req.headers.host;

    if(head === 'kevinmuscara.com')
        res.render('index');
    else if(head === 'api.kevinmuscara.com')
        res.render('doc');
});

router.get('/covid', async(req, res) => {
    const header = req.headers.host;

    if(header === 'kevinmuscara.com') {
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
    } else if(header === 'api.kevinmuscara.com') {
        res.render('message', {
            msg: '404 ERROR'
        });
    }
});

router.get('/discord', async (req, res) => {
    const header = req.headers.host;

    if(header === 'api.kevinmuscara.com') {
        const message = JSON.stringify({ "status": discord.getStatus(), "ping": discord.getPing() });
        res.render('message', {
            msg: message
        });
    } else if(header === 'kevinmuscara.com') {
        res.render('message', {
            msg: '404 ERROR'
        });
    }
});

router.get('/player/:username', async(req, res) => {
    const header = req.headers.host;

    if(header === 'api.kevinmuscara.com') {
        request.get(`https://api.slothpixel.me/api/players/${req.params.username}`, function(error, response, body) {
            res.render('message', {
                msg: body
            });
        });
    } else if(header === 'kevinmuscara.com') {
        res.render('message', {
            msg: '404 ERROR'
        });
    }
});

router.get('/bans', async(req, res) => {
    const header = req.headers.host;

    if(header === 'api.kevinmuscara.com') {
        request.get(`https://api.slothpixel.me/api/bans`, function(error, response, body) {
            res.render('message', {
                msg: JSON.stringify(body)
            });
        });
    } else if(header === 'kevinmuscara.com') {
        res.render('message', {
            msg: '404 ERROR'
        });
    }
});

router.get('/health', async(req, res) => {
    const header = req.headers.host;

    if(header === 'api.kevinmuscara.com') {
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
    } else if(header === 'kevinmuscara.com') {
        res.render('message', {
            msg: '404 ERROR'
        });
    }
});

router.get('/corona', async(req, res) => {
    const header = req.headers.host;

    if(header === 'api.kevinmuscara.com') {
        let world = await data.getAll();
        const message = JSON.stringify({ "deaths": world.deaths, "confirmedCases": world.cases, "totalRecovered": world.recovered});
        res.render('message', {
            msg: message
        });
    } else if(header === 'kevinmuscara.com') {
        res.render('message', {
            msg: '404 ERROR'
        });
    }
});

router.get('/corona/:country', async(req, res) => {
    const header = req.headers.host;

    if(header === 'api.kevinmuscara.com') {
        let country = await data.getCountry({ country: req.params.country });
        const message = JSON.stringify({ "deaths": country.deaths, "confirmedCases": country.cases, "totalRecovered": country.recovered});
        res.render('message', {
            msg: message
        });
    } else if(header === 'kevinmuscara.com') {
        res.render('message', {
            msg: '404 ERROR'
        });
    }
});

router.get('/corona/:country/deaths', async(req, res) => {
    const header = req.headers.host;

    if(header === 'api.kevinmuscara.com') {
        let country = await data.getCountry({ country: req.params.country });
        const message = JSON.stringify({ "deaths": country.deaths });
        res.render('message', {
            msg: message
        });
    } else if(header === 'kevinmuscara.com') {
        res.render('message', {
            msg: '404 ERROR'
        });
    }
});

router.get('/corona/:country/confirmedCases', async(req, res) => {
    const header = req.headers.host;

    if(header === 'api.kevinmuscara.com') {
        let country = await data.getCountry({ country: req.params.country });
        const message = JSON.stringify({ "confirmedCases": country.cases });
        res.render('message', {
            msg: message
        });
    } else if(header === 'kevinmuscara.com') {
        res.render('message', {
            msg: '404 ERROR'
        });
    }
});

router.get('/corona/:country/totalRecovered', async(req, res) => {
    const header = req.headers.host;

    if(header === 'api.kevinmuscara.com') {
        let country = await data.getCountry({ country: req.params.country });
        const message = JSON.stringify({ "totalRecovered": country.recovered });
        res.render('message', {
            msg: message
        });
    } else if(header === 'kevinmuscara.com') {
        res.render('message', {
            msg: '404 ERROR'
        });
    }
});

router.get('/corona/:country/:state', async(req, res) => {
    const header = req.headers.host;

    if(header === 'api.kevinmuscara.com') {
        let state = await data.getState({ state: req.params.state });
        const message = JSON.stringify({ "deaths": state.deaths, "confirmedCases": state.cases, "totalRecovered": state.recovered });
        res.render('message', {
            msg: message
        });
    } else if(header === 'kevinmuscara.com') {
        res.render('message', {
            msg: '404 ERROR'
        });
    }
});

router.get('/corona/:country/:state/deaths', async(req, res) => {
    const header = req.headers.host;

    if(header === 'api.kevinmuscara.com') {
        let state = await data.getState({ state: req.params.state });
        const message = JSON.stringify({ "deaths": state.deaths });
        res.render('message', {
            msg: message
        });
    } else if(header === 'kevinmuscara.com') {
        res.render('message', {
            msg: '404 ERROR'
        });
    }
});

router.get('/corona/:country/:state/confirmedCases', async(req, res) => {
    const header = req.headers.host;

    if(header === 'api.kevinmuscara.com') {
        let state = await data.getState({ state: req.params.state });
        const message = JSON.stringify({ "confirmedCases": state.cases });
        res.render('message', {
            msg: message
        });
    } else if(header === 'kevinmuscara.com') {
        res.render('message', {
            msg: '404 ERROR'
        });
    }
});

router.get('/corona/:country/:state/totalRecovered', async(req, res) => {
    const header = req.headers.host;

    if(header === 'api.kevinmuscara.com') {
        let state = await data.getState({ state: req.params.state });
        const message = JSON.stringify({ "totalRecovered": state.recovered });
        res.render('message', {
            msg: message
        });
    } else if(header === 'kevinmuscara.com') {
        res.render('message', {
            msg: '404 ERROR'
        });
    }
});

module.exports = router;
