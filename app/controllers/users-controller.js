const bcrypt = require('bcrypt');

const UserUpdateValidator = require('./validators/user-update-validator');

class UsersController {
    constructor(data) {
        this.data = data;
        this.check = new UserUpdateValidator();
    }

    updateImg(req) {
        const userId = req.user.id;
        const imgUrl = req.file.filename;
        const img = req.body['which-image'];

        switch (img) {
            case 'cover':
                return this._updateCoverImg(userId, imgUrl);
            case 'profile':
                return this._updateProfileImg(userId, imgUrl);
            default:
                break;
        }
        return false;
    }

    async _updateProfileImg(userId, imgUrl) {
        const userInstance = await this.data.user.getById(userId);
        return userInstance.updateAttributes({
            profile_pic: 'uploads/' + imgUrl,
        });
    }

    async _updateCoverImg(userId, imgUrl) {
        const userInstance = await this.data.user.getById(userId);
        return userInstance.updateAttributes({
            cover_pic: 'uploads/' + imgUrl,
        });
    }

    async updateProfileInfo(userId, dataSubmitted) {
        const user = await this.data.user.getById(userId);
        try {
            this._updateFirstName(user, dataSubmitted);
            this._updateLastName(user, dataSubmitted);
            this._updateDescription(user, dataSubmitted);
            this._updateBirthday(user, dataSubmitted);
            this._updateAddress(user, dataSubmitted);
            await this._updateProfilePassword(user, dataSubmitted);
            await this._updateProfileEmail(user, dataSubmitted);

            const {
                dataValues,
            } = await user.save();

            const result = dataValues;
            delete result.password;

            return result;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    _updateFirstName(userInstance, dataSubmitted) {
        this.check.isFirstNameCorrect(dataSubmitted);
        userInstance.first_name = dataSubmitted.first_name;
    }

    _updateLastName(userInstance, dataSubmitted) {
        this.check.isLastNameCorrect(dataSubmitted);
        userInstance.last_name = dataSubmitted.last_name;
    }

    _updateDescription(userInstance, dataSubmitted) {
        this.check.isDescriptionCorrect(dataSubmitted);
        userInstance.description = dataSubmitted.description;
    }

    _updateBirthday(userInstance, dataSubmitted) {
        this.check.isBirthdayCorrect(dataSubmitted);
        userInstance.birthday = dataSubmitted.birthday;
    }

    _updateAddress(userInstance, dataSubmitted) {
        this.check.isAddressCorrect(dataSubmitted);
        userInstance.address = dataSubmitted.address;
    }

    async _updateProfilePassword(userInstance, dataSubmitted) {
        // in case the user hasn't submitted new password /its empty by default/
        if (dataSubmitted.password === '') {
            return;
        }

        this.check.isPasswordCorrect(dataSubmitted);

        const newPassword = await bcrypt.hash(dataSubmitted.password, 10);
        userInstance.password = newPassword;
    }

    async _updateProfileEmail(userInstance, dataSubmitted) {
        // in case the user hasn't submitted email. /its empty by default/
        // it should not be updated.
        if (dataSubmitted.email === '') {
            return;
        }
        this.check.isEmail(dataSubmitted);
        const isTaken = await this.data.user.getUserByEmail(dataSubmitted.email);
        if (isTaken) {
            throw new Error('Email is taken.');
        } else {
            userInstance.email = dataSubmitted.email;
        }
    }

    async getAllUsers() {
        const users = await this.data.user.getAllUsers();
        return users.map((user) => {
            delete user.password;
            return user;
        });
    }

    deleteUserById(id) {
        return this.data.user.deleteUserById(id);
    }
}

module.exports = UsersController;
