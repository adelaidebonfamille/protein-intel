const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
	},
	key: {
		type: String,
		required: true,
	},
	associatedFile: {
		type: String,
		required: false,
	},
	type: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Problem", problemSchema);
