const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;

const init = (app, data) => {
    // defining the strategy
    const strategy = new LocalStrategy( async (username, password, done) => {
        try {
            const queryResult = await data.user.getUserByUsername(username);

            if (!queryResult) {
                return done(null, false);
            }

            const userData = queryResult.dataValues;
            const equalPasswords = await bcrypt.compare(password, userData.password);

            if (!equalPasswords) {
                return done(null, false);
            }

            return done(null, userData);
        } catch (err) {
            return done(err);
        }
    });

    passport.use(strategy);

    app.use(session({
        secret: 'laniakea_key',
        name: 'laniakea_sid',
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user.id);
        }
    });

    passport.deserializeUser( async (id, done) => {
        const user = await data.user.getById(id);
        if (user) {
            return done(null, user.dataValues);
        }
        return done(null, false);
    });
};

module.exports = {
    init,
};
