const express = require('express')
const app = new express()
const ejs = require('ejs')
const bodyParser = require('body-parser')

//connect to database
const mongoose = require('mongoose');
const dbpath = require('./key');

mongoose.connect(dbpath, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to the database successfully');
});

const fileUpload = require('express-fileupload')

app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))
app.set('view engine', 'ejs')

const validationMiddleware = require("./middleware/validationMiddleware");

app.use('/posts/store', validationMiddleware)

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost');

app.get('/',homeController)
app.get('/post/new',newPostController)
app.get('/post/:id',getPostController)
app.post('/posts/store', storePostController)

app.listen(4000, () => {
    console.log('App listening on port 4000')
})