const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.models.User;
const { isValidPassword } = require('../lib/passwordUtils');

const customFields = {
    usernameField: 'username',
    passwordField: 'password'
};

const verifyCallback = (username, password, done) => {
    User.findOne({ username })
        .then(user => {
            if (!user) {
                return done(null, false);
            }

            const isValid = isValidPassword(password, user.hash, user.salt);
            return done(null, isValid ? user : false);
        })
        .catch(error => {
            done(error);
        });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then(user => {
            done(null, user);
        })
        .catch(error => {
            done(error);
        });
});