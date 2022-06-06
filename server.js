const express = require('express')
const mongoose = require('mongoose')

const user = require('./routes/api/user');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts')
const app = express();
//DB config
const db = require("./config/key").mongoURI;
//coonect to mongodb
mongoose.connect(db).then(() => console.log("MongoDb connected")).catch((err) => console.log(err))

//use routes
app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.get('/', (req, res) => res.send("Hello World"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on  port ${port}`));