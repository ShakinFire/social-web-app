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
                'username': username,
            },
        });
    }

    getUserByEmail(email) {
        return this.Model.findOne({
            where: {
                'email': email,
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

    async dislike(postId, userId) {
        const rowToDelete = await this.Model.findOne({
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

        rowToDelete.Posts[0].dataValues.user_like_post.destroy({
            where: {
                UserId: userId,
                PostId: postId,
            },
        });
    }
}

module.exports = UserData;
