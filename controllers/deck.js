const {Eta} = require("eta");
let eta = new Eta({views: `${__dirname}/../views`});

module.exports = {
    new: function(req, res){
        res.send(eta.render("deck/new.eta"));
    }
}