const express = require("express");
const cors = require("cors");
const db = require("./data/database");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const errorHandlerMiddleware = require("./middlewares/errorHandler");
const verifyTokenMiddleware = require("./middlewares/verifyToken");
const verifyRolesMiddleware = require("./middlewares/verifyRoles");

const authRoutes = require("./routers/auth.routes");
const adminRoutes = require("./routers/admin.routes");
const testRoutes = require("./routers/test.routes");
const userRoutes = require("./routers/user.routes");

const app = express();

try {
  app.use(cors());

  dotenv.config();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

  app.use("/problems/files", express.static("./problem-data/files"));

  app.get("/api", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/api/auth", authRoutes);

  app.use(verifyTokenMiddleware);

  app.use("/api/admin", verifyRolesMiddleware.bind(null, "admin"), adminRoutes);

  app.use("/api/user", verifyRolesMiddleware.bind(null, "user"), userRoutes);

  app.use("/api/test", verifyRolesMiddleware.bind(null, "user"), testRoutes);

  app.use(errorHandlerMiddleware);
} catch (error) {
  console.log(error);
}

const PORT = process.env.PORT || 5000;

db.connectToDatabase()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    server.keepAliveTimeout = 61 * 1000;
    server.headersTimeout = 122 * 1000;
  })
  .catch((err) => {
    console.log(err);
  });
