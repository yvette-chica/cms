const express = require('express');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const Category = require('../../models/Category');
const { userAuthenticated } = require('../../helpers/authentication');

router.all('/*', userAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res) => {

    const promises = [
        Post.countDocuments().exec(),
        Category.countDocuments().exec(),
        Comment.countDocuments().exec(),
    ];

    Promise.all(promises)
        .then(([postCount, categoryCount, commentCount]) => {
            res.render('admin/index', { postCount, categoryCount, commentCount });
        });
});

router.post('/generate-fake-posts', (req, res) => {
    for (let i = 0; i < req.body.amount; i++) {
        let post = new Post();
        post.title = faker.name.title();
        post.status = 'public';
        post.allowComments = faker.random.boolean();
        post.body = faker.lorem.sentence();

        post.save(function(err) {
            if (err) throw err
        });
    }
    res.redirect('/admin/posts');
});

module.exports = router;
