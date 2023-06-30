const User = require("./models/user.js");

module.exports = {
    userAuth: function(req, res, next){
        if(!req.session.user) return res.redirect("/user/login");

        User.findOne({session: req.session.user})
            .then((user)=>{
                if(!user){
                    req.session.user = undefined;
                    return res.redirect("/user/login");
                }

                res.locals.user = user;
                next();
            })
            .catch((err)=>{
                console.error(err);
                res.redirect("/");
            });
    }
}