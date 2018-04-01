class Data {
    constructor(Model, includes = []) {
        this.Model = Model;
        this.includes = includes;
    }

    getAll() {
        return this.Model.findAll();
    }

    getById(id) {
        return this.Model.findById(id, {
            include: this.includes,
            // raw: true,
        });
    }

    createCol(obj) {
        return this.Model.create(obj);
    }
}

module.exports = Data;
