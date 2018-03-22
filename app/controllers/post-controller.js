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
}

module.exports = PostController;
