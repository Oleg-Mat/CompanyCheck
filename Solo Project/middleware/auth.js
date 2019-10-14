const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/channels');
    } else next();
}

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
function cookiesCleaner(req, res, next) {
    console.log('cookie cleaner launched!');
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
}

module.exports = {
    sessionChecker,
    cookiesCleaner
}
