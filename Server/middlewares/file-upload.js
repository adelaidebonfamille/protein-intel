const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");

const kpmUpload = multer({
	storage: multer.diskStorage({
		destination: "./user-data/kpm",
		filename: (req, file, cb) => {
			cb(null, "kpm_" + uuid() + "_" + file.originalname);
		},
	}),
	fileFilter: (req, file, cb) => {
		//limit file size to 10MB
		if (file.size > 10485760) {
			return cb(new Error("File is too large"));
		}
		let ext = path.extname(file.originalname);
		if (
			ext !== ".png" &&
			ext !== ".jpg" &&
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
		destination: "./problem-data/files",
		filename: (req, file, cb) => {
			cb(null, "problem_" + uuid() + "_" + file.originalname);
		},
	}),
	fileFilter: (req, file, cb) => {
		//limit file size to 10MB
		console.log(file);
		if (file.size > 10485760) {
			return cb(new Error("File size exceeded"));
		}
		let ext = path.extname(file.originalname);
		if (ext !== ".mp3" && ext !== ".jpeg" && ext !== ".jpg" && ext !== ".png") {
			return cb(new Error("Only .mp3 and images are allowed"));
		}
		cb(null, true);
	},
});

module.exports = {
	kpmUpload: kpmUpload.single("kpm"),
	problemUpload: problemFileUpload.single("problem"),
};
