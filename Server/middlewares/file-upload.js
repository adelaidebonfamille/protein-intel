const multer = require("multer");
const uuid = require("uuid").v4;

const kpmUpload = multer({
	storage: multer.diskStorage({
		destination: "user-data/kpm",
		filename: function (req, file, cb) {
			cb(null, uuid() + "-" + file.originalname);
		},
	}),
});

const configuredKpmUpload = kpmUpload.single("kpm");

module.exports = {
	kpmUpload: configuredKpmUpload,
};
