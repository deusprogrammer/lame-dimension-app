import jwtStrategy from 'passport-jwt/lib/strategy';
import extractJwt from 'passport-jwt/lib/extract_jwt';

import authConfig from './authConfig';

export default new jwtStrategy(
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
