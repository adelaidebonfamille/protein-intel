const mongoose = require("mongoose");

let mongodbUrl = `mongodb://localhost:27017/protein`;

async function connectToDatabase() {
    if (process.env.DB_CONNECT) {
        mongodbUrl = `${process.env.DB_CONNECT}`;
    }
    console.log(mongodbUrl);
    mongoose.connect(
        mongodbUrl, {
            useNewUrlParser: true,
        },
        () => console.log("Connected to database")
    );
}

module.exports = {
    connectToDatabase: connectToDatabase,
};