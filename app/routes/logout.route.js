const init = (app) => {
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

module.exports = {
    init,
};
