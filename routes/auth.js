const express = require('express');
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Google OAuth2 Login Route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth2 Callback
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const userEmail = req.user.emails && req.user.emails.length > 0 ? req.user.emails[0].value : "No email provided";

        // Create JWT token with user info
        const token = jwt.sign({
            id: req.user.id,
            name: req.user.displayName,
            email: userEmail // ✅ Include email in the token
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Save JWT to session
        req.session.token = token;

        // Redirect to welcome page
        res.redirect('/welcome');
    }
);

// GitHub OAuth Login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth Callback
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        // Extract email if available
        const userEmail = req.user.emails && req.user.emails.length > 0 ? req.user.emails[0].value : "No email provided";

        // Create JWT token with user info
        const token = jwt.sign({
            id: req.user.id,
            name: req.user.displayName,
            email: userEmail // ✅ Include email in the token
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Save JWT to session
        req.session.token = token;

        // Redirect to welcome page
        res.redirect('/welcome');
    }
);

// Logout Route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('❌ Error destroying session:', err);
            return res.redirect('/');
        }
        res.clearCookie('connect.sid'); // Διαγραφή cookie συνεδρίας
        res.redirect('/');
    });
});

module.exports = router;