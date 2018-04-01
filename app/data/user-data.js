const Data = require('./generic-data');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const {
    Post,
 } = require('../../db/models');

class UserData extends Data {
    constructor(userModel) {
        super(userModel);
    }

    getAllUsers() {
        return this.Model.findAll({
            where: {
                'id': {
                    [Op.ne]: 1,
                },
            },
            raw: true,
        });
    }

    deleteUserById(id) {
        return this.Model.destroy({
            where: {
                'id': id,
            },
        });
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
            where: {
                id: userId,
            },
            include: [
                {
                    model: Post,
                    where: {
                        id: postId,
                    },
                },
            ],
        });
    }

    async dislike(postId, userId) {
        const rowToDelete = await this.Model.findOne({
            where: {
                id: userId,
            },
            include: [
                {
                    model: Post,
                    where: {
                        id: postId,
                    },
                },
            ],
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
