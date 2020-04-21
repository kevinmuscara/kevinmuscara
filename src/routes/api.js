const express = require('express');
const router  = express.Router();

const Logger = require('../log/logger');
const logger = new Logger();

const { check, validationResult } = require('express-validator');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const request = require('request');

const auth = require('../middleware/auth');

const User = require('../model/User');



router.get('/', async(req, res) => res.json({ 'status': 'online' }) );

/**
 * @method - POST
 * @param - /signup
 * @description - User signup
 */
router.post('/signup', [
    check('username', 'Please enter a valid username').not().isEmpty(), 
    check('email', 'Please enter a valid email').isEmail(), 
    check('password', 'Please enter a valid password').isLength({ min: 6 })
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ 
            errors: errors.array()
        });
    }

    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if(user) {
            return res.status(400).json({ 'error': 'user already exists' });
        }

        user = new User({ username, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 'randomString', { expiresIn: 10000 },(error, token) => {
            if(error) {
                logger.error(error);
            }
            res.status(200).json({ token });
        });
    } catch(error) {
        res.status(500).json({ 'error': 'error in saving' });
        logger.error(error);
    }
});

/**
 * @method - POST
 * @param - /login
 * @description - User login form
 */
router.post('/login', [
    check('email', 'Please enter a valid email').isEmpty(),
    check('password', 'Please enter a valid password').isLength({ min: 6 })
], async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ 'errors': errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if(!user) {
            return res.status(400).json({ 'error': 'user doesnt exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ 'error': 'incorrect password' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 'randomString', { expiresIn: 3600 }, (error, token) => {
            if(error) {
                logger.error(error);
            }
            res.status(200).json({ token });
        });
    } catch(error) {
        res.status(500).json({ 'error': error });
    }
});

/**
 * @method - POST
 * @param - /api/me
 * @description - get logged in user
 */
router.post('/me', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch(error) {
        res.json({ 'error': error });
    }
});

module.exports = router;