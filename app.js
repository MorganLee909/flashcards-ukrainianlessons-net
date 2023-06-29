const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const {Eta} = require("eta");

const app = express();
let eta = new Eta({views: `${__dirname}/views`});
app.use(compression());

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

if(process.env.NODE_ENV === "production"){
    module.exports = app;
}else{
    app.listen(process.env.PORT);
}