const mongooose = require('mongoose')
const Schema = mongooose.Schema

const BlogPostSchema = new Schema({
    title: String,
    body: String
})

const BlogPost = mongooose.model('BlogPost',BlogPostSchema)

module.exports = BlogPost