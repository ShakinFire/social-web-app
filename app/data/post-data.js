const Data = require('./generic-data');
const sequelize = require('sequelize');

class PostData extends Data {
    constructor(postModel) {
        super(postModel);
    }

    sortPostsByDate() {
        return this.Model.findAll({
                limit: 10,
                order: [
                    ['createdAt', 'DESC'],
                ],
            });
    }

    onScroll(queryParam) {
        return this.Model.findAll({
            order: [
                ['createdAt', 'DESC'],
            ],
            offset: queryParam,
            limit: 10,
        });
    }

    totalCommentsIncrement(postId) {
        this.Model.update({
            total_comments: sequelize.literal('total_comments + 1'),
        },
        {
            where: { id: postId },
        });
    }

    totalLikesIncrement(postId) {
        this.Model.update({
            total_likes: sequelize.literal('total_likes + 1'),
        },
        {
            where: { id: postId },
        });
    }

    totalLikesDecrement(postId) {
        this.Model.update({
            total_likes: sequelize.literal('total_likes - 1'),
        },
        {
            where: { id: postId },
        });
    }

    getPostsByUser(userId, offset, howManyPosts) {
        return this.Model.findAll({
            where: {
                'userId': userId,
            },
            order: [['createdAt', 'DESC']],
            limit: howManyPosts,
            offset: offset,
        });
    }

    deletePostByPostId(postId) {
        return this.Model.destroy({
            where: {
                'id': postId,
            },
        });
    }
}

module.exports = PostData;
