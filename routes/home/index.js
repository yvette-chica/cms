const express = require('express');
const router = express.Router();
const Post =  require('../../models/Post');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});

router.get('/', (req, res) => {
    Post.find({})
        .lean()
        .then(posts => {
            res.render('home/index', { posts });
        });
});

router.get('/about', (req, res) => {
    res.render('home/about');
});

router.get('/login', (req, res) => {
    res.render('home/login');
});

router.get('/register', (req, res) => {
    res.render('home/register');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({ _id: req.params.id })
        .lean()
        .then(post => {
            res.render('home/post', { post });
        })
});

module.exports = router;

