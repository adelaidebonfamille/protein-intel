const jwt = require("jsonwebtoken");

const generateToken = (nim) => {
	const token = jwt.sign({ nim }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
	return token;
};

module.exports = generateToken;
