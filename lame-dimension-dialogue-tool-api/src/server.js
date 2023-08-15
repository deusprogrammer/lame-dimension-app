import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';

import scriptsRoute from './routes/scriptRoutes.js';
import authRoute from './routes/authRoutes.js';
import userRoute from './routes/userRoutes.js';
import profileRoute from './routes/profileRoutes.js';
import codeRoute from './routes/codeRoutes.js';

import { jwtAuthStrategy } from './config/passportConfig.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let app = express();
let port = process.env.PORT || 8080;

// Mongoose instance connection url connection
const databaseUrl = process.env.LD_DB_URL;
mongoose.Promise = global.Promise;

console.log('DATABASE URL: ' + databaseUrl);

/*
 * Connect to database
 */

var connectWithRetry = function () {
    return mongoose.connect(databaseUrl, function (err) {
        if (err) {
            console.warn(
                'Failed to connect to mongo on startup - retrying in 5 sec'
            );
            setTimeout(connectWithRetry, 5000);
        }
    });
};
connectWithRetry();

passport.use(jwtAuthStrategy);

app.use(express.json({ limit: '50Mb' }));
app.use(cors());
app.use('/assets', express.static(__dirname + '/assets'));

app.use(passport.initialize());

app.set('etag', false);
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

/*
 * Routes
 */
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use(
    '/profiles',
    passport.authenticate('jwt', { session: false }),
    profileRoute
);
app.use(
    '/scripts',
    passport.authenticate('jwt', { session: false }),
    scriptsRoute
);
app.use('/codes', passport.authenticate('jwt', { session: false }), codeRoute);

app.listen(port);
console.log('Lame Dimension API server started on: ' + port);
