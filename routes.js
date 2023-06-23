module.exports = (app, eta)=>{
    /*
    Landing page
    */
    app.get("/", (req, res)=>{
        res.send(eta.render("landing.eta"));
    });
}