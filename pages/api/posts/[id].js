import connectDb from '../../../dbMiddleware';
const Post = require('../../../models/Post');
const Author = require('../../../models/User');
const Category = require('../../../models/Category');
const Comment = require('../../../models/Comment');

const handler = (req, res) => {
    Post.findOne({ slug: req.query.id })
        .lean()
        .populate({
            path: 'comments',
            match: { approveComment: true },
            populate: { path: 'user', model: 'User' },
        })
        .populate('author')
        .then(post => {
            Category.find({})
                .lean()
                .then(categories => {
                    return res.status(200).json({ post, categories });
                });
        });
};

export default connectDb(handler);