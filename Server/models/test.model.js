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
	testTime: {
		type: Date,
		required: true,
	},
	isTestOver: {
		type: Boolean,
		required: true,
		default: false,
	},
	batch: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Test", TestSchema);
