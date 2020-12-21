const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const colors = require('colors');
const path = require('path');
const morgan = require('morgan');

// Load config
dotenv.config({path: './.env'});

// Cors options
const whitelist = ['http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}

const app = express();

// Passport config
require('./config/passport')(passport);

// File upload
app.use(fileUpload());

// Cors
app.use(cors(corsOptions));

// Body parser
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Express session
app.use(session({
    secret: 'secret-roro',
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    }
}));

// Passport middleware
app.use(cookieParser('secret-roro'));
app.use(passport.initialize());
app.use(passport.session());

// Morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/v1', require('./start/routes'));

module.exports = app;