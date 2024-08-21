const busboy = require("busboy");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid").v4;

const kpmUpload = (req, res) => {
  const bb = busboy({ headers: req.headers });
  bb.on("file", (name, file, info) => {
    const { filename } = info;
    const kpmPath = `/user-data/kpm/problem_${uuid()}_${filename}`;
    if (name === "kpmUpload") {
      const saveTo = path.join(__dirname, kpmPath);
      file.pipe(fs.createWriteStream(saveTo));
    }
  });
  bb.on("close", () => {
    res.json({ kpmPath });
  });
  req.pipe(bb);
  return;
};

const problemUpload = (req, res) => {
  const bb = busboy({ headers: req.headers });
  let problemFilename;
  bb.on("file", (name, file, info) => {
    const { filename } = info;
    problemFilename = `problem_${uuid()}_${filename}`;
    const problemPath = `problem-data/files/${problemFilename}`;
    if (name === "problemUpload") {
      const saveTo = path.join(problemPath);
      file.pipe(fs.createWriteStream(saveTo));
    }
  });
  bb.on("close", () => {
    if (!problemFilename) {
      res.json({ error: "No file uploaded" });
      return;
    }
    res.json({ problem: `problems/files/${problemFilename}` });
  });
  req.pipe(bb);
  return;
};

module.exports = {
  kpmUpload,
  problemUpload,
};
