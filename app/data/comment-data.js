const Data = require('./generic-data');

class CommentData extends Data {
    constructor(commentModel) {
        super(commentModel);
    }

    loadComments(postId, queryParam) {
        return this.Model.findAll({
            where: {
                PostId: postId,
            },
            offset: queryParam,
            limit: 6,
            order: [
                ['createdAt', 'DESC'],
            ],
            raw: true,
        });
    }

    getAllPostComments(postId) {
        return this.Model.findAll({
            where: {
                PostId: postId,
            },
            limit: 6,
            order: [
                ['createdAt', 'DESC'],
            ],
            raw: true,
        });
    }
}

module.exports = CommentData;
