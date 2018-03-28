const Data = require('./generic-data');
const UserData = require('./user-data');
const PostData = require('./post-data');

const {
    User,
    Address,
    Follower,
    Comment,
    Gender,
    Like,
    Post,
} = require('../../db/models');

module.exports = {
    user: new UserData(User),
    address: new Data(Address),
    follower: new Data(Follower),
    comment: new Data(Comment),
    gender: new Data(Gender),
    like: new Data(Like),
    post: new PostData(Post),
};
