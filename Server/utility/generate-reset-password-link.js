const jwt = require("jsonwebtoken");

const generateLink = (data, customString) => {
    const token = jwt.sign(data, customString, {
        expiresIn: "15m",
    });
    return token;
};

module.exports = generateLink;