const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
dotenv.config({ path: `.env.local`, override: true });
//console.log(process.env)
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const url = require('url');

// const SQLiteStore = require('connect-sqlite3')(session);
const MongoStore = require('connect-mongo');

//routes
const routesUser = require('./routes/routes-user');
const routesRose = require('./routes/routes-rose');
const routesOauth = require('./routes/routes-oauth');
const routesOrder = require('./routes/routes-order');

//middleware
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth');

const tokenVerify = require('./middleware/tokenVerify');

const app = express();
app.use(express.json());
app.use(cors());

const unless = (middleware, ...paths) => {
    return (req, res, next) => {
        // console.log("req => ",req)
        const pathCheck = paths.some(path => {
            if (path.startsWith('^'))
                return req.path.startsWith(path.replace('^',''));
            return path === req.path || path.concat('/') === req.path;
        });
        if (pathCheck) {
            // in caso mi arriva header verifico token per chiamate /put /post etc.
            const authorization = req.header("Authorization");
            tokenVerify(authorization, req);
        }
        pathCheck ? next() : middleware(req, res, next);
    };
};

app.use(logger);
app.use(errorHandler);
app.use(unless( auth, '/', '/manifest.json', '/login', '/api/login','/api/oauth/google', '/api/oauth/redirect/google', '/favicon.ico', '/api/users', '^/api/roses' ));

app.use(routesOrder);
app.use(routesRose);
app.use(routesUser);

app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//When you navigate to the root page, it would use the built react-app
app.use(express.static(path.resolve(__dirname, "../dist")));

app.get('/favicon.ico', (req, res) => {
    res.sendFile("./public/favicon.ico");
});

const start = async() => {
    try {
        await mongoose.connect(process.env.MONGO);
        app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                client: mongoose.connection.getClient()
            })
          }));
        app.use(passport.authenticate('session'));
          
        app.use(routesOauth);

        app.listen(process.env.PORT, () => {
            console.log("listening on port 3000")
        });    
    } catch (error) {
        console.log("error: ", error);    
    }
}

//avvio
start();

module.exports = app;