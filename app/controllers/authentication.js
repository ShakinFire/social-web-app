const init = (data) => {
    return {
        login: (req, res) => {
            if (req.user) {
                res.send('You have already logged in.');
            } else {
                res.render('login');
            }
        },
        register: () => {
            // do smth with the data obj
        },
    };
};

module.exports = init;
