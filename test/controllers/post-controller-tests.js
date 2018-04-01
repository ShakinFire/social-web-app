const {
    expect,
} = require('chai');

const Pcontroller = require('../../app/controllers/post-controller');
const sinon = require('sinon');

const userArr = [
    { id: 2 },
];

describe('post-controller', () => {
    let data = null;
    let PostController = null;

    beforeEach(() => {
        data = {
            user: {
                getById: (id) => {
                    return userArr.find((user) => user.id === id);
                },
            },
            comment: {
                getAllPostComments: (postId) => {
                    return [
                        [{}, {}, {}, {}, {}, {}],
                    ];
                },
            },
            post: {
                createCol: (object) => {
                    return object;
                },
                onScroll: (number) => {
                    return [{}];
                },
                sortPostsByDate: () => {
                    return [];
                },
            },
        };

        PostController = new Pcontroller(data);
    });

    describe('createPost()', () => {
        describe('when valid', () => {
            it('when given post content and user object, expects createPost() to return object', async () => {
                const user = {
                    id: 2,
                };
                const postInfo = 'some text';
                const objectToReturn = {
                    post_content: 'some text',
                    UserId: user.id,
                    total_likes: 0,
                    total_comments: 0,
                    date: 'something',
                };

                sinon.stub(PostController, '_getDate')
                    .returns('something');

                const result = await PostController.createPost(postInfo, user);

                expect(result).to.deep.equal(objectToReturn);
            });
        });

        describe('when invalid', () => {
            it('when given empty post content, expects createPost() to return false', async () => {
                const user = {
                    id: 2,
                };
                sinon.stub(PostController, '_getDate')
                    .returns('something');

                const result = await PostController.createPost('', user);

                expect(result).to.be.false;
            });
        });
    });

    describe('_getDate()', () => {
        describe('when valid', () => {
            it('when given object, expects _getDate() to return string', async () => {
                const expectedResult = `Jan 21'18 at 0:29`;
                const postInfo = {
                    createdAt: '2018-03-21T0:29:32',
                };

                sinon.stub(PostController, '_getMonth')
                    .returns('Jan');

                const result = await PostController._getDate(postInfo);

                expect(result).to.be.equal(expectedResult);
            });
        });
    });

    describe('loadContent()', () => {
        describe('when valid', () => {
            it('when give integer, expects loadContent() to return object of arrays', async () => {
                const fakeQuery = 5;
                sinon.stub(PostController, '_getDate')
                    .returns('someString');

                sinon.stub(PostController, '_getUsers')
                    .returns([]);

                const result = await PostController.loadContent(fakeQuery);

                expect(result.allPosts).to.be.an('array');
                expect(result.allComments).to.be.an('array');
                expect(result.allUsers).to.be.an('array');
            });

            it('when parameter is not given, expects loadContent() to return object of arrays', async () => {
                sinon.stub(PostController, '_getDate')
                    .returns('someString');

                sinon.stub(PostController, '_getUsers')
                    .returns([]);

                const result = await PostController.loadContent();

                expect(result.allPosts).to.be.an('array');
                expect(result.allComments).to.be.an('array');
                expect(result.allUsers).to.be.an('array');
            });
        });
    });

    describe('_getUsers()', () => {
        describe('when valid', () => {
            it('when given array with data, expects _getUsers() to return array with data', async () => {
                const postData = [
                    { UserId: 2 },
                ];

                const result = await PostController._getUsers(postData);

                expect(result).to.be.an('array').to.deep.includes({ id: 2 });
            });

            it('when given empty array, expects _getUsers() to return empty array', async () => {
                const postData = [];

                const result = await PostController._getUsers(postData);

                expect(result).to.be.empty;
            });
        });
    });

    describe('_getMonth()', () => {
        describe('when valid', () => {
            it('when given string between 01-12 expect to return a first 3 letters of a month', () => {
                const number = '03';

                const result = PostController._getMonth(number);

                expect(result).to.equal('Mar');
            });
        });

        describe('when invalid', () => {
            it('when given anything but string between 01-12 expect to return the string "Invalid information"', () => {
                const number = 3;

                const result = PostController._getMonth(number);

                expect(result).to.equal('Invalid information');
            });
        });
    });

    describe('isLoggedIn()', () => {
        describe('when valid', () => {
            it('when given user, expects to return true', () => {
                const user = {};

                const result = PostController.isLoggedIn(user);

                expect(result).to.be.true;
            });
        });

        describe('when invalid', () => {
            it('when not given user, expects to return false', () => {
                const result = PostController.isLoggedIn();

                expect(result).to.be.false;
            });
        });
    });
});
