const users = [{
    name: 'test',
    password: 'passtest',
    id: 1,
}];

const findUserByUsername = (givenUsername) => {
    return users.find((user) => user.name === givenUsername);
};

const findById = (id) => {
    return users.find((user) => user.id === id);
};

module.exports = {
    findUserByUsername,
    findById,
};
