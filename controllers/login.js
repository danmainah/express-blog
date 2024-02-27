module.exports = (req, res) =>{
    let username = ""
    let password = ""
    const data = req.flash('data')[0];
    console.log(data)
    if(typeof data != "undefined"){
    username = data.username
    password = data.password
    }
    res.render('login',{
        validationErrors: req.flash('validationErrors'),
        username: username,
        password: password
    })
}