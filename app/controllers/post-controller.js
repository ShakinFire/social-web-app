const GenericValidator = require('./validators/generic-validator');

class PostController {
    constructor(data) {
        this.data = data;
        this.check = new GenericValidator();
    }

    isLoggedIn(user) {
        if (user) {
            return true;
        }
        return false;
    }

    _getMonth(month) {
        let result = null;
        switch (month) {
            case '01':
                result = 'Jan';
                break;
            case '02':
                result = 'Feb';
                break;
            case '03':
                result = 'Mar';
                break;
            case '04':
                result = 'Apr';
                break;
            case '05':
                result = 'May';
                break;
            case '06':
                result = 'Jun';
                break;
            case '07':
                result = 'Jul';
                break;
            case '08':
                result = 'Aug';
                break;
            case '09':
                result = 'Sep';
                break;
            case '10':
                result = 'Oct';
                break;
            case '11':
                result = 'Nov';
                break;
            case '12':
                result = 'Dec';
                break;
            default:
                result = 'Invalid information';
        }

        return result;
    }

    async _getUsers(postsData) {
        const users = (await Promise.all(postsData.map((value) => {
            return this.data.user.getById(value.UserId);
        })));

        return users;
    }

    async loadContent(offsetQuery) {
        const commentOnSingleLoad = 6;
        let allPosts = null;
        if (offsetQuery) {
            // on bottom scroll load additional news feed
            allPosts = await this.data.post.onScroll(+offsetQuery);
        } else {
            // on page load update news feed
            allPosts = await this.data.post.sortPostsByDate();
        }

        const allComments = await Promise.all(allPosts.map(async (post, index) => {
            post.date = this._getDate(post);
            return this.data.comment.getAllPostComments(post.id);
        }));

        await Promise.all([allComments.forEach(async (comments) => {
            if (comments.length === commentOnSingleLoad) {
                // if comments on post becomes full
                comments.pop();
                // must put button for load more comments
                comments.condition = true;
            } else {
                // shouldnt put button for load more comments
                comments.condition = false;
            }
            return Promise.all(comments.map(async (obj) => {
                const userValues = await this.data.user.getById(+obj.UserId);
                obj.username = userValues.username;
                obj.profile_pic = userValues.profile_pic;
                return obj;
            }));
        })]);

        const allUsers = await this._getUsers(allPosts);

        return {
            allPosts,
            allUsers,
            allComments,
        };
    }

    _getDate(postInfo) {
        const currentDate = JSON.stringify(postInfo.createdAt).split('T');
        const dmy = currentDate[0].split('-'); // day-month-year
        const year = dmy[0].substring(3, 5);
        const hms = currentDate[1].split(':'); // hour-minute-secound
        const result =
            `${this._getMonth(dmy[1])} ${dmy[2]}'${year} at ${hms[0]}:${hms[1]}`;

        return result;
    }

    async createPost(postInfo, user) {
        // postInfo = this.check.escapeHtml(postInfo);

        if (postInfo.length === 0) {
            throw new Error('You cannot submit a post with 0 characters');
        }

        const postToCreate = {
            post_content: postInfo,
            UserId: user.id,
            total_likes: 0,
            total_comments: 0,
        };

        const currentPost = await this.data.post.createCol(postToCreate);
        currentPost.date = await this._getDate(currentPost);
        return currentPost;
    }

    async deletePostByUser(userId, postId) {
        const post = await this.data.post.getById(+postId);
        if (post.UserId !== +userId) {
            throw new Error('You are not authorized to delete the post.');
        } else {
            return this.data.post.deletePostByPostId(+postId);
        }
    }

    deletePostById(postId) {
        this.data.post.deletePostByPostId(postId);
    }

    getPostsByUser(userId, offset = 0, howManyPosts = 10) {
       return this.data.post.getPostsByUser(userId, offset, howManyPosts);
    }

    async getPostComments(postId) {
        const post = await this.data.post.getById(+postId);
        const comments = await post.getComments();
        return comments.map(async (comment) => {
            comment = comment.get({
                plain: true,
            });
            let authorInfo =
                await this.data.user.getById(comment.UserId);
            authorInfo = authorInfo.get({
                plain: true,
            });
            delete authorInfo.password;
            comment.author = authorInfo;
            return comment;
        });
    }

    async getAllPosts() {
        const posts = await this.data.post.getAllPosts();
        return posts.map( async (post) => {
            const author = await this.data.user.getById(post.UserId);
            delete author.password;
            post.author = author;
            return post;
        });
    }
}

module.exports = PostController;
