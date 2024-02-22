const mongooose = require('mongoose')
const Schema = mongooose.Schema

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
        },
    body: {
        type: String,
        required: true,
        },
    username: String,
    datePosted:{ /* can declare property type with an object like this because we need 'default' */
    type: Date,
    default: new Date()
    },
    image: String
})

const BlogPost = mongooose.model('BlogPost',BlogPostSchema)

module.exports = BlogPost