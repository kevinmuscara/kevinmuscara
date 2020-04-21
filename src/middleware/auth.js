const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('token');
    if(!token) { return res.status(401).json({ 'error': 'Auth error' }); }

    try {
        const decoded = jwt.verify(token, 'randomString');
        req.user = decoded.user;
        next();
    } catch(error) {
        res.status(500).json({ 'error': 'invalid token' });
    }
};