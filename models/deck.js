const mongoose = require("mongoose");

const DeckSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    cards: [],
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    updated: {
        type: Date,
        required: true,
        default: new Date()
    },
    public: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("deck", DeckSchema);
