const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    const posts = await BlogPost.find({})
    res.render('index',{
        posts: posts
    })
}