const express = require('express');
const router  = express.Router();

const data    = require('covidtracker');
const request = require('request');

const post = require('./models/user.model');

router.get('/', async (req, res) => {
    const head = req.headers.host;
    if(head === 'kevinmuscara.com') {
        res.render('index');
    } else if(head === 'api.kevinmuscara.com') { res.render('doc'); }
});

// Get projects
router.get('/projects', async(req, res) => {
    await post.getPosts()
    .then(posts => res.json(posts))
    .catch(error => {
        if(error.status) {
            res.status(error.status).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    });
});

// Get specific project by id
router.get('/projects/:id', async(req, res) => {
    await post.getPost(req.params.id)
    .then(post => res.json(post))
    .catch(error => {
        if(error.status) {
            res.status(error.status).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    });
});

router.post('/projects/:id', async(req, res) => {
    await post.getPost(req.params.id)
    .then(post => res.json(post))
    .catch(error => {
        if(error.status) {
            res.status(error.status).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    });
});

// Update specific project by id
router.put('/projects/:id', async(req, res) => {
    await post.updatePost(req.params.id, req.body)
    .then(post => res.json({
        mesage: `The post ${id} has been updated`,
        content: post
    }))
    .catch(error => {
        if(error.status) {
            res.status(error.status).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    });
});

// Create post
router.post('/projects', async(req, res) => {
    await post.createPost(req.body, req.body.id)
    .then(post => res.status(201).json({
        message: `The post ${post.id} has been created`,
        content: post
    }))
    .catch(error => res.status(500).json({ message: error.message }));
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
            infected: Math.round(pactive * 100),
            recovered: 100 - (Math.round(pdeaths * 100) + Math.round(pactive * 100))
        });
    } else if(header === 'api.kevinmuscara.com') {
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
