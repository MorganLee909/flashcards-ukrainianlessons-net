const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const {Eta} = require("eta");
const bodyParser = require("body-parser");
const session = require("cookie-session");

const app = express();
let eta = new Eta({views: `${__dirname}/views`});

app.use(compression());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
}));

let mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

if(process.env.NODE_ENV === "production"){
    mongooseOptions.auth = {authSource: "admin"};
    mongooseOptions.user = "website";
    mongooseOptions.pass = process.env.MONGODB_PASS;
}

mongoose.connect("mongodb://127.0.0.1/flashcards", mongooseOptions);

require("./routes/pages.js")(app, eta);
require("./routes/user.js")(app, eta);

if(process.env.NODE_ENV === "production"){
    module.exports = app;
}else{
    app.listen(process.env.PORT);
}