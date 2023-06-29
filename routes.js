const Deck = require("./models/deck.js");

module.exports = (app, eta)=>{
    /*
    Landing page
    */
    app.get("/", (req, res)=>{
        Deck.find({})
            .then((decks)=>{
                res.send(eta.render("landing.eta"));
            })
            .catch((err)=>{
                console.error(err);
            });
    });
}