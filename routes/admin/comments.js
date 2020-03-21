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
                    req.flash('success_message', 'Comment will be posted pending approval');
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

router.post('/approve-comment', (req, res) => {
    Comment.findByIdAndUpdate(req.body.id, { $set: { approveComment: req.body.approveComment } }, (err, result) => {
        if (err) return err;
        res.send(result);
    });
});

module.exports = router;
