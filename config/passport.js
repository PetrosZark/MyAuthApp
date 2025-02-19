const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ['profile', 'email']
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
    scope: ['user:email'] // ✅ Ensure we request the email scope
}, async (accessToken, refreshToken, profile, done) => {
    // GitHub sometimes does not include email in `profile.emails`
    if (!profile.emails || profile.emails.length === 0) {
        try {
            // Fetch emails manually using GitHub API
            const response = await fetch('https://api.github.com/user/emails', {
                headers: { Authorization: `token ${accessToken}` }
            });
            const emails = await response.json();
            const primaryEmail = emails.find(email => email.primary && email.verified);

            if (primaryEmail) {
                profile.emails = [{ value: primaryEmail.email }];
            }
        } catch (error) {
            console.error("❌ Error fetching GitHub emails:", error);
        }
    }

    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = passport;
