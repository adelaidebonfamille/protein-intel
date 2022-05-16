const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	nim: {
		type: Number,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	faculty: {
		type: String,
		required: true,
	},
	major: {
		type: String,
		required: true,
	},
	entryYear: {
		type: Number,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("User", userSchema);
