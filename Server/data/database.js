const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

let mongodbUrl = process.env.DEV_DB_CONNECT;

async function connectToDatabase() {
  if (process.env.DB_CONNECT) {
    mongodbUrl = `${process.env.DB_CONNECT}`;
  }
  mongoose.connect(
    mongodbUrl,
    {
      useNewUrlParser: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Database connected");
      }
    }
  );
}

module.exports = {
  connectToDatabase: connectToDatabase,
};
