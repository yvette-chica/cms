const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const { isEmpty, uploadDir } = require('../../helpers/upload-helper')
const fs = require('fs');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res) => {
    Post.find({})
        .lean()
        .populate('category')
        .then(posts => {
            res.render('admin/posts', { posts });
        });
});

router.get('/create', (req, res) => {
    Category.find({})
        .lean()
        .then(categories => {
            res.render('admin/posts/create', { categories });
        })
});

router.post('/create', (req, res) => {
    let errors = [];
    if (!req.body.title) errors.push({message: 'Please add a title'});
    if (!req.body.status) errors.push({message: 'Please add a status'});
    if (!req.body.body) errors.push({message: 'Please add a description'});

    if (errors.length > 0) {
        res.render('admin/posts/create', { errors })
    } else {
        let filename = 'not-found.jpg';

        if (!isEmpty(req.files)) {
            let file = req.files.file;
            filename = `${Date.now()}-${file.name}`;

            file.mv(`./public/uploads/${filename}`, (err) => {
                if (err) throw err;
            });
        }

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
            category: req.body.category,
            file: filename,
        });

        newPost.save().then(savedPost => {
            req.flash('success_message', `Post ${savedPost.title} was created successfully`);
            res.redirect('/admin/posts');
        }).catch(error => console.log('could not save post', error));
    }
});

router.get('/edit/:id', (req, res) => {
    Post.findOne({_id: req.params.id}).lean().then(post => {
        Category.find({})
            .lean()
            .then(categories => {
                res.render('admin/posts/edit', { post, categories });
            });
    });
});

router.put('/edit/:id', (req, res) => {

    Post.findOne({ _id: req.params.id })
        .then(post => {
            let allowComments = true;
            if (req.body.allowComments) {
                allowComments = true;
            } else {
                allowComments = false;
            }
            post.title = req.body.title;
            post.status = req.body.status;
            post.allowComments = allowComments;
            post.body = req.body.body;
            post.category = req.body.category;

            if (!isEmpty(req.files)) {
                let file = req.files.file;
                filename = `${Date.now()}-${file.name}`;
                post.file = filename;

                file.mv(`./public/uploads/${filename}`, (err) => {
                    if (err) throw err;
                });
            }

            post.save().then(updatedPost => {
                req.flash('success_message', 'Post was successfully updated');
                res.redirect('/admin/posts');
            });
        });
});

router.delete('/:id', (req, res) => {
    Post.findOne({_id: req.params.id})
        .then(post => {
            fs.unlink(uploadDir + post.file, (err) => {
                post.remove();
                req.flash('success_message', 'Post was successfully deleted');
                res.redirect('/admin/posts');
            });
        });
});

module.exports = router;
