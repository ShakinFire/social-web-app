class UsersController {
    constructor(data) {
        this.data = data;
    }

    updateImg(userId, imgUrl, img) {
        switch (img) {
            case 'cover':
                this.updateCoverImg(userId, imgUrl);
                break;
            case 'profile':
                this.updateProfileImg(userId, imgUrl);
                break;
            default:
                break;
        }
    }

    async updateProfileImg(userId, imgUrl) {
        const userInstance = await this.data.user.getById(userId);
        userInstance.profile_pic = '/uploads/' + imgUrl;
        return userInstance.save();
    }

    async updateCoverImg(userId, imgUrl) {
        const userInstance = await this.data.user.getById(userId);
        userInstance.cover_pic = '/uploads/' + imgUrl;
        return userInstance.save();
    }
}

module.exports = UsersController;
