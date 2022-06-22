const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const users = require('./routes/api/user');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// DB Config
const db = require('./config/key').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Use Routes
app.use('/api/user', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));