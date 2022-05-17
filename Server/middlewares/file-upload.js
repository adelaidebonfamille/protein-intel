const multer = require("multer");

const kpmUpload = multer({
	storage: multer.diskStorage({
		destination: "user-data/kpm",
		filename: function (req, file, cb) {
			cb(null, req.body.nim + "-" + file.originalname);
		},
	}),
});

const configuredKpmUpload = kpmUpload.single("kpm");

module.exports = {
	kpmUpload: configuredKpmUpload,
};
