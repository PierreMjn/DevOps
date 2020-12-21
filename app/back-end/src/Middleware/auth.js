module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.send('Log In with your account');
        }
    },
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.send('Already Log In');
        } else {
            return next();
        }
    }
}