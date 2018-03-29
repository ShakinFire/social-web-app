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

    async likeDislike(postId, userId) {
        const notValid = await this._validate(+postId, +userId);
        if (notValid) {
            await this.data.user.dislike(+postId, +userId);
            await this.data.post.totalLikesDecrement(+postId);
            return false;
        }

        await this.data.post.totalLikesIncrement(+postId);
        const post = await this.data.post.getById(+postId);
        const user = await this.data.user.getById(+userId);
        await user.setPosts(post);
        return true;
    }
}

module.exports = LikeController;
