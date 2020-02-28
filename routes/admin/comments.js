const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res) => {
    // Only show comments from logged in user
    Comment.find({ user: req.user._id })
        .lean()
        .populate('user')
        .then(comments => {
            res.render('admin/comments', { comments });
        });
});

router.post('/', (req, res) => {
    Post.findOne({ _id: req.body.id })
        .then(post => {
            const newComment = new Comment({
                user: req.user._id,
                body: req.body.body,
            });

            post.comments.push(newComment);
            post.save().then(savePost => {
                newComment.save().then(savedComment => {
                    res.redirect(`/post/${post._id}`);
                });
            });
        }).catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
    Comment.deleteOne({ _id: req.params.id })
        .then(deletedItem => {
            Post.findOneAndUpdate(
                { comments: req.params.id },
                { $pull: { comments: req.params.id } },
                (err, data) => {
                    if (err) console.log(err);
                    res.redirect('/admin/comments');
                }
            )
        });
});

module.exports = router;
