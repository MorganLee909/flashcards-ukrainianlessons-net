const {Eta} = require("eta");
let eta = new Eta({views: `${__dirname}/../views`});

const Deck = require("../models/deck.js");

module.exports = {
    /*
    GET: Page to create new deck
    */
    new: function(req, res){
        res.send(eta.render("deck/new.eta"));
    },

    /*
    POST: Create a new deck
    req.body = {
        name: String
        cards: [[String, String]] (JSON)
    }
    */
    create: function(req, res){
        let deck = new Deck({
            name: req.body.name,
            creator: res.locals.user._id,
            cards: JSON.parse(req.body.cards)
        });

        res.locals.user.decks.push(deck._id);

        Promise.all([deck.save(), res.locals.user.save()])
            .then((response)=>{
                res.redirect("/user/dashboard");
            })
            .catch((err)=>{
                console.error(err);
                res.redirect("/deck/new");
            });
    }
}