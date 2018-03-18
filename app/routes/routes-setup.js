const init = (app) => {
    app.get('/', (req, res) => {
        res.render('home/home-page');
    });
};

module.exports = {
    init,
};
