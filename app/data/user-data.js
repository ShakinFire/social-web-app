const Data = require('./generic-data');
const {
    Post,
 } = require('../../db/models');

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

    checkIfLiked(postId, userId) {
        return this.Model.findOne({
            include: [
                {
                    model: Post,
                    where: {
                        id: postId,
                    },
                },
            ],
        },
        {
            where: {
                id: userId,
            },
        });
    }
}

module.exports = UserData;
