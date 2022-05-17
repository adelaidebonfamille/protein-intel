const multer = require("multer");
const uuid = require("uuid").v4;

const kpmUpload = multer({
	storage: multer.diskStorage({
		destination: "user-data/kpm",
		filename: (req, file, cb) => {
			cb(null, "kpm_" + uuid() + "_" + file.originalname);
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

const problemFileUpload = multer({
	storage: multer.diskStorage({
		destination: "problem-data/",
	}),
	filename: (req, file, cb) => {
		cb(null, "problem_" + uuid() + "_" + file.originalname);
	},
	fileFilter: (req, file, cb) => {
		if (file.mimetype === ".mp3") {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error("only .mp3 file are allowed!"));
		}
	},
});

module.exports = {
	kpmUpload: kpmUpload.single("kpm"),
	problemUpload: problemFileUpload.single("problem"),
};
