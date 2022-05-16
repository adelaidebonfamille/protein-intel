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
		required: false,
	},
	major: {
		type: String,
		required: false,
	},
	entryYear: {
		type: Number,
		required: false,
	},
	phone: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model("User", userSchema);
