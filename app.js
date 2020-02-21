const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');

mongoose.connect('mongodb://localhost:27017/cms', {useNewUrlParser: true})
    .then(db => {
        console.log('MONGO CONNECTED')
    })
    .catch(error => console.log(error));

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const { select } = require('./helpers/handlebars-helpers');

// Set view engine
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: { select }}));
app.set('view engine', 'handlebars');

// Upload Middleware
app.use(upload());

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Method Override
app.use(methodOverride('_method'));

// Load routes
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');

// Use routes
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);

app.listen(4500, () => {
    console.log(`listen on port 4500`);
});
