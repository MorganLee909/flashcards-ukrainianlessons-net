const User = require("../models/user.js");

const helper = require("../helper.js");
const bcrypt = require("bcryptjs");

module.exports = (app, eta)=>{
    /*
    POST: Create user
    req.body = {
        email: String
        password: String
        confirmPassword: String
    }
    */
    app.post("/signup", (req, res)=>{
        let email = req.body.email.toLowerCase();
        if(!helper.isValidEmail(email)) return res.redirect("/signup");

        if(req.body.confirmPassword !== req.body.password) return res.redirect("/signup");
        if(req.body.password.length < 10) return res.redirect("/signup");

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);

        let user = new User({
            email: email,
            password: hash,
            decks: []
        });

        user.save()
            .then((user)=>{
                res.redirect("/login");
            })
            .catch((err)=>{
                res.redirect("/signup");
            });
    });
}