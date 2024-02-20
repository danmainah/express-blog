const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const bodyParser = require('body-parser')

//connect to database
const mongoose = require('mongoose');
const dbpath = require('./dbkey');

mongoose.connect(dbpath, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to the database successfully');
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))
app.set('view engine', 'ejs')

const BlogPost = require('./models/BlogPost')

app.get('/', async (req, res) => {
    const posts = await BlogPost.find({})
    res.render('index',{
        posts: posts
    })
})
app.get('/contact',(req, res) => {
    res.render('contact')
})
app.get('/about',(req, res) => {
    res.render('about')
})

app.get('/post/new',(req, res) => {
    res.render('create')
})

app.get('/post/:id', async(req, res) => {
    const post = await BlogPost.findById(req.params.id)
    res.render('post', {
        post: post
    })
})

app.post('/posts/store', async (req,res) => {
    await BlogPost.create({
        title: req.body.title,
        body: req.body.body
      })
    res.redirect('/')
})


app.listen(4000, () => {
    console.log('App listening on port 4000')
})