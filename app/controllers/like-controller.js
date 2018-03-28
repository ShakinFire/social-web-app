class LikeController {
    constructor(data) {
        this.data = data;
    }

    async _validate(postId, userId) {
        const found = await this.data.user.checkIfLiked(postId, userId);

        if (found) {
            return true;
        }

        return false;
    }

    async giveLike(postId, userId) {
        const isValid = this._validate(postId, userId);
        if (isValid) {
            return false;
        }
        return await this.data.post.totalLikesIncrement(postId);
    }
}

module.exports = LikeController;
