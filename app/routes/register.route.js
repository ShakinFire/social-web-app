const init = (app, data) => {
    app.get('/register', (req, res) => {
        res.render('register');
    });

    app.post('/register', (req, res) => {
        res.send('Registration not ready yet.');
    });
};

module.exports = {
    init,
};
