const Data = require('./generic-data');
const UserData = require('./user-data');
const PostData = require('./post-data');
const CommentData = require('./comment-data');

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
    comment: new CommentData(Comment),
    gender: new Data(Gender),
    post: new PostData(Post),
};
