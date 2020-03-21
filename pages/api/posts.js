import connectDb from '../../dbMiddleware';
const Post = require('../../models/Post');

const handler = (req, res) => {
//  const { author } = req.query;
    Post.find({})
        .lean()
        //.populate('category')
        .then(posts => {
            res.status(200).json(posts);
        });
};

export default connectDb(handler);