const jwtStrategy = require('passport-jwt/lib/strategy');
const extractJwt = require('passport-jwt/lib/extract_jwt');

const authConfig = require('./authConfig');

module.exports = new jwtStrategy(
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
