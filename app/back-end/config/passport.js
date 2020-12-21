const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Load db
const db = require('../src/Utils/db')

module.exports = function (passport) {
    passport.use(new LocalStrategy({usernameField: 'email'},
        async (email, password, done) => {

            let user;
            const users = await db.users.list();

            for (let i = 0; i < users.length; i++) {
                if (users[i].email === email) {
                    user = users[i];
                    i = user.length;
                }
            }

            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });

            } else {
                return done(null, false);
            }
        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser(async (id, cb) => {
        const user = await db.users.get(id);
        const userInformation = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            fileName: user.fileName,
            filePath: user.filePath
        };
        cb(null, userInformation);
    });
};