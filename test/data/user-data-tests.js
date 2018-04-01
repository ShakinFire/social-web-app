const {
    expect,
} = require('chai');

const GenericData = require('../../app/data/user-data');
const sinon = require('sinon');

describe('UserData', () => {
    let data = null;
    let Model = null;
    beforeEach(() => {
        Model = {
            findOne: (object) => {},
            destroy: (object) => {},
        };

        data = new GenericData(Model);
    });

    describe('getUserByUsername()', () => {
        describe('when valid', () => {
            it('with username, expects getUserByUsername() to return an object with that username', async () => {
                const username = 'Goshko';
                const objects = {
                    username: username,
                };

                sinon.stub(Model, 'findOne')
                    .returns(objects);

                const resultObject = await data.getUserByUsername(username);

                expect(resultObject.username).deep.equal(username);
            });

            it('with no matched username, expects getUserByUsername() to return empty object', async () => {
                const username = 'Goshko';
                sinon.stub(Model, 'findOne')
                    .returns({});

                const result = await data.getUserByUsername(username);

                expect(result).to.be.empty;
            });
        });

        describe('when invalid', () => {
            it('with no username, expects getUserByUsername() to return null', async () => {
                sinon.stub(Model, 'findOne')
                    .returns(null);

                const result = await data.getUserByUsername();

                expect(result).to.be.null;
            });
        });
    });

    describe('getUserByEmail()', () => {
        describe('when valid', () => {
            it('with email, expects getUserByEmail() to return an object with that email', async () => {
                const email = 'example@gmail.com';
                const objects = {
                    email: email,
                };

                sinon.stub(Model, 'findOne')
                    .returns(objects);

                const resultObject = await data.getUserByEmail(email);

                expect(resultObject.email).deep.equal(email);
            });

            it('with no matched email, expects getUserByEmail() to return empty object', async () => {
                const email = 'example@gmail.com';
                sinon.stub(Model, 'findOne')
                    .returns({});

                const result = await data.getUserByEmail(email);

                expect(result).to.be.empty;
            });
        });

        describe('when invalid', () => {
            it('with no email, expects getUserByEmail() to return null', async () => {
                sinon.stub(Model, 'findOne')
                    .returns(null);

                const result = await data.getUserByEmail();

                expect(result).to.be.null;
            });
        });
    });

    describe('checkIfLiked()', () => {
        describe('when valid', () => {
            it('with postId and userId, expects checkIfLiked() to return an object with that postId and userId', async () => {
                const postId = 5;
                const userId = 2;
                const objects = {
                    postId: postId,
                    userId: userId,
                };

                sinon.stub(Model, 'findOne')
                    .returns(objects);

                const resultObject = await data.checkIfLiked(postId, userId);

                expect(resultObject.postId).deep.equal(postId);
                expect(resultObject.userId).deep.equal(userId);
            });

            it('with no matched postId and userId, expects checkIfLiked() to return empty object', async () => {
                const postId = 5;
                const userId = 2;
                sinon.stub(Model, 'findOne')
                    .returns({});

                const result = await data.checkIfLiked(postId, userId);

                expect(result).to.be.empty;
            });
        });

        describe('when invalid', () => {
            it('with no postId and userId, expects checkIfLiked() to return null', async () => {
                sinon.stub(Model, 'findOne')
                    .returns(null);

                const result = await data.checkIfLiked();

                expect(result).to.be.null;
            });
        });
    });
});
