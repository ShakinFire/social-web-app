const {
    User,
    Address,
    Follower,
    Comment,
    Gender,
    Like,
    Post,
} = require('../../db/models');

const Data = require('./generic-data');

module.exports = {
    user: new Data(User),
    address: new Data(Address),
    follower: new Data(Follower),
    comment: new Data(Comment),
    gender: new Data(Gender),
    like: new Data(Like),
    post: new Data(Post),
};
