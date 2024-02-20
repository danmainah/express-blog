const mongooose = require('mongoose')
const Schema = mongooose.Schema

const BlogPostSchema = new Schema({
    title: String,
    body: String,username: String,
    datePosted:{ /* can declare property type with an object like this because we need 'default' */
    type: Date,
    default: new Date()
    }
})

const BlogPost = mongooose.model('BlogPost',BlogPostSchema)

module.exports = BlogPost