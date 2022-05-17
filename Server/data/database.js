const mongoose = require("mongoose");

let mongodbUrl = process.env.DEV_DATABASE;

async function connectToDatabase() {
	if (process.env.DB_CONNECT) {
		mongodbUrl = process.env.DB_CONNECT;
	}
	mongoose.connect(
		mongodbUrl,
		{
			useNewUrlParser: true,
		},
		() => console.log("Connected to database")
	);
}

module.exports = {
	connectToDatabase: connectToDatabase,
};
