const express = require('express')
const app = new express()
const path = require('path')
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

const BlogPost = require('./models/BlogPost')

const validateMiddleWare = (req,res,next)=>{
    if(req.files == null || req.body.title == null || req.body.title == null){
    return res.redirect('/post/new')
    }
    next()
}

app.use('/posts/store',validateMiddleWare)

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

app.post('/posts/store',(req,res) => {
    let image = req.files.image
    image.mv(path.resolve(__dirname,'public/img',image.name), async (error) => {
        await BlogPost.create({
            title: req.body.title,
            body: req.body.body,
            image: '/img/' + image.name
          })
        res.redirect('/')
    });
})


app.listen(4000, () => {
    console.log('App listening on port 4000')
})