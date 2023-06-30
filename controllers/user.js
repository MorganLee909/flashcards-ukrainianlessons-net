const User = require("../models/user.js");
const Deck = require("../models/deck.js");

const helper = require("../helper.js");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const {Eta} = require("eta");
let eta = new Eta({views: `${__dirname}/../views`});

module.exports = {
    /*
    Sign up page
    */
    signupPage: function(req, res){
        res.send(eta.render("/user/signup.eta"));
    },

    /*
    Log in page
    */
    loginPage: function(req, res){
        if(req.session.user) return res.redirect("/user/dashboard");
        res.send(eta.render("/user/login.eta"));
    },

    /*
    DashboardPage
    */
    dashboardPage: function(req, res){
        Deck.find({_id: res.locals.user.decks}, {name: 1})
            .then((decks)=>{
                res.send(eta.render("/user/dashboard.eta", {decks: decks}));
            })
            .catch((err)=>{
                console.error(err);
                res.redirect("/");
            });
    },
    
    /*
    POST: Create user
    req.body = {
        email: String
        password: String
        confirmPassword: String
    }
    redirect = /user/login
    */
    signup: function(req, res){
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
    },

    /*
    POST: User Login
    req.body = {
        email: String
        password: String
    }
    redirect = /user/dashboard
    */
    login: function(req, res){
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
    },

    /*
    GET: User logout
    redirect = /
    */
    logout: function(req, res){
        req.session.user = undefined;
        res.redirect("/");
    }
}