const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
    nim: {
        type: String,
        required: true,
        unique: true,
    },
    answers: {
        type: Object,
        required: true,
    },
    testTime: {
        type: Object,
        required: true,
    },
    isTestOver: {
        type: Boolean,
        required: true,
        default: false,
    },
    batchId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Test", TestSchema);