import connectDb from '../../../dbMiddleware';
const Post = require('../../../models/Post');
const Author = require('../../../models/User');

const handler = (req, res) => {
    return new Promise((resolve, reject) => {
        Post.find({})
            .lean()
            .populate('author')
            .then(posts => {
                resolve(res.status(200).json(posts));
            });
    });
};

export default connectDb(handler);