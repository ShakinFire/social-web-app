/* global __dirname */
const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: __dirname + '../../../public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    },
});

const checkFile = (file, cb) => {
    const nameOfFile = path.extname(file.originalname).toLowerCase();
    const extensions = /png|jpeg|jpg/i;

    const hasCorrectExt = extensions.test(nameOfFile);
    const hasCorrectMimetype = extensions.test(file.mimetype);

    if (hasCorrectExt && hasCorrectMimetype) {
        return cb(null, true);
    }
    return cb('Wrong file extension. Please upload images only.');
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000,
    },
    fileFilter: (req, file, cb) => {
        checkFile(file, cb);
    },
}).single('image');

const init = (app) => {
    app.use(upload);
};

module.exports = {
    init,
};
