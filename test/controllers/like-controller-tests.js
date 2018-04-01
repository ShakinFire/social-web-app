const {
    expect,
} = require('chai');

const Lcontroller = require('../../app/controllers/like-controller');
const sinon = require('sinon');

describe('comment-controller', () => {
    let data = null;
    let LikeController = null;

    beforeEach(() => {
        data = {
            user: {
                checkIfLiked: (postId, userId) => {},
                dislike: (postId, userId) => {},
                getById: (id) => {
                    return {
                        addPosts: ([testId]) => {},
                    };
                },
            },
            post: {
                getById: (id) => {
                    return {
                        id: 5,
                    };
                },
                totalLikesIncrement: (postId) => {
                    return {};
                },
                totalLikesDecrement: (postId) => {
                    return {};
                },
            },
        };

        LikeController = new Lcontroller(data);
    });

    describe('likeDislike()', () => {
        describe('when valid', () => {
            it('when given postId and userId that are valid(not already used), expects to return true', async () => {
                const postId = 2;
                const userId = 3;

                sinon.stub(LikeController, '_validate')
                    .returns(false);

                const result = await LikeController.likeDislike(postId, userId);

                expect(result).to.be.true;
            });
        });

        describe('when invalid', () => {
            it('when given postId and userId that are not valid(not used yet), expects to return false', async () => {
                const postId = 2;
                const userId = 3;

                sinon.stub(LikeController, '_validate')
                    .returns(true);

                const result = await LikeController.likeDislike(postId, userId);

                expect(result).to.be.false;
            });
        });
    });

    describe('_validate()', () => {
        describe('when valid', () => {
            it('when given postId and userId that are not already used, expects to return false', async () => {
                const postId = 2;
                const userId = 3;

                sinon.stub(data.user, 'checkIfLiked')
                    .returns(null);

                const result = await LikeController._validate(postId, userId);

                expect(result).to.be.false;
            });
        });

        describe('when invalid', () => {
            it('when given postId and userId that are already used, expects to return true', async () => {
                const postId = 2;
                const userId = 3;

                sinon.stub(data.user, 'checkIfLiked')
                    .returns({});

                const result = await LikeController._validate(postId, userId);

                expect(result).to.be.true;
            });
        });
    });
});