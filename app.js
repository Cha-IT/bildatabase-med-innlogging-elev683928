const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const bcrypt = require('bcrypt');



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const personerRouter = require('./routes/personer');
const bilerRouter = require('./routes/biler');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const beskyttetRouter = require('./routes/beskyttet');
const logoutRouter = require('./routes/logout')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: "hemmeligNøkkel",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/personer', personerRouter);
app.use('/biler', bilerRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/beskyttet', beskyttetRouter);
app.use('/logout', logoutRouter);

module.exports = app;
