const multer = require("multer");
const uuid = require("uuid").v4;

const kpmUpload = multer({
	storage: multer.diskStorage({
		destination: "user-data/kpm",
		filename: function (req, file, cb) {
			cb(null, uuid() + "_" + file.originalname);
		},
	}),
	fileFilter: (req, file, cb) => {
		if (file.mimetype === ".pdf") {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error("only .pdf file are allowed!"));
		}
	},
});

const configuredKpmUpload = kpmUpload.single("kpm");

module.exports = {
	kpmUpload: configuredKpmUpload,
};
