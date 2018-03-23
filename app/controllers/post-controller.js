class PostController {
    constructor(data) {
        this.data = data;
    }

    isLoggedIn(user) {
        if (user) {
            return true;
        }
        return false;
    }

    validate(postInfo) {
        const postContent = postInfo.post_content;
        if (postContent.length === 0) {
            return false;
        }
        // TODO: ESCAPE CHARACTERS
    }
}

module.exports = PostController;
