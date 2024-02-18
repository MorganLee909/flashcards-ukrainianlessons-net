const user = require("./controllers/user.js");
const deck = require("./controllers/deck.js");
const other = require("./controllers/other.js");

const {userAuth} = require("./middleware.js");

module.exports = (app)=>{
    //USER
    app.get("/user/signup", user.signupPage);
    app.get("/user/login", user.loginPage);
    app.get("/user/dashboard", userAuth, user.dashboardPage);

    app.post("/user/signup", user.signup);
    app.post("/user/login", user.login);
    app.get("/user/logout", user.logout);

    //DECK
    app.get("/deck/new", userAuth, deck.new);
    app.get("/deck/:deck", deck.viewOne);
    app.get("/deck/:deck/edit", userAuth, deck.edit);

    app.post("/deck/create", userAuth, deck.create);
    app.get("/deck/:deck/delete", userAuth, deck.delete);
    app.post("/deck/:deck/update", userAuth, deck.update);

    //OTHER
    app.get("/", other.landing);
}
