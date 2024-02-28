const mongooose = require('mongoose')
const Schema = mongooose.Schema

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true,'Please provide title'],
        unique: true
        },
    body: {
        type: String,
        required: [true,'Please provide Description'],
        },
    userid:{
        type: mongooose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        },
    datePosted:{ /* can declare property type with an object like this because we need 'default' */
    type: Date,
    default: new Date()
    },
    image: {
        type: String,
        required: [true,'Please provide an image']
        }
})

const BlogPost = mongooose.model('BlogPost',BlogPostSchema)

module.exports = BlogPost