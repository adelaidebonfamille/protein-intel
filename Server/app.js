const express = require("express");
const db = require("./data/database");
const dotenv = require("dotenv");

const corsMiddleware = require("./middleware/cors");
const errorHandlerMiddleware = require("./middleware/errorHandler");

const authRoutes = require("./routers/auth.routes");

const app = express();

dotenv.config();

app.use(corsMiddleware);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

db.connectToDatabase().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
});
