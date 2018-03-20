const init = (app) => {
    app.get('/', (req, res) => {
        res.render('fullscreen-video');
    });
};

module.exports = {
    init,
};
