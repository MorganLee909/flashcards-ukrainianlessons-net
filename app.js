const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("cookie-session");

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
}));

let mongoString = "mongodb://127.0.0.1/ukrainianlessons";

if(process.env.NODE_ENV === "production"){
    mongoString = `mongodb://website:${process.env.MONGODB_PASS}@127.0.0.1:27017/ukrainianlessons?authSource=admin`;
}

mongoose.connect(mongoString);

require("./routes.js")(app);

if(process.env.NODE_ENV === "production"){
    module.exports = app;
}else{
    app.listen(process.env.PORT);
}
