const {
    expect,
} = require('chai');

const GenericData = require('../../app/data/post-data');
const sinon = require('sinon');

describe('post-data', () => {
    let data = null;
    let Model = null;
    beforeEach(() => {
        Model = {
            findAll: (object) => {},
            update: (object) => {},
            destroy: (object) => {},
        };

        data = new GenericData(Model);
    });

    describe('sortPostsByDate()', () => {
        describe('when valid', () => {
            it('when given empty model, expect to return empty array', async () => {
                sinon.stub(Model, 'findAll')
                    .returns([]);

                const result = await data.sortPostsByDate();

                expect(result).to.be.empty;
            });

            it('when given model, expect to return array', async () => {
                const arr = [1, 2, 3];
                sinon.stub(Model, 'findAll')
                    .returns(arr);

                const result = await data.sortPostsByDate();

                expect(result).to.deep.equal(arr);
            });
        });

        describe('when invalid', () => {
            it('when no model is given, expect to return null', async () => {
                sinon.stub(Model, 'findAll')
                    .returns(null);

                const result = await data.sortPostsByDate();

                expect(result).to.be.null;
            });
        });
    });

    describe('onScroll()', () => {
        describe('when valid', () => {
            it('when given queryParams, should return array', async () => {
                const queryParams = 5;
                sinon.stub(Model, 'findAll')
                    .returns([]);

                const result = await data.onScroll(queryParams);

                expect(result).to.be.an('array');
            });
        });
    });

    describe('totalCommentsIncrement()', () => {
        describe('when valid', () => {
            it('when given non-existing postId, should return undefined', async () => {
                const postId = 2;
                sinon.stub(Model, 'update')
                    .returns({});

                const result = await data.totalCommentsIncrement(postId);

                expect(result).to.be.undefined;
            });
        });
    });

    describe('deletePostByPostId()', () => {
        describe('when valid', () => {
            it('when given postId that match should return the deleted object', async () => {
                const id = 2;
                sinon.stub(Model, 'destroy')
                    .returns({ postId: 2 });

                const result = await data.deletePostByPostId(id);

                expect(result).to.be.an('object');
                expect(result).to.deep.include({ postId: 2 });
            });
        });
    });

    describe('getAllPosts', () => {
        describe('when valid', () => {
            it('when given Model, expect to return array', async () => {
                sinon.stub(Model, 'findAll')
                    .returns([]);

                const result = await data.getAllPosts();

                expect(result).to.be.an('array');
                expect(result).to.be.empty;
            });
        });
    });

    describe('getPostsByUser', () => {
        describe('when valid', () => {
            it('when given Model, expect to return array', async () => {
                sinon.stub(Model, 'findAll')
                    .returns([]);

                const result = await data.getPostsByUser();

                expect(result).to.be.an('array');
                expect(result).to.be.empty;
            });
        });
    });
});