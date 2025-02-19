const session = require('express-session');

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: true
});

module.exports = sessionMiddleware;
