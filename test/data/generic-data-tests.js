const {
    expect,
} = require('chai');

const GenericData = require('../../app/data/generic-data');
const sinon = require('sinon');

describe('Generic data', () => {
    let data = null;
    let Model = null;
    beforeEach(() => {
        Model = {
            findAll: () => {},
            findById: (id) => {},
            create: (object) => {},
        };

        data = new GenericData(Model);
    });

    describe('getAll()', () => {
        describe('When valid', () => {
            it('with empty model, expect getAll() to return empty array', async () => {
                sinon.stub(Model, 'findAll')
                    .returns([]);

                const objects = await data.getAll();

                expect(objects).to.be.empty;
            });

            it('with object in model, expect getAll() to return all objects', async () => {
                const objects = [1, 2, 3, 4];
                sinon.stub(Model, 'findAll')
                    .returns(objects);

                const objectsResult = await data.getAll();

                expect(objectsResult).deep.equal(objects);
            });
        });

        describe('When invalid', () => {
            it('non-existing model, expect getAll() to return null', async () => {
                sinon.stub(Model, 'findAll')
                    .returns(null);

                const result = await data.getAll();

                expect(result).to.be.null;
            });
        });
    });

    describe('getById()', () => {
        describe('when valid', () => {
            it('existing id, expects getById() to return the object', async () => {
                const id = 1;
                const objects = {
                    id,
                };
                sinon.stub(Model, 'findById')
                    .returns(objects);

                const result = await data.getById(id);

                expect(result).to.exist;
                expect(result.id).to.equal(id);
            });
        });

        describe('when invalid', () => {
            it('non-existing id, expects getById() to return null', async () => {
                sinon.stub(Model, 'findById')
                    .returns(null);

                const result = await data.getById(1);

                expect(result).to.be.null;
            });
        });
    });

    describe('createCol()', () => {
        describe('when valid', () => {
            it('with empty model, expects createCol() to return empty object', async () => {
                const emptyObject = {};
                sinon.stub(Model, 'create')
                    .returns(emptyObject);

                const result = await data.createCol(emptyObject);

                expect(result).deep.equal(emptyObject);
            });

            it('with object in model, expects createCol() to return the created object', async () => {
                const name = 'jonh';
                const obj = {
                    name: 'jonh',
                };

                sinon.stub(Model, 'create')
                    .returns(obj);

                const result = await data.createCol(obj);

                expect(result.name).to.equal(name);
            });
        });

        describe('when invalid', () => {
            it('without object, expects createCol() to return null', async () => {
                sinon.stub(Model, 'create')
                    .returns(null);

                const result = await data.createCol(1);

                expect(result).to.be.null;
            });
        });
    });
});
