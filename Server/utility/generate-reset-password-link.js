const jwt = require("jsonwebtoken");

const generateLink = (data, customString) => {
    const token = jwt.sign(data, customString, {
        expiresIn: "15m",
    });
    return token;
};

const verifyGeneratedToken = (token, customString) => {
    try {
        const verified = jwt.verify(token, customString);
        return verified;
    } catch (error) {
        return error;
    }
};

module.exports = {
    generateLink,
    verifyGeneratedToken,
};