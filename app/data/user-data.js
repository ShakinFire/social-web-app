const Data = require('./generic-data');

class UserData extends Data {
    constructor(userModel) {
        super(userModel);
    }

    getUserByUsername(username) {
        return this.Model.findOne({
            where: {
                username,
            },
        });
    }
}

module.exports = UserData;
