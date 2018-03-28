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
}

module.exports = PostData;
