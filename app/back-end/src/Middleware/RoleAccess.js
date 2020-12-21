module.exports = {
    permit: function (...permittedRoles) {
        // return role middleware
        return (req, res, next) => {
            const {user} = req;

            if (user && permittedRoles.includes(user.role)) {
                next();
            } else {
                res.status(403).send('unauthorized');
            }
        }
    }
}