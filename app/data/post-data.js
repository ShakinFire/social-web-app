const Data = require('./generic-data');

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

    totalLikesIncrement(postId) {
        return this.Model.update({
            total_likes: Sequelize.literal('total_likes' + 1),
        },
        {
            where: {
                id: postId,
            },
        });
    }
}

module.exports = PostData;
