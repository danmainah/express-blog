const express = require('express')
const app = new express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const expressSession = require('express-session');
const flash = require('connect-flash');

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
app.use(flash());
app.use(expressSession({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true
  }));

app.use(express.static('public'))
app.set('view engine', 'ejs')

global.loggedIn = null;
app.use("*", (req, res, next) => {
loggedIn = req.session.userId;
next()
});

const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')

app.get('/auth/logout', logoutController)
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController)

const validationMiddleware = require("./middleware/validationMiddleware");
const authMiddleware = require('./middleware/authMiddleware');

app.use('/posts/store', validationMiddleware)

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost');

app.get('/',homeController)
app.get('/posts/new',authMiddleware ,newPostController)
app.get('/post/:id',getPostController)
app.post('/posts/store', authMiddleware, storePostController)

app.use((req, res) => res.render('notfound'));

app.listen(4000, () => {
    console.log('App listening on port 4000')
})