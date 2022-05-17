const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
	nim: {
		type: String,
		required: true,
		unique: true,
	},
	answers: {
		type: Array,
		required: true,
	},
	testEnd: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model("Test", TestSchema);
