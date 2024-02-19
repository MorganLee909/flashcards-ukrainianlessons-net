const {Eta} = require("eta");
let eta = new Eta({views: `${__dirname}/../views`});

const User = require("../models/user.js");
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
        let promises = [];

        promises.push(Deck.findOne({_id: req.params.deck}));
        if(req.session.user) promises.push(User.findOne({session: req.session.user}));

        Promise.all(promises)
            .then((response)=>{
                let deck = response[0];
                if(deck.public || deck.creator.toString() === response[1]?._id.toString()) return res.send(eta.render("deck/viewOne.eta", {deck: deck}));
                
                return res.redirect("/user/dashboard");
            })
            .catch((err)=>{
                console.error(err);
                res.redirect("/user/dashboard");
            });
    },

    /*
    POST: Display a custom built deck
    req.query = {
        cards = comma seperated values (front, back, front, back)
    }
    */
    viewCustom: function(req, res){
        let deck = {
            name: "Custom Deck",
            cards: []
        };

        let cards = req.query.cards.split(",");
        for(let i = 0; i < cards.length; i+=2){
            deck.cards.push([cards[i], cards[i+1]]);
        }

        res.send(eta.render("deck/viewOne.eta", {deck: deck}));
    },

    /*
    GET: Display page to edit a deck
    req.params.deck = Deck ID
    render /deck/edit.eta
    */
    edit: function(req, res){
        Deck.findOne({_id: req.params.deck})
            .then((deck)=>{
                if(deck.creator.toString() !== res.locals.user._id.toString()) return res.redirect("/user/dashboard");

                res.send(eta.render("deck/edit.eta", {deck: deck}));
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
            cards: JSON.parse(req.body.cards),
            public: req.body.public ? true : false
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
    },

    /*
    POST: Update a deck
    req.params.deck = Deck ID
    req.body = {
        name: String
        cards: [[String, String]] (JSON)
    }
    */
    update: function(req, res){
        Deck.findOne({_id: req.params.deck})
            .then((deck)=>{
                if(deck.creator.toString() !== res.locals.user._id.toString()) return res.redirect(`/deck/${deck._id}/edit`);

                deck.name = req.body.name;
                deck.cards = JSON.parse(req.body.cards);
                deck.public = req.body.public ? true : false;

                return deck.save();
            })
            .then((deck)=>{
                res.redirect(`/deck/${deck._id}`);
            })
            .catch((err)=>{
                console.error(err);
                res.redirect(`/deck/${deck._id}/edit`);
            });
    }
}
