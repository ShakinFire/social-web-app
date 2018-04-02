const GenericValidator = require('./validators/generic-validator');

class CommentController {
    constructor(data) {
        this.data = data;
        this.check = new GenericValidator();
    }

    async submitComment(obj, user) {
        const postId = +obj.id;
        let content = obj.content;

        content = this.check.escapeHtml(content);

        if (content.length === 0) {
            throw new Error('You cannot submit a comment with 0 characters.');
        }

        await this.data.post.totalCommentsIncrement(postId);

        const commentToCreate = {
            comment_content: content,
            PostId: postId,
            UserId: user.id,
        };

        return await this.data.comment.createCol(commentToCreate);
    }

    async loadMoreComments(obj) {
        const commentOnSingleLoad = 6;
        const postId = +obj.postId;
        const queryOffset = +obj.load;

        const comments = await this.data.comment
            .loadComments(postId, queryOffset);

        if (comments.length === commentOnSingleLoad) {
            comments.pop();
            comments.condition = true;
        } else {
            comments.condition = false;
        }

        await Promise.all(comments.map( async (comment) => {
            const userValues = await this.data.user.getById(+comment.UserId);
            comment.username = userValues.username;
            comment.profile_pic = userValues.profile_pic;
            return comment;
        }));

        return comments;
    }
}

module.exports = CommentController;
