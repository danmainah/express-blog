const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (user) {
            const same = await bcrypt.compare(password, user.password);
            if (same) { // if passwords match
                req.session.userId = user._id
                res.redirect('/');
            } else {
                res.redirect('/auth/login');
            }
        } else {
            res.redirect('/auth/register');
        }
    } catch (error) {
        // handle error
        console.error(error);
    }
};
