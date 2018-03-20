const users = [
    {
        name: 'Georgi',
        password: 'goshkata1',
        id: '1',
    },
    {
        name: 'Simo',
        password: 'simkata1',
        id: '2',
    },
    {
        name: 'Kalin',
        password: 'kalinkata1',
        id: '3',
    },
];

let currentId = 3;

const findAll = () => {
    return users;
};

const findById = (id) => {
    return users.find((user) => user.id === id);
};

const createUser = (user) => {
    user.id = (currentId += 1);
    users.push(user);
};

module.exports = {
    findAll,
    findById,
    createUser,
};
