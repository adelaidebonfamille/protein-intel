const express = require("express");
const db = require("./data/database");
const dotenv = require("dotenv");

const corsMiddleware = require("./middlewares/cors");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const verifyTokenMiddleware = require("./middlewares/verifyToken");

const authRoutes = require("./routers/auth.routes");

const app = express();

dotenv.config();

app.use(corsMiddleware);

app.use(express.json());

app.use();

app.use("/api/auth", authRoutes);

app.use(verifyTokenMiddleware);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

db.connectToDatabase().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
});
