import jwtStrategy from 'passport-jwt/lib/strategy.js';
import extractJwt from 'passport-jwt/lib/extract_jwt.js';

import authConfig from './authConfig.js';

export let jwtAuthStrategy = new jwtStrategy(
    {
        secretOrKey: authConfig.key,
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
        try {
            return done(null, token.user);
        } catch (error) {
            console.error('JWT failed: ' + error);
            return done(error);
        }
    }
);
