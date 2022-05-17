const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
	nim: {
		type: String,
		required: true,
		unique: true,
	},
	score: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Score", scoreSchema);
