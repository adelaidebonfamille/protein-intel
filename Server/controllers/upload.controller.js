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
    res.writeHead(200, { Connection: "close" });
    res.json({ kpmPath });
  });
  req.pipe(bb);
  return;
};

const problemUpload = (req, res) => {
  const bb = busboy({ headers: req.headers });
  bb.on("file", (name, file, info) => {
    const { filename } = info;
    const problemPath = `/problem-data/files/problem_${uuid()}_${filename}`;
    if (name === "kpmUpload") {
      const saveTo = path.join(__dirname, kpmPath);
      file.pipe(fs.createWriteStream(saveTo));
    }
  });
  bb.on("close", () => {
    res.writeHead(200, { Connection: "close" });
    res.json({ problemPath });
  });
  req.pipe(bb);
  return;
};

module.exports = {
  kpmUpload,
  problemUpload,
};
