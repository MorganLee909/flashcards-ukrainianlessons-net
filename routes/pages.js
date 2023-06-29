module.exports = (app, eta)=>{
    /*
    Landing page
    */
    app.get("/", (req, res)=>{
        res.send(eta.render("landing.eta"));
    });

    /*
    Sign up
    */
    app.get("/signup", (req, res)=>{
        res.send(eta.render("/user/signup.eta"));
    });

    /*
    Log in
    */
    app.get("/login", (req, res)=>{
        res.send(eta.render("/user/login.eta"));
    });
}