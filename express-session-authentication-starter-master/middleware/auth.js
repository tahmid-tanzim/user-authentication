module.exports.isAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.send('<h1>You are not authenticated 401</h1><p><a href="/login">Login</a></p>');
    }
    next();
};

module.exports.isAdmin = (req, res, next) => {
    if (!(req.isAuthenticated() || req.user.admin)) {
        return res.send('<h1>You are not authenticated as ADMIN</h1><p><a href="/login">Login</a></p>');
    }
    next();
};