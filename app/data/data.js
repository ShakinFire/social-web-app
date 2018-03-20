const {
    user,
    address,
    follower,
    comment,
    gender,
    like,
    post,
} = require('../../db/models');

const Data = require('./generic-data');

module.exports = {
    user: new Data(user),
    address: new Data(address),
    follower: new Data(follower),
    comment: new Data(comment),
    gender: new Data(gender),
    like: new Data(like),
    post: new Data(post),
};
