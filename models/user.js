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
    }],
    session: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("user", UserSchema);