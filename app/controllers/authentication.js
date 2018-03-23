const validator = require('./validators/valid-register');

class AuthController {
    constructor(data) {
        this.data = data;
        this._validate = validator;
    }

    isLoggedIn(user) {
        if (user) {
            return true;
        }
        return false;
    }

    register(user) {
       if (this._validate(user)) {
            user.password = user.password[0];
            return this.data.user.createCol(user);
       }
       return false;
    }
}

module.exports = AuthController;
