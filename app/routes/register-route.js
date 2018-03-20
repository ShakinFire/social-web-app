const init = (app) => {
    app.get('/register', (req, res) => {
        res.render('register');
    });

    // TODO: add POST request for register
};

module.exports = {
    init,
};
