const User = require("../models/user.js");

const helper = require("../helper.js");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

module.exports = (app, eta)=>{
    /*
    Sign up
    */
    app.get("/user/signup", (req, res)=>{
        res.send(eta.render("/user/signup.eta"));
    });

    /*
    Log in
    */
    app.get("/user/login", (req, res)=>{
        res.send(eta.render("/user/login.eta"));
    });
    
    /*
    POST: Create user
    req.body = {
        email: String
        password: String
        confirmPassword: String
    }
    */
    app.post("/user/signup", (req, res)=>{
        let email = req.body.email.toLowerCase();
        if(!helper.isValidEmail(email)) return res.redirect("/user/signup");

        if(req.body.confirmPassword !== req.body.password) return res.redirect("/user/signup");
        if(req.body.password.length < 10) return res.redirect("/user/signup");

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);

        let user = new User({
            email: email,
            password: hash,
            decks: []
        });

        user.save()
            .then((user)=>{
                res.redirect("/user/login");
            })
            .catch((err)=>{
                console.error(err);
                res.redirect("/user/signup");
            });
    });

    /*
    POST: User Login
    req.body = {
        email: String
        password: String
    }
    */
    app.post("/user/login", (req, res)=>{
        let email = req.body.email.toLowerCase();

        User.findOne({email: email})
            .then((user)=>{
                if(!user) return res.redirect("/user/login");

                user.session = crypto.randomUUID();

                return user.save();
            })
            .then((user)=>{
                req.session.user = user.session;

                res.redirect("/user/dashboard");
            })
            .catch((err)=>{
                console.error(err);
                res.redirect("/user/login");
            });
    });
}