const {
    expect,
} = require('chai');

const Ccontroller = require('../../app/controllers/comment-controller');
const sinon = require('sinon');

const userArr = [
    { id: 2 },
];

describe('comment-controller', () => {
    let data = null;
    let CommentController = null;

    beforeEach(() => {
        data = {
            user: {
                getById: (id) => {
                    return {
                        username: 'goshko',
                        profile_pic: 'somePath',
                    };
                },
            },
            comment: {
                loadComments: (postId, queryOffset) => {
                    return [];
                },
                createCol: (object) => {
                    return object;
                },
            },
            post: {
                totalCommentsIncrement: (postId) => {},
            },
        };

        CommentController = new Ccontroller(data);
    });

    describe('submitComment()', () => {
        describe('when valid', () => {
            it('when given object with data and user, expects to return the new object with the same data', async () => {
                const expectedResult = {
                    comment_content: 'someText',
                    PostId: 2,
                    UserId: 5,
                };

                const obj = {
                    id: 2,
                    content: 'someText',
                };

                const user = {
                    id: 5,
                };

                const result = await CommentController.submitComment(obj, user);

                expect(result).deep.equal(expectedResult);
            });
        });

        describe('when invalid', () => {
            it('when given object with property content is empty string, expects to return false', async () => {
                const obj = {
                    id: 2,
                    content: '',
                };

                const user = {
                    id: 5,
                };

                const result = await CommentController.submitComment(obj, user);

                expect(result).to.be.false;
            });
        });
    });

    describe('loadMoreComments()', () => {
        describe('when valid', () => {
            it('when given object with postId and load properties and no posts, expects to return an empty array', async () => {
                const obj = {
                    postId: 2,
                    load: 5,
                };

                const result = await CommentController.loadMoreComments(obj);

                expect(result).to.be.an('array').that.is.empty;
            });

            it('when given object with postId and load properties with posts below 6, expects to return an array with condition property set to false', async () => {
                const obj = {
                    postId: 2,
                    load: 5,
                };

                sinon.stub(data.comment, 'loadComments')
                    .returns([{}]);

                const result = await CommentController.loadMoreComments(obj);

                expect(result.condition).to.be.false;
            });

            it('when given object with postId and load properties with 6 or above posts, expects to return an array with condition property set to true', async () => {
                const obj = {
                    postId: 2,
                    load: 5,
                };

                sinon.stub(data.comment, 'loadComments')
                    .returns([{}, {}, {}, {}, {}, {}]);

                const result = await CommentController.loadMoreComments(obj);

                expect(result.condition).to.be.true;
            });
        });
    });
});
