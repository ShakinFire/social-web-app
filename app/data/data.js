const Data = require('./generic-data');
const UserData = require('./user-data');
const PostData = require('./post-data');

const {
    User,
    Address,
    Follower,
    Comment,
    Gender,
    Post,
} = require('../../db/models');

module.exports = {
    user: new UserData(User),
    address: new Data(Address),
    follower: new Data(Follower),
    comment: new Data(Comment),
    gender: new Data(Gender),
    post: new PostData(Post),
};
