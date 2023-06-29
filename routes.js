const Deck = require("./deck.js");

module.exports = (app, eta)=>{
    /*
    Landing page
    */
    app.get("/", (req, res)=>{
        Deck.find({})
            .then((decks)=>{
                res.send(eta.render("landing.eta", {decks: decks}));
            })
            .catch((err)=>{
                console.error(err);
            });
    });
}