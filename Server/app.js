const express = require("express");
const db = require("./data/database");
const dotenv = require("dotenv");

const corsMiddleware = require("./middlewares/cors");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const verifyTokenMiddleware = require("./middlewares/verifyToken");
const verifyRolesMiddleware = require("./middlewares/verifyRoles");

const authRoutes = require("./routers/auth.routes");
const adminRoutes = require("./routers/admin.routes");
const testRoutes = require("./routers/test.routes");
const userRoutes = require("./routers/user.routes");

const app = express();

dotenv.config();

app.use(corsMiddleware);

app.use(express.json());
app.use("/problems/files", express.static("/problem-data/files"));

app.use("/api/auth", authRoutes);

app.use(verifyTokenMiddleware);

app.use("/api/admin", verifyRolesMiddleware.bind(null, "admin"), adminRoutes);

app.use("/api/user", userRoutes);

app.use("/api/test", verifyRolesMiddleware.bind(null, "user"), testRoutes);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

db.connectToDatabase().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
});
