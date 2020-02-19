const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/cms')
    .then(db => {
        console.log('MONGO CONNECTED')
    })
    .catch(error => console.log(error));

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
