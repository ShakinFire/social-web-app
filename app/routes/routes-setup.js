const init = (app) => {
    app.get('/', (req, res) => {
        res.render('login');
    });
};

module.exports = {
    init,
};
