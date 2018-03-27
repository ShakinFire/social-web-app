class PostController {
    constructor(data) {
        this.data = data;
    }

    getAll() {
        return this.data.post.getAll();
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

    async _getDate(postInfo) {
        const currentDate = await JSON.stringify(postInfo.createdAt).split('T');
        const dmy = currentDate[0].split('-'); // day-month-year
        const year = dmy[0].substring(3, 5);
        const hms = currentDate[1].split(':'); // hour-minute-secound
        const result =
        `${this._getMonth(dmy[1])} ${dmy[2]}'${year} at ${hms[0]}:${hms[1]}`;

        return result;
    }

    async createPost(postInfo, user) {
        if (postInfo.length === 0) {
            return false;
        }

        const currentUser = await user;
        const postToCreate = {
            post_content: postInfo,
            UserId: currentUser.id,
            total_likes: 0,
        };

        const currentPost = await this.data.post.createCol(postToCreate);
        currentPost.date = await this._getDate(currentPost);
        return currentPost;
    }
}

module.exports = PostController;
