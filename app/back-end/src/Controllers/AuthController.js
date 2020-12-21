const bcrypt = require('bcrypt');
const passport = require('passport');

const db = require('../Utils/db');

// @desc   Process registration
// @route  POST /api/v1/register
exports.signUp = async (req, res) => {
    try {
        const {fullName, email, password, password2, role, fileName, filePath} = req.body;
        let successes = [];
        let errors = [];

        // Check required fields
        if (!fullName || !email || !password || !password2) {
            errors.push({message: 'Please fill in all fields'});
        }

        // Check passwords match
        if (password !== password2) {
            errors.push({message: 'Passwords do not match'});
        }

        // Check pass length
        if (password.length < 6) {
            errors.push({message: 'Password should be at least 6 characters'});
        }

        if (errors.length > 0) {
            return res.status(400).send({errors: errors});

        } else {
            // Validation passed
            let userVerif;
            const user = {fullName, email, password};
            const users = await db.users.list();

            for (let i = 0; i < users.length; i++) {
                if (users[i].email === user.email) {
                    userVerif = users[i];
                    i = user.length;
                }
            }

            if (userVerif) {
                errors.push({message: 'Email is already register'});
                return res.status(400).send({errors: errors});

            } else {
                // Set to ROLE_ADMIN for admin role
                user.role = 'ROLE_USER';
                user.filePath = '';
                user.fileName = '';

                bcrypt.genSalt(10, async (err, salt) => {
                    bcrypt.hash(user.password, salt, async (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        await db.users.create(user);
                        successes.push({message: 'Successfully register'});
                        return res.status(201).send({successes: successes});
                    })
                })
            }
        }
    } catch (e) {
        return res.status(500).send('Server error');
    }
}

// @desc   Process sign in
// @route  POST /api/v1/login
exports.signIn = async (req, res, next) => {
    try {
        passport.authenticate("local", (err, user, info) => {

            if (err) throw err;
            if (!user) return res.status(400).send({errors: [{message: "Invalid credentials"}]});

            else {
                req.logIn(user, (err) => {
                    if (err) throw err;

                    return res.send(user);
                });
            }

        })(req, res, next);

    } catch (e) {
        return res.status(500).send('Server error');
    }
}

// @desc   Return connected user
// @route  GET /api/v1/me
exports.getMe = (req, res) => {
    try {
        const {user} = req;
        return res.send(user);

    } catch (e) {
        return res.status(500).send('Server error');
    }
}

// @desc   Process log out
// @route  GET /api/v1/logout
exports.logout = (req, res) => {
    try {
        req.logout();
        return res.status(200).json('Successfully logout');

    } catch (e) {
        return res.status(500).send('Server error');
    }
}