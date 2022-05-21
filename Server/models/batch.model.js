const mongoose = require("mongoose");

const bacthSchema = new mongoose.Schema({
	batch: {
		type: String,
		required: true,
		unique: true,
	},
	isActive: {
		type: Boolean,
		required: true,
		default: false,
	},
});

module.exports = mongoose.model("Batch", bacthSchema);
