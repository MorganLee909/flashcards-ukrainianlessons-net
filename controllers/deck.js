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
    GET: Display a single deck
    req.params.deck = Deck ID
    */
    viewOne: function(req, res){
        Deck.findOne({_id: req.params.deck})
            .then((deck)=>{
                for(let i = 0; i < res.locals.user.decks.length; i++){
                    if(res.locals.user.decks[i].toString() === deck._id.toString()){
                        return res.send(eta.render("/deck/viewOne.eta", {deck: deck}));
                    }
                }

                res.redirect("/user/dashboard");
            })
            .catch((err)=>{
                console.error(err);
                res.redirect("/user/dashboard");
            });
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
    },

    /*
    GET: Delete a deck
    req.params.deck = Deck ID
    redirect "/user/dashboard"
    */
    delete: function(req, res){
        Deck.findOne({_id: req.params.deck})
            .then((deck)=>{
                if(!deck) return res.redirect(`/deck/${req.params.deck}`);
                if(deck.creator.toString() !== res.locals.user._id.toString()) return res.redirect(`/deck/${req.params.deck}`);

                return Deck.deleteOne({_id: req.params.deck});
            })
            .then(()=>{
                res.redirect("/user/dashboard");
            })
            .catch((err)=>{
                console.error(err);
                res.redirect(`/deck/${req.params.deck}`);
            });
    }
}