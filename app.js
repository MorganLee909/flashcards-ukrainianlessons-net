const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("cookie-session");

const app = express();

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

mongoose.connect("mongodb://127.0.0.1/ukrainianlessons", mongooseOptions);

require("./routes.js")(app);

if(process.env.NODE_ENV === "production"){
    module.exports = app;
}else{
    app.listen(process.env.PORT);
}
