const mongoose = require("mongoose");

let mongodbUrl =
	"mongodb+srv://azie-dev:azie122333@azie-database.yfjgj.mongodb.net/intelprotein?retryWrites=true&w=majority";

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
