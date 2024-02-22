const User = require('../models/User.js')
const path = require('path')

module.exports = async (req,res)=> {
    await User.create({
        username: req.body.username,
        password: req.body.password,
    })
    if(error){
        return res.redirect('/auth/register')
    }
    res.redirect('/')
}