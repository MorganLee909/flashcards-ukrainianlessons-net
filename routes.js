const user = require("./controllers/user.js");
const other = require("./controllers/other.js");

const {userAuth} = require("./middleware.js");

module.exports = (app, eta)=>{
    //USER
    app.get("/user/signup", user.signupPage);
    app.get("/user/login", user.loginPage);
    app.get("/user/dashboard", userAuth, user.dashboardPage);

    app.post("/user/signup", user.signup);
    app.post("/user/login", user.login);

    //OTHER
    app.get("/", other.landing);
}