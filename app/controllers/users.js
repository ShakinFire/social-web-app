class UsersController {
    constructor(data) {
        this.data = data;
    }

    async getById(id) {
        const user = await this.data.user.getById(id);
        return user;
    }
}

module.exports = UsersController;
