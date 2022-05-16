const express = require("express");
const db = require("./data/database");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 5000;

db.connectToDatabase().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
});
