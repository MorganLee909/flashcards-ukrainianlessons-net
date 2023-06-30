const {Eta} = require("eta");
let eta = new Eta({views: `${__dirname}/../views`});

module.exports = {
    /*
    Landing page
    */
    landing: function(req, res){
        res.send(eta.render("landing.eta"));
    }
}