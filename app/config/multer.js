const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: __dirname + '../../../public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1000000,
    // },
    // fileFilter: (req, file, cb) => {
    //     // TO-DO: Create function for validation.
    //     // check extension. (file.originalname)
    //     // check MIME. (file.mimetype)
    // },
}).single('image');

const init = (app) => {
    app.use(upload);
};

module.exports = {
    init,
};
