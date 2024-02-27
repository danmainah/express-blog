const BlogPost = require('../models/BlogPost.js')
const path = require('path')
module.exports = (req,res)=>{  
let image = req.files.image;
image.mv(path.resolve(__dirname,'..','public/img',image.name),async (error)=>{
    try{
        const post = await BlogPost.create({
            title: req.body.title,
            body: req.body.body,
            image: '/img/' + image.name
        })
        res.redirect('/')
    }
    catch(error){
        console.log(error)
        const postErrors = Object.keys(error.errors).map(key => error.errors[key].message);
        console.log("imefika hapa")
        req.flash('validationErrors',postErrors)
        req.flash('data',req.body)
        res.redirect('/posts/new');
    }
})
}