const express = require('express');
const router  = express.Router();

const request = require('request');

router.get('/', async(req, res) => res.json({ 'status': 'online' }) );

router.get('/activity', async(req, res) => {
    request.get(`https://wakatime.com/api/v1/users/kevinmuscara/stats`, function(error, response, body) {
        res.send(body);
    });
});

module.exports = router;