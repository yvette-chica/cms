const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

// Load routes
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');

// Use routes
app.use('/', home);
app.use('/admin', admin);

app.listen(4500, () => {
    console.log(`listen on port 4500`);
});

