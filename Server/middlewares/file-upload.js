const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");

const kpmUpload = multer({
	storage: multer.diskStorage({
		destination: "user-data/kpm",
		filename: (req, file, cb) => {
			cb(null, "kpm_" + uuid() + "_" + file.originalname);
		},
	}),
	fileFilter: (req, file, cb) => {
		var ext = path.extname(file.originalname);
		if (
			ext !== ".png" &&
			ext !== ".jpg" &&
			ext !== ".gif" &&
			ext !== ".jpeg" &&
			ext !== ".pdf" &&
			ext !== ".docx" &&
			ext !== ".doc"
		) {
			return cb(new Error("Only images, pdf and docs are allowed"));
		}
		cb(null, true);
	},
});

const problemFileUpload = multer({
	storage: multer.diskStorage({
		destination: "/problem-data/files",
	}),
	filename: (req, file, cb) => {
		cb(null, "problem_" + uuid() + "_" + file.originalname);
	},
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype === ".mp3" ||
			file.mimetype === ".jpg" ||
			file.mimetype === ".png" ||
			file.mimetype === ".jpeg"
		) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(
				new Error("only mp3, jpg, jpeg or png file are allowed!")
			);
		}
	},
});

module.exports = {
	kpmUpload: kpmUpload.single("kpm"),
	problemUpload: problemFileUpload.single("problem"),
};
