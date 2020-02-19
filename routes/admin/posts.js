const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res) => {
    Post.find({}).lean().then(posts => {
        res.render('admin/posts', { posts });
    });
});

router.get('/create', (req, res) => {
    res.render('admin/posts/create');
});

router.post('/create', (req, res) => {
    let allowComments = true;
    if (req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }

    const newPost = new Post({
        title: req.body.title,
        status: req.body.status,
        allowComments,
        body: req.body.body,
    });

    newPost.save().then(savedPost => {
        console.log(savedPost);
        res.redirect('/admin/posts');
    }).catch(error => console.log('could not save post', error));
});

router.get('/edit/:id', (req, res) => {
    Post.findOne({_id: req.params.id}).lean().then(post => {
        res.render('admin/posts/edit', { post });
    });
});

module.exports = router;
