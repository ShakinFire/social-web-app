const bcrypt = require('bcrypt');

const UserUpdateValidator = require('./validators/user-update-validator');

class AuthController {
    constructor(data) {
        this.data = data;
        this.check = new UserUpdateValidator();
    }

    isLoggedIn(user) {
        if (user) {
            return true;
        }
        return false;
    }

    async register(user) {
        try {
            user.password = user.password[0];

            this.check.isUsernameCorrect(user);
            this.check.isPasswordCorrect(user);
            this.check.isEmail(user);

            // password hash.
            user.password = await bcrypt.hash(user.password, 10);
            await this.data.user.createCol(user);
            return true;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

module.exports = AuthController;
