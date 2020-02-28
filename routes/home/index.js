const express = require('express');
const router = express.Router();
const Post =  require('../../models/Post');
const Category =  require('../../models/Category');
const User =  require('../../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});

router.get('/', (req, res) => {
    Post.find({})
        .lean()
        .then(posts => {
            Category.find({})
                .lean()
                .then(categories => {
                    res.render('home/index', { posts, categories });
                });
        });
});

router.get('/about', (req, res) => {
    res.render('home/about');
});

// Login

passport.serializeUser(function(user, done) {
    done(null, user);
})
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    }).lean();
});

router.get('/login', (req, res) => {
    res.render('home/login');
});

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
        .lean()
        .then(user => {
            if (!user) return done(null, false, { message: 'No user found' });
            
            bcrypt.compare(password, user.password, (err, matched) => {
                if (err) return err;
                if (matched) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password' }); 
                }
            });
        });
}));

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

router.get('/register', (req, res) => {
    res.render('home/register');
});

router.post('/register', (req, res) => {
    const errors = [];

    if (!req.body.firstName) errors.push({message: 'Please add your first name'});
    if (!req.body.lastName) errors.push({message: 'Please add your last name'});
    if (!req.body.email) errors.push({message: 'Please add your email'});
    if (!req.body.password) errors.push({message: 'This field cannot be blank'});
    if (req.body.password !== req.body.passwordConfirm) errors.push({message: 'Password fields do not match'});

    if (errors.length > 0) {
        res.render('home/register', {
            errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        });
    } else {
        User.findOne({ email: req.body.email })
            .lean()
            .then(user => {
                if (!user) {
                    const newUser = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash;

                            newUser.save().then(savedUser => {
                                req.flash('success_message', 'You are now registered, please log in');
                                res.redirect('/login');
                            });
                        });
                    });
                } else {
                    req.flash('error_message', 'That email exists, please log in')
                    res.redirect('/login');
                }
            });
    }
});

router.get('/post/:id', (req, res) => {
    Post.findOne({ _id: req.params.id })
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
                    res.render('home/post', { post, categories });
                });
        })
});

module.exports = router;

