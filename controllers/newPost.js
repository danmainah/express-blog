module.exports = (req, res) =>{
    let title = ""
    let body = ""
    let image = ""
    const data = req.flash('data')[0];
    if(typeof data != "undefined"){
    title = data.title
    body = data.body
    image = data.image
    }
    if(req.session.userId){
        return res.render("create", {
            errors: req.flash('validationErrors'),
            title: title,
            body: body,
            image: image
        });
        }
    res.redirect('/posts/new')
}