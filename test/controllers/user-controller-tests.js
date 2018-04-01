const {
    expect,
} = require('chai');

const Ucontroller = require('../../app/controllers/users-controller');
const sinon = require('sinon');

describe('user-controller', () => {
    let data = null;
    let UserController = null;

    beforeEach(() => {
        data = {
            user: {
                getAllUsers: () => {
                    return [
                        {
                            get: () => {
                                return {};
                            },
                            password: 1,
                        },
                    ];
                },
                deleteUserById: () => {
                    return {};
                },
                getUserByEmail: (email) => {
                    return true;
                },
            },
        };

        UserController = new Ucontroller(data);
    });

    describe('getAllUsers()', () => {
        describe('when valid', () => {
            it('when called and there are users, expects to return an array of those users', async () => {
                const result = await UserController.getAllUsers();

                expect(result).to.be.an('array');
            });

            it('when called and there are not users, expects to return an empty array', async () => {
                sinon.stub(data.user, 'getAllUsers')
                    .returns([]);
                
                const result = await UserController.getAllUsers();

                expect(result).to.be.empty;
            });
        });
    });

    describe('deleteUserById()', () => {
        describe('when valid', () => {
            it('when given id, expect to return the deleted object', async () => {
                const id = 2;

                const result = await UserController.deleteUserById(id);

                expect(result).to.be.an('object');
            });
        });
    });

    describe('_updateProfileEmail()', () => {
        describe('when invalid', () => {
            it('when given objects user and data, if data.email is empty string, should return undefined', async () => {
                const user = {};
                const dataSubmitted = {
                    email: '',
                };

                const result = await UserController._updateProfileEmail(user, dataSubmitted);

                expect(result).to.be.undefined;
            });
        });
    });

    describe('updateImg()', () => {
        describe('when valid', () => {
            it('when given object with img property equal to cover, expect to return updated object with cover', async () => {
                const req = {
                    user: {
                        id: 2,
                    },
                    file: {
                        filename: 'someName',
                    },
                    body: {
                        'which-image': 'cover',
                    },
                };

                sinon.stub(UserController, '_updateCoverImg')
                    .returns({
                        profile_pic: 'uploads/someName',
                    });

                const result = await UserController.updateImg(req);

                expect(result).to.be.an('object');
                expect(result).to.deep.include({ profile_pic: 'uploads/someName' });
            });

            it('when given object with img property equal to profile, expect to return updated object with profile', async () => {
                const req = {
                    user: {
                        id: 2,
                    },
                    file: {
                        filename: 'someName',
                    },
                    body: {
                        'which-image': 'profile',
                    },
                };

                sinon.stub(UserController, '_updateProfileImg')
                    .returns({
                        profile_pic: 'uploads/someName',
                    });

                const result = await UserController.updateImg(req);

                expect(result).to.be.an('object');
                expect(result).to.deep.include({ profile_pic: 'uploads/someName' });
            });
        });

        describe('when invalid', () => {
            it('when given object without cover or profile as property value, expects to return false', async () => {
                const req = {
                    user: {
                        id: 2,
                    },
                    file: {
                        filename: 'someName',
                    },
                    body: {
                        'which-image': 'somethingWrong',
                    },
                };

                sinon.stub(UserController, '_updateProfileImg')
                    .returns({
                        profile_pic: 'uploads/someName',
                    });

                sinon.stub(UserController, '_updateCoverImg')
                    .returns({
                        profile_pic: 'uploads/someName',
                    });

                const result = await UserController.updateImg(req);

                expect(result).to.be.false;
            });
        });
    });

    describe('_updateProfilePassword()', () => {
        describe('when invalid', () => {
            it('when given dataSubmitted with property password that is empty, should return undefined', async () => {
                const userInstance = null;
                const dataSubmitted = {
                    password: '',
                };

                const result = await UserController._updateProfilePassword(userInstance, dataSubmitted);

                expect(result).to.be.undefined;
            });
        });
    });
});