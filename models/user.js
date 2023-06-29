const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    decks: [{
        type: mongoose.Types.ObjectId,
        ref: "deck"
    }]
});

module.exports = mongoose.model("user", UserSchema);