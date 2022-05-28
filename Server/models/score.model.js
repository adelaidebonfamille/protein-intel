const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    nim: {
        type: String,
        required: true,
        unique: true,
    },
    reading: {
        type: Number,
        required: true,
    },
    listening: {
        type: Number,
        required: true,
    },
    structure: {
        type: Number,
        required: true,
    },
    totalScore: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Score", scoreSchema);