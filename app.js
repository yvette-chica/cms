const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');

mongoose.connect('mongodb://localhost:27017/cms', {useNewUrlParser: true})
    .then(db => {
        console.log('MONGO CONNECTED')
    })
    .catch(error => console.log(error));

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


// Set view engine
const { select, generateTime } = require('./helpers/handlebars-helpers');
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: { select, generateTime }}));
app.set('view engine', 'handlebars');

// Upload Middleware
app.use(upload());

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Method Override
app.use(methodOverride('_method'));

app.use(session({
    secret: 'edwindiaz123ilovecoding',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());

// Local Variables using Middleware
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.form_errors = req.flash('form_errors');
    next();
});

// Load routes
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
const categories = require('./routes/admin/categories');

// Use routes
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);
app.use('/admin/categories', categories);

app.listen(4500, () => {
    console.log(`listen on port 4500`);
});
