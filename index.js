const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/',(req, res) => {
    res.render('index')
})
app.get('/contact',(req, res) => {
    res.render('contact')
})
app.get('/about',(req, res) => {
    res.render('about')
})
app.get('/post',(req, res) => {
    res.render('post')
})

//connect to database
const mongoose = require('mongoose');
const dbpath = require('./dbkey');

mongoose.connect(dbpath, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to the database successfully');
});

const Test = require('./test')
Test()
app.listen(4000, () => {
    console.log('App listening on port 4000')
})