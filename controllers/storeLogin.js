const User = require('../models/User.js')
const path = require('path')

module.exports = async (req,res)=> {
    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
        })
        res.redirect('/')
    } catch (error) {
        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
        console.log(validationErrors)
        req.flash('validationErrors',validationErrors)
        req.flash('data',req.body)
        res.redirect('/auth/register');
    }   
}