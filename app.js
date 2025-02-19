require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sessionMiddleware = require('./config/session');
var passport = require('./config/passport');
var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

// Adjust View Engine (Pug)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session & Passport
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// Welcome Page (JWT)
app.get('/welcome', (req, res) => {
  if (!req.session || !req.session.token) {
    return res.redirect('/');
  }

  try {
    const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);
    res.send(`
            <h1>Welcome, ${decoded.name}!</h1>
            <p>You are authorized.</p>
            <a href="/users/user"><button>View User Info</button></a>
            <a href="/auth/logout"><button>Logout</button></a>
        `);
  } catch (err) {
    console.error('❌ Invalid token:', err);
    return res.redirect('/');
  }
});

// Default Login Page
app.get('/', (req, res) => {
  res.send(`
        <h1>Login</h1>
        <a href="/auth/google"><button>Sign in with Google</button></a>
        <a href="/auth/github"><button>Sign in with GitHub</button></a>
    `);
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send(`<h1>Error ${err.status}</h1><p>${err.message}</p>`);
});

module.exports = app;
